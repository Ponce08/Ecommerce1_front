import '../../components/Styles.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import img_header1 from '../imagenes/img_header1 .webp';
import icon_header1 from '../imagenes/shopping-cart-free-15-svgrepo-com.svg';
import { ShoppingCarts } from '../shoppingCart/ShoppingCarts.tsx';
import { BooleanContext } from '../shoppingCart/CartContext.tsx';
import { Categorys } from '../category/Categorys.tsx';

export const Header = () => {
  const showCart = useContext(BooleanContext);

  return (
    <>
      <div className="content_header_main">
        <Link to={'/'}>
          <img src={img_header1} alt="img_header1" />
        </Link>

        <div className="content_header_span">
          <Link to={'/'}>
            <span>HOME</span>
          </Link>
          <Link to={'/about'}>
            <span>ABOUT</span>
          </Link>
          {showCart?.isTrue_category ? <Categorys /> : ''}
          <span onClick={() => showCart?.setIsTrue_category(true)}>CATEGORY</span>
          <Link to={'/login'}>
            <span>LOGIN</span>
          </Link>
          {showCart?.isTrue ? <ShoppingCarts /> : ''}
          <img src={icon_header1} alt="icon_header1" onClick={() => showCart?.setIsTrue(true)} />
        </div>
      </div>
    </>
  );
};
