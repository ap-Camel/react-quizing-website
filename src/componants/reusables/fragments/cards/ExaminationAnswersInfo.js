import React from "react";

function ExaminationAnswersInfo({data}) {
    return(
        <div className="examination-answer-info-wrapper">
            <h3>{data.question}</h3>
            <p>{data.answer}</p>
            <p>{data.correct ? "correct" : "wrong"}</p>
        </div>
    );
}


export default ExaminationAnswersInfo;