import React from "react";
import { useDispatch } from "react-redux";

import UseApi from "../../../helpers/UseApi";
import { toogleDelete } from "../../../features/modals/modalSlice";
import useClickedOutside from "../../../hooks/useClickedOuside";
import { useNavigate } from "react-router-dom";

function RemoveModal({url, header}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleDelete(choice) {

        if(choice === "confirm") {
            console.log("insode deleting");
            UseApi(url, "DELETE", null, () => {
                console.log("deleted");
                navigate(-1);
                dispatch(toogleDelete());
            })
        } 

        if(choice === "cancel") {
            console.log("was not deleted");
            dispatch(toogleDelete());
        }
    }

    let modalRef = useClickedOutside(() => {
        dispatch(toogleDelete());
    })

    return (
        <aside className="modal-container">
            <div ref={modalRef} className="modal">
                <h1>{header}</h1>
                <div className="modal-buttons">
                    <button onClick={() => {handleDelete("confirm")}} >CONFIRM</button>
                    <button onClick={() => {handleDelete("cancel")}}>CANCEL</button>
                </div>
            </div>
        </aside>
    );
}



export default RemoveModal;