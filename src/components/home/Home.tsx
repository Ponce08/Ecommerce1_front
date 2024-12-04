import '../Styles.css';

import { Header } from '../header&footer/Header.tsx';
import { Footer } from '../header&footer/Footer.tsx';
import { Seccion1 } from './Seccion1.tsx';
import { Seccion2 } from './Seccion2.tsx';
import { Seccion3 } from './Seccion3.tsx';
import { Seccion4 } from './Seccion4.tsx';
import { ShoppingCarts } from './ShoppingCarts.tsx';

export const Home = () => {
  return (
    <>
      {/* <Header />
      <Seccion1 />
      <Seccion2 />
      <Seccion4 />
      <Seccion3 />
      <Footer /> */}
      <ShoppingCarts />
    </>
  );
};
