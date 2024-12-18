import { create } from 'zustand';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy?: string;
  minimumOrderQuantity: number;
  meta: { createdAt: string; updatedAt: string; barcode: string; qrCode: string };
  images: string[];
  thumbnail: string;
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
  query GetProducts($page: Int, $category: String, $priceMin: Float, $priceMax: Float, $ratingOrder: String) {
    products(page: $page, category: $category, priceMin: $priceMin, priceMax: $priceMax, ratingOrder: $ratingOrder) {
      id
      title
      images
      category
      price
      rating
    }
  }
`;

export const useProducts = (
  page: number,
  category: string | null,
  priceMin: number | null = null,
  priceMax: number | null = null,
  ratingOrder: 'asc' | 'desc' | null = null
) => {
  // Llamar al resolver con todas las variables
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page, category }
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
