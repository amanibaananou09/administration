import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";

import { useESSContext } from "./ESSContext";
import { decodeToken } from "utils/utils";

export const AuthContext = React.createContext({
  token: null,
  isSignedIn: false,
  signIn: (user) => {},
  signOut: () => {},
});

let firstLoad = true;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    decodeToken(localStorage.getItem("auth")) || null,
  );
  const isSignedIn = !!user;

  const { clearContext } = useESSContext();

  const signInHandler = useCallback((user) => {
    setUser(user);
  }, []);

  const signOutHandler = useCallback(() => {
    setUser(null);
    clearContext();
  }, []);

  useEffect(() => {
    let signOutTimer;

    if (user) {
      const remainingTime = new Date(
        +user.expireTime - new Date().getTime(),
      ).getTime();
      if (remainingTime <= 0) {
        signOutHandler();
      }
      signOutTimer = setTimeout(() => {
        signOutHandler();
      }, remainingTime);
    }

    if (firstLoad) {
      firstLoad = false;
      return;
    }

    if (user) {
      localStorage.setItem("auth", user.token);
    } else {
      localStorage.removeItem("auth");
    }

    return () => {
      signOutTimer && clearTimeout(signOutTimer);
    };
  }, [user, signOutHandler]);

  const contextValue = {
    user,
    isSignedIn,
    signIn: signInHandler,
    signOut: signOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
