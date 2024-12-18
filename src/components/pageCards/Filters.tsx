import '../Styles.css';
import { useState, useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { FiX, FiArrowRight } from 'react-icons/fi';
import { stateCategorys } from '../utils/ObjectCategorys.tsx';

export const Filters = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [rating, setRating] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleClean = () => {
    setRating('');
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
  };

  const applyFilters = () => {
    dispatch({ type: 'SET_PAGE', payload: 1 });
    dispatch({ type: 'SET_CATEGORY', payload: brand });
    dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
    dispatch({ type: 'SET_FINALPAGE', payload: stateCategorys(brand) });
    dispatch({ type: 'SET_FALSE_FILTERS' });
  };

  const allProducts = () => {
    dispatch({ type: 'SET_CATEGORY', payload: '' });
    dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
    dispatch({ type: 'SET_PAGE', payload: 1 });
    dispatch({ type: 'SET_FINALPAGE', payload: 85 });
    dispatch({ type: 'SET_FALSE_FILTERS' });
  };

  return (
    <div className="absolute z-50 w-full h-full flex justify-center bg-gray-800/50 backdrop-blur-sm">
      <div
        className={
          state.isTrue_filters
            ? 'z-40 h-[7.5%] w-[95%] md:h-[16%] sm:h-[18%] lg:h-[17%] xl:h-[28.5%] max-w-sm bg-purple-100 p-4 rounded-lg border border-black shadow-lg'
            : 'display_none_filters'
        }
      >
        <div className="relative inset-0 pb-4 border-b border-purple-300">
          <h2 className="text-center text-xl font-bold text-purple-800">Filters</h2>
          <button
            onClick={() => dispatch({ type: 'SET_FALSE_FILTERS' })}
            className="absolute right-2 top-2 p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Category*/}
        <div className="space-y-2 mt-4">
          <h3 className="text-center text-purple-800 font-bold">Category</h3>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-2 py-1 rounded bg-purple-200 text-purple-800 focus:ring-purple-500"
          >
            <option value="" disabled className='text-center'>
              -- Select --
            </option>
            <option>Beauty</option>
            <option>Fragrances</option>
            <option>Laptops</option>
            <option>Mens_shirts</option>
            <option>Mens_shoes</option>
            <option>Mens_watches</option>
            <option>Mobile_accessories</option>
            <option>Smartphones</option>
            <option>Sunglasses</option>
            <option>Tablets</option>
            <option>Tops</option>
            <option>Womens_bags</option>
            <option>Womens_dresses</option>
            <option>Womens_jewellery</option>
            <option>Womens_shoes</option>
            <option>Womens_watches</option>
          </select>
        </div>
        <div className="space-y-6 mt-6">
          {/* Precio */}
          <div className="space-y-2">
            <h3 className="text-center font-bold text-purple-800">Price</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="MIN"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-2 py-1 rounded bg-purple-200 text-center placeholder:text-purple-700 focus:ring-purple-500"
              />
              <FiArrowRight className="text-purple-500" />
              <input
                type="number"
                placeholder="MAX"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-2 py-1 rounded bg-purple-200 text-center placeholder:text-purple-700 focus:ring-purple-500"
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
          <div className="flex gap-4">
            <button onClick={applyFilters} className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
              Apply
            </button>
            <button
              onClick={handleClean}
              className="flex-1 border border-purple-500 text-purple-800 py-2 rounded hover:bg-purple-100"
            >
              Clean
            </button>
            <button onClick={allProducts} className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
              All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
