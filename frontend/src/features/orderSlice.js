import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import backend_url from "../config/config";

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.post(`${backend_url}/api/v1/order/new`, orderData, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const myOrders = createAsyncThunk(
    "order/myOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.get(`${backend_url}/api/v1/orders/me`, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.get(`${backend_url}/api/v1/admin/orders`, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async ({id, status} , { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.put(`${backend_url}/api/v1/admin/order/${id}`, {status}, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteOrderByUser = createAsyncThunk(
    "order/deleteOrderByUser",
    async (id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.delete(`${backend_url}/api/v1/order/${id}`, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.delete(`${backend_url}/api/v1/admin/order/${id}`, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getOredrDetails = createAsyncThunk(
    "order/getOredrDetails",
    async (id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.get(`${backend_url}/api/v1/order/${id}`, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

let initialState = {
    isLoading: false,
    orderInfo: null,
    error: null,
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // My Orders
            .addCase(myOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(myOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload;
            })
            .addCase(myOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get All Orders
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update Order
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Order By User
            .addCase(deleteOrderByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload;
            })
            .addCase(deleteOrderByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get Order Details
            .addCase(getOredrDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOredrDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload;
            })
            .addCase(getOredrDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})


export default orderSlice.reducer