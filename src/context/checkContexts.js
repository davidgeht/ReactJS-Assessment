import { createContext, useContext } from 'react';

export const CheckedContactsContext = createContext();

export function useSelContacts() {
  return useContext(CheckedContactsContext);
}