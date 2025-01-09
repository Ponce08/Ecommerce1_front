import '../../components/Styles.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';

export const Footer = () => {
  const token = localStorage.getItem('token');
  const { state } = useContext(GlobalContext);

  const handleClick = (to: string) => {
    window.location.href = to;
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-10 sm:py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">Subscribe to our newsletter</h2>
            <p className="mt-4 text-lg text-gray-300">Subscribe and take advantage of all our offers!!!</p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-purple-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-3 place-items-center sm:grid-cols-3 lg:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <Link to={'/policies'} className="mt-4 text-xs lg:text-base sm:text-base text-white hover:text-purple-600">
                <span>Policies</span>
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <Link
                to={'/products/laptops'}
                className="mt-4 text-xs lg:text-base sm:text-base text-white hover:text-purple-600"
                onClick={() => handleClick('/products/laptops')}
              >
                <span>Tecnology</span>
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <Link to={'/register'} className="mt-4 text-xs lg:text-base sm:text-base text-white hover:text-purple-600">
                <span>Register</span>
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <Link
                to={'/products/womens-shoes'}
                className="mt-4 text-xs lg:text-base sm:text-base text-white hover:text-purple-600"
                onClick={() => handleClick('/products/womens-shoes')}
              >
                <span>Fashion</span>
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <Link
                to={token || state.user ? '/products/mobile-accessories' : '/login'}
                className="mt-4 text-xs lg:text-base sm:text-base text-white hover:text-purple-600"
              >
                <span>{token || state.user ? 'Accessories' : 'Sign in'}</span>
              </Link>
            </div>
            <div className="flex flex-col items-start">
              <Link to={'/policies'} className="mt-4 text-xs lg:text-base sm:text-base text-white hover:text-purple-600">
                <span>Contact</span>
              </Link>
            </div>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
};
