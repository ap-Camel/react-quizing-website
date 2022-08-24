import React from "react";
import { useParams } from 'react-router-dom'

import UseApi from "../../../helpers/UseApi";

import TopQuizList from "../../reusables/containers/TopQuizList";
import PrvQuestionsList from '../../reusables/containers/PrvQuestionsList';

function PubQuizDetailsPage() {

    const {id} = useParams();

    const [examInfo, setExamInfo] = React.useState("");
    const [questions, setQuestions] = React.useState("");
    const [showQuestoins, setShowQuestions] = React.useState(false);

    React.useEffect(() => {
        UseApi(`https://localhost:7295/exam/${id}`, "GET", null, (res) => {
            setExamInfo(res);
        } )
    }, []);

    React.useEffect(() => {
        if(examInfo !== "") {
            UseApi(`https://localhost:7295/question/onlyTitle?examID=${examInfo.id}`, "GET", null, res => {
                setQuestions(res);
            });
        }
    }, [examInfo]);

    if(examInfo === "" || questions === "") {
        return(
            <div>
                wait for exam details
            </div>
        );
    }

    return (
        <div>
            <div>
                <div>
                    <div>
                        <img src={examInfo.imgURL} />
                        <div>
                            <p>{examInfo.title}</p>
                            <p>{examInfo.count}</p>
                            <p>{examInfo.difficulty}</p>
                            <p>{examInfo.duration}</p>
                        </div>
                        <button>start</button>
                    </div>
                    <div>
                        <button onClick={() => {setShowQuestions(prev => !prev)}}>show questions</button>
                    </div>
                </div>
                {
                    showQuestoins && (
                        <div>
                        {
                            questions.map((item, index) => {
                                return(
                                    <p key={index}>{item}</p>
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