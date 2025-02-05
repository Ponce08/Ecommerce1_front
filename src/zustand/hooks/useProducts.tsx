// import { GET_PRODUCTS } from '../graphql/querys.tsx';

import { useContext, useEffect, useState } from 'react';
import useStore from '../store.tsx';
import { supabase } from '@/supabaseClient/supabaseClient.tsx';
import { PostgrestError } from '@supabase/supabase-js';
import { GlobalContext } from '@/globalState/GlobalContext.tsx';
import { getTotalProducts } from '@/utils/ContextCardsGlobal.tsx';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const setProducts = useStore((state) => state.setProducts);
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const numberTotal = Math.ceil((await getTotalProducts()) / 12);
      let query = supabase.from('products').select('*', { count: 'exact' });

      if (category) {
        query = query.eq('category', category);
      }
      if (priceMin !== null) {
        query = query.gte('price', priceMin);
      }
      if (priceMax !== null) {
        query = query.lte('price', priceMax);
      }
      if (ratingOrder === 'upward') {
        query = query.order('rating', { ascending: true });
      } else if (ratingOrder === 'falling') {
        query = query.order('rating', { ascending: false });
      }

      const pageSize = 12; // Define el tamaño de página
      query = query.range((page - 1) * pageSize, page * pageSize - 1);

      const { data, count, error } = await query;

      if (error) {
        setError(error);
      } else {
        setProducts(data);
        dispatch({ type: 'SET_FINALPAGE', payload: count ? Math.ceil(count / 12) : numberTotal });
        setTotalCount(count || 0);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page, category, priceMin, priceMax, ratingOrder, setProducts]);

  return { products: useStore((state) => state.products), totalCount, loading, error };
};
