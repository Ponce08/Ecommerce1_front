import { create } from 'zustand';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

interface Product {
  id: number;
  title: string;
  
  images: string[];
}

interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

// Crear el store con Zustand
const useStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products })
}));

// Query de Apollo para obtener productos
const GET_PRODUCTS = gql`
  query GetProducts($page: Int) {
    products(page: $page) {
      id
      title
      images
    }
  }
`;

// Hook personalizado para sincronizar Apollo con Zustand
export const useProducts = (page: number) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page }
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

export default useStore;
