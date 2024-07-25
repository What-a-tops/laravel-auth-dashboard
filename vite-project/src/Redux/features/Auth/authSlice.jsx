import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../axiosClient";

const initialState = {
    user: null,
    token: null,
    role: null,
    expireToken: null,
    errors: null,
    status: "idle",
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/login", values);
            const data = response.data;
            const expirationTime =
                new Date().getTime() +
                parseInt(import.meta.env.VITE_API_TOKEN_EXPIRATION_TIME, 10);
            return { ...data, expireToken: expirationTime };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await axiosClient.get("/logout");
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("USER_INFO", JSON.stringify(state.user));
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("ACCESS_TOKEN", state.token);
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem("ROLE", state.role);
        },
        setTokenExpire: (state, action) => {
            state.expireToken = action.payload;
            localStorage.setItem("TOKEN_EXPIRATION", state.expireToken);
        },
        clearSession: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.expireToken = null;
            state.status = "idle";
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user.roles;
                state.expireToken = action.payload.expireToken;
                state.errors = null;

                localStorage.setItem("USER_INFO", JSON.stringify(state.user));
                localStorage.setItem("ACCESS_TOKEN", state.token);
                localStorage.setItem("ROLE", state.role);
                localStorage.setItem("TOKEN_EXPIRATION", state.expireToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.errors = action.payload.errors || {
                    message: action.payload.message,
                };
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.role = null;
                state.expireToken = null;
                localStorage.clear();
            });
    },
});

export const { setUser, setToken, setRole, setTokenExpire, clearSession } =
    authSlice.actions;

export default authSlice.reducer;
