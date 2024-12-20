import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { useProducts } from '../zustand/store.tsx';
import { LoadingProducts } from '../pageCards/LoadingProducts.tsx';
import { NotFoundProducts } from '../pageCards/NotFoundProducts.tsx';
import { Filters } from '../pageCards/Filters.tsx';
import { AiOutlineFilter } from 'react-icons/ai';
import { stateProductsPagination } from '../utils/ObjectCategorys.tsx';

export const CardsCategory = () => {
  const { categorys } = useParams();

  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({
      type: 'SET_FINALPAGE',
      payload: stateProductsPagination(categorys || '')
    });
  }, [categorys]);

  const { page, priceMin, priceMax, ratingOrder } = state;

  const { products, loading } = useProducts(page, categorys || null, priceMin, priceMax, ratingOrder);

  if (loading) return <LoadingProducts />;
  if (products.length === 0) return <NotFoundProducts />;

  type Products = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    images: string[];
  };

  return (
    <div className="bg-colorBackground relative">
      <div>{state.isTrue_filters && <Filters />}</div>

      <div className="absolute w-full h-[1%] md:h-[3.5%] xl:h-[5%] sm:h-[3%] flex justify-center items-center">
        <button
          onClick={() => dispatch({ type: 'SET_TRUE_FILTERS' })}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-sm text-white rounded hover:bg-purple-600 transition"
        >
          <AiOutlineFilter size={20} />
          Filters
        </button>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 grid-rows-12 gap-x-6 gap-y-10 sm:grid-cols-2 sm:grid-rows-6 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-3 xl:gap-x-8">
          {products.map((product: Products) => {
            return (
              <a key={product.id} className="group">
                <img
                  alt=""
                  src={product.images[0]}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8] cursor-pointer"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">Rating: {product.rating}</p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
