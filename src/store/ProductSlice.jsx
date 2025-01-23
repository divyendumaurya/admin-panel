// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async Thunks
// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await axios.get("https://api.escuelajs.co/api/v1/products/");
//   console.log(response.data)
//   return response.data;
// });

// export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
//     try {
//       const response = await axios.post('https://api.escuelajs.co/api/v1/products', productData);
//       console.log("Create response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating product:", error.response ? error.response.data : error.message);
//       throw error;
//     }
//   });

// export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
//   const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, productData);
//   return response.data;
// });

// export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
//   await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
//   return id;
// });

// // Slice
// const productSlice = createSlice({
//     name: 'products',
//     initialState: {
//       products: [],
//       loading: false,
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchProducts.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchProducts.fulfilled, (state, action) => {
//           state.loading = false;
//           state.products = action.payload;
//         })
//         .addCase(fetchProducts.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         })
//         .addCase(createProduct.fulfilled, (state, action) => {
//           state.products.push(action.payload);
//         })
//         .addCase(updateProduct.fulfilled, (state, action) => {
//           const index = state.products.findIndex(product => product.id === action.payload.id);
//           if (index !== -1) {
//             state.products[index] = action.payload;
//           }
//         })
//         .addCase(deleteProduct.fulfilled, (state, action) => {
//           state.products = state.products.filter(product => product.id !== action.payload);
//         });
//     },
//   });

//   export default productSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = "https://api.escuelajs.co/api/v1";

// Async Thunks
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async ({ offset = 0, limit = 10 }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/products?offset=${offset}&limit=${limit}`
//       );
//       return {
//         products: response.data, // API returns array of products directly
//         offset, // We store the offset we used
//         limit, // We store the limit we used
//       };
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   }
// );

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    offset = 0,
    limit = 10,
    title = "",
    price = "",
    price_min = "",
    price_max = "",
    categoryId = "",
  } = {}) => {
    try {
      const params = new URLSearchParams();
      // Add pagination parameters
      params.append("offset", offset);
      params.append("limit", limit);

      // Add filter parameters only if they have values
      if (title.trim()) params.append("title", title.trim());
      if (price) params.append("price", price.toString());
      if (price_min) params.append("price_min", price_min.toString());
      if (price_max) params.append("price_max", price_max.toString());
      if (categoryId) params.append("categoryId", categoryId.toString());

      const response = await axios.get(
        `${BASE_URL}/products?${params.toString()}`
      );
      return {
        products: response.data,
        offset,
        limit,
        total: response.headers["x-total-count"] || response.data.length,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      throw new Error(errorMessage);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, productData);
      console.log("Create response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(`${BASE_URL}/products/${id}`, productData);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${BASE_URL}/products/${id}`);
    return id;
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    offset: 0,
    limit: 10,
    totalItems: 80,
    filters: {
      title: "",
      price: "",
      price_min: "",
      price_max: "",
      categoryId: "",
    },
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.offset = 0; // Reset offset when filters change
    },
    resetFilters: (state) => {
      state.filters = {
        title: "",
        price: "",
        price_min: "",
        price_max: "",
        categoryId: "",
      };
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.offset = action.payload.offset;
        state.limit = action.payload.limit;
        // state.totalItems = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export const { setCurrentPage, setLimit, setFilters, resetFilters } =
  productSlice.actions;
export default productSlice.reducer;
