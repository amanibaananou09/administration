import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getStationByUser } from "common/api";

export const ESSContext = React.createContext({
  selectedStation: {
    stationId: null,
    stationName: null,
    stationAdress: null,
    controllerId: null,
    controllerPtsId: null,
  },
  selectStation: () => {},
});

export const ESSContextProvider = ({ children }) => {
  const { isSignedIn, user } = useAuth();
  const [selectedStation, setSelectedStation] = useState(null);

  const setESSContextHandler = useCallback((selectedStation) => {
    setSelectedStation(selectedStation);
  }, []);

  useEffect(() => {
    const setDefaultStation = async () => {
      if (isSignedIn && !selectedStation) {
        const stations = await getStationByUser(user.username, user.token);
        if (stations.length > 0) {
          const defaultStation = stations[0];
          const controller = defaultStation.controllerPts[0];
          setESSContextHandler({
            stationId: defaultStation.id,
            stationName: defaultStation.name,
            stationAdress: defaultStation.address,
            controllerId: controller.id,
            controllerPtsId: controller.ptsId,
          });
        }
      } else if (!isSignedIn) {
        setESSContextHandler(null);
      }
    };

    setDefaultStation();
  }, [isSignedIn]);

  const contextValue = {
    selectedStation,
    selectStation: setESSContextHandler,
  };

  return (
    <ESSContext.Provider value={contextValue}>{children}</ESSContext.Provider>
  );
};

export const useESSContext = () => {
  return useContext(ESSContext);
};
