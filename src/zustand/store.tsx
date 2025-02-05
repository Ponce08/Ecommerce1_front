import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserLogin } from '@/globalState/reducer.tsx';
import { supabase } from '@/supabaseClient/supabaseClient.tsx';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  stock: number;
  brand: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  images: string[];
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
  listenToFavorites: (userId: string) => void;
  unsubscribeFromFavorites: () => void;
  subscription?: RealtimeChannel | null;
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
    (set, get) => ({
      userLogin: null,

      favorites: {},

      shoppingCart: [],

      products: [],

      selectedProduct: null,

      setShoppingCart: (shoppingCart) => set({ shoppingCart }),

      // Iniciar sesión y cargar favoritos desde Supabase
      setUserLogin: async (userLogin) => {
        set({ userLogin });
        if (userLogin) {
          const { data, error } = await supabase.from('favorites').select('*').eq('user_id', userLogin.id);

          if (error) {
            console.error('Error cargando favoritos:', error);
            return;
          }

          const favorites = data.map((item) => ({
            id: item.product_id,
            ...item.product_data
          }));

          set({ favorites: { ...get().favorites, [userLogin.id]: favorites } });
        }
      },

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

      // Agregar un producto a favoritos
      addToFavorite: async (userId, product) => {
        const { id, ...productData } = product;

        // Agregar al estado local
        set((state) => {
          const userFavorites = state.favorites[userId] || [];
          const updatedFavorites = [...userFavorites, product];

          return {
            favorites: { ...state.favorites, [userId]: updatedFavorites }
          };
        });

        // Guardar en Supabase
        const { error } = await supabase.from('favorites').insert({
          user_id: userId,
          product_id: id,
          product_data: productData
        });

        if (error) {
          console.error('Error agregando a favoritos:', error);
        }
      },

      // Eliminar un producto de favoritos
      removeFavorite: async (userId, productId) => {
        // Eliminar del estado local
        set((state) => {
          const userFavorites = state.favorites[userId] || [];
          const updatedFavorites = userFavorites.filter((item) => item.id !== productId);

          return {
            favorites: { ...state.favorites, [userId]: updatedFavorites }
          };
        });

        // Eliminar de Supabase
        const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('product_id', productId);

        if (error) {
          console.error('Error eliminando de favoritos:', error);
        }
      },

      // Escuchar cambios en tiempo real desde Supabase
      listenToFavorites: (userId) => {
        const subscription = supabase
          .channel('favorites')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'favorites', filter: `user_id=eq.${userId}` },
            (payload) => {
              // Actualiza el estado local con el nuevo favorito
              set((state) => ({
                favorites: {
                  ...state.favorites,
                  [payload.new.product_id]: payload.new.product_data
                }
              }));
            }
          )
          .on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'favorites', filter: `user_id=eq.${userId}` },
            (payload) => {
              // Actualiza el estado local eliminando el favorito
              set((state) => {
                const { [payload.old.product_id]: _, ...remainingFavorites } = state.favorites;
                return { favorites: remainingFavorites };
              });
            }
          )
          .subscribe();

        return subscription;
      },

      // Detener la suscripción a favoritos
      unsubscribeFromFavorites: () => {
        const subscription = get().subscription;
        if (subscription) {
          supabase.removeChannel(subscription);
          set({ subscription: null });
        }
      },

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
      partialize: (state) => ({ userLogin: state.userLogin, shoppingCart: state.shoppingCart, favorites: state.favorites })
    }
  )
);

export default useStore;
