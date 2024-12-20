import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { stateProductsPagination } from '../utils/ObjectCategorys.tsx';

const ContextCardsGlobal = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);

  return {
    nextPage: (currentPage2: number) => {
      dispatch({ type: 'INCREMENT_PAGE' });
      if (state.page > currentPage2) {
        dispatch({ type: 'SET_CURRENTPAGE', payload: state.currentPage + 1 });
      }
    },

    previousPage: (currentPage2: number) => {
      dispatch({ type: 'DECREMENT_PAGE' });
      if (state.page < currentPage2) {
        dispatch({ type: 'SET_CURRENTPAGE', payload: state.currentPage - 1 });
      }
    },

    setCurrentPage: (currentPage: number) => {
      dispatch({ type: 'SET_PAGE', payload: currentPage });
    },

    firstPPage: () => {
      dispatch({ type: 'SET_PAGE', payload: state.firstPage });
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
    },

    lastPage: () => {
      dispatch({ type: 'SET_PAGE', payload: state.finalPage });
      dispatch({ type: 'SET_CURRENTPAGE', payload: state.finalPage - 3 });
    },

    stylePage: (currentPage: number) => {
      return state.page === currentPage
        ? 'px-3 py-1 rounded-lg text-white bg-[#8c52ff] hover:bg-[#8c52ff]/90'
        : 'px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border';
    },
    applyFilters: (category: string, minPrice: string, maxPrice: string, rating: string) => {
      navigate(`/products/${category}`)
      dispatch({ type: 'SET_FALSE_FILTERS' });
      dispatch({ type: 'SET_PAGE', payload: 1 });
      dispatch({ type: 'SET_CATEGORY', payload: category === '' ? null : category });
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
      dispatch({
        type: 'SET_FINALPAGE',
        payload: stateProductsPagination(category) === 0 ? 85 : stateProductsPagination(category)
      });
      dispatch({ type: 'SET_MINPRICE', payload: Number(minPrice) === 0 ? null : Number(minPrice) });
      dispatch({ type: 'SET_MAXPRICE', payload: Number(maxPrice) === 0 ? null : Number(maxPrice) });
      dispatch({ type: 'SET_RATING_ORDER', payload: rating });
    },

    allProducts: (rating: string) => {
      navigate('/products')
      dispatch({ type: 'SET_CATEGORY', payload: null });
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
      dispatch({ type: 'SET_PAGE', payload: 1 });
      dispatch({ type: 'SET_FINALPAGE', payload: 85 });
      dispatch({ type: 'SET_FALSE_FILTERS' });
      dispatch({ type: 'SET_MINPRICE', payload: null });
      dispatch({ type: 'SET_MAXPRICE', payload: null });
      dispatch({ type: 'SET_RATING_ORDER', payload: rating });
    }
  };
};

export default ContextCardsGlobal;
