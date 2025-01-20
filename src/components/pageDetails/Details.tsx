import '../Styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { Header } from '@/components/header&footer/Header.tsx';
import { Footer } from '@/components/header&footer/Footer.tsx';
import { ErrorPage } from '../pageCards/ErrorPage.tsx';
import { useState } from 'react';
import { ChevronLeft, Minus, Plus, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useProductsById } from '@/zustand/hooks/useProductsById.tsx';
import { LoadingProducts } from '@/components/pageCards/LoadingProducts.tsx';
import { NotFoundProducts } from '@/components/pageCards/NotFoundProducts.tsx';
import { HeartIcon } from '@heroicons/react/24/outline';
import useStore from '@/zustand/store.tsx';
import FunctionsDetails from '@/utils/FunctionsDetails.tsx';
import ContextCardsGlobal from '@/utils/ContextCardsGlobal.tsx';

export const Details = () => {
  const { id } = useParams();

  const { addFavorite, animationHeart } = ContextCardsGlobal();

  const { loading, error } = useProductsById(Number(id));

  const { selectedProduct, favorites, userLogin } = useStore();

  const { addCart, handleBack, handleImageLoad } = FunctionsDetails();

  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);

  if (loading) return <LoadingProducts />;
  if (!selectedProduct) return <NotFoundProducts />;
  if (error) return <ErrorPage messageError={error.message} />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-colorBackground p-4 mt-[100px]">
        <div className="max-w-2xl mx-auto">
          <a className="flex items-center text-purple-600 mb-4">
            <ChevronLeft className="w-6 h-6" />
            <span className="cursor-pointer hover:font-bold" onClick={handleBack}>
              BACK
            </span>
          </a>

          <div className="space-y-2 mb-4">
            <h1 className="text-xl font-semibold">{selectedProduct.title}</h1>
            <p className="text-lg">${selectedProduct.price}</p>
          </div>

          <div className="space-y-4 mb-6 mt-10">
            <div className="relative aspect-[3/2] bg-gray-200 rounded-lg overflow-hidden">
              <img src={selectedProduct.images[selectedImage]} alt="Product image" className="object-cover w-full h-full p-4" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {selectedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[3/2] rounded-lg bg-gray-200 p-2 overflow-hidden mt-8 ${
                    selectedImage === index ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center">
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

          <div className="space-y-4 mb-6">
            <div>
              <h2 className="font-semibold mb-2">Descripcion</h2>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Size</h2>
              <p className="text-gray-600">One size fits all with adjustable straps</p>
            </div>

            <p className="text-gray-600 font-semibold">{selectedProduct.stock} available</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-l-full bg-gray-200 px-4 py-2">
                <Minus className="w-4 h-4 hover:text-purple-600" />
              </button>
              <div className="flex items-center justify-center w-12 h-8 bg-white">{quantity}</div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-r-full bg-gray-200 px-4 py-2"
                disabled={quantity >= selectedProduct.stock}
              >
                <Plus className="w-4 h-4 hover:text-purple-600" />
              </button>
            </div>
            <button
              onClick={() => addCart(quantity)}
              className="xs:px-2 xs:text-xs bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded flex-2"
            >
              ADD TO CART
            </button>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
              id="favorite"
              data-tooltip-content={
                userLogin && (favorites[userLogin.id] || []).some((fav) => fav.id === selectedProduct.id)
                  ? 'Remove from favorites'
                  : 'Add to Favorites'
              }
              onClick={animationHeart}
            >
              <HeartIcon
                className={`h-6 w-6 text-purple-700 ${
                  userLogin && (favorites[userLogin.id] || []).some((fav) => fav.id === selectedProduct.id)
                    ? 'fill-purple-700'
                    : ''
                }`}
                onClick={() => {
                  addFavorite(
                    selectedProduct.id,
                    selectedProduct.title,
                    selectedProduct.price,
                    selectedProduct.stock,
                    selectedProduct.rating,
                    selectedProduct.images[0]
                  );
                }}
              />
              <Tooltip anchorId="favorite" />
            </div>
          </div>
          <div className="mb-8 mt-10">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setShowReviews(!showReviews)} className="text-purple-600 ml-2 font-bold hover:underline">
                {showReviews ? 'Hide Reviews' : 'Show Reviews'}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-[1000ms] ease-in-out ${
                showReviews ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-4">
                {selectedProduct.reviews?.map((review, index) => (
                  <div key={index} className="space-y-2 bg-gray-200 rounded-lg p-4">
                    <p className="text-purple-600 font-bold">{review.reviewerName}</p>
                    <p className="text-gray-600 font-bold">{review.reviewerEmail}</p>
                    <p className="text-gray-600">
                      <span className="font-bold">Coment :</span> {review.comment}
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-purple-600 text-purple-600' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
