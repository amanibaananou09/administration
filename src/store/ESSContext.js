import React, { useCallback, useContext, useState } from "react";

export const ESSContext = React.createContext({
  selectedStation: {
    id: null,
    name: null,
    address: null,
    controllerId: null,
    controllerPtsId: null,
    version: null,
  },
  selectStation: () => {},
  clearContext: () => {},
});

export const ESSContextProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] = useState(
    JSON.parse(localStorage.getItem("ess")) || null,
  );

  const setESSContextHandler = useCallback((selectedStation) => {
    localStorage.setItem("ess", JSON.stringify(selectedStation));
    setSelectedStation(selectedStation);
  }, []);

  const clearESSContextHandler = useCallback(() => {
    localStorage.removeItem("ess");
    setSelectedStation(null);
  });

  const contextValue = {
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
