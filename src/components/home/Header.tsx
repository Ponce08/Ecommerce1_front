import './Home.css';
import img_header1 from '../imagenes/img_header1 .webp';
import icon_header1 from '../imagenes/shopping-cart-free-15-svgrepo-com.svg';

export const Header = () => {
  return (
    <>
      <div className="content_header_main">
        <img src={img_header1} alt="img_header1" />
        <div className="content_header_span">
          <span>HOME</span>
          <span>ABOUT</span>
          <span>CATEGORY</span>
          <span>LOGIN</span>
          <img src={icon_header1} alt="icon_header1" />
        </div>
      </div>
    </>
  );
};
