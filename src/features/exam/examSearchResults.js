import { createSlice } from "@reduxjs/toolkit/";


const initialState = {
    exams: []
}


const examSearchResults = createSlice({
    name: "examSearchResults",
    initialState,
    reducers: {
        setSearchResults: (state, {payload}) => {
            state.exams = payload;
        }
    }
});


export const { setSearchResults } = examSearchResults.actions;

export default examSearchResults.reducer;