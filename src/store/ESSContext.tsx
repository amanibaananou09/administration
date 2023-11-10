import { Mode } from "common/enums";
import { ESSContextProps, Station } from "common/model";
import React, { useContext, useEffect, useState } from "react";

export const ESSContext = React.createContext<ESSContextProps>({
  selectedStation: null,
  isLoading: false,
  isAdminMode: false,
  selectStation: () => {},
  selectAdminMode: () => {},
  selectDashboardMode: () => {},
  clearContext: () => {},
});

interface ESSContextProviderProps {
  children: React.ReactNode;
}

export const ESSContextProvider = ({ children }: ESSContextProviderProps) => {
  const storedValue: string | null = localStorage.getItem("ess");
  const selected: Station | null = storedValue ? JSON.parse(storedValue) : null;

  const [selectedStation, setSelectedStation] = useState<Station | null>(
    selected,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mode, setMode] = useState<Mode | null>(
    (localStorage.getItem("mode") as Mode) || Mode.DASHBORAD,
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [mode]);

  const setESSContextHandler = (selectedStation: Station) => {
    localStorage.setItem("ess", JSON.stringify(selectedStation));
    setSelectedStation(selectedStation);
  };

  const selectAdminMode = () => {
    localStorage.setItem("mode", Mode.ADMIN);
    setMode(Mode.ADMIN);
  };

  const selectDashboardMode = () => {
    localStorage.setItem("mode", Mode.DASHBORAD);
    setMode(Mode.DASHBORAD);
  };

  const clearESSContextHandler = () => {
    localStorage.removeItem("ess");
    setSelectedStation(null);
  };

  const contextValue: ESSContextProps = {
    selectedStation,
    isAdminMode: mode == Mode.ADMIN,
    isLoading,
    selectStation: setESSContextHandler,
    selectAdminMode,
    selectDashboardMode,
    clearContext: clearESSContextHandler,
  };

  return (
    <ESSContext.Provider value={contextValue}>{children}</ESSContext.Provider>
  );
};

export const useESSContext = () => {
  return useContext(ESSContext);
};
