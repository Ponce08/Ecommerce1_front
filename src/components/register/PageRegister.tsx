import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';
import { RegisterForm } from './RegisterForm.tsx';

export const PageRegister = () => {
  return (
    <>
      <Header />
      <RegisterForm />
      <Footer />
    </>
  );
};
