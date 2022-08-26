import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import './SearchButton.css';
import useClickedOutside from "../../../../hooks/useClickedOuside";
import SearchIcon from "../icons/SearchIcon";

import { setSearchResults } from '../../../../features/exam/examSearchResults';


function SearchButton({placeholder, type}) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [searchFilter, setSearchFilter] = React.useState("");

    function handleChange(event) {
        setSearchFilter(searchfilter => event.target.value)
        console.log(searchFilter);
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            console.log('enter')
            handleSubmit();
        }
    }

    async function handleSubmit() {

        const res = await fetch(`https://localhost:7295/exam/search/${searchFilter}`, {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `bearer ${localStorage.getItem("JWT")}`
            },
            body: null
        });

        switch(res.status) {
            case 200:
                const text = await res.json();
                console.log(text);
                dispatch(setSearchResults(text));
                navigate('/search-results');
            break;
            case 400:
                console.log((await res.text()));
            break;
            case 401:
                console.log("you need to log in again");
            break;
            case 404:
                console.log("no entries found");
            break;
            case 500:
                console.log("internal server error");
            break;
            default:
                console.log(res.status);
            break;
        }
    }

    return(
        <div className="search-input-container">
            <div className={type === "home" ? "search-input search-input-home" : "search-input search-input-topList"}>
                <input 
                type="text"
                value={searchFilter}
                onChange={handleChange}
                onKeyDown={(e) => something(e) }
                placeholder={placeholder}
                />
                <div className={type === "home" ? "search-icon" : "search-icon-top-list"}>
                    <SearchIcon />
                </div>
            </div>
        </div>
    );
}


export default SearchButton;