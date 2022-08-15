import React from "react";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

import UseApi from "../../../helpers/UseApi";
import {toogleAdd} from "../../../features/modals/modalSlice";

import QuizInfoCard from "../../reusables/fragments/cards/QuizInfoCard";
import PrvQuestionInfo from "../../reusables/fragments/cards/PrvQuestionInfo";
import AddQuestionModal from "../questions/AddQuestionModal";

function PrvQuizDetailsPage() {

    const addModal = useSelector(store => store.addQuestionModal);
    const modal = useSelector(store => store.modal);
    const dispatch = useDispatch();

    const {id} = useParams();

    const [examInfo, setExamInfo] = React.useState("");
    const [questions, setQuestions] = React.useState("");

    React.useEffect(() => {
        UseApi(`https://localhost:7295/exam/${id}`, "GET", null, (res) => {
            setExamInfo(res);
        } )
    }, []);

    React.useEffect(() => {
        if(examInfo !== "") {
            UseApi(`https://localhost:7295/question/withAnswers?examID=${examInfo.id}`, "GET", null, res => {
                setQuestions(res);
            });
        }
    }, [examInfo]);

    function handleAddQuestion() {
        console.log("inside handle add ");
        console.log(addModal.addIsOpen);
        dispatch(toogleAdd());
    }

    //console.log(examInfo);
    //console.log(questions);

    if(examInfo === "" || questions === "") {
        return(
            <div>
                wait for exam details
            </div>
        );
    }

    return (
        <div>
            {modal.addIsOpen && <AddQuestionModal />}
            <div>
                <button>remove</button>
                <button>edit</button>
            </div>
            <div>
                <QuizInfoCard data={examInfo} />
            </div>
            <div>
                <button onClick={handleAddQuestion}>add new</button>
            </div>
            <div>
                {
                    questions.map(item => {
                        return(
                            <PrvQuestionInfo key={item.question.id} data={item}/>
                        );
                    })
                }
            </div>
        </div>
    );
}



export default PrvQuizDetailsPage;