import React from "react";

import {Link} from 'react-router-dom'

function ExaminationInfo({data}) {


    const atData = new Date(data.atDate);

    return(
        <Link to={`/quizHistory/${data.id}`} className="examination-info-wrapper">
            <p>{data.examTitle}</p>
            <p>{atData.toLocaleDateString()}  {atData.toLocaleTimeString()}</p>
            <p>{data.result}</p>
        </Link>
    );
}


export default ExaminationInfo;