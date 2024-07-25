import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import userReducer from "./features/User/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        // other reducers can be added here for different features
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // To allow serializing async thunk actions
        }),
});
