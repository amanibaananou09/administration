import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";

import jwt_decode from "jwt-decode";
import { useESSContext } from "./ESSContext";

const decodeToken = (token) => {
  if (!token) {
    return null;
  }

  const {
    sid,
    name,
    preferred_username,
    realm_access,
    email,
    exp,
  } = jwt_decode(token);

  return {
    id: sid,
    fullName: name,
    username: preferred_username,
    role: realm_access.roles[0],
    token,
    email,
    expireTime: exp * 1000,
  };
};

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

  const signInHandler = useCallback((token) => {
    const decodedToken = decodeToken(token);
    setUser(decodedToken);
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
