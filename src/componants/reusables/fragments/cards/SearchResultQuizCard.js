import React from "react";
import { Link, useNavigate } from "react-router-dom";

import './cards.css'

function SearchResultQuizCard({data}) {

    const navigate = useNavigate();

    return (
        <div className="container-searchResultQuizCard">
            <Link to='/' >
                <div className="searchResultQuizCard">
                    <img src={data.imgURL} />
                    <p>{data.title}</p>
                    <p>{data.difficulty}</p>
                    <p>{data.count}</p>
                </div>
            </Link>
            <button onClick={() => {navigate(`/quiz/${data.id}`)}} >start</button>
        </div>
    );
}



export default SearchResultQuizCard;