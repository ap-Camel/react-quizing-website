import { createSlice } from "@reduxjs/toolkit/";


if(!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify({
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        loggedIn: false
    }));
}

const initialState = JSON.parse(localStorage.getItem("user"));


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
            localStorage.setItem("user", JSON.stringify(state));
        }
    }
});


export const {setLogin, setUser} = userSlice.actions;

export default userSlice.reducer;