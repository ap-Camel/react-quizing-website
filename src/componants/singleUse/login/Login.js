import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Login.css';

import Signup from './Signup';
import { setUser } from '../../../features/user/userSlice';


function Login() {

    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    const location = useLocation();

    const[loginForm, setLoginForm] = React.useState({
        email: "",
        password: ""
    });

    function handleForm(event) {
        setLoginForm(loginForm => {
            return {... loginForm, [event.target.name]: event.target.value}
        });
    }

    async function checkLogin(event) {
        event.preventDefault();
        
        const res = await fetch("https://quizwebsite.azurewebsites.net/auth", {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginForm)
        });

        switch(res.status) {
            case 200:
                const text = await res.json();

                if(localStorage.getItem("JWT") !== null) {
                    localStorage.setItem("JWT", text.jwt);
                } else {
                    localStorage.setItem("JWT", text.jwt);
                }

                console.log(text);

                dispatch(setUser(text.webUser));
            break;
            case 404:
                alert("email or password is wrong");
            break;
            case 500:
                alert("something went wrong, please try again or contact our support staff");
            break;
        }
    }

    return(
        <div className='wrapper'>
            {user.loggedIn && <Navigate to="/" state={{from: location}} replace={true} />}
            <form className='login-container' onSubmit={checkLogin}>
                <label>email</label>
                <input 
                    type="text"
                    name="email"
                    value={loginForm.email}
                    placeholder="email"
                    onChange={handleForm}
                />
                <label>password</label>
                <input 
                    type="text"
                    name="password"
                    value={loginForm.password}
                    placeholder="password"
                    onChange={handleForm}
                    />
                <button type='submit' >login</button>
                <Link to='/signup' > no account? signup</Link>
            </form>
        </div>
    );
}


export default Login;