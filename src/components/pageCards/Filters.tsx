import { useState } from 'react';
import { FiX, FiArrowRight } from 'react-icons/fi';

export const Filters = () => {
  const [fashion, setFashion] = useState(false);
  const [technology, setTechnology] = useState(false);
  const [rating, setRating] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleClean = () => {
    setFashion(false);
    setTechnology(false);
    setRating('');
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="w-full max-w-sm bg-purple-100 p-4 rounded-lg shadow-md">
      <div className="relative pb-4 border-b border-purple-300">
        <h2 className="text-center text-xl font-bold text-purple-800">FILTER</h2>
        <button
          onClick={handleClean}
          className="absolute right-2 top-2 p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6 mt-4">
        {/* Categoría */}
        <div className="flex justify-center gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={fashion}
              onChange={(e) => setFashion(e.target.checked)}
              className="form-checkbox border-purple-500 text-purple-500 focus:ring-purple-400"
            />
            <span className="text-sm font-medium">FASHION</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={technology}
              onChange={(e) => setTechnology(e.target.checked)}
              className="form-checkbox border-purple-500 text-purple-500 focus:ring-purple-400"
            />
            <span className="text-sm font-medium">TECHNOLOGY</span>
          </label>
        </div>

        {/* Precio */}
        <div className="space-y-2">
          <h3 className="text-center font-medium text-purple-800">PRICE</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="MIN"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-2 py-1 rounded bg-purple-200 placeholder:text-purple-700"
            />
            <FiArrowRight className="text-purple-500" />
            <input
              type="number"
              placeholder="MAX"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-2 py-1 rounded bg-purple-200 placeholder:text-purple-700"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <h3 className="font-medium text-purple-800">RATING</h3>
          <div className="flex justify-center gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={rating === 'upward'}
                onChange={() => setRating('upward')}
                className="form-radio border-purple-500 text-purple-500 focus:ring-purple-400"
              />
              <span className="text-sm font-medium">UPWARD</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={rating === 'falling'}
                onChange={() => setRating('falling')}
                className="form-radio border-purple-500 text-purple-500 focus:ring-purple-400"
              />
              <span className="text-sm font-medium">FALLING</span>
            </label>
          </div>
        </div>

        {/* Marca */}
        <div className="space-y-2">
          <h3 className="font-medium text-purple-800">BRAND</h3>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-2 py-1 rounded bg-purple-200 text-purple-800"
          >
            <option value="" disabled>
              -- SELECT --
            </option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
            <option value="puma">Puma</option>
            <option value="reebok">Reebok</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            onClick={() => console.log('Applied filters')}
            className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            APPLY
          </button>
          <button
            onClick={handleClean}
            className="flex-1 border border-purple-500 text-purple-800 py-2 rounded hover:bg-purple-100"
          >
            CLEAN
          </button>
        </div>
      </div>
    </div>
  );
};
