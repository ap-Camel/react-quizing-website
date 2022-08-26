import React from "react";
import { useDispatch } from "react-redux";

import "./modals.css"

import UseApi from "../../../helpers/UseApi";
import { toogleAdd } from "../../../features/modals/modalSlice";
import useClickedOutside from "../../../hooks/useClickedOuside";
import { useNavigate } from "react-router-dom";

function AddModal({addObject, url, header}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addForm, setAddForm] = React.useState(addObject);
    const [elements, setElements] = React.useState(Object.keys(addForm));

    function handleChange(event) {
        const {name, value, type, checked } = event.target;
        setAddForm(editForm => {

            if(type === "select-one") {
                console.log(type);
                return {...addForm, [name]: {
                    name: addForm[name].name,
                    value: value,
                    type: addForm[name].type,
                    options: addForm[name].options
                }}
            }

            return {...addForm, [name]: {
                name: addForm[name].name,
                value: type === "checkbox" ? checked : value,
                type: type
            }};
        });
        console.log(addForm);
    }

    function checkInputFields() {
        for(const key in addForm) {
            if(!addForm[key].value) {
                alert("please fill in all the required fireld");
                return false;
            }
        }
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(checkInputFields()) {
            let temp = {};
            elements.map(key => {
                temp = {...temp, [key]: addForm[key].value};
            });
            // console.log(temp);
            //temp = {...temp, id: id};
            UseApi(url, "POST", JSON.stringify(temp), () => {
                dispatch(toogleAdd());
                window.location.reload();
            });
        }
    }

    function handleCancelButton(event) {
        event.preventDefault();
        dispatch(toogleAdd());
    }

    let modalRef = useClickedOutside(() => {
        dispatch(toogleAdd());
    })

    if(!addForm) {
        return(
            <div>
                something went wrong
            </div>
        );
    }

    return (
        <aside className="modal-container">
            <div ref={modalRef}  className="modal" >
                <h1>{header}</h1>
                <form onSubmit={handleSubmit}>
                    {
                        elements.map(item => {
                            if(addForm[item].type === "checkbox") {
                                return(
                                    <div className="element">
                                    <p>{addForm[item].name}</p>                                    
                                    <input 
                                    name={item}
                                    checked={addForm[item].value}
                                    onChange={handleChange}
                                    type={addForm[item].type}
                                    />
                                </div>
                                );
                            }

                            if(addForm[item].type === "select") {
                                return(
                                    <div className="element">
                                        <p>{addForm[item].name}</p>
                                        <select
                                            name={item}
                                            onChange={handleChange}
                                        >
                                            {
                                                addForm[item].options.map(item => {
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
                                    <p>{addForm[item].name}</p>                                    
                                    <input 
                                    name={item}
                                    value={addForm[item].value}
                                    onChange={handleChange}
                                    placeholder={addForm[item].name}
                                    type={addForm[item].type}
                                    />
                                </div>
                                
                            );
                        })
                    }
                    <div className="modal-buttons">
                        <button type="submit">ADD</button>
                        <button type="button" onClick={handleCancelButton}>CANCEL</button>
                    </div>
                </form>
            </div>
        </aside>
    );
}



export default AddModal;