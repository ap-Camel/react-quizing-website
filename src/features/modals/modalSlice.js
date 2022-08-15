import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    addIsOpen: false,
    editIsOpen: false,
    deleteIsOpen: false
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toogleAdd: (state) => {
            state.addIsOpen = !state.addIsOpen;
        },
        toogleEdit: (state) => {
            state.editIsOpen = !state.editIsOpen;
        },
        toogleDelete: (state) => {
            state.deleteIsOpen = !state.deleteIsOpen;
        }
    }
});

export const { toogleAdd, toogleEdit, toogleDelete} = modalSlice.actions;

export default modalSlice.reducer;