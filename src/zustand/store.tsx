import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity?: number;
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

interface ProductsState {
  shoppingCart: Cart[];
  products: Product[];
  selectedProduct: Product | null;
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
      shoppingCart: [],

      products: [],

      selectedProduct: null,

      setShoppingCart: (shoppingCart) => set({ shoppingCart }),

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
      name: 'shopping-cart-store', // Nombre en localStorage
      partialize: (state) => ({ shoppingCart: state.shoppingCart }) // Guardar solo el carrito
    }
  )
);

export default useStore;
