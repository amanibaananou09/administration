import React, { useState, useCallback, ReactNode, useContext } from "react";

interface ESSContextProps {
  selectedStation: string | null;
  selectStation: (station: string) => void;
  clearContext: () => void;
}

const defaultESSContext: ESSContextProps = {
  selectedStation: null,
  selectStation: () => {},
  clearContext: () => {},
};

const ESSContext = React.createContext<ESSContextProps>(defaultESSContext);

interface ESSContextProviderProps {
  children: ReactNode;
}

export const ESSContextProvider: React.FC<ESSContextProviderProps> = ({
  children,
}) => {
  const [selectedStation, setSelectedStation] = useState<string | null>(
    localStorage.getItem("ess") || null,
  );

  const selectStation = useCallback((station: string) => {
    localStorage.setItem("ess", station);
    setSelectedStation(station);
  }, []);

  const clearContext = useCallback(() => {
    localStorage.removeItem("ess");
    setSelectedStation(null);
  }, []);

  const contextValue: ESSContextProps = {
    selectedStation,
    selectStation,
    clearContext,
  };

  return <ESSContext.Provider value={contextValue}>{children}</ESSContext.Provider>;
};

export const useESSContext = (): ESSContextProps => {
  return useContext(ESSContext);
};
