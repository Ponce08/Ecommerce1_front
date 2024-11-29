import './Home.css';

import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import { Seccion1 } from './Seccion1.tsx';
import { Seccion2 } from './Seccion2.tsx';
import { Seccion3 } from './Seccion3.tsx';
import { Seccion4 } from './Seccion4.tsx';

export const Home = () => {
  return (
    <>
      <Header />
      <Seccion1 />
      <Seccion4 />
      <Seccion2 />
      <Seccion3 />
      <Footer />
    </>
  );
};
