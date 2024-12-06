import '../Styles.css';
import { useContext } from 'react';
import { BooleanContext } from '../shoppingCart/CartContext.tsx';

export function Categorys() {
  const showCategory = useContext(BooleanContext);
  return (
    <div
      className={
        showCategory?.isTrue_category
          ? 'content_Categorys z-10 fixed'
          : 'display_none_category'
      }
    >
      <h1 className="font-semibold">Categorys</h1>
      <div className="content_a">
        <div className="content_Category_column">
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            ponce
          </a>
        </div>
        <div className="content_Category_column">
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            julieta
          </a>
        </div>
        <div className="content_Category_column">
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
          <a href="" className="text-gray-600 hover:text-black">
            leydy
          </a>
        </div>
      </div>
      <div className="content_Category_img">
        <div className="hover:opacity-75 content_category_img2">
          <img src="src/components/imagenes/pexels-life-of-pix-7974.webp" alt="" className="rounded-lg" />
          <h3 className="font-semibold mt-5">New Arrivals</h3>
          <a href="" className="text-gray-600 hover:text-black">
            comprar
          </a>
        </div>
        <div className="hover:opacity-75 content_category_img2">
          <img src="src/components/imagenes/pexels-fauxels-3184405.webp" alt="" className="rounded-lg" />
          <h3 className="font-semibold mt-5">New Arrivals</h3>
          <a href="" className="text-gray-600 hover:text-black">
            comprar
          </a>
        </div>
      </div>
    </div>
  );
}
