import '../Styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { Header } from '../header&footer/Header.tsx';
import { Footer } from '../header&footer/Footer.tsx';
import { ErrorPage } from '../pageCards/ErrorPage.tsx';
import { NotFoundProducts } from '../pageCards/NotFoundProducts.tsx';
import { LoadingProducts } from '../pageCards/LoadingProducts.tsx';
import { Paginations } from '../pageCards/Paginations.tsx';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { useProducts } from '../../zustand/hooks/useProducts.tsx';
import { Filters } from '../pageCards/Filters.tsx';
import { AiOutlineFilter } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import useStore from '../../zustand/store.tsx';
import ContextCardsGlobal from '../../utils/ContextCardsGlobal.tsx';
import { Products } from '../../utils/ContextCardsGlobal.tsx';

export const CardsCategory = () => {
  const { categorys } = useParams();

  const { state, dispatch } = useContext(GlobalContext);

  const { page, priceMin, priceMax, ratingOrder, isTrue_filters } = state;

  const { loading, error, totalCount } = useProducts({ page, category: categorys, priceMin, priceMax, ratingOrder });

  const { products, favorites, userLogin } = useStore();

  const { addCart, handleImageLoad, classNames, addFavorite, animationHeart } = ContextCardsGlobal();

  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  if (loading) return <LoadingProducts />;
  if (products.length === 0) return <NotFoundProducts />;
  if (error) return <ErrorPage messageError={error.message} />;

  return (
    <>
      <Header />
      <div className="relative bg-colorBackground mt-[100px]">
        {isTrue_filters && (
          <div className="absolute z-10 w-full h-full flex justify-center py-4 bg-gray-800/50 backdrop-blur-sm">
            <Filters />
          </div>
        )}
        <div className="flex justify-center items-center py-6">
          <button
            onClick={() => dispatch({ type: 'SET_TRUE_FILTERS' })}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-sm text-white rounded hover:bg-purple-600 transition"
          >
            <AiOutlineFilter size={20} />
            Filters
          </button>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: Products) => (
              <div className="group" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square w-full rounded-lg bg-gray-200 xl:aspect-[7/8] content_category_imgs">
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
                      onLoad={() => handleImageLoad(product.id, setLoadedImages)}
                    />
                  </div>
                  <h3 className="mt-4 text-lg text-gray-700 group-hover:text-purple-600">{product.title}</h3>
                </Link>
                <p className="mt-1 text-lg font-semibold text-gray-900">${product.price}</p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(product.rating > rating ? 'text-gray-900' : 'text-gray-200', 'size-5 shrink-0')}
                    />
                  ))}
                  <div className="flex justify-end w-full h-10 rounded-full cursor-pointer mr-2">
                    <div onClick={animationHeart}>
                      <HeartIcon
                        className={`mr-4 h-6 w-6 text-purple-700 mt-2 ml-2 ${
                          userLogin && (favorites[userLogin.id] || []).some((fav) => fav.id === product.id)
                            ? 'fill-purple-700'
                            : ''
                        } focus:outline-none`}
                        id={`favorite_category${product.id}`}
                        data-tooltip-content={
                          userLogin && (favorites[userLogin.id] || []).some((fav) => fav.id === product.id)
                            ? 'Remove from favorites'
                            : 'Add to Favorites'
                        }
                        onClick={() => {
                          addFavorite(product.id, product.title, product.price, product.stock, product.rating, product.images[0]);
                        }}
                      />
                      <Tooltip anchorId={`favorite_category${product.id}`} />
                    </div>
                    <ShoppingBagIcon
                      className="mt-2 ml-2 size-6 shrink-0 text-gray-400 hover:text-purple-600 focus:outline-none"
                      id={`add_cart_category${product.id}`}
                      data-tooltip-content="Add to Cart"
                      onClick={() => addCart(product.id, product.title, product.price, product.stock, product.images[0])}
                    />
                    <Tooltip anchorId={`add_cart_category${product.id}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {products.length !== 0 && <Paginations totalCount={totalCount} />}
      <Footer />
    </>
  );
};
