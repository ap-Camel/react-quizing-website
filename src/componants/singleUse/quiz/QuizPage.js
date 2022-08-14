import React from "react";
import { useParams } from 'react-router-dom'

import UseApi from '../../../helpers/UseApi';

function QuizPage() {

    const {id} = useParams();

    const [quizData, setQuizData] = React.useState("");

    React.useEffect(() => {
        UseApi(`https://localhost:7295/quiz/${id}`, "GET", null, (res) => {
            setQuizData(res);
        })
    }, []);

    if(quizData === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    return (
        <div>
            {
                quizData.examID
            }
        </div>
    );
}



export default QuizPage;