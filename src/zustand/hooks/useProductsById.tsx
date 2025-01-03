import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import useStore from '../store.tsx';
import { GET_PRODUCTS_BY_ID } from '../graphql/querys.tsx';

export const useProductsById = (id: number | null) => {
  // Llamar al resolver con todas las variables
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { id }
  });

  const setProduct = useStore((state) => state.setSelectedProduct);

  // Sincronizar datos de Apollo con Zustand
  useEffect(() => {
    if (data?.getProductById) {
      setProduct(data.getProductById);
    }
  }, [data, setProduct]);

  return { selectedProduct: useStore((state) => state.selectedProduct), loading, error };
};
