import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserLogin } from '@/globalState/reducer.tsx';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
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

export interface Cart {
  id: number;
  title: string;
  price: number;
  stock: number;
  quantity: number;
  images: string;
}

export interface Favorite {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  images: string;
}

interface UserFavorites {
  [userId: string]: Favorite[];
}

interface ProductsState {
  favorites: UserFavorites;
  setFavorites: (userId: string, products: Favorite[]) => void;
  addToFavorite: (userId: string, product: Favorite) => void;
  removeFavorite: (userId: string, productId: number) => void;
  userLogin: UserLogin | null;
  shoppingCart: Cart[];
  products: Product[];
  selectedProduct: Product | null;
  setUserLogin: (userLogin: UserLogin | null) => void;
  setShoppingCart: (products: Cart[]) => void;
  addToCart: (product: Cart) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, quantity: number) => void;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
}

// Crear el store con Zustand
const useStore = create<ProductsState>()(
  persist(
    (set) => ({
      userLogin: null,

      setUserLogin: (userLogin) => set(() => ({ userLogin })),

      favorites: {},

      shoppingCart: [],

      products: [],

      selectedProduct: null,

      setShoppingCart: (shoppingCart) => set({ shoppingCart }),

      setFavorites: (userId, products) =>
        set((state) => ({
          favorites: { ...state.favorites, [userId]: products }
        })),

      // Agregar un producto al carrito
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.shoppingCart.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              shoppingCart: state.shoppingCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
              )
            };
          }

          return { shoppingCart: [...state.shoppingCart, product] };
        }),

      addToFavorite: (userId, product) =>
        set((state) => {
          const userFavorites = state.favorites[userId] || [];
          const updatedFavorites = [...userFavorites, product];

          return {
            favorites: { ...state.favorites, [userId]: updatedFavorites }
          };
        }),

      removeFavorite: (userId, productId) =>
        set((state) => {
          const userFavorites = state.favorites[userId] || [];
          const updatedFavorites = userFavorites.filter((item) => item.id !== productId);

          return {
            favorites: { ...state.favorites, [userId]: updatedFavorites }
          };
        }),

      // Eliminar un producto del carrito
      removeFromCart: (productId) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.filter((item) => item.id !== productId)
        })),

      clearCart: () => set({ shoppingCart: [] }),

      // Actualizar cantidad de un producto en el carrito
      updateCartItem: (productId, quantity) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
        })),

      setProducts: (products) => set({ products }),

      setSelectedProduct: (product) => set({ selectedProduct: product })
    }),
    {
      name: 'fashion&tecnology-storage', // Nombre en localStorage
      partialize: (state) => ({ shoppingCart: state.shoppingCart, favorites: state.favorites })
    }
  )
);

export default useStore;
