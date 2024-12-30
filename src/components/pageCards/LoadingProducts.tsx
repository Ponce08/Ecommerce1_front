import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';

export const LoadingProducts = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-purple-500 animate-spin"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};
