import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store.tsx';
import Swal from 'sweetalert2';

export const FinishShopping = () => {
  const { shoppingCart } = useStore();

  const total = shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = parseFloat(total.toFixed(2));

  const navigate = useNavigate();
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  const inProcess = () => {
    Swal.fire({
      title: 'Mil disculpas!!😅',
      text: 'Aun estamos trabajando en estas funcionalidades',
      icon: 'warning',
      customClass: {
        confirmButton: 'bg-purple-600'
      }
    });
  };
  return (
    <>
      <Header />
      <div className="h-auto bg-colorBackgroundMain p-4 md:p-6 md:pb-32 mt-[100px]">
        <div className="max-w-4xl mx-auto bg-[#d1c1fd] rounded-lg p-6">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 text-xl font-semibold">
              <h1>FINISH SHOPPING</h1>
              <ShoppingCart className="w-5 h-5" />
            </div>

            {/* Form Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { id: 'name', label: 'Name' },
                { id: 'lastname', label: 'Lastname' },
                { id: 'email', label: 'Email', type: 'email' },
                { id: 'nit', label: 'Nit' },
                { id: 'address', label: 'Address' },
                { id: 'country', label: 'Country' },
                { id: 'phone', label: 'Phone', type: 'tel' },
                { id: 'region', label: 'Region' }
              ].map(({ id, label, type = 'text' }) => (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="block text-sm font-semibold text-black-700 ml-4">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    className="w-full px-3 py-2 border rounded-md bg-[#E6E6FA] focus:outline-none focus:ring-purple-600"
                  />
                </div>
              ))}
            </div>

            {/* Cart Items */}
            <div className="space-y-4 p-2">
              {shoppingCart.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.images} alt={item.title} className="w-20 h-20 lg:w-32 lg:h-32 rounded-lg bg-gray-100" />
                    <span className="w-32 text-xs text-center">
                      {item.title} <br />
                      <span className="font-bold">(x {item.quantity})</span>
                    </span>
                  </div>
                  <span className="text-xs lg:text-xl">${item.price}</span>
                </div>
              ))}
              <div className="text-right font-semibold">Total : ${formattedTotal}</div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="font-semibold text-center">PAYMENT METHOD</h2>
              <div className="flex justify-center gap-12">
                {[
                  { id: 'debit', label: 'DEBIT' },
                  { id: 'credit', label: 'CREDIT' },
                  { id: 'pse', label: 'PSE' }
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <input id={id} type="radio" name="payment-method" className="w-4 h-4 text-purple-600 focus:ring-purple-500" />
                    <label htmlFor={id} className="text-sm font-medium text-black-700">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={inProcess}
                  className="bg-green-400 hover:bg-green-500 text-black font-semibold px-8 py-2 rounded-md"
                >
                  PAY
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t">
              <button onClick={handleBack} className="flex items-center text-xs text-purple-600 font-semibold hover:underline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK
              </button>
              <div className="flex gap-2 text-center text-sm ml-4">
                {[
                  { title: 'Refund Policy', href: '#refund_policy' },
                  { title: 'Shipping Policy', href: '#shipping_policy' },
                  { title: 'Privacy Policy', href: '#privacy_policy' }
                ].map((text, index) => (
                  <Link to={`/policies/${text.href}`} key={index} className="text-purple-600 font-semibold hover:underline ml-2">
                    <span className="text-xs">{text.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
