import React, { createContext, useReducer, useMemo } from 'react';
import { State, Action, reducer, initialState } from './reducer.tsx';

type GlobalContextType = {
  state: State;
  dispatch: (action: Action) => void;
};

const defaultContextValue: GlobalContextType = {
  state: initialState,
  dispatch: () => {
    // Este es un placeholder, advertimos en desarrollo si se usa fuera del proveedor.
    if (process.env.NODE_ENV !== 'production') {
      console.error('dispatch no está disponible fuera de GlobalProvider.');
    }
  }
};

export const GlobalContext = createContext<GlobalContextType>(defaultContextValue);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
