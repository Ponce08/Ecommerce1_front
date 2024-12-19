import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import ContextCardsGlobal from './ContextCardsGlobal.tsx';
import useStore from '../zustand/store.tsx';

export const Paginations = () => {
  const { products } = useStore((state) => state);
  const { nextPage, previousPage, setCurrentPage, firstPPage, lastPage, stylePage } = ContextCardsGlobal();
  const { state, dispatch } = useContext(GlobalContext);

  let currentPage1 = state.currentPage + 1;
  let currentPage2 = state.currentPage + 2;
  let currentPage3 = state.currentPage + 3;

  useEffect(() => {
    return () => {
      dispatch({ type: 'SET_CATEGORY', payload: null });
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
      dispatch({ type: 'SET_PAGE', payload: 1 });
      dispatch({ type: 'SET_FINALPAGE', payload: 85 });
    };
  }, []);

  return (
    <div className="bg-colorBackgroundMain p-4 shadow-sm">
      <nav className="flex items-center justify-center gap-2">
        {/* Botón de página anterior */}
        <button
          className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg"
          onClick={() => previousPage(currentPage2)}
          disabled={state.page === 1}
        >
          <FiArrowLeft className="mr-1" />
          Previous
        </button>
        {/* Elipsis */}

        {!(currentPage1 === state.firstPage) && (
          <button
            className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border"
            onClick={firstPPage}
          >
            {state.firstPage}
          </button>
        )}
        <span className="px-3 py-1 text-gray-500">{!(currentPage1 === state.firstPage) && '...'}</span>
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

        {/* Elipsis 2 */}
        <span className="px-3 py-1 text-gray-500">{!(currentPage3 === state.finalPage) && '...'}</span>

        {!(currentPage3 === state.finalPage) && (
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
          onClick={() => nextPage(currentPage2)}
          disabled={state.page === state.finalPage || products.length < 12}
        >
          Next
          <FiArrowRight className="ml-1" />
        </button>
      </nav>
    </div>
  );
};
