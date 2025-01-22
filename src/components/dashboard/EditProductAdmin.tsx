import { ChevronLeft } from 'lucide-react';
import FunctionsDetails from '@/utils/FunctionsDetails.tsx';
import { supabase } from '@/supabaseClient/supabaseClient.tsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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

  return (
    <div className="bg-colorBackground p-4 h-screen">
      <a className="flex items-center text-purple-600 mb-4 mx-16">
        <ChevronLeft className="w-6 h-6" />
        <span className="cursor-pointer hover:font-bold" onClick={handleBack}>
          BACK
        </span>
      </a>

      <div className="flex flex-col lg:flex-row mx-16">
        <div className="w-[550px] mb-6 mt-2 flex">
          <div className="relative bg-gray-200 rounded-lg w-[430px] h-[430px] overflow-hidden">
            {!loadedImages[0] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                </div>
              </div>
            )}
            <img
              src={loadedProduct.images[selectedImage]}
              className={`object-cover w-[430px] h-[430px] p-4 ${loadedImages[0] ? '' : 'hidden'}`}
            />
          </div>

          <div className="flex flex-col">
            {loadedProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-[96px] h-[96px] rounded-lg bg-gray-200 p-2 overflow-hidden ml-4 mb-4 ${
                  selectedImage === index ? 'ring-2 ring-purple-600' : ''
                }`}
              >
                {!loadedImages[index] && (
                  <div className="inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                      <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                    </div>
                  </div>
                )}
                <img
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  className={`object-cover w-full h-full ${loadedImages[index] ? '' : 'hidden'}`}
                  onLoad={() => handleImageLoad(index, setLoadedImages)}
                />
              </button>
            ))}
          </div>
        </div>

        <form className="w-[50%] ml-4">
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

          <div className="inline-flex flex-col">
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

          <div className="inline-flex flex-col ml-4">
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

          <input
            value={''}
            type="file"
            disabled={isDisabled}
            className="mb-2 py-2 px-3 inline-block border-gray-200 shadow-sm text-xs rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
          />

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
