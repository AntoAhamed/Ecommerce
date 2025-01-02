import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const signup = createAsyncThunk(
    "user/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(
                "http://localhost:5000/api/v1/register",
                userData,
                config
            );
            localStorage.setItem("token", JSON.stringify(data.token));
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(
                "http://localhost:5000/api/v1/login",
                userData,
                config
            );
            localStorage.setItem("token", JSON.stringify(data.token));
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loadUser = createAsyncThunk(
    "user/loadUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/me",
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token')
            const data = {
                success: true,
                message: "Logged Out"
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const forgetPassword = createAsyncThunk(
    "user/forgetPassword",
    async ({email}, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } }

            const { data } = await axios.post('http://localhost:5000/api/v1/password/forgot', email, config)

            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async ({token, passwords}, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } }

            const { data } = await axios.put(`http://localhost:5000/api/v1/password/reset/${token}`, passwords, config)

            localStorage.setItem("token", JSON.stringify(data.token))

            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updatePassword = createAsyncThunk(
    "user/updatePassword",
    async (passwords, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.put(
                "http://localhost:5000/api/v1/password/update",
                passwords, config
            );
            localStorage.setItem("token", JSON.stringify(data.token));
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (userData, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.put(
                "http://localhost:5000/api/v1/me/update",
                userData, config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.get("http://localhost:5000/api/v1/admin/users", config);
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    "user/getUserDetails",
    async (id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`http://localhost:5000/api/v1/admin/user/${id}`, config);
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.put(`http://localhost:5000/api/v1/admin/user/${id}`, userData, config);
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.delete(`http://localhost:5000/api/v1/admin/user/${id}`, config);
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

let initialState = {
    isLoading: false,
    user: null,
    error: null,
    userInfo: null,
    isAuth: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        tmpLogout: (state) => {
            state.user = null;
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isAuth = false;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.userInfo = action.payload;
                state.isAuth = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
            })
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.userInfo = action.payload;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
            })
            // LoadUser
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isAuth = false;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.userInfo = action.payload;
                state.isAuth = true;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
            })
            // Logout (not working right now)
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // updatePassword
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.userInfo = action.payload;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // forgot Password
            .addCase(forgetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // reset Password
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // updateProfile
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get All Users
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get User Details
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})

export const { tmpLogout } = userSlice.actions
export default userSlice.reducer