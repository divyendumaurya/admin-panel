import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser=createAsyncThunk(
    'user/loginUser',
    async(userCred)=>{
        const request = await axios.post("https://api.escuelajs.co/api/v1/auth/login" , userCred);
        console.log('API response:', request.data);
        const response = await request.data;
        // localStorage.setItem("user", JSON.stringify(response));
        return response;
    }
)


// get user with session
 // Fetch user profile using the access token
 export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { getState }) => {
      const state = getState();
      const token = state.user.user.access_token;  // Get the access token from the state
      const request = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return request.data;
    }
  );



const userSlice = createSlice({
    name: 'user',
    initialState:{
        loading: false,
        user: null,
        error: null,
    },

    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.user=null;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user=action.payload;
            state.error=null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.user=null;
            console.log(action.error.message);
            if(action.error.message === "Request failed with status code 401"){
                state.error="Invalid Credentials";
            }
            else{
                state.error= action.error.message;
            }
            

        })
      // Handle profile fetch actions
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
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;