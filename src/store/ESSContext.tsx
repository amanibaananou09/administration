import React, { useCallback, useContext, useState } from "react";
import { Station,ESSContextProps } from 'common/model';


export const ESSContext = React.createContext<ESSContextProps>({
  selectedStation: null,
  selectStation: () => {},
  clearContext: () => {},
});

interface ESSContextProviderProps {
  children: React.ReactNode;
}

export const ESSContextProvider = ({ children }: ESSContextProviderProps) => {
  const storedValue: string | null = localStorage.getItem("ess");
  const selected: Station | null = storedValue ? JSON.parse(storedValue) : null;

  const [selectedStation, setSelectedStation] = useState<Station | null> (
    selected,
  );

  const setESSContextHandler = useCallback((selectedStation: Station) => {
    localStorage.setItem("ess", JSON.stringify(selectedStation));
    setSelectedStation(selectedStation);
  }, []);

  const clearESSContextHandler = useCallback(() => {
    localStorage.removeItem("ess");
    setSelectedStation(null);
  }, []);

  const contextValue: ESSContextProps = {
    selectedStation,
    selectStation: setESSContextHandler,
    clearContext: clearESSContextHandler,
  };

  return (
    <ESSContext.Provider value={contextValue}>{children}</ESSContext.Provider>
  );
};

export const useESSContext = () => {
  return useContext(ESSContext);
};
