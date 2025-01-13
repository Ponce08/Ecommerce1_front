import { useEffect, useRef } from 'react';

const SectionRef = (value: number) => {
  const targetSectionRef = useRef<HTMLDivElement | null>(null);

  const HEADER_HEIGHT = value; // Ajusta según la altura de tu header fijo

  useEffect(() => {
    if (targetSectionRef.current) {
      // Obtener la posición del elemento
      const sectionTop = targetSectionRef.current.getBoundingClientRect().top;
      const scrollPosition = window.scrollY + sectionTop - HEADER_HEIGHT;

      // Desplazar el scroll con el desfase calculado
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }, []); // [] asegura que esto solo ocurra al cargar la página

  return targetSectionRef;
};

export default SectionRef;
