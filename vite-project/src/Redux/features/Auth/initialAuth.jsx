import { setUser, setToken, setRole, setTokenExpire } from "./authSlice";

export const initializeAuth = (store) => {
    const storedUser = localStorage.getItem("USER_INFO");
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    const storedRole = localStorage.getItem("ROLE");
    const storedTokenExpire = localStorage.getItem("TOKEN_EXPIRATION");

    if (storedUser) store.dispatch(setUser(JSON.parse(storedUser)));
    if (storedToken) store.dispatch(setToken(storedToken));
    if (storedRole) store.dispatch(setRole(storedRole));
    if (storedTokenExpire) store.dispatch(setTokenExpire(storedTokenExpire));
};
