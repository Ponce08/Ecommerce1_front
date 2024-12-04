// export const Details = () => {
//     return (
//       <>

//       </>
//     );
//   };

import { useState } from 'react';
import { ChevronLeft, Minus, Plus } from 'lucide-react';

export const Details = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    'src/components/imagenes/pexels-fauxels-3184405.webp',
    'src/components/imagenes/pexels-fauxels-3184405.webp',
    'src/components/imagenes/pexels-fauxels-3184405.webp',
    'src/components/imagenes/pexels-life-of-pix-7974.webp'
  ];

  return (
    <div className="min-h-screen bg-colorBackground">
      <div className="max-w-4xl mx-auto p-4">
        {/* Back Button */}
        <a href="#" className="inline-flex items-center text-purple-600 mb-6 hover:text-blue-900">
          <ChevronLeft className="w-5 h-5" />
          <span>BACK</span>
        </a>

        {/* Product Title & Price */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mb-2">VR Pro Headset X1</h1>
          <p className="text-xl">$299.99</p>
        </div>

        {/* Main Image */}
        <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
          <img src={images[selectedImage]} alt="Product image" className="object-cover w-full h-full" />
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-purple-600' : ''
              }`}
            >
              <img src={image} alt={`Product thumbnail ${index + 1}`} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>

        {/* Description & Size */}
        <div className="space-y-4 mb-6">
          <div>
            <h2 className="font-semibold mb-2">Descripción</h2>
            <p className="text-black-600">
              Experience virtual reality like never before with our premium VR headset. Featuring advanced optics, comfortable
              fit, and immersive audio.
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Talla</h2>
            <p className="text-black-600">One size fits all with adjustable straps</p>
          </div>
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100">
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded-md">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};
