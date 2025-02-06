import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import ContextCardsGlobal from '../../utils/ContextCardsGlobal.tsx';
import useStore from '../../zustand/store.tsx';

type TotalCount = {
  totalCount: number;
};

export const Paginations = ({ totalCount }: TotalCount) => {
  const { products } = useStore((state) => state);

  const { nextPage, previousPage, setCurrentPage, firstPPage, lastPage, stylePage } = ContextCardsGlobal();

  const { state } = useContext(GlobalContext);

  let currentPage1 = state.currentPage + 1;
  let currentPage2 = state.currentPage + 2;
  let currentPage3 = state.currentPage + 3;

  return (
    <div className="bg-colorBackgroundMain p-4 shadow-sm">
      <nav className="flex items-center justify-center gap-2">
        {/* Botón de página anterior */}
        <button
          className="flex items-center text-gray-500 xs:text-[10px] text-xs lg:text-lg hover:text-purple-600 hover:font-bold px-2 py-1 rounded-lg"
          onClick={() => previousPage(currentPage2)}
          disabled={state.page === 1}
        >
          <FiArrowLeft className="mr-1" />
          Previous
        </button>
        {/* Elipsis */}

        {!(currentPage1 === state.firstPage) && (
          <button
            className="xs:text-[10px] xs:px-2 text-xs lg:text-lg px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border"
            onClick={firstPPage}
          >
            {state.firstPage}
          </button>
        )}
        <span className="px-1 py-1 text-gray-500">{!(currentPage1 === state.firstPage) && '...'}</span>
        {/* Números de página */}
        <button className={stylePage(currentPage1)} onClick={() => setCurrentPage(currentPage1)}>
          {currentPage1}
        </button>

        {!(totalCount <= 12) && (
          <button className={stylePage(currentPage2)} onClick={() => setCurrentPage(currentPage2)}>
            {currentPage2}
          </button>
        )}

        {!(state.finalPage < currentPage3) && (
          <button className={stylePage(currentPage3)} onClick={() => setCurrentPage(currentPage3)}>
            {currentPage3}
          </button>
        )}

        {/* Elipsis 2 */}
        <span className="px-1 py-1 text-gray-500">{!(totalCount <= 12) && !(state.finalPage < currentPage3) && '...'}</span>

        {!(currentPage3 === state.finalPage || state.finalPage < currentPage3) && (
          <button
            className="xs:text-[10px] xs:px-1 text-xs lg:text-lg px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border"
            onClick={lastPage}
          >
            {state.finalPage}
          </button>
        )}

        {/* Botón de página siguiente */}

        <button
          className="flex items-center text-gray-500 xs:text-[10px] text-xs lg:text-lg hover:text-purple-600 hover:font-bold px-2 py-1 rounded-lg"
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
