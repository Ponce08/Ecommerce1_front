import { createContext, useState } from 'react';

interface BooleanContextType {
  isTrue: boolean;
  setIsTrue: (value: boolean) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export const BooleanContext = createContext<BooleanContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isTrue, setIsTrue] = useState<boolean>(false);

  return <BooleanContext.Provider value={{ isTrue, setIsTrue }}>{children}</BooleanContext.Provider>;
};
