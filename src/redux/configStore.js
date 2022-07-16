import { configureStore } from "@reduxjs/toolkit";
import userReducer from './module/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store;