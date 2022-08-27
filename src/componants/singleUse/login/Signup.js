import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import './Login.css';

import apiUrl from '../../../helpers/apiUrl'

function Signup() {

    const user = useSelector( state => state.user);
    const dispatch = useDispatch();

    const location = useLocation();

    const[signupForm, setSignupForm] = React.useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        userPassword: "",
        repeatPassword: ""
    });
    const [navigate, setNavigate] = React.useState(false);


    function handleForm(event) {
        setSignupForm(signupForm => {
            return {... signupForm, [event.target.name]: event.target.value}
        })
    }

    async function signup(event) {
        event.preventDefault();

        if(checkPassword() && checkInputFields()) {
            const res = await fetch(`${apiUrl}/webUser`, {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signupForm)
            });

            console.log(res.status);
            console.log(res);

            switch(res.status) {
                case 201: 
                    alert("your account has been created");
                    setNavigate(true);
                break;
                case 409:
                    alert((await res.text()));
                break;
                case 500:
                    alert("something went wrong, please try again later or contact our support staff");
                break;
                case 400:
                    const object = (await res.json()).errors;
                    const messages = Object.values(object);
                    alert(messages);
                break;
            }
        }
    }


    function checkPassword() {
        if(signupForm.userPassword !== signupForm.repeatPassword) {
            alert("the passwords do not match");
            return false;
        }

        return true;
    }

    function checkInputFields() {
        const {firstName, lastName, userRole, userPassword} = signupForm;
        if(firstName === "" || lastName === "" || userRole === "" || userPassword === "") {
            alert("please fill in all of the fields");
            return false;
        }
        return true;
    }



    return(
        <div className='wrapper'>
            <form className='login-container' onSubmit={signup} >
                {navigate && (<Navigate to="/login" state={{from: location}} replace={true}/>)}
                <label>first name</label>
                <input
                    type='text'
                    name="firstName"
                    value={signupForm.firstName}
                    onChange={handleForm}
                    placeholder="first name"

                />
                <label>last name</label>
                <input 
                    type="text"
                    name="lastName"
                    value={signupForm.lastName}
                    onChange={handleForm}
                    placeholder="last name"

                />
                <label>email</label>
                <input
                    type="text"
                    name="email"
                    value={signupForm.email}
                    onChange={handleForm}
                    placeholder="example@example.com"
                />
                <label>username</label>
                <input
                    type="text"
                    name="userName"
                    value={signupForm.userName}
                    onChange={handleForm}
                    placeholder="usrname"
                />
                <label>password</label>
                <input 
                    type="password"
                    name="userPassword"
                    value={signupForm.userPassword}
                    onChange={handleForm}
                    placeholder="password"
                />
                <label>repeat password</label>
                <input 
                    type="password"
                    name="repeatPassword"
                    value={signupForm.repeatPassword}
                    onChange={handleForm}
                    placeholder="repeat password"
                />
                <button type='submit' >signup</button>
            </form>
        </div>
    );
}


export default Signup;