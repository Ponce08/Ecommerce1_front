import useStore from '../zustand/store.tsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FunctionsDetails = () => {
  const { selectedProduct, addToCart } = useStore();
  const navigate = useNavigate();

  return {
    addCart: (quantity: number) => {
      if (!selectedProduct) {
        console.error('No product selected');
        return; // Salir si no hay producto seleccionado
      }
      addToCart({
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        quantity,
        images: selectedProduct.images[0]
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
    handleBack: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate(-1);
    },
    handleImageLoad: (
      id: number,
      setLoadedImages: (updater: (prev: Record<number, boolean>) => Record<number, boolean>) => void
    ) => {
      setLoadedImages((prev) => ({ ...prev, [id]: true }));
    },
    reviewsFunction: (e: { preventDefault: () => void }, setShowReviews: (updater: (prev: boolean) => boolean) => void) => {
      e.preventDefault();

      setShowReviews((prev) => {
        const newState = !prev;

        if (newState) {
          // Si se activan las reseñas, hacer scroll a la sección
          setTimeout(() => {
            document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          // Si se ocultan, hacer scroll al inicio
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        return newState;
      });
    }
  };
};

export default FunctionsDetails;
