import React, { useCallback, useContext, useEffect, useState } from "react";

import { AuthContextProps, AuthContextProviderProps, User } from "common/model";
import { decodeToken } from "utils/utils";
import { useESSContext } from "./ESSContext";

export const AuthContext = React.createContext<AuthContextProps>({
  token: null,
  isSignedIn: false,
  user: null,
  signIn: (user) => {},
  signOut: () => {},
});

let firstLoad = true;

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(
    decodeToken(localStorage.getItem("auth")) || null,
  );
  const isSignedIn = !!user;

  const { clearContext } = useESSContext();

  const signInHandler = useCallback((user: User) => {
    setUser(user);
  }, []);

  const signOutHandler = useCallback(() => {
    setUser(null);
    clearContext();
  }, []);

  useEffect(() => {
    let signOutTimer: NodeJS.Timeout;

    if (user && user.expireTime) {
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

    if (user && user.token) {
      localStorage.setItem("auth", user.token);
    } else {
      localStorage.removeItem("auth");
    }

    return () => {
      signOutTimer && clearTimeout(signOutTimer);
    };
  }, [user, signOutHandler]);

  const contextValue: AuthContextProps = {
    user: user,
    isSignedIn,
    signIn: signInHandler,
    signOut: signOutHandler,
    token: null,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
