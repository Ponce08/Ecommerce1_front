import '../Styles.css';
import { useContext } from 'react';
import { X, Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import useStore from '../../zustand/store.tsx';

export const ShoppingCarts = () => {
  const contextGlobal = useContext(GlobalContext);
  const { shoppingCart, removeFromCart, updateCartItem } = useStore();

  const total = shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = parseFloat(total.toFixed(2));

  return (
    <div
      className={
        contextGlobal.state.isTrue
          ? 'z-10 fixed inset-0 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center'
          : 'display_none'
      }
    >
      <div className="w-[400px] bg-white rounded-lg shadow-lg flex flex-col class_transition_cart">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
          </div>
          <button className="text-gray-500 hover:text-black" onClick={() => contextGlobal.dispatch({ type: 'SET_FALSE' })}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto p-4 space-y-4 cart-items">
          {shoppingCart.length === 0 ? (
            <p className="text-center font-bold">Empty cart 😅</p>
          ) : (
            shoppingCart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-4 border-b pb-4">
                <img src={item.images} alt={item.title} className="w-20 h-20 rounded-lg bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center"
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center bg-gray-100 rounded-lg">{item.quantity}</div>
                    <button
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center"
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.price}</div>
                  <button className="text-red-500 hover:text-red-700 mt-2" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total:</span>
            <span>${formattedTotal}</span>
          </div>
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mb-2"
            disabled={shoppingCart.length === 0}
          >
            Finish
          </button>
          <button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg"
            onClick={() => contextGlobal.dispatch({ type: 'SET_FALSE' })}
          >
            Keep Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
