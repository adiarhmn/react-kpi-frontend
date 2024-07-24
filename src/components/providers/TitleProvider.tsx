import { createContext, useContext, useState } from 'react';

interface TitleProviderProps {
  children: React.ReactNode;
}

interface AppContextInterface {
  title: string;
  setTitle: (value: string) => void;
}

const TitleContext = createContext<AppContextInterface | undefined>(undefined);

export const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
  const [title, setTitle] = useState<string>('Beranda');
  return <TitleContext.Provider value={{ title, setTitle }}>{children}</TitleContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTitleContext = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error('useAppContext harus digunakan di dalam AppProvider');
  }
  return context;
};
