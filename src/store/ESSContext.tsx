import { Station } from "common/model";
import { ESSContextProps } from "common/react-props";
import React, { useContext, useEffect, useState } from "react";

export const ESSContext = React.createContext<ESSContextProps>({
  isLoading: false,
  clearContext: () => {},
});

interface ESSContextProviderProps {
  children: React.ReactNode;
}

export const ESSContextProvider = ({ children }: ESSContextProviderProps) => {
  /*show loading screen when moving from dashboard to administration */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const setESSContextHandler = (selectedStation: Station) => {};

  const clearESSContextHandler = () => {};

  const contextValue: ESSContextProps = {
    isLoading,
    clearContext: clearESSContextHandler,
  };

  return (
    <ESSContext.Provider value={contextValue}>{children}</ESSContext.Provider>
  );
};

export const useESSContext = () => {
  return useContext(ESSContext);
};
