import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import registrationReducer from './RegistrationSlice'
import productReducer from './ProductSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        registration: registrationReducer,
        products: productReducer,
    },
});

export default store;