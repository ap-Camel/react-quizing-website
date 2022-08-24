import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    addIsOpen: false,
    editIsOpen: false,
    deleteIsOpen: false,
    editUsernameIsOpen: false
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
        },
        toogleEditUsername: (state) => {
            state.editUsernameIsOpen = !state.editUsernameIsOpen;
        }
    }
});

export const { toogleAdd, toogleEdit, toogleDelete, toogleEditUsername} = modalSlice.actions;

export default modalSlice.reducer;