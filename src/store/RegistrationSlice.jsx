import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        userData
      );
      // Return both user data and success message
      return { user: response.data, message: "User registered successfully!" };
    } catch (error) {
      const messages = error.response?.data?.message;
      const messageString = Array.isArray(messages)
        ? messages.join(", ")
        : error.message;
      return rejectWithValue(messageString);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    user: null,
    error: null,
    message: null, // Store the success message
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.message = null; // Reset message when pending
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.message = action.payload.message; // Save success message
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || action.error.message;
        state.message = null; // Reset message on error
      });
  },
});

export default registrationSlice.reducer;
