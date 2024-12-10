import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';
import { Cards } from './Cards.tsx';
// import { Filters } from './Filters.tsx';
import { Paginations } from './Paginations.tsx';

export const PageCards = () => {
  return (
    <>
      <Header />
      <Cards />
      <Paginations />
      <Footer />
      {/* <Filters /> */}
    </>
  );
};
