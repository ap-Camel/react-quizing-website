import React from "react";
import { useDispatch, useSelector } from "react-redux";

import useClickedOutside from "../../../hooks/useClickedOuside";
import { toogleEdit, toogleEditUsername } from "../../../features/modals/modalSlice";
import UseApi from "../../../helpers/UseApi";

function EditModal({editObject, url, id, header}) {

    const dispatch = useDispatch();
    const editModal = useSelector(store => store.editModal);

    
    const [editForm, setEditForm] = React.useState(editObject);
    const [elements, setElements] = React.useState(Object.keys(editForm));
    

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     dispatch(toogleEdit());
    // }

    function handleChange(event) {
        const {name, value, type, checked } = event.target;

        setEditForm(editForm => {

            if(type === "select-one") {
                console.log(value);
                return {...editForm, [name]: {
                    name: editForm[name].name,
                    value: value,
                    type: editForm[name].type,
                    options: editForm[name].options
                }}
            }

            return {...editForm, [name]: {
                name: editForm[name].name,
                value: type === "checkbox" ? checked : value,
                type: type
            }};
        });
        console.log(editForm);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(checkInputFields()) {
            let temp = {};
            elements.map(key => {
                temp = {...temp, [key]: editForm[key].value};
            });
            // console.log(temp);
            temp = {...temp, id: id};
            UseApi(url, "PUT", JSON.stringify(temp));
            dispatch(toogleEdit());
        }
    }

    function checkInputFields() {
        for(const key in editForm) {
            if(!editForm[key].value) {
                alert("please fill in all the required fireld");
                return false;
            }
        }
        return true;
    }

    function handleCancelButton(event) {
        event.preventDefault();
        if(elements[0] === "username") {
            dispatch(toogleEditUsername());
        } else {
            dispatch(toogleEdit());
        }
    }

    let modalRef = useClickedOutside(() => {
        console.log(elements[0]);
        if(elements[0] === "username") {
            dispatch(toogleEditUsername());
        } else {
            dispatch(toogleEdit());
        }
    })

    if(!editForm) {
        return(
            <div>
                something went wrong
            </div>
        );
    }

    return (
        <aside className="modal-container">
            <div ref={modalRef} className="modal">
                <form onSubmit={handleSubmit}>
                    <h1>{header}</h1>
                    {
                        elements.map(item => {
                            if(editForm[item].type === "checkbox") {
                                return(
                                    <div className="element">
                                    <p>{editForm[item].name}</p>                                    
                                    <input 
                                    name={item}
                                    checked={editForm[item].value}
                                    onChange={handleChange}
                                    type={editForm[item].type}
                                    />
                                </div>
                                );
                            }

                            if(editForm[item].type === "select") {
                                return(
                                    <div className="element">
                                        <p>{editForm[item].name}</p>
                                        <select
                                            name={item}
                                            onChange={handleChange}
                                        >
                                            {
                                                editForm[item].options.map(item => {
                                                    return(
                                                        <option value={item.value}>{item.option}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                            }

                            return(
                                <div className="element">
                                    <p>{editForm[item].name}</p>                                    
                                    <input 
                                    name={item}
                                    value={editForm[item].value}
                                    onChange={handleChange}
                                    placeholder={editForm[item].name}
                                    type={editForm[item].type}
                                    />
                                </div>
                                
                            );
                        })
                    }
                    <div className="modal-buttons">
                        <button type="submit">EDIT</button>
                        <button type="button" onClick={handleCancelButton}>CANCEL</button>
                    </div>
                    
                </form>
            </div>
        </aside>
    );
}



export default EditModal;