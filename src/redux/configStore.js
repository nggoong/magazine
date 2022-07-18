import { configureStore } from "@reduxjs/toolkit";
import userReducer from './module/userReducer';
import postingReducer from './module/postingReducer';
import fsReducer from "./module/fsReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        posting:postingReducer,
        fs:fsReducer
    }
})

export default store;