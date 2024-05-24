import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import registrationReducer from './RegistrationSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        registration: registrationReducer,
    },
});

export default store;