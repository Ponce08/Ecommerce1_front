import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';

export const Paginations = () => {
  const { state, dispatch } = useContext(GlobalContext);
  // const [page, setPage] = useState(state.currentPage);

  let currentPage1 = state.currentPage + 1;
  let currentPage2 = state.currentPage + 2;
  let currentPage3 = state.currentPage + 3;

  const nextPage = () => {
    dispatch({ type: 'INCREMENT_PAGE' });
    if (state.page > currentPage2) {
      dispatch({ type: 'SET_CURRENTPAGE', payload: state.currentPage + 1 });
    }
  };

  const previousPage = () => {
    dispatch({ type: 'DECREMENT_PAGE' });
    if (state.page < currentPage2) {
      dispatch({ type: 'SET_CURRENTPAGE', payload: state.currentPage - 1 });
    }
  };

  const setCurrentPage = (currentPage: number) => {
    dispatch({ type: 'SET_PAGE', payload: currentPage });
  };

  const lastPage = () => {
    dispatch({ type: 'SET_PAGE', payload: state.finalPage });
    dispatch({ type: 'SET_CURRENTPAGE', payload: state.finalPage - 3 });
  };

  const stylePage = (currentPage: number) => {
    return state.page === currentPage
      ? 'px-3 py-1 rounded-lg text-white bg-[#8c52ff] hover:bg-[#8c52ff]/90'
      : 'px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border';
  };

  useEffect(() => {
    if (state.page > 1 && state.currentPage === 0) {
      dispatch({ type: 'SET_CURRENTPAGE', payload: state.page - 1 });
    }
    if ([19, 20].includes(state.page)) {
      dispatch({ type: 'SET_CURRENTPAGE', payload: 17 });
    }
  }, [state.currentPage]);

  useEffect(() => {
    if (state.page === 1) {
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
    }
  }, [state.page]);

  return (
    <div className="bg-colorBackgroundMain p-4 shadow-sm">
      <nav className="flex items-center justify-center gap-2">
        {/* Botón de página anterior */}
        <button
          className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg"
          onClick={previousPage}
          disabled={state.page === 1}
        >
          <FiArrowLeft className="mr-1" />
          Previous
        </button>

        {/* Números de página */}
        <button className={stylePage(currentPage1)} onClick={() => setCurrentPage(currentPage1)}>
          {currentPage1}
        </button>
        <button className={stylePage(currentPage2)} onClick={() => setCurrentPage(currentPage2)}>
          {currentPage2}
        </button>

        <button className={stylePage(currentPage3)} onClick={() => setCurrentPage(currentPage3)}>
          {currentPage3}
        </button>

        {/* Elipsis */}
        <span className="px-3 py-1 text-gray-500">{currentPage3 === state.finalPage ? '' : '...'}</span>

        {currentPage3 === state.finalPage ? (
          ''
        ) : (
          <button
            className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border"
            onClick={lastPage}
          >
            {state.finalPage}
          </button>
        )}

        {/* Botón de página siguiente */}

        <button
          className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg"
          onClick={nextPage}
          disabled={state.page === 20}
        >
          Next
          <FiArrowRight className="ml-1" />
        </button>
      </nav>
    </div>
  );
};
