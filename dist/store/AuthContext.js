import React, { useContext, useEffect, useState, useCallback, } from "react";
import { useESSContext } from "./ESSContext";
import { decodeToken } from "src/utils/utils";
export const AuthContext = React.createContext({
    token: null,
    isSignedIn: false,
    signIn: () => { },
    signOut: () => { },
});
let firstLoad = true;
export const AuthContextProvider = ({ children, }) => {
    const storedAuth = localStorage.getItem("auth");
    const initialUser = storedAuth
        ? decodeToken(storedAuth)
        : { token: null, expireTime: 0 };
    const [user, setUser] = useState(initialUser);
    const isSignedIn = !!user?.token;
    const { clearContext } = useESSContext();
    const signInHandler = useCallback((user) => {
        setUser(user);
    }, []);
    const signOutHandler = useCallback(() => {
        setUser({ token: null, expireTime: 0 });
        clearContext();
    }, [clearContext]);
    useEffect(() => {
        let signOutTimer;
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
        }
        else {
            localStorage.removeItem("auth");
        }
        return () => {
            signOutTimer && clearTimeout(signOutTimer);
        };
    }, [user, signOutHandler]);
    const contextValue = {
        token: user?.token || null,
        isSignedIn,
        signIn: signInHandler,
        signOut: signOutHandler,
    };
    return (React.createElement(AuthContext.Provider, { value: contextValue }, children));
};
export const useAuth = () => {
    return useContext(AuthContext);
};
