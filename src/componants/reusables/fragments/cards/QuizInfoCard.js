import React from "react";
import { Link } from "react-router-dom";

function QuizInfoCard({data}) {
    return (
        <div>
            <Link to={`/quizDetails/${data.id}`}>
                <div>
                    <img src={data.imgURL} alt={data.title} />
                </div>
                <div>
                    <p>{data.id}</p>
                    <p>{data.title}</p>
                    <p>{data.count}</p>
                    <p>{data.difficulty}</p>
                    <p>{data.duration}</p>
                </div>
                <div>
                    <p>{data.dateCreated}</p>
                    <p>{data.dateUpdated}</p>
                </div>
            </Link>
        </div>
    );
}



export default QuizInfoCard;