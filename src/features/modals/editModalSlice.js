import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    edit: {

    },
    id: 0
}


const editModalSlice = createSlice({
    name: "editModal",
    initialState,
    reducers: {
        setEditModal: (state, {payload}) => {
            state.edit = payload.edit;
            state.id = payload.id;
        }
    }
});

export const { setEditModal } = editModalSlice.actions;

export default editModalSlice.reducer;