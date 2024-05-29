
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/products/");
  console.log(response.data)
  return response.data;
});





export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/products', productData);
      console.log("Create response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error.response ? error.response.data : error.message);
      throw error;
    }
  });




export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, productData);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
  return id;
});




// Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
      products: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.products.push(action.payload);
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          const index = state.products.findIndex(product => product.id === action.payload.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.products = state.products.filter(product => product.id !== action.payload);
        });
    },
  });
  
  export default productSlice.reducer;
