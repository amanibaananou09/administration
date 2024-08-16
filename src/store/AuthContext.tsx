import React, { useCallback, useContext, useEffect, useState } from "react";

import { User } from "common/model";
import { AuthContextProps, AuthContextProviderProps } from "common/react-props";
import { decodeToken } from "utils/utils";
import { useESSContext } from "./ESSContext";
import { impersonateUser } from "../common/api/auth-api";

export const AuthContext = React.createContext<AuthContextProps>({
  token: null,
  isSignedIn: false,
  user: null,
  signIn: (user) => {},
  signOut: () => {},
  impersonate: (userId) => Promise.resolve(),
});

let firstLoad = true;

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(
    decodeToken(localStorage.getItem("auth-admin")) || null,
  );
  const isSignedIn = !!user;

  const { clearContext } = useESSContext();

  const signInHandler = useCallback((user: User) => {
    setUser(user);
  }, []);

  const signOutHandler = useCallback(() => {
    setUser(null);
    clearContext();
  }, [clearContext]);

  const impersonateHandler = useCallback(
    async (userId: number) => {
      try {
        const impersonatedUser = await impersonateUser(userId);
        signInHandler(impersonatedUser);
      } catch (error) {
        console.error("Failed to impersonate user:", error);
      }
    },
    [signInHandler],
  );

  useEffect(() => {
    let signOutTimer: NodeJS.Timeout;

    if (user && user.expireTime) {
      const remainingTime = user.expireTime - new Date().getTime();
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
      localStorage.setItem("auth-admin", user.token);
    } else {
      localStorage.removeItem("auth-admin");
      localStorage.removeItem("impersonationMode");
      localStorage.removeItem("originalUserId");
    }

    return () => {
      signOutTimer && clearTimeout(signOutTimer);
    };
  }, [user, signOutHandler]);

  const contextValue: AuthContextProps = {
    user,
    isSignedIn,
    signIn: signInHandler,
    signOut: signOutHandler,
    impersonate: impersonateHandler,
    token: user?.token || null,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
