import { AiOutlineFilter } from 'react-icons/ai';
import { useContext } from 'react';
import { Filters } from './Filters.tsx';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import useFetchProducts from '../utils/useFetchProducts.tsx';

type Products = {
  id: number;
  title: string;
  images: [string];
};

export const Cards = () => {
  const { loading, error } = useFetchProducts();
  const contextGlobal = useContext(GlobalContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-colorBackground relative">
      {contextGlobal?.isTrue_filters && <Filters />}

      <div className="absolute w-full h-[1%] md:h-[3.5%] xl:h-[5%] sm:h-[3%] flex justify-center items-center">
        <button
          onClick={() => contextGlobal?.setIsTrue_filters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-sm text-white rounded hover:bg-purple-600 transition"
        >
          <AiOutlineFilter size={20} />
          Filters
        </button>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {contextGlobal?.state.products.map((product: Products) => (
            <a key={product.id} className="group">
              <img
                alt=""
                src={product.images[0]}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">$100</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
