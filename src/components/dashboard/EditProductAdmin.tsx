// Hooks
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// libraries
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { ChevronLeft, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

//Others
import img12 from '@/imagenes/img12.svg';

//Reused functions
import FunctionsDetails from '@/utils/FunctionsDetails.tsx';

//Supabase Client
import { supabase } from '@/supabaseClient/supabaseClient.tsx';

//Interface y Funciónes para obtener un producto por ID, eliminar o actualizar desde Supabase
import { ProductAdmin, fetchProductById, updateProduct, deleteProductById } from '@/utils/FunctionsDashboard.tsx';
//!-----------------------------------------------------------------**------------------------------------------------------------

//El componente 'EditProductAdmin' se utiliza para editar o eliminar un producto ya existente en la base de datos:
export const EditProductAdmin = () => {
  //*Funciones reutilizables:
  // handleBack: Regresa a la pagina anterior
  //handleImageLoad: Actualiza un estado que rastrea qué imágenes se han cargado.
  const { handleBack, handleImageLoad } = FunctionsDetails();

  //*Estados locales
  //Estado cuyas claves son números (los identificadores de imágenes) y los valores son booleanos. Ej:{ 1: true, 2: false }
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  //Estado para habilitar o desabilitar los inputs
  const [isDisabled, setIsDisabled] = useState(true);

  //Estado para actualizar identificador de imagen
  const [selectedImage, setSelectedImage] = useState(0);

  //Estado para guardar el producto obtenido de 'fetchProductById'
  const [loadedProduct, setLoadedProduct] = useState<ProductAdmin>({
    title: '',
    category: '',
    price: 0,
    stock: 0,
    images: [],
    description: '',
    brand: ''
  });

  //Se utiliza para hacer referencia al input 'Title' y hacer foco cuando es deshabilitado
  const inputRef = useRef<HTMLInputElement>(null);

  //ID del producto Seleccionado previamente
  const { id } = useParams();

  //Redirije a '/products_dashboard' cuando se elimina un producto
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      // 'fetchProductById': Función para obtener un producto por ID desde Supabase
      fetchProductById(Number(id)).then((product) => {
        if (product) {
          setLoadedProduct(product);
        }
      });
    }
  }, [id]);

  //Funcion para actualizar cada propiedad del producto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadedProduct({
      ...loadedProduct,
      [e.target.name]: e.target.value
    });
  };

  //Funcion para cancelar la edicion y volver al estado original del producto
  const cancelEdit = () => {
    if (!isDisabled) {
      if (id && !isNaN(Number(id))) {
        fetchProductById(Number(id)).then((product) => {
          if (product) {
            setLoadedProduct(product);
            // Restaurar la selección de la imagen principal
            setSelectedImage(product.images.length > 0 ? 0 : -1);
            setIsDisabled(true);
          }
        });
      }
      return;
    }
    setIsDisabled(false);
    //Foco al input 'Title'
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  //Funcion para agregar una nueva imagen al bucket de supabase y al array de imagenes del producto. Solo se pueden cargar 4 imagenes por producto
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      // Convertir los archivos a un arreglo para procesarlos
      const newImages = Array.from(files);

      // Crear un arreglo para las URLs de las imágenes subidas
      const uploadedImageUrls: string[] = [];

      for (const file of newImages) {
        const fileName = `${Date.now()}-${file.name}`; // Nombre único para la imagen
        const { data, error } = await supabase.storage
          .from('images-fashion-and-tecnology') // Reemplazar con el nombre del bucket en Supabase
          .upload(`images/${fileName}`, file); // Subir imagen al bucket

        if (error) {
          console.error('Error al subir la imagen:', error.message);
          continue;
        }

        if (data) {
          // Crear una URL pública para la imagen subida
          const publicUrl = supabase.storage.from('images-fashion-and-tecnology').getPublicUrl(`images/${fileName}`)
            .data.publicUrl;

          if (publicUrl) {
            uploadedImageUrls.push(publicUrl);
          }
        }
      }

      // Actualizar el estado con las nuevas URLs de las imágenes subidas
      setLoadedProduct((prevProduct) => {
        const updatedImages = [...prevProduct.images, ...uploadedImageUrls];
        return {
          ...prevProduct,
          images: updatedImages.slice(0, 4) // Limitar a 4 imágenes como máximo
        };
      });

      // Limpiar el input después de cargar los archivos
      event.target.value = '';
    }
  };

  //Elimina una imagen del producto
  const removeImage = (imageUrl: string) => {
    setLoadedProduct((prevProduct) => {
      const updatedImages = prevProduct.images.filter((img) => img !== imageUrl);

      // Asegurar que el índice selectedImage sea válido
      const newSelectedImage = updatedImages.length === 0 ? -1 : Math.min(selectedImage, updatedImages.length - 1);

      setSelectedImage(newSelectedImage); // Actualizar el índice seleccionado

      return {
        ...prevProduct,
        images: updatedImages
      };
    });
  };

  //Se utiliza para llamar a 'updateProduct' y mostrar un mensaje de acualizacion exitosa
  const submitUpdateProduct = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await updateProduct(loadedProduct, Number(id));
    setIsDisabled(true);
    Swal.fire({
      title: 'Product updated successfully',
      icon: 'success',
      customClass: {
        confirmButton: 'bg-purple-600'
      }
    });
  };

  //Se utiliza para eliminar producto
  const deleteProduct = async () => {
    try {
      // Confirmación inicial con SweetAlert
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7e22ce',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        // Llama a la función para eliminar el producto
        const { success, message } = await deleteProductById(Number(id));

        if (success) {
          // Éxito al eliminar el producto
          await Swal.fire({
            title: 'Deleted!',
            text: message || 'Your product has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: 'bg-purple-600'
            }
          });
          navigate('/products_dashboard');
        } else {
          // Error al eliminar el producto
          await Swal.fire({
            title: 'Error!',
            text: message || 'There was a problem deleting the product.',
            icon: 'error',
            customClass: {
              confirmButton: 'bg-purple-600'
            }
          });
        }
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      // Manejo de errores inesperados
      await Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        customClass: {
          confirmButton: 'bg-purple-600'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-colorBackground p-4">
      {/* Enlace para ir a la pagina anterior */}
      <a className="flex items-center text-purple-600 mb-4 lg:mx-16">
        <ChevronLeft className="w-6 h-6" />
        <span className="cursor-pointer hover:font-bold" onClick={handleBack}>
          BACK
        </span>
      </a>

      <div className="flex flex-col lg:flex-row lg:mx-16">
        <div className="w-full flex xs:justify-start sm:justify-center lg:w-[550px] md:justify-center lg:justify-start">
          <div className="relative w-[300px] h-[300px] xs:w-[260px] xs:h-[260px] md:w-[430px] md:h-[430px] lg:w-[430px] lg:h-[430px] bg-gray-200 rounded-lg overflow-hidden">
            {/* Indicador de carga */}
            {!loadedImages[0] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                </div>
              </div>
            )}
            {/* Se muestra una imagen predeterminada si el array de imagenes del producto esta vacio */}
            {loadedProduct.images.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center ${loadedImages[0] ? '' : 'hidden'}`}>
                <img src={img12} className="w-32 h-auto" />
                <h2 className="text-base">!!Opps.. Nothing there</h2>
              </div>
            ) : (
              // Imagen principal, es decir la mas grande
              <img
                src={loadedProduct.images[selectedImage]}
                className={`object-cover w-full h-ful lg:p-4 ${loadedImages[selectedImage] ? '' : 'hidden'}`}
              />
            )}

            {/* Icono de eliminar imagen: Aparece cuando se presiona el boton de 'Edit' */}
            {loadedProduct.images.length !== 0 && !isDisabled && (
              <button
                onClick={() => removeImage(loadedProduct.images[selectedImage])}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 focus:outline-none" data-tooltip-content="Remove" id="Remove" />
                <Tooltip anchorId="Remove" />
              </button>
            )}
          </div>

          {/* Contenedor de imagenes pequeñas */}
          <div className="flex flex-col">
            {loadedProduct.images.map((image, index) => (
              <div
                key={index}
                className="relative w-[69px] h-[69px] xs:w-[59px] xs:h-[59px] md:w-[101px] md:h-[101px] lg:w-[96px] lg:h-[96px] mb-2 ml-2 lg:ml-4 lg:mb-4"
              >
                <button
                  onClick={() => setSelectedImage(index)}
                  className={`w-full h-full rounded-lg bg-gray-200 lg:p-2 overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  {/* Indicador de carga */}
                  {!loadedImages[index] && (
                    <div className="inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                        <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                      </div>
                    </div>
                  )}
                  {/* Imagen pequeña */}
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className={`object-cover w-full h-full ${loadedImages[index] ? '' : 'hidden'}`}
                    onLoad={() => handleImageLoad(index, setLoadedImages)}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form className="w-full lg:w-[50%] lg:ml-4" onSubmit={submitUpdateProduct}>
          <span className="text-xs font-semibold ml-2">Title</span>
          <input
            ref={inputRef}
            onChange={handleChange}
            value={loadedProduct.title}
            type="text"
            name="title"
            disabled={isDisabled}
            className={`${
              isDisabled ? 'cursor-not-allowed' : ''
            } mb-2 py-2 px-3 block w-full border-purple-400 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]`}
          />

          <span className="text-xs font-semibold ml-2">Description</span>
          <input
            onChange={handleChange}
            value={loadedProduct.description}
            type="text"
            name="description"
            disabled={isDisabled}
            className={`${
              isDisabled ? 'cursor-not-allowed' : ''
            } mb-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]`}
          />

          <div className="inline-flex flex-col w-[49%]">
            <span className="text-xs font-semibold ml-2">Price</span>
            <input
              onChange={handleChange}
              value={loadedProduct.price}
              type="number"
              name="price"
              disabled={isDisabled}
              min="0"
              className={`${
                isDisabled ? 'cursor-not-allowed' : ''
              } mb-2 py-2 px-3 inline-block border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]`}
            />
          </div>

          <div className="inline-flex flex-col ml-2 xl:ml-4 w-[48%]">
            <span className="text-xs font-semibold ml-2">Stock</span>
            <input
              onChange={handleChange}
              value={loadedProduct.stock}
              type="number"
              name="stock"
              disabled={isDisabled}
              min="0"
              className={`${
                isDisabled ? 'cursor-not-allowed' : ''
              } mb-2 py-2 px-3 inline-block border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]`}
            />
          </div>

          <span className="block text-xs font-semibold ml-2">Category</span>
          <input
            onChange={handleChange}
            value={loadedProduct.category}
            type="text"
            name="category"
            disabled={isDisabled}
            className={`${
              isDisabled ? 'cursor-not-allowed' : ''
            } mb-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]`}
          />

          <span className="text-xs font-semibold ml-2">Brand</span>
          <input
            onChange={handleChange}
            value={loadedProduct.brand}
            type="text"
            name="brand"
            disabled={isDisabled}
            className={`${
              isDisabled ? 'cursor-not-allowed' : ''
            } mb-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]`}
          />
          <div className="flex items-center">
            <label
              className={`${
                isDisabled || loadedProduct.images.length >= 4 ? 'opacity-50' : ''
              } bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ${
                isDisabled || loadedProduct.images.length >= 4 ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              Select image
              <input
                accept="image/*"
                onChange={handleFileSelect}
                type="file"
                disabled={isDisabled || loadedProduct.images.length >= 4}
                className="hidden"
              />
            </label>
          </div>

          {/* botones */}
          <div>
            <button
              onClick={cancelEdit}
              type="button"
              className="mt-2 mr-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-2 border-purple-600 bg-white text-gray-800 shadow-sm hover:bg-colorBackgroundMain hover:border-purple-400"
            >
              {isDisabled ? 'Edit' : 'Cancel'}
            </button>
            <button
              onClick={deleteProduct}
              type="button"
              className="mt-2 mr-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-2 border-red-600 bg-white text-gray-800 shadow-sm hover:bg-colorBackgroundMain hover:border-red-400"
            >
              Delete
            </button>
            <button
              type="submit"
              className="mt-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg bg-white text-gray-800 border border-2 border-green-600 hover:bg-colorBackgroundMain hover:border-green-400"
              disabled={isDisabled}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
