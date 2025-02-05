// import { useQuery } from '@apollo/client';
// import { GET_PRODUCTS_BY_ID } from '../graphql/querys.tsx';

import { useEffect, useState } from 'react';
import useStore from '../store.tsx';
import { supabase } from '@/supabaseClient/supabaseClient.tsx';

export const useProductsById = (id: number | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setProduct = useStore((state) => state.setSelectedProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

      if (error) {
        setError(error.message);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, setProduct]);

  return { selectedProduct: useStore((state) => state.selectedProduct), loading, error };
};
