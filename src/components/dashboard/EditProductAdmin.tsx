import { ChevronLeft } from 'lucide-react';
import FunctionsDetails from '@/utils/FunctionsDetails.tsx';
import { useState } from 'react';
import { supabase } from '@/supabaseClient/supabaseClient.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface Product {
  id: number;
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
  const [loadedProduct, setLoadedProduct] = useState<Product>({
    id: 0,
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

  return (
    <div className="bg-colorBackground p-4 h-screen">
      <a className="flex items-center text-purple-600 mb-4">
        <ChevronLeft className="w-6 h-6" />
        <span className="cursor-pointer hover:font-bold" onClick={handleBack}>
          BACK
        </span>
      </a>

      <div className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-[550px] mb-6 mt-2 flex">
            <div className="bg-gray-200 rounded-lg w-[400px] h-[400px] overflow-hidden">
              <img
                src={loadedProduct.images[selectedImage]}
                alt="Product image"
                className="object-cover w-[400px] h-[400px] p-4"
              />
            </div>

            <div className="flex flex-col">
              {loadedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-[88px] h-[88px] rounded-lg bg-gray-200 p-2 overflow-hidden ml-4 mb-4 ${
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

          <form className="w-[750px]">
            <span className="text-xs font-semibold ml-2">Title</span>
            <input
              value={loadedProduct.title}
              type="text"
              className="py-2 px-3 block w-full border-purple-400 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
            />

            <input
              value={loadedProduct.description}
              type="text"
              className="mt-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
              placeholder="Description"
            />

            <input
              value={loadedProduct.price}
              type="text"
              className="mt-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
              placeholder="$Price"
            />

            <input
              value={loadedProduct.stock}
              type="text"
              className="mt-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
              placeholder="Stock"
            />

            <input
              value={loadedProduct.category}
              type="text"
              className="mt-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
              placeholder="Category"
            />

            <input
              value={loadedProduct.brand}
              type="text"
              className="mt-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
              placeholder="Brand"
            />
            <input
              value={''}
              type="file"
              className="mt-2 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
              placeholder="Images"
            />

            <button
              type="button"
              className="mt-2 mr-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-2 border-purple-600 bg-white text-gray-800 shadow-sm hover:bg-colorBackgroundMain hover:border-purple-400"
            >
              Edit
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
          </form>
        </div>
      </div>
    </div>
  );
};
