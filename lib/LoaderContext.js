'use client';
import Loader from '../components/Loader';
import { createContext, useContext, useState, ReactNode } from 'react';


const LoaderContext = createContext(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error('useLoader must be used within LoaderProvider');
  return context;
};

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <Loader />
      )}
      {children}
    </LoaderContext.Provider>
  );
}
