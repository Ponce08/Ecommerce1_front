import ContextCardsGlobal from './ContextCardsGlobal.tsx';
import { useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';

export const NotFoundProducts = () => {
  const { state } = useContext(GlobalContext);
  const { ratingOrder } = state;
  const { allProducts } = ContextCardsGlobal();

  return (
    <div className="flex h-screen flex-col bg-white">
      <img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
        alt=""
        className="h-44 w-full object-cover"
      />

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ¡Ops . . . We can't find those products!
          </h1>

          <p className="mt-4 text-gray-500">Try searching again, or return home to start from the beginning.</p>

          <a
            onClick={() => allProducts(ratingOrder)}
            className="mt-6 inline-block rounded bg-purple-500 px-5 py-3 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring cursor-pointer"
          >
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
};
