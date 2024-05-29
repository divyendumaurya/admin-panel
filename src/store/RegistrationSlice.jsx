import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const checkUserAvailability = createAsyncThunk(
  'registration/checkUserAvailability',
  async (email) => {
    const response = await axios.post('https://api.escuelajs.co/api/v1/users/is-available', { email });
    return response.data.isAvailable;
  }
);

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const availabilityResponse = await axios.post('https://api.escuelajs.co/api/v1/users/is-available', { email: userData.email });
      if (!availabilityResponse.data.isAvailable) {
        return rejectWithValue('User already exists');
      }
      const request = await axios.post('https://api.escuelajs.co/api/v1/users/', userData);
      console.log(request.data)
      return request.data;
      
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
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
        state.error = action.payload || action.error.message;
      });
  },
});

export default registrationSlice.reducer;
