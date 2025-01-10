import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollPolicies = () => {
  const location = useLocation();
  useEffect(() => {
    const handleScrollToHash = () => {
      if (location.hash) {
        const elementId = location.hash.replace('#', '');
        const element = document.getElementById(elementId);

        if (element) {
          // Ajusta manualmente el desplazamiento (p. ej., para compensar un header fijo)
          const offset = 110; // Altura del header fijo o desfase deseado
          const elementPosition = element.getBoundingClientRect().top; // Posición del elemento relativa a la ventana
          const scrollPosition = window.scrollY + elementPosition - offset;

          // Aplica el ajuste
          window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
      }
    };

    // Llama a la función inmediatamente después de renderizar el componente
    handleScrollToHash();

    // Escucha cambios en el hash de la URL
    window.addEventListener('hashchange', handleScrollToHash);

    return () => {
      // Limpia el listener para evitar fugas de memoria
      window.removeEventListener('hashchange', handleScrollToHash);
    };
  }, [location]);
};
