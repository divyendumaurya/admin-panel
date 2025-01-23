import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import registrationReducer from "./RegistrationSlice";
import productReducer from "./ProductSlice";
import categoryReducer from "./CategorySlice";
import fileUploadReducer from "./FileUploadSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    registration: registrationReducer,
    products: productReducer,
    categories: categoryReducer,
    fileUpload: fileUploadReducer,
  },
});

export default store;
