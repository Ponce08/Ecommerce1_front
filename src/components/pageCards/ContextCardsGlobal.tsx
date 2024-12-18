import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { useContext } from 'react';

const ContextCardsGlobal = () => {
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
    }
  };
};

export default ContextCardsGlobal;
