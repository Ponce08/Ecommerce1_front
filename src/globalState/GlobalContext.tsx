import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import { State, Action, reducer, initialState, UserLogin } from './reducer.tsx';
import { supabase } from '../supabaseClient/supabaseClient.tsx';
import useStore from '@/zustand/store.tsx';

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
  const { setUserLogin } = useStore();

  useEffect(() => {
    // Obtiene la sesión actual al montar el componente
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user) {
        const userLogin: UserLogin = {
          id: data.session.user.id,
          firstName: data.session.user.user_metadata.full_name,
          lastName: data.session.user.user_metadata.full_name,
          email: data.session.user.email === undefined ? '' : data.session.user.email,
          avatar_url: data.session.user.user_metadata.avatar_url
        };
        setUserLogin(userLogin);
      }
    };

    fetchSession();

    // Suscríbete a cambios en el estado de autenticación
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userLogin: UserLogin = {
          id: session.user.id,
          firstName: session.user.user_metadata.full_name,
          lastName: session.user.user_metadata.full_name,
          email: session.user.email === undefined ? '' : session.user.email,
          avatar_url: session.user.user_metadata.avatar_url
        };
        setUserLogin(userLogin);
      } else if (event === 'SIGNED_OUT') {
        setUserLogin(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
