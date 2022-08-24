import React from "react";
import { useNavigate, useParams } from 'react-router-dom'

import UseApi from '../../../helpers/UseApi';

function QuizPage() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [quizData, setQuizData] = React.useState("");
    const [quiz, setQuiz] = React.useState("");

    React.useEffect(() => {
        if(localStorage.getItem("quiz") === "") {
            UseApi(`https://localhost:7295/quiz/${id}`, "GET", null, (res) => {
            setQuizData(res);
            localStorage.setItem("quiz", JSON.stringify(res));
        });
        } else {
            setQuizData(JSON.parse(localStorage.getItem("quiz")));
        }
    }, []);

    React.useEffect(() => {
        if(quizData !== "") {
            setQuiz({
                examID: quizData.examID,
                quiz: [],
                examinationID: quizData.examinationID
            });
        }
        
    }, [quizData]);

    React.useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
      }, []);

    function handleAnswerClick(event, answer, questionID) {
        let question = document.getElementById(questionID);
        let childeren = question.getElementsByTagName('p');
        for(let i = 0; i < childeren.length; i++) {
            childeren[i].style.backgroundColor = "#fff";
        }
        //
        let element = event.target;
        element.style.backgroundColor = "#333";
        setQuiz(prev => {
            let temp = prev.quiz;
            let add = true;
            for(let i = 0; i < temp.length; i++) {
                if(temp[i].questionID === questionID) {
                    temp[i].answer = answer;
                    add = false;
                    break;
                }
            }
            if(add) {
                temp.push({
                    questionID: questionID,
                    answer: answer
                });
            }
            console.log(temp);
            return {...prev, quiz: temp }
        });
        console.log(quiz);
    }

    function handleSubmit(event) {
        event.preventDefault();
        UseApi("https://localhost:7295/quiz", "POST", JSON.stringify(quiz), (res) => {
            alert(res);
        });
    }



    if(quizData === "" || quiz === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    return (
        <div>
            {
                quizData.quiz.map((question, index) => {
                    return(
                        <div key={question.questionID} id={`${question.questionID}`}>
                            <h3>{question.question}</h3>
                            {
                                question.answers.map((answer, index) => {
                                    return(
                                        <p key={index} id={index} onClick={event => handleAnswerClick(event, answer,question.questionID)}>{answer}</p>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
            <button onClick={handleSubmit} >SUBMIT</button>
        </div>
    );
}



export default QuizPage;