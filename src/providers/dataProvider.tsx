'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';

type Action =
  | {
      type: 'anchor';
      href: string;
      content: ReactNode;
      key: string;
      primary: boolean;
    }
  | {
      type: 'button';
      payload: () => unknown;
      content: ReactNode;
      key: string;
      primary: boolean;
    };

interface DataInterface {
  floatingActions: { actions: Action[]; id: string } | null;
  setFloatingActions: Dispatch<
    SetStateAction<DataInterface['floatingActions']>
  >;
}

const defaultData: DataInterface = {
  floatingActions: null,
  setFloatingActions: () => undefined
};

const DataContext = createContext<DataInterface>(defaultData);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [floatingActions, setFloatingActions] =
    useState<DataInterface['floatingActions']>(null);

  return (
    <DataContext.Provider value={{ floatingActions, setFloatingActions }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
