import React from "react";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

import UseApi from "../../../helpers/UseApi";
import {toogleAdd, toogleDelete, toogleEdit} from "../../../features/modals/modalSlice";
// import { setEditModal } from "../../../features/modals/editModalSlice";

import QuizInfoCard from "../../reusables/fragments/cards/QuizInfoCard";
import PrvQuestionInfo from "../../reusables/fragments/cards/PrvQuestionInfo";
import AddQuestionModal from "../questions/AddQuestionModal";
import RemoveModal from '../../reusables/modals/RemoveModal';
import EditModal from "../../reusables/modals/EditModal";

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

    // function handleEdit() {
    //     let temp = {};
    //     for(const key in editObject) {
    //         temp = {...temp, [key]: {
    //             name: editObject[key].name,
    //             default: examInfo[key],
    //             type: editObject[key].type
    //         }} 
    //     }

    //     temp = {
    //         edit: temp,
    //         id: examInfo.id
    //     }

    //     console.log(examInfo);
    //     dispatch(setEditModal(temp));
    //     dispatch(toogleEdit());
    // }

    let editObject = {
        title: {
            value: examInfo.title,
            type: "text",
            name: "title"
        },
        numOfQuestions: {
            value: examInfo.numOfQuestions,
            type: "number",
            name: "num of Questoins"
        },
        duration: {
            value: examInfo.duration,
            type: "number",
            name: "duration"
        },
        active: {
            value: examInfo.active,
            type: "checkbox",
            name: "active"
        },
        difficulty: {
            value: examInfo.difficulty,
            type: "number",
            name: "difficulty"
        },
        imgURL: {
            value: examInfo.imgURL,
            type: "text",
            name: "URL"
        }
    }

    if(examInfo === "" || questions === "") {
        return(
            <div>
                wait for exam details
            </div>
        );
    }

    return (
        <div>
            {modal.addIsOpen && <AddQuestionModal data={examInfo} />}
            {modal.deleteIsOpen && <RemoveModal url={`https://localhost:7295/exam/${examInfo.id}`} />}
            {modal.editIsOpen && <EditModal id={examInfo.id} editObject={editObject} url={`https://localhost:7295/exam`} />}
            <div>
                <button onClick={() => {dispatch(toogleDelete())}}>remove</button>
                <button onClick={() => {
                    console.log(editObject);
                    dispatch(toogleEdit())
                    }}>edit</button>
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