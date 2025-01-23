import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCred) => {
    const request = await axios.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      userCred
    );
    console.log("API response:", request.data);
    return request.data;
  }
);

// Fetch user profile using the access token
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { getState }) => {
    const state = getState();
    // const token = state.user.user?.access_token; // Ensure token exists
    const token = localStorage.getItem("access_token");
    const request = await axios.get(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return request.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    profile: null,
    error: null,
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action.error.message.includes("401")) {
          state.error = "Invalid Credentials"; // Explicitly set error for 401 status code
        } else {
          state.error = action.error.message || "An error occurred"; // Handle other errors generically
        }
      })

      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.profile = null;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload?.message || "Failed to fetch profile"; // Consistent error handling
      });
  },
});

export default userSlice.reducer;
