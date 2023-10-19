import React, { useCallback, useContext, useState } from "react";

export interface ESSContextProps {
  selectedStation: any;
  selectStation: (selectedStation: any) => void;
  clearContext: () => void;
}

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
  const selected: string | null = storedValue ? JSON.parse(storedValue) : null;

  const [selectedStation, setSelectedStation] = useState<string | null>(
    selected,
  );

  const setESSContextHandler = useCallback((selectedStation: any) => {
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
