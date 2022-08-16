import React from "react";
import { useDispatch } from "react-redux";

import UseApi from "../../../helpers/UseApi";
import { toogleDelete } from "../../../features/modals/modalSlice";
import useClickedOutside from "../../../hooks/useClickedOuside";

function RemoveModal({url}) {
    const dispatch = useDispatch();

    function handleDelete(choice) {

        if(choice === "confirm") {
            UseApi(url, "DELETE", null, (res) => {
                console.log("deleted, res: " + res);
                dispatch(toogleDelete());
            })
        }

        console.log("was not deleted");
        dispatch(toogleDelete());
    }

    let modalRef = useClickedOutside(() => {
        dispatch(toogleDelete());
    })

    return (
        <aside className="modal-container">
            <div ref={modalRef} className="modal">
                <button onClick={() => {handleDelete("confirm")}} >confirm</button>
                <button onClick={() => {handleDelete("cancel")}}>cancel</button>
            </div>
        </aside>
    );
}



export default RemoveModal;