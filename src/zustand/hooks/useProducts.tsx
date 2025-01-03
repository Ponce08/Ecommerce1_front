import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import useStore from '../store.tsx';
import { GET_PRODUCTS } from '../graphql/querys.tsx';

export const useProducts = (
  params: Partial<{
    page: number;
    category: string | null;
    priceMin: number | null;
    priceMax: number | null;
    ratingOrder: 'upward' | 'falling' | string;
  }> = {}
) => {
  const { page = 1, category = null, priceMin = null, priceMax = null, ratingOrder = '' } = params;

  // Llamar al resolver con todas las variables
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page, category, priceMin, priceMax, ratingOrder }
  });

  const setProducts = useStore((state) => state.setProducts);

  // Sincronizar datos de Apollo con Zustand
  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data, setProducts]);

  return { products: useStore((state) => state.products), loading, error };
};
