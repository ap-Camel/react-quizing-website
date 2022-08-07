import { createSlice } from "@reduxjs/toolkit/";


const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    loggedIn: false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, {payload}) => {
            state.loggedIn = payload;
        },
        setUser: (state, {payload}) => {
            state.email = payload.email;
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.userName = payload.userName;
            state.loggedIn = true;
        }
    }
});


export const {setLogin, setUser} = userSlice.actions;

export default userSlice.reducer;