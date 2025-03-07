import '../Styles.css';
import { useState, useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { FiX, FiArrowRight } from 'react-icons/fi';
import ContextCardsGlobal from '../../utils/ContextCardsGlobal.tsx';

export const Filters = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { applyFilters, allProducts } = ContextCardsGlobal();
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleClean = () => {
    setRating('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div
      className={
        state.isTrue_filters
          ? 'absolute z-10 w-[330px] bg-purple-100 p-4 rounded-lg border border-black shadow-lg class_transition'
          : 'display_none_filters'
      }
    >
      <div className="absolute right-2 top-2">
        <button
          onClick={() => dispatch({ type: 'SET_FALSE_FILTERS' })}
          className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
      <div className="flex justify-center pb-4 border-b border-purple-300">
        <h2 className="text-xl font-bold text-purple-800">Filters</h2>
      </div>

      {/* Category*/}
      <div className="text-center space-y-2 mt-4">
        <h3 className="text-center text-purple-800 font-bold">Category</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-[80%] px-2 py-1 rounded bg-purple-200 text-purple-800 focus:ring-purple-500"
        >
          <option value="" disabled className="text-center">
            -- Select --
          </option>
          <option>Beauty</option>
          <option>Fragrances</option>
          <option>Laptops</option>
          <option>Mens shirts</option>
          <option>Mens shoes</option>
          <option>Mens watches</option>
          <option>Mobile accessories</option>
          <option>Smartphones</option>
          <option>Sunglasses</option>
          <option>Tablets</option>
          <option>Tops</option>
          <option>Womens bags</option>
          <option>Womens dresses</option>
          <option>Womens jewellery</option>
          <option>Womens shoes</option>
          <option>Womens watches</option>
        </select>
      </div>
      <div className="space-y-6 mt-6">
        {/* Precio */}
        <div className="space-y-2">
          <h3 className="text-center font-bold text-purple-800">Price</h3>
          <div className="flex items-center justify-center gap-2">
            <input
              min="0"
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-[30%] px-2 py-1 rounded bg-purple-200 text-center placeholder:text-purple-700 focus:ring-purple-500"
            />
            <FiArrowRight className="text-purple-500" />
            <input
              min="0"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-[30%] px-2 py-1 rounded bg-purple-200 text-center placeholder:text-purple-700 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <h3 className="text-center font-bold text-purple-800">Rating</h3>
          <div className="flex justify-center gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={rating === 'upward'}
                onChange={() => setRating('upward')}
                className="form-radio border-purple-500 text-purple-500 focus:ring-purple-400"
              />
              <span className="text-sm font-medium">Upward</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={rating === 'falling'}
                onChange={() => setRating('falling')}
                className="form-radio border-purple-500 text-purple-500 focus:ring-purple-400"
              />
              <span className="text-sm font-medium">Falling</span>
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => applyFilters(category, minPrice, maxPrice, rating)}
            className="bg-purple-500 text-white text-sm py-2 px-4 rounded hover:bg-purple-600"
          >
            Apply
          </button>
          <button
            onClick={() => allProducts(rating)}
            className="bg-purple-500 text-white text-sm py-2 px-4 rounded hover:bg-purple-600"
          >
            All Products
          </button>
          <button
            onClick={handleClean}
            className="border border-purple-500 text-purple-800 text-sm py-2 px-4 rounded hover:bg-gray-200"
          >
            Clean
          </button>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="absolute z-10 flex justify-center bg-gray-800/50 backdrop-blur-sm"> */
}
