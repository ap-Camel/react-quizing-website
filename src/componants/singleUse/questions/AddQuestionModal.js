import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { toogleAdd } from "../../../features/modals/modalSlice";
import useClickedOutside from "../../../hooks/useClickedOuside";

import "./questions.css";

function AddQuestionModal() {

    const addQuestionModal = useSelector(store => store.addQuestionModal);
    const modal = useSelector(store => store.modal);
    const dispatch = useDispatch();

    function handleAddQuestion(event) {
        event.preventDefault();
        dispatch(toogleAdd());
    }

    let modalRef = useClickedOutside(() => {
        dispatch(toogleAdd());
    });

    return (
        <aside ref={modalRef} className="modal-container">
            <form className="modal">
                <button onClick={handleAddQuestion}>add</button>
            </form>
        </aside>
    );
}



export default AddQuestionModal;