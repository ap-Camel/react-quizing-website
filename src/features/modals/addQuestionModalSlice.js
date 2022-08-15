import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addIsOpen: false,
}


const addQuestionModalSlice = createSlice({
    name: "addQuestionModal",
    initialState,
    reducers: {
        toogleAdd: (state, {payload}) => {
            console.log(payload);
            state.addIsOpen = payload;
        },
    }
});


export const {toogleAdd} = addQuestionModalSlice.actions;

export default addQuestionModalSlice.reducer;