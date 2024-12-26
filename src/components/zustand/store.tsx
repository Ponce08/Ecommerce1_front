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
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
}

// Crear el store con Zustand
const useStore = create<ProductsState>((set) => ({
  products: [],
  selectedProduct: null,
  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product })
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
  params: Partial<{
    page: number;
    category: string | null;
    priceMin: number | null;
    priceMax: number | null;
    ratingOrder: 'upward' | 'falling' | string;
  }> = {}
) => {
  const {
    page = 1, // Valor por defecto
    category = null,
    priceMin = null,
    priceMax = null,
    ratingOrder = ''
  } = params;

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

// Query de Apollo para obtener productos por ID
const GET_PRODUCTS_BY_ID = gql`
  query GetProductById($id: Int!) {
    getProductById(id: $id) {
      id
      title
      description
      price
      category
      rating
      stock
      reviews {
        comment
        reviewerName
        reviewerEmail
        rating
      }
      images
    }
  }
`;

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
export default useStore;
