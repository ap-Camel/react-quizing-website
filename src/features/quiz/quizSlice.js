import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    examID: 0,
    quiz: [],
    examination: 0
}


const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuiz: (state, {payload}) => {
            
        },
    }
});


export const { setQuiz } = quizSlice.actions;

export default quizSlice.reducer;