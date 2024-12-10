import { createContext, useState } from 'react';

interface BooleanContextType {
  isTrue: boolean;
  isTrue_category: boolean;
  isTrue_filters: boolean;
  setIsTrue: (value: boolean) => void;
  setIsTrue_category: (value: boolean) => void;
  setIsTrue_filters: (value: boolean) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export const BooleanContext = createContext<BooleanContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [isTrue_category, setIsTrue_category] = useState<boolean>(false);
  const [isTrue_filters, setIsTrue_filters] = useState<boolean>(false);

  return (
    <BooleanContext.Provider
      value={{ isTrue, setIsTrue, isTrue_filters, setIsTrue_filters, isTrue_category, setIsTrue_category }}
    >
      {children}
    </BooleanContext.Provider>
  );
};
