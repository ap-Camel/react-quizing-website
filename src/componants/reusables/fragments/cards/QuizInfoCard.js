import React from "react";
import { Link } from "react-router-dom";
import getDifficulty from "../../../../helpers/getDifficulty";

function QuizInfoCard({data}) {

    const dateCreated = new Date(data.dateCreated);
    const dateUpdated = new Date(data.dateUpdated);

    return (
        <div className="quiz-info-card-wrapper">
            <Link to={`/quizDetails/${data.id}`}>
                <div>
                    <img src={data.imgURL} alt={data.title} />
                </div>
                <div className="quiz-info-card-details">
                    <p>{data.title}</p>
                    <p>{getDifficulty(data.difficulty)}</p>
                    <p>{data.duration} minutes</p>
                </div>
                <div className="quiz-info-card-dates">
                    <p>Created</p>
                    <p>{dateCreated.toDateString()}</p>
                    <p>Updated</p>
                    <p>{dateUpdated.toDateString()}</p>
                </div>
            </Link>
        </div>
    );
}



export default QuizInfoCard;