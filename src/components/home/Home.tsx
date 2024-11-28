import './Home.css';
import img_home1 from '../../imagenes/img_home1.webp';
import img_home2 from '../../imagenes/img_home2.webp';
import { Header } from '../header/Header.tsx';
import Footer from '../footer/Footer.tsx';

// type Props = {

// };
export const Home = () => {
  return (
    <>
      <Header />
      <div className="content_img_home">
        <img src={img_home1} alt="img_home1" />
        <img src={img_home2} alt="img_home2" />
      </div>
      <Footer />
    </>
  );
};
