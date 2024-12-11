import React, { createContext, useReducer, useState } from 'react';
import { initialState, productsReducer, productsAction, productsState } from './reducer.tsx';

type GlobalContextType = {
  state: productsState;
  dispatch: (action: productsAction) => void;
  page: number;
  isTrue: boolean;
  isTrue_category: boolean;
  isTrue_filters: boolean;
  setPage: (value: number | ((prev: number) => number)) => void;
  setIsTrue: (value: boolean) => void;
  setIsTrue_category: (value: boolean) => void;
  setIsTrue_filters: (value: boolean) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [isTrue_category, setIsTrue_category] = useState<boolean>(false);
  const [isTrue_filters, setIsTrue_filters] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        isTrue,
        setIsTrue,
        isTrue_filters,
        setIsTrue_filters,
        isTrue_category,
        setIsTrue_category,
        page,
        setPage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
