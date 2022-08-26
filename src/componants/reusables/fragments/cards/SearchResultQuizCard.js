import React from "react";
import { Link, useNavigate } from "react-router-dom";

import './cards.css'

function SearchResultQuizCard({data}) {

    const navigate = useNavigate();

    function getDifficulty(number) {
        switch(number) {
            case 1:
                return "very easy"
            case 2:
                return "easy";
            case 3:
                return "normal";
            case 4:
                return "hard";
            case 5:
                return "very hard";
            default:
                return "undefined";
        }
    }

    return (
        <div className="search-result-card-wrapper">
            <Link to={`/details/${data.id}`} >
                <div className="search-result-card">
                    <img src={data.imgURL ? data.imgURL : "https://www.viewstorm.com/wp-content/uploads/2014/10/default-img.gif"} placeholder="image"/>
                    <p>{data.title}</p>
                    <p>{getDifficulty(data.difficulty)}</p>
                    <p>{data.count} tries</p>
                </div>
            </Link>
            <button onClick={() => {
                localStorage.setItem("quiz", "");
                navigate(`/quiz/${data.id}`);
            }} >START</button>
        </div>
    );
}



export default SearchResultQuizCard;