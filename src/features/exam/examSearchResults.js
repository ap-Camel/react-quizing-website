import { createSlice } from "@reduxjs/toolkit/";



const initialState = localStorage.getItem("search") ? JSON.parse(localStorage.getItem("search")) : { exams: []}


const examSearchResults = createSlice({
    name: "examSearchResults",
    initialState,
    reducers: {
        setSearchResults: (state, {payload}) => {
            state.exams = payload;
            localStorage.setItem("search", JSON.stringify(state));
        }
    }
});


export const { setSearchResults } = examSearchResults.actions;

export default examSearchResults.reducer;