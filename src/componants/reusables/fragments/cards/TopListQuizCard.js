import React from "react";
import { Link } from "react-router-dom";

function TopListQuizCard({data}) {


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
        <div className="top-list-card-wrapper">
            <Link to={`/details/${data.id}`}>
                <div>
                    <img src={data.imgURL}/>
                </div>
                <div className="top-list-card-info">
                    <p>{data.title}</p>
                    <p>{getDifficulty(data.difficulty)}</p>
                    <p>{data.count} tries</p>
                </div>
            </Link>
        </div>
    );
}



export default TopListQuizCard;