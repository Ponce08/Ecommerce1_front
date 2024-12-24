import { useState, useContext } from 'react';
import { ChevronLeft, Minus, Plus, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { useProductsById } from '../zustand/store.tsx';
import { LoadingProducts } from '../pageCards/LoadingProducts.tsx';
import { NotFoundProducts } from '../pageCards/NotFoundProducts.tsx';

export const Details = () => {
  const { id } = useParams();
  const { state } = useContext(GlobalContext);
  const { selectedProduct, loading } = useProductsById(Number(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);

  if (loading) return <LoadingProducts />;
  if (!selectedProduct) return <NotFoundProducts />;

  return (
    <div className="min-h-screen bg-colorBackground p-4">
      <div className="max-w-2xl mx-auto">
        <a href="#" className="flex items-center text-purple-600 mb-4 hover:font-bold">
          <ChevronLeft className="w-6 h-6" />
          <span>BACK</span>
        </a>

        <div className="space-y-2 mb-4">
          <h1 className="text-xl font-semibold">{selectedProduct.title}</h1>
          <p className="text-lg">${selectedProduct.price}</p>
        </div>

        <div className="space-y-4 mb-6 mt-10">
          <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
            <img src={selectedProduct.images[selectedImage]} alt="Product image" className="object-cover w-full h-full" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {selectedProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[3/2] rounded-lg overflow-hidden mt-8 ${
                  selectedImage === index ? 'ring-2 ring-purple-600' : ''
                }`}
              >
                <img src={image} alt={`Product thumbnail ${index + 1}`} className="object-cover w-full h-full" />
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
            <button onClick={() => setQuantity(quantity + 1)} className="rounded-r-full bg-gray-200 px-4 py-2">
              <Plus className="w-4 h-4 hover:text-purple-600" />
            </button>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded flex-2">ADD TO CART</button>
        </div>
        <div className="mb-8 mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl ml-4">Reviews</h2>
            <button onClick={() => setShowReviews(!showReviews)} className="text-purple-600 hover:underline">
              {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
          </div>
          {showReviews && (
            <div className="space-y-4">
              {selectedProduct.reviews?.map((review, index) => (
                <div key={index} className="space-y-2 bg-white rounded-lg p-4">
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
          )}
        </div>
      </div>
    </div>
  );
};
