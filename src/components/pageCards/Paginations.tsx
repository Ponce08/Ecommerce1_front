import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      images
    }
  }
`;

export const allProducts = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  return {
    loading,
    error,
    data
  };
};

export const Paginations = () => {

  return (
    <div className="bg-colorBackgroundMain p-4 shadow-sm">
      <nav className="flex items-center justify-center gap-2">
        {/* Botón de página anterior */}
        <a href="#" className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg">
          <FiArrowLeft className="mr-1" />
          Previous
        </a>

        {/* Números de página */}
        <a href="#" className="px-3 py-1 rounded-lg text-white bg-[#8c52ff] hover:bg-[#8c52ff]/90">
          1
        </a>
        <a href="#" className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border">
          2
        </a>
        <a href="#" className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border">
          3
        </a>

        {/* Elipsis */}
        <span className="px-3 py-1 text-gray-500">...</span>

        <a href="#" className="px-3 py-1 rounded-lg text-gray-700 hover:text-[#8c52ff] hover:border-[#8c52ff] border">
          20
        </a>

        {/* Botón de página siguiente */}
        <a href="#" className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg">
          Next
          <FiArrowRight className="ml-1" />
        </a>
      </nav>
    </div>
  );
};
