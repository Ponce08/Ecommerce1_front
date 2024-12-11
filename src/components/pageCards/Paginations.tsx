import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';

export const Paginations = () => {
  const contextGlobal = useContext(GlobalContext);
  return (
    <div className="bg-colorBackgroundMain p-4 shadow-sm">
      <nav className="flex items-center justify-center gap-2">
        {/* Botón de página anterior */}
        <button
          className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg"
          onClick={() => contextGlobal?.setPage((prev) => Math.max(prev - 1, 1))}
          disabled={contextGlobal?.page === 1}
        >
          <FiArrowLeft className="mr-1" />
          Previous
        </button>

        {/* Números de página */}
        <button className="px-3 py-1 rounded-lg text-white bg-[#8c52ff] hover:bg-[#8c52ff]/90">1</button>
        <button className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border">2</button>
        <button className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border">3</button>

        {/* Elipsis */}
        <span className="px-3 py-1 text-gray-500">...</span>

        <button className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border">20</button>

        {/* Botón de página siguiente */}
        <button
          className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg"
          onClick={() => contextGlobal?.setPage((prev) => prev + 1)}
        >
          Next
          <FiArrowRight className="ml-1" />
        </button>
      </nav>
    </div>
  );
};
