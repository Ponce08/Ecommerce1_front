import { Sidebar } from '@/components/dashboard/Sidebar.tsx';
import { supabase } from '@/supabaseClient/supabaseClient.tsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}

export const ProductsDashboard = () => {
  // Estado para almacenar productos y el término de búsqueda
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  // Función para obtener productos desde Supabase
  const fetchProducts = async (title = '') => {
    setLoading(true);
    try {
      let allProducts: Product[] = [];
      let start = 0;
      const pageSize = 1000; // Número de filas por página

      while (true) {
        let query = supabase
          .from('products')
          .select('*', { count: 'exact' })
          .range(start, start + pageSize - 1);

        if (title) {
          query = query.ilike('title', `%${title}%`); // Filtro por título si aplica
        }

        const { data, error, count } = await query;

        if (error) {
          console.error('Error fetching products:', error.message);
          break;
        }

        if (data && data.length > 0) {
          allProducts = [...allProducts, ...data]; // Acumula los productos
          start += pageSize; // Avanza al siguiente rango
          setTotalCount(count || 0);
        }

        if (data.length < pageSize) {
          break; // Si la página tiene menos filas, ya no hay más datos
        }
      }

      setProducts(allProducts); // Actualiza el estado con todos los productos cargados
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    if (searchTitle === '') {
      fetchProducts();
    }
  }, [searchTitle]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchProducts(searchTitle); // Realiza la búsqueda
  };

  return (
    <div className="relative">
      <Sidebar title="Admin Products" />
      <div className="w-full text-center">
        <form onSubmit={handleSearch}>
          <input
            className="w-[70%] lg:w-[30%] m-2 py-2 px-3 border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
            type="text"
            placeholder="Buscar producto"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button
            type="submit"
            className="m-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg bg-purple-500 text-white hover:bg-purple-600"
          >
            Search
          </button>
          <h1 className="lg:inline-block font-semibold ml-4">
            RESULT:{' '}
            <span className="font-normal">
              {products.length} / {totalCount}
            </span>
          </h1>
        </form>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[90%] h-[550px] lg:h-[350px] overflow-y-auto shadow-md bg-white rounded-lg m-4">
          <table className="w-full h-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-center sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-sm font-semibold text-white">ID</th>
                <th className="px-4 py-2 text-sm font-semibold text-white">Title</th>
                <th className="px-4 py-2 text-sm font-semibold text-white">Price</th>
                <th className="px-4 py-2 text-sm font-semibold text-white">Stock</th>
                <th className="px-4 py-2 text-sm font-semibold text-white">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center">
              {products.length > 0 ? (
                products.map((product: Product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/products_dashboard/${product.id}`)}
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">{product.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{product.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${product.price}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{product.stock}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{product.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="h-64">
                    {products.length === 0 && loading ? (
                      // Animación de carga
                      <div className="flex items-center justify-center h-full">
                        <div className="relative">
                          <div className="h-32 w-32 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                          <div className="absolute top-0 left-0 h-32 w-32 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                        </div>
                      </div>
                    ) : (
                      <span className="font-semibold text-2xl">!!No products found 😅</span>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="m-2 py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg bg-purple-500 text-white hover:bg-purple-600"
          onClick={() => navigate('/add_product_admin')}
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
};
