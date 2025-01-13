import { Header } from '@/components/header&footer/Header.tsx';
import { Footer } from '@/components/header&footer/Footer.tsx';
import useStore from '@/zustand/store.tsx';
import ContextCardsGlobal, { FavoriteCard } from '@/utils/ContextCardsGlobal.tsx';
import { Link } from 'react-router-dom';
import img10 from '@/imagenes/img10.png';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import 'react-tooltip/dist/react-tooltip.css';
import '../Styles.css';
import { Tooltip } from 'react-tooltip';

export const Favorites = () => {
  const { favorites } = useStore();
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const { addCart, handleImageLoad, classNames, addFavorite } = ContextCardsGlobal();

  if (favorites.length === 0) window.scrollTo(0, 0);

  return (
    <>
      <Header />
      <div className="bg-colorBackground relative mt-[100px] md:pb-32 lg:pb-[225px]">
        <h1 className="text-center text-2xl text-purple-600 p-8">Your Favorites</h1>
        {favorites.length === 0 && (
          <div className="flex flex-col items-center lg:flex-row lg:justify-center content_cards_imgs">
            <img src={img10} className="img10_favorite" />
            <div className="flex flex-col items-center">
              <h1 className="text-center text-xl p-8">You don't have favorites!!</h1>
              <Link to={'/products'}>
                <button className="w-16 xs:px-2 xs:text-xs bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded">
                  ADD
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 sm:py-8 lg:max-w-7xl lg:px-8 lg:py-8">
          <h2 className="sr-only">Products</h2>

          <div
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:grid-rows-6 lg:grid-cols-3 xl:grid-cols-4
             xl:grid-rows-3 xl:gap-x-8"
          >
            {favorites.map((product: FavoriteCard) => (
              <div key={product.id}>
                <Link to={`/product/${product.id}`} className="group">
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
                      src={product.images}
                      className={`aspect-square w-full rounded-lg object-cover group-hover:opacity-75 xl:aspect-[7/8] cursor-pointer ${
                        loadedImages[product.id] ? '' : 'hidden'
                      } transition-transform duration-300 ease-in-out transform group-hover:scale-105`}
                      onLoad={() => handleImageLoad(product.id, setLoadedImages)}
                    />
                  </div>
                  <h3 className="mt-4 text-lg text-gray-700 group-hover:text-purple-600">{product.title}</h3>
                </Link>
                <p className="mt-1 text-lg font-semibold text-gray-900">${product.price}</p>
                <div className="flex w-full items-center justify-between">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(product.rating > rating ? 'text-gray-900' : 'text-gray-200', 'size-5 shrink-0')}
                    />
                  ))}
                  <div className="flex justify-end w-full h-10 rounded-full cursor-pointer mr-2">
                    <div>
                      <HeartIcon
                        className={`mr-4 h-6 w-6 text-purple-700 mt-2 ml-2 ${
                          favorites.some((fav) => fav.id === product.id) ? 'fill-purple-700' : ''
                        } focus:outline-none animate-scale`}
                        id={`favorite${product.id}`}
                        data-tooltip-content={
                          favorites.some((fav) => fav.id === product.id) ? 'Remove from favorites' : 'Add to Favorites'
                        }
                        onClick={() => {
                          addFavorite(product.id, product.title, product.price, product.stock, product.rating, product.images[0]);
                        }}
                      />
                      <Tooltip anchorId={`favorite${product.id}`} />
                    </div>
                    <ShoppingBagIcon
                      className="mt-2 ml-2 size-6 shrink-0 text-gray-400 hover:text-purple-600 focus:outline-none"
                      id={`add_cart${product.id}`}
                      data-tooltip-content="Add to Cart"
                      onClick={() => addCart(product.id, product.title, product.price, product.stock, product.images)}
                    />
                    <Tooltip anchorId={`add_cart${product.id}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
