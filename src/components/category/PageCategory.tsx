import { Header } from '../header&footer/Header.tsx';
import { Paginations } from '../pageCards/Paginations.tsx';
import { Footer } from '../header&footer/Footer.tsx';
import { CardsCategory } from './CardsCategory.tsx';
import { useProducts } from '../zustand/store.tsx';
import { ErrorPage } from '../pageCards/ErrorPage.tsx';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';

import useStore from '../zustand/store.tsx';

export const PageCategory = () => {
  const { state } = useContext(GlobalContext);

  const { categorys } = useParams();

  const { error } = useProducts({ page: state.page, category: categorys });

  const { products } = useStore();

  if (error) return <ErrorPage messageError={error.message} />;

  return (
    <>
      <Header />
      <CardsCategory />
      {products.length !== 0 && <Paginations />}
      <Footer />
    </>
  );
};
