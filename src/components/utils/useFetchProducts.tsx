import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      images
    }
  }
`;

const useFetchProducts = () => {
  const productContext = useContext(GlobalContext);
  if (!productContext) {
    throw new Error('ProductContext is not available.');
  }

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    onCompleted: (data) => {
      productContext.dispatch({ type: 'GET_PRODUCTS', payload: data.products });
    }
  });

  return { loading, error, data };
};

export default useFetchProducts;
