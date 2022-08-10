import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import examSearchResultsReducer from "./features/exam/examSearchResults";


export const store = configureStore({
    reducer: {
        user: userReducer,
        examSearchResults: examSearchResultsReducer
    }
});


export default store;