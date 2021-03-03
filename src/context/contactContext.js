import { createContext, useContext } from 'react';

export const ConContext = createContext();

export function useConContext() {
  return useContext(ConContext);
}