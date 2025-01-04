import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import backend_url from "../config/config";

export const addItemsToCart = createAsyncThunk(
    "cart/addItemsToCart",
    async ({ id, quantity }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${backend_url}/api/v1/product/${id}`);

            const cartItem = {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                images: data.product.images,
                stock: data.product.stock,
                quantity,
            }

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

            // Check if item exists
            const existingItemIndex = cartItems.findIndex(
                (item) => item.product === cartItem.product
            )

            if (existingItemIndex >= 0) {
                cartItems[existingItemIndex].quantity = quantity; // Update quantity
            } else {
                cartItems.push(cartItem); // Add new item
            }

            localStorage.setItem("cartItems", JSON.stringify(cartItems))

            return cartItems
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeItemsFromCart = createAsyncThunk(
    "cart/removeItemsFromCart",
    async (id, { rejectWithValue }) => {
        try {
            let cartItems = JSON.parse(localStorage.getItem('cartItems'))

            cartItems = cartItems.filter((item) => (item.product !== id))

            localStorage.setItem("cartItems", JSON.stringify(cartItems))

            return cartItems
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const saveShippingInfo = createAsyncThunk(
    "cart/saveShippingInfo",
    async (shippingInfo, { rejectWithValue }) => {
        try {
            localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo))

            return shippingInfo
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

let initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    success: false,
    isLoading: false,
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addItemsToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Remove Items From Cart
            .addCase(removeItemsFromCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeItemsFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(removeItemsFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Save Shipping Info
            .addCase(saveShippingInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(saveShippingInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.shippingInfo = action.payload;
            })
            .addCase(saveShippingInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})


export default cartSlice.reducer