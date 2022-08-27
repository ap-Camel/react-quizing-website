import React from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'

import UseApi from "../../../helpers/UseApi";
import getDifficulty from "../../../helpers/getDifficulty";

import TopQuizList from "../../reusables/containers/TopQuizList";
import PrvQuestionsList from '../../reusables/containers/PrvQuestionsList';

function PubQuizDetailsPage() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [examInfo, setExamInfo] = React.useState("");
    const [questions, setQuestions] = React.useState("");
    const [showQuestoins, setShowQuestions] = React.useState(false);
    // const [url, seturl] = React.useState(id);

    React.useEffect(() => {
        UseApi(`https://quizwebsite.azurewebsites.net/exam/${id}`, "GET", null, (res) => {
            setExamInfo(res);
        } )
    }, []);

    React.useEffect(() => {
        if(examInfo !== "") {
            UseApi(`https://quizwebsite.azurewebsites.net/question/onlyTitle?examID=${examInfo.id}`, "GET", null, res => {
                setQuestions(res);
            });
        }
    }, [examInfo]);

    React.useEffect(() => {
        if(examInfo !== "") {
            window.location.reload();
        }
    }, [id]);

    function handleStart(event) {
        event.preventDefault();
        localStorage.setItem("quiz", "");
        navigate(`/quiz/${id}`);
    }

    if(examInfo === "" || questions === "") {
        return(
            <div>
                wait for exam details
            </div>
        );
    }

    return (
        <div className="public-quiz-details-page-wrapper">
            <div className="public-quiz-info">
                <div className="public-qiuz-details">
                    <img src={examInfo.imgURL} />
                    <div className="public-quiz-details-information">
                        <Link to={`/user/${examInfo.username}`}><p>{examInfo.username}</p></Link>
                        <p>{examInfo.title}</p>
                        <p>{getDifficulty(examInfo.difficulty)}</p>
                        <p>{examInfo.duration} minutes</p>
                    </div>
                    <button  onClick={handleStart}>START</button>
                </div>
                <div className="public-quiz-showQuestions-button">
                    <button onClick={() => {setShowQuestions(prev => !prev)}}>Show Questions</button>
                </div>
                {
                    showQuestoins && (
                        <div className="public-quiz-questions">
                        {
                            questions.map((item, index) => {
                                return(
                                    <p key={index}>{index + 1}. {item}</p>
                                );
                            })
                        }
                        </div>
                    )
                }
            </div>
            <div>
                <TopQuizList />
            </div>
        </div>

    );
}



export default PubQuizDetailsPage;