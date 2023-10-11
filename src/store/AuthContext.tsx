import React, {
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode,
  useCallback,
} from "react";
import { useESSContext } from "./ESSContext";
import { decodeToken } from "src/utils/utils";

export interface User {
  id: string | null;
  name: string | null;
  token: string | null;
  expireTime: number;
  fullName: string | null;
  username: string | null;
  email: string | null;
}

export interface AuthContextProps {
  user: User | null;
  token: string | null;
  isSignedIn: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
}



export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  token: null,
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});

let firstLoad = true;

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const storedAuth = localStorage.getItem("auth");
  const [user, setUser] = useState<User | null>(null);
  const isSignedIn = !!user?.token;

  const { clearContext } = useESSContext();

  const signInHandler = useCallback((user: User) => {
    setUser(user);
  }, []);

  const signOutHandler = useCallback(() => {
    setUser({ id: null, name: null, token: null, expireTime: 0 ,fullName:null,username:null,email:null});
    clearContext();
  }, [clearContext]);

  useEffect(() => {
    let signOutTimer: NodeJS.Timeout;

    if (user && user.token) {
      const remainingTime = user.expireTime - Date.now();
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
    token: user?.token || null,
    isSignedIn,
    signIn: signInHandler,
    signOut: signOutHandler,
    user: user ?? null,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
