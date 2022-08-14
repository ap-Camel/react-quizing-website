import React from "react";
import { Link } from "react-router-dom";

function TopListQuizCard({data}) {
    return (
        <div className="container-topListQuizCard">
            <Link to="/">
                <div>
                    <img src={data.imgURL}/>
                </div>
                <div className="topListQuizCard-data">
                    <p>{data.title}</p>
                    <p>{data.difficulty}</p>
                    <p>{data.count}</p>
                </div>
            </Link>
        </div>
    );
}



export default TopListQuizCard;