import './Home.css';
// import img_home1 from '../../imagenes/img_home1.webp';
// import img_home2 from '../../imagenes/img_home2.webp';
// import img_home3 from '../../imagenes/img_home3.webp';
// import img_home4 from '../../imagenes/img_home3-removebg-preview.webp';

import { Header } from './header/Header.tsx';
import { Footer } from './footer/Footer.tsx';
import { Seccion } from './Seccion.tsx';
import { Seccion2 } from './SeccionImage.tsx';

export const Home = () => {
  return (
    <>
      <Header />
      <Seccion />
      <Seccion2 />
      <Footer />
    </>
  );
};

{
  /* <div className="content_img_home2"><img className="img_home2" src={img_home2} alt="img_home2" /></div> */
}

{
  /* <div className="content_img_home1">
  <img className="img_home3" src={img_home3} alt="img_home3" />
  <img className="img_home4" src={img_home4} alt="img_home4" />
  <img className="img_home1" src={img_home1} alt="img_home1" />
</div> */
}
