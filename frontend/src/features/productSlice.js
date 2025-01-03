import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import backend_url from "../config/config";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (filters, { rejectWithValue }) => {
        try {
            const { keyword, category, minPrice, maxPrice, ratings, page, limit } = filters;
            const query = new URLSearchParams({
                keyword,
                category,
                minPrice,
                maxPrice,
                ratings,
                page,
                limit,
            }).toString();
            const response = await axios.get(`${backend_url}/api/v1/products?${query}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getProductDetails = createAsyncThunk(
    "product/getProductDetails",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${backend_url}/api/v1/product/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.post(`${backend_url}/api/v1/admin/product/new`, productData, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAdminProducts = createAsyncThunk(
    "product/getAdminProducts",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.get(`${backend_url}/api/v1/admin/products`, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.put(`${backend_url}/api/v1/admin/product/${id}`, updatedData, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.delete(`${backend_url}/api/v1/admin/product/${id}`, config);

            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createReview = createAsyncThunk(
    "product/createReview",
    async (newReview, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.put(
                `${backend_url}/api/v1/review`,
                newReview,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllReviews = createAsyncThunk(
    "product/getAllReviews",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${backend_url}/api/v1/reviews?id=${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteReview = createAsyncThunk(
    "product/deleteReview",
    async ({ reviewId, productId }, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.delete(
                `${backend_url}/api/v1/reviews?id=${reviewId}&productId=${productId}`,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

let initialState = {
    isLoading: false,
    productInfo: null,
    reviewInfo: null,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Products
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productInfo = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get Product Details
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productInfo = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productInfo = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get Admin Products
            .addCase(getAdminProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productInfo = action.payload;
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productInfo = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productInfo = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Create Review
            .addCase(createReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviewInfo = action.payload;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get All Reviews
            .addCase(getAllReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviewInfo = action.payload;
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Review
            .addCase(deleteReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviewInfo = action.payload;
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})


export default productSlice.reducer