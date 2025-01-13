import { GlobalContext } from '../globalState/GlobalContext.tsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { stateProductsPagination } from './ObjectCategorys.tsx';
import useStore from '../zustand/store.tsx';
import Swal from 'sweetalert2';

const ContextCardsGlobal = () => {
  const navigate = useNavigate();
  const { addToCart, favorites, addToFavorite, removeFavorite } = useStore();
  const { state, dispatch } = useContext(GlobalContext);
  const token = localStorage.getItem('token');

  return {
    classNames: (...classes: string[]) => {
      return classes.filter(Boolean).join(' ');
    },
    handleImageLoad: (
      id: number,
      setLoadedImages: (updater: (prev: Record<number, boolean>) => Record<number, boolean>) => void
    ) => {
      setLoadedImages((prev) => ({ ...prev, [id]: true }));
    },
    addCart: (id: number, title: string, price: number, stock: number, images: string) => {
      addToCart({
        id,
        title,
        price,
        stock,
        quantity: 1,
        images
      });

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Product added to cart',
        customClass: {
          timerProgressBar: 'custom-progress-bar'
        }
      });
    },
    addFavorite: (id: number, title: string, price: number, stock: number, rating: number, images: string) => {
      const existingItem = favorites.find((item) => item.id === id);

      if (!token) {
        Swal.fire({
          title: 'Please log in',
          icon: 'warning',
          customClass: {
            confirmButton: 'bg-purple-600'
          }
        });
        navigate('/login');
        return;
      }

      if (existingItem) {
        return removeFavorite(id);
      }
      addToFavorite({
        id,
        title,
        price,
        stock,
        rating,
        images
      });

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Product added to Favorites',
        customClass: {
          timerProgressBar: 'custom-progress-bar'
        }
      });
    },

    animationHeart: (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      target.classList.add('animate-scale');

      setTimeout(() => {
        target.classList.remove('animate-scale');
      }, 300);
    },

    nextPage: (currentPage2: number) => {
      dispatch({ type: 'INCREMENT_PAGE' });
      if (state.page > currentPage2) {
        dispatch({ type: 'SET_CURRENTPAGE', payload: state.currentPage + 1 });
      }
      window.scrollTo(0, 0);
    },

    previousPage: (currentPage2: number) => {
      dispatch({ type: 'DECREMENT_PAGE' });
      if (state.page < currentPage2) {
        dispatch({ type: 'SET_CURRENTPAGE', payload: state.currentPage - 1 });
      }
      window.scrollTo(0, 0);
    },

    setCurrentPage: (currentPage: number) => {
      dispatch({ type: 'SET_PAGE', payload: currentPage });
      window.scrollTo(0, 0);
    },

    firstPPage: () => {
      dispatch({ type: 'SET_PAGE', payload: state.firstPage });
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
      window.scrollTo(0, 0);
    },

    lastPage: () => {
      dispatch({ type: 'SET_PAGE', payload: state.finalPage });
      dispatch({ type: 'SET_CURRENTPAGE', payload: state.finalPage - 3 });
      window.scrollTo(0, 0);
    },

    stylePage: (currentPage: number) => {
      return state.page === currentPage
        ? 'px-3 py-1 rounded-lg text-xs xs:text-[10px] xs:px-2 lg:text-lg text-white bg-[#8c52ff] hover:bg-[#8c52ff]/90'
        : 'px-3 py-1 rounded-lg text-gray-700 text-xs xs:text-[10px] xs:px-2 lg:text-lg hover:text-[#8c52ff] hover:border-[#8c52ff] border';
    },
    applyFilters: (category: string, minPrice: string, maxPrice: string, rating: string) => {
      const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
      navigate(`/products/${normalizedCategory}`);
      dispatch({ type: 'SET_FALSE_FILTERS' });
      dispatch({ type: 'SET_PAGE', payload: 1 });
      dispatch({ type: 'SET_CATEGORY', payload: category === '' ? null : normalizedCategory });
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
      dispatch({
        type: 'SET_FINALPAGE',
        payload: stateProductsPagination(category) === 0 ? 85 : stateProductsPagination(category)
      });
      dispatch({ type: 'SET_MINPRICE', payload: Number(minPrice) === 0 ? null : Number(minPrice) });
      dispatch({ type: 'SET_MAXPRICE', payload: Number(maxPrice) === 0 ? null : Number(maxPrice) });
      dispatch({ type: 'SET_RATING_ORDER', payload: rating });
    },

    allProducts: (rating: string) => {
      navigate('/products');
      dispatch({ type: 'SET_CATEGORY', payload: null });
      dispatch({ type: 'SET_CURRENTPAGE', payload: 0 });
      dispatch({ type: 'SET_PAGE', payload: 1 });
      dispatch({ type: 'SET_FINALPAGE', payload: 85 });
      dispatch({ type: 'SET_FALSE_FILTERS' });
      dispatch({ type: 'SET_MINPRICE', payload: null });
      dispatch({ type: 'SET_MAXPRICE', payload: null });
      dispatch({ type: 'SET_RATING_ORDER', payload: rating });
    }
  };
};

export type Products = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  images: string[];
};

export type FavoriteCard = {
  id: number;
  title: string;
  price: number;
  stock: number;
  rating: number;
  images: string;
};

export default ContextCardsGlobal;
