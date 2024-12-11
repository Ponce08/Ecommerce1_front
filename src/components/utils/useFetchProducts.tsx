import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';

const GET_PRODUCTS = gql`
  query GetProducts($page: Int) {
    products(page: $page) {
      id
      title
      images
    }
  }
`;

const useFetchProducts = (page: number | undefined) => {
  const productContext = useContext(GlobalContext);
  if (!productContext) {
    throw new Error('ProductContext is not available.');
  }

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { page },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.products) {
        productContext.dispatch({ type: 'GET_PRODUCTS', payload: data.products });
      } else {
        console.warn('No products found');
      }
    }
  });
  console.log('FetchProducts - page:', page);
  console.log('FetchProducts - data:', data);
  console.log('FetchProducts - loading:', loading);
  console.log('FetchProducts - error:', error);

  return { loading, error, data };
};

export default useFetchProducts;
