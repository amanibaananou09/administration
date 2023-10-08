import React, { useState, useCallback, useContext } from "react";
const defaultESSContext = {
    selectedStation: null,
    selectStation: () => { },
    clearContext: () => { },
};
const ESSContext = React.createContext(defaultESSContext);
export const ESSContextProvider = ({ children, }) => {
    const [selectedStation, setSelectedStation] = useState(localStorage.getItem("ess") || null);
    const selectStation = useCallback((station) => {
        localStorage.setItem("ess", station);
        setSelectedStation(station);
    }, []);
    const clearContext = useCallback(() => {
        localStorage.removeItem("ess");
        setSelectedStation(null);
    }, []);
    const contextValue = {
        selectedStation,
        selectStation,
        clearContext,
    };
    return React.createElement(ESSContext.Provider, { value: contextValue }, children);
};
export const useESSContext = () => {
    return useContext(ESSContext);
};
