// src/store/fileUploadSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk for file upload
export const uploadFile = createAsyncThunk(
  "fileUpload/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // The response contains originalname, filename, and location
    } catch (error) {
      return rejectWithValue(error.response?.data || "File upload failed");
    }
  }
);

// Create the slice
const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    isUploading: false,
    uploadSuccess: false,
    uploadError: null,
    fileLocation: null, // To store the file location URL
  },
  reducers: {
    resetUploadState: (state) => {
      state.isUploading = false;
      state.uploadSuccess = false;
      state.uploadError = null;
      state.fileLocation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isUploading = true;
        state.uploadSuccess = false;
        state.uploadError = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadSuccess = true;
        state.fileLocation = action.payload.location; // Save the uploaded file's location
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isUploading = false;
        state.uploadSuccess = false;
        state.uploadError = action.payload || "An error occurred";
      });
  },
});

export const { resetUploadState } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
