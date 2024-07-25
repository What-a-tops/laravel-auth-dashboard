import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../../axiosClient";

export const registerUser = createAsyncThunk(
    "user/register",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/register", values);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async ({ page = 1, search = "" }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(
                `/users?page=${page}&search=${search}`
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUser = createAsyncThunk(
    "user/getUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/users/${id}`);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addUser = createAsyncThunk(
    "user/addUser",
    async (values, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            const response = await axiosClient.post(`/users`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ values, id }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("_method", "put");

            Object.keys(values).forEach((key) => {
                if (key === "profile_photo" && values[key] instanceof File) {
                    formData.append(key, values[key]); // Assuming values[key] is the file object
                } else {
                    formData.append(key, values[key]);
                }
            });

            const response = await axiosClient.post(`/users/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosClient.delete(`/users/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        datas: [],
        data: {},
        status: "idle",
        errors: null,
        meta: null,
    },
    reducers: {
        loadUsers: (state, action) => {
            state.datas = action.payload;
        },
        loadUser: (state, action) => {
            state.data = action.payload;
        },
        userAdded: (state, action) => {
            state.datas.push(action.payload);
        },
        userUpdate: (state, action) => {
            state.datas.push(action.payload);
        },
        clearData: (state) => {
            state.data = {};
            state.errors = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.datas = action.payload.data;
                state.errors = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.errors = action.payload.errors || {
                    message: action.payload.message,
                };
            })
            .addCase(addUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.datas = action.payload.data;
                state.errors = null;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = "failed";
                state.errors = action.payload.errors || {
                    message: action.payload.message,
                };
            })
            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.datas = action.payload.data;
                state.errors = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.errors = action.payload.errors || {
                    message: action.payload.message,
                };
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.datas = action.payload.data;
                state.errors = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "failed";
                state.errors = action.payload.errors || {
                    message: action.payload.message,
                };
            })
            .addCase(getUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.datas = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(getUsers.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(getUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(getUser.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { userAdded, userUpdate, loadUsers, loadUser, clearData } =
    userSlice.actions;

export default userSlice.reducer;
