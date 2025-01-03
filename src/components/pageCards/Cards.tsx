import '../Styles.css';
import { Header } from '../header&footer/Header.tsx';
import { Footer } from '../header&footer/Footer.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { Paginations } from './Paginations.tsx';
import { AiOutlineFilter } from 'react-icons/ai';
import { useState, useContext } from 'react';
import { Filters } from './Filters.tsx';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { useProducts } from '../../zustand/hooks/useProducts.tsx';
import { LoadingProducts } from './LoadingProducts.tsx';
import { NotFoundProducts } from './NotFoundProducts.tsx';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import useStore from '../../zustand/store.tsx';

type Products = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  images: string[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Cards = () => {
  const { products } = useStore();

  const { state, dispatch } = useContext(GlobalContext);

  const { page, category, priceMin, priceMax, ratingOrder } = state;

  const { loading, error } = useProducts({ page, category, priceMin, priceMax, ratingOrder });

  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (loading) return <LoadingProducts />;
  if (products.length === 0) return <NotFoundProducts />;
  if (error) return <ErrorPage messageError={error.message} />;

  return (
    <>
      <Header />
      <div className="bg-colorBackground relative mt-[100px]">
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
                <Link to={`/product/${product.id}`} className="group" key={product.id}>
                  <div className="relative aspect-square w-full rounded-lg bg-gray-200 xl:aspect-[7/8] content_cards_imgs">
                    {!loadedImages[product.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                          <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
                        </div>
                      </div>
                    )}
                    <img
                      alt=""
                      src={product.images[0]}
                      className={`aspect-square w-full rounded-lg object-cover group-hover:opacity-75 xl:aspect-[7/8] cursor-pointer ${
                        loadedImages[product.id] ? '' : 'hidden'
                      } transition-transform duration-300 ease-in-out transform group-hover:scale-105`}
                      onLoad={() => handleImageLoad(product.id)}
                    />
                  </div>
                  <h3 className="mt-4 text-lg text-gray-700 group-hover:text-purple-600">{product.title}</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">${product.price}</p>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(product.rating > rating ? 'text-gray-900' : 'text-gray-200', 'size-5 shrink-0')}
                      />
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {products.length !== 0 && <Paginations />}
      <Footer />
    </>
  );
};
