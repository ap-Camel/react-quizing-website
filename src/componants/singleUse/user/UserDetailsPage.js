import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toogleEdit, toogleEditUsername } from "../../../features/modals/modalSlice";
import { logout } from "../../../features/user/userSlice";

import "./user.css"

import EditModal from "../../reusables/modals/EditModal";
import UseApi from "../../../helpers/UseApi";

function UserDetailsPage() {

    const modal = useSelector(store => store.modal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = React.useState("");

    React.useEffect(() => {
        UseApi("https://localhost:7295/webUser", "GET", null, (res) => {
            setUser(res);
        });
    }, []);

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }

    let editObject = {
        firstName: {
            value: user.firstName,
            type: "text",
            name: "first name"
        },
        lastName: {
            value: user.lastName,
            type: "text",
            name: "last name"
        }
    }

    let editUsernameObject = {
        username: {
            value: user.userName,
            type: "text",
            name: "username"
        }
    }

    return(
        <div className="user-details-page-warapper">
            { modal.editIsOpen && <EditModal url={"https://localhost:7295/webUser"} editObject={editObject} />}
            { modal.editUsernameIsOpen && <EditModal editObject={editUsernameObject} />}
            <div className="user-details-page-header">
            <button onClick={() => {dispatch(toogleEdit())}}>update info</button>
            <button onClick={handleLogout}>log out</button>
            </div>
            <div className="element">
            <p>email</p>
            <p>{user.email}</p>
            </div>
            <div className="element">
            <p>name</p>
            <p>{`${user.firstName} ${user.lastName}`}</p>
            </div>
            <div className="element">
            <p>username</p>
            <p>{user.userName}</p>
            </div>
            <div className="user-details-page-buttons">
            <button onClick={() => {dispatch(toogleEditUsername())}}>change username</button>
            </div>
            
        </div>
    );
}


export default UserDetailsPage;