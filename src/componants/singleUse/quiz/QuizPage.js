import React from "react";
import { useNavigate, useParams } from 'react-router-dom'

import UseApi from '../../../helpers/UseApi';

function QuizPage() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [quizData, setQuizData] = React.useState("");
    const [quiz, setQuiz] = React.useState("");
    const [remainingTime, setRemianingTime] = React.useState("");

    React.useEffect(() => {
        if(localStorage.getItem("quiz") === "") {
            UseApi(`https://localhost:7295/quiz/${id}`, "GET", null, (res) => {
            setQuizData(res);
            setRemianingTime(res.duration);
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

    React.useEffect(() => {
        const interval = setInterval(() => {
            updateRemainingTime();
        }, 60000);

        return () => clearInterval(interval)
    }, [])

    function updateRemainingTime() {
        setRemianingTime(prev => {
            return prev - 1;
        })
    }

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
        let answer = window.confirm("are you sure you want to submit?");
        console.log(answer);
        if(answer) {
            UseApi("https://localhost:7295/quiz", "POST", JSON.stringify(quiz), (res) => {
            alert(res);
            navigate(-1);
        });
        }
    }



    if(quizData === "" || quiz === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    return (
        <div className="quiz-page-wrapper">
            <div>
                <h2>{remainingTime} minutes remaining</h2>
            </div>
            {
                quizData.quiz.map((question, index) => {
                    return(
                        <div className="quiz-page-questions" key={question.questionID} id={`${question.questionID}`}>
                            <h3>{index + 1}) {question.question}</h3>
                            {
                                question.answers.map((answer, index) => {
                                    return(
                                        <p key={index} id={index} onClick={event => handleAnswerClick(event, answer,question.questionID)}>{String.fromCharCode(index + 65)}) {answer}</p>
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