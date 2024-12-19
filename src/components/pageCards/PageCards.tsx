import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';
import { Cards } from './Cards.tsx';
import { Paginations } from './Paginations.tsx';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { useProducts } from '../zustand/store.tsx';
import { ErrorPage } from './ErrorPage.tsx';

export const PageCards = () => {
  const { state } = useContext(GlobalContext);
  const { page, category, priceMin, priceMax, ratingOrder } = state;

  const { products, error } = useProducts(page, category, priceMin, priceMax, ratingOrder);

  if (error) return <ErrorPage messageError={error.message} />;

  return (
    <>
      <Header />
      <Cards />
      {products.length !== 0 && <Paginations />}
      <Footer />
    </>
  );
};
