import React, { useCallback, useContext, useState, FC } from "react";

interface ESSContextProps {
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

export const ESSContextProvider: FC<ESSContextProviderProps> = ({ children }) => {
  const [selectedStation, setSelectedStation] = useState<any>(
    JSON.parse(localStorage.getItem("ess")) || null,
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