import React from "react";
import { useDispatch } from "react-redux";

import "./modals.css"

import UseApi from "../../../helpers/UseApi";
import { toogleAdd } from "../../../features/modals/modalSlice";
import useClickedOutside from "../../../hooks/useClickedOuside";
import { useNavigate } from "react-router-dom";

function AddModal({addObject, url}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addForm, setAddForm] = React.useState(addObject);
    const [elements, setElements] = React.useState(Object.keys(addForm));

    function handleChange(event) {
        const {name, value, type, checked } = event.target;
        setAddForm(editForm => {
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
                <form onSubmit={handleSubmit}>
                    {
                        elements.map(item => {
                            if(addForm[item].type === "checkbox") {
                                return(
                                    <>
                                    <p>{addForm[item].name}</p>                                    
                                    <input 
                                    name={item}
                                    checked={addForm[item].value}
                                    onChange={handleChange}
                                    type={addForm[item].type}
                                    />
                                </>
                                );
                            }
                            return(
                                <>
                                    <p>{addForm[item].name}</p>                                    
                                    <input 
                                    name={item}
                                    value={addForm[item].value}
                                    onChange={handleChange}
                                    placeholder={addForm[item].name}
                                    type={addForm[item].type}
                                    />
                                </>
                                
                            );
                        })
                    }
                    <button>add</button>
                </form>
            </div>
        </aside>
    );
}



export default AddModal;