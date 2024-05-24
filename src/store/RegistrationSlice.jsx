import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for registration
export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData) => {
    const request = await axios.post('https://test.solz.me/api/v1/user/register', userData);
    const response = request.data;
    console.log('API response:', response);
    console.log('msg:', response.message);
    // Optionally, you can store the user data in localStorage or perform any other necessary actions
    return response;
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;