import '../Styles.css';
import { useState, useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { FiX, FiArrowRight } from 'react-icons/fi';

export const Filters = () => {
  const contextGlobal = useContext(GlobalContext);
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
    <div className="absolute z-50 w-full h-full flex justify-center bg-gray-800/50 backdrop-blur-sm">
      <div
        className={
          contextGlobal.state.isTrue_filters
            ? 'z-40 h-[8.5%] w-[95%] md:h-[17%] sm:h-[18%] lg:h-[24%] xl:h-[30.5%] max-w-sm bg-purple-100 p-4 rounded-lg border border-black shadow-lg'
            : 'display_none_filters'
        }
      >
        <div className="relative inset-0 pb-4 border-b border-purple-300">
          <h2 className="text-center text-xl font-bold text-purple-800">Filters</h2>
          <button
            onClick={() => contextGlobal.dispatch({ type: 'SET_FALSE_FILTERS' })}
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
              <span className="text-sm font-medium">Fashion</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={technology}
                onChange={(e) => setTechnology(e.target.checked)}
                className="form-checkbox border-purple-500 text-purple-500 focus:ring-purple-400"
              />
              <span className="text-sm font-medium">Tecnology</span>
            </label>
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <h3 className="text-center font-medium text-purple-800">Price</h3>
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

          {/* Marca */}
          <div className="space-y-2">
            <h3 className="font-medium text-purple-800">BRAND</h3>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-2 py-1 rounded bg-purple-200 text-purple-800"
            >
              <option value="" disabled>
                -- Select --
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
              Apply
            </button>
            <button
              onClick={handleClean}
              className="flex-1 border border-purple-500 text-purple-800 py-2 rounded hover:bg-purple-100"
            >
              Clean
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
