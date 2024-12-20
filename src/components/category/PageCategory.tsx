import { Header } from '../header&footer/Header.tsx';
import { Paginations } from '../pageCards/Paginations.tsx';
import { Footer } from '../header&footer/Footer.tsx';
import { CardsCategory } from './CardsCategory.tsx';

export const PageCategory = () => {
  return (
    <>
      <Header />
      <CardsCategory />
      <Paginations />
      <Footer />
    </>
  );
};
