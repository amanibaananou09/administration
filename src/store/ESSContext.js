import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getStationByUser } from "common/api";

export const ESSContext = React.createContext({
  station: {
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
  const [station, setStation] = useState(null);

  const setESSContextHandler = useCallback((selectedStation) => {
    setStation(selectedStation);
  }, []);

  useEffect(() => {
    const setDefaultStation = async () => {
      if (isSignedIn && !station) {
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
    station,
    selectStation: setESSContextHandler,
  };

  return (
    <ESSContext.Provider value={contextValue}>{children}</ESSContext.Provider>
  );
};

export const useEss = () => {
  return useContext(ESSContext);
};
