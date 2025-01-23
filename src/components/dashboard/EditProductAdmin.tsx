import { ChevronLeft } from 'lucide-react';
import FunctionsDetails from '@/utils/FunctionsDetails.tsx';
import { supabase } from '@/supabaseClient/supabaseClient.tsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import img12 from '@/imagenes/img12.svg';

interface Product {
  title: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  description: string;
  brand: string;
}

export const EditProductAdmin = () => {
  const { handleBack, handleImageLoad } = FunctionsDetails();
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadedProduct, setLoadedProduct] = useState<Product>({
    title: '',
    category: '',
    price: 0,
    stock: 0,
    images: [],
    description: '',
    brand: ''
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();

  // Función para obtener un producto por ID desde Supabase
  const fetchProductById = async (id: number) => {
    try {
      if (!id) {
        console.error('No se proporcionó un ID válido.');
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id) // Filtro por ID
        .single(); // Obtiene un único registro

      if (error) {
        console.error('Error fetching product by ID:', error.message);
        return;
      }

      console.log('Producto encontrado:', data);
      return data; // Devuelve el producto encontrado
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      fetchProductById(Number(id)).then((product) => {
        if (product) {
          setLoadedProduct(product);
        }
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadedProduct({
      ...loadedProduct,
      [e.target.name]: e.target.value
    });
  };

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
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    // Validar si ya hay 4 imágenes cargadas
    if (loadedProduct.images.length >= 4) {
      alert('You can only upload up to 4 images.');
      event.target.value = ''; // Limpiar el input para evitar comportamientos inesperados
      return;
    }

    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));

      setLoadedProduct((prevProduct) => {
        const updatedImages = [...prevProduct.images, ...newImages];

        // Asegurarse de que no se exceda el límite de 4 imágenes
        if (updatedImages.length > 4) {
          alert('You can only upload up to 4 images. Excess files were ignored.');
        }

        return {
          ...prevProduct,
          images: updatedImages.slice(0, 4)
        };
      });

      // Limpiar el input después de cargar los archivos
      event.target.value = '';
    }
  };

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

  return (
    <div className="min-h-screen bg-colorBackground p-4">
      <a className="flex items-center text-purple-600 mb-4 lg:mx-16">
        <ChevronLeft className="w-6 h-6" />
        <span className="cursor-pointer hover:font-bold" onClick={handleBack}>
          BACK
        </span>
      </a>

      <div className="flex flex-col lg:flex-row lg:mx-16">
        <div className="w-full flex xs:justify-start sm:justify-center lg:w-[550px] md:justify-center lg:justify-start">
          <div className="relative w-[300px] h-[300px] xs:w-[260px] xs:h-[260px] md:w-[430px] md:h-[430px] lg:w-[430px] lg:h-[430px] bg-gray-200 rounded-lg overflow-hidden">
            {!loadedImages[0] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                </div>
              </div>
            )}
            {loadedProduct.images.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center ${loadedImages[0] ? '' : 'hidden'}`}>
                <img src={img12} className="w-32 h-auto" />
                <h2 className="text-base">!!Opps.. Nothing there</h2>
              </div>
            ) : (
              <img
                src={loadedProduct.images[selectedImage]}
                className={`object-cover w-full h-ful lg:p-4 ${loadedImages[selectedImage] ? '' : 'hidden'}`}
              />
            )}
          </div>

          <div className="flex flex-col">
            {loadedProduct.images.map((image, index) => (
              <div
                key={index}
                className="relative w-[69px] h-[69px] xs:w-[59px] xs:h-[59px] md:w-[101px] md:h-[101px] lg:w-[96px] lg:h-[96px] mb-2 ml-2 lg:ml-4 lg:mb-4"
              >
                {/* Contenedor de la imagen con selección */}
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
                  {/* Imagen */}
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className={`object-cover w-full h-full ${loadedImages[index] ? '' : 'hidden'}`}
                    onLoad={() => handleImageLoad(index, setLoadedImages)}
                  />
                </button>

                {/* Botón de eliminar (independiente del contenedor de la imagen) */}
                {!isDisabled && (
                  <button onClick={() => removeImage(image)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4 focus:outline-none" data-tooltip-content="Remove" id={`Remove${index}`} />
                    <Tooltip anchorId={`Remove${index}`} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <form className="w-full lg:w-[50%] lg:ml-4">
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
            <label className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Select image
              <input accept="image/*" onChange={handleFileSelect} type="file" disabled={isDisabled} className="hidden" />
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
              type="button"
              className="mt-2 mr-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-2 border-red-600 bg-white text-gray-800 shadow-sm hover:bg-colorBackgroundMain hover:border-red-400"
            >
              Delete
            </button>
            <button
              type="submit"
              className="mt-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg bg-white text-gray-800 border border-2 border-green-600 hover:bg-colorBackgroundMain hover:border-green-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
