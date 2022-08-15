import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import examSearchResultsReducer from "./features/exam/examSearchResults";
import addQuestionModalReducer from "./features/modals/addQuestionModalSlice";
import modalReducer from "./features/modals/modalSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        examSearchResults: examSearchResultsReducer,
        addQuestionModal: addQuestionModalReducer,
        modal: modalReducer
    }
});


export default store;