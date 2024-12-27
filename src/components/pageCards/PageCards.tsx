import { Footer } from '../header&footer/Footer.tsx';
import { useContext } from 'react';
import { Header } from '../header&footer/Header.tsx';
import { Cards } from './Cards.tsx';
import { Paginations } from './Paginations.tsx';
import { useProducts } from '../zustand/store.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import useStore from '../zustand/store.tsx';

export const PageCards = () => {
  const { state } = useContext(GlobalContext);

  const { page, category } = state;

  const { error } = useProducts({ page, category });
  
  const { products } = useStore();

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
