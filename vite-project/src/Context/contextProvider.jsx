/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const stateContext = createContext({
    user: null,
    token: null,
    role: null,
    expireToken: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
    setTokenExpire: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [token, setTokenState] = useState(null);
    const [role, setRoleState] = useState(null);
    const [expireToken, setExpireState] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("USER_INFO");
        const storedToken = localStorage.getItem("ACCESS_TOKEN");
        const storedRole = localStorage.getItem("ROLE");
        const storedTokenExpire = localStorage.getItem("TOKEN_EXPIRATION");

        if (storedUser) setUserState(JSON.parse(storedUser));
        if (storedToken) setTokenState(storedToken);
        if (storedRole) setRoleState(storedRole);
        if (storedTokenExpire) setExpireState(storedTokenExpire);
    }, []);

    const setToken = (token) => {
        setTokenState(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setRole = (role) => {
        setRoleState(role);
        if (role) {
            localStorage.setItem("ROLE", role);
        } else {
            localStorage.removeItem("ROLE");
        }
    };

    const setUser = (user) => {
        setUserState(user);
        if (user) {
            localStorage.setItem("USER_INFO", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER_INFO");
        }
    };

    const setTokenExpire = (expireToken) => {
        setExpireState(expireToken);
        if (expireToken) {
            localStorage.setItem("TOKEN_EXPIRATION", expireToken);
        } else {
            localStorage.removeItem("TOKEN_EXPIRATION");
        }
    };

    return (
        <stateContext.Provider
            value={{
                user,
                token,
                role,
                expireToken,
                setUser,
                setToken,
                setRole,
                setTokenExpire,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(stateContext);
