import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { toogleAdd } from "../../../features/modals/modalSlice";
import useClickedOutside from "../../../hooks/useClickedOuside";
import UseApi from '../../../helpers/UseApi';

import "./questions.css";
import "../../reusables/modals/modals.css";

function AddQuestionModal({data, header}) {

    const addQuestionModal = useSelector(store => store.addQuestionModal);
    const modal = useSelector(store => store.modal);
    const dispatch = useDispatch();

    const [questionForm, setQuestionForm] = React.useState(
        {
            question: {
              question: "",
              difficulty: 1,
              questionType: "default",
              hasImage: false,
              imgUrl: null,
              examID: data.id
            },
            answers: [
              {
                correct: false,
                answer: "",
                active: true,
                hasImage: false,
                imgUrl: null
              }
            ]
          }
    );

    function handleQuestoinChange(event) {
        const {name, value} = event.target;
        setQuestionForm(prevForm => {
            return {...prevForm, question: {
                ...prevForm.question,
                [name]: value
            }}
        });
    }

    function handleAnswersChange(event) {
        const {name, value, type, checked, id} = event.target;
        let tempArr = questionForm.answers;
        tempArr[id] = {
            ...tempArr[id],
            [name]: type === "checkbox" ? checked : value
        }

        setQuestionForm(prevForm => {
            return {...prevForm, answers: tempArr}
        })
    }

    function addAnswer() {
        let tempAnswers = questionForm.answers.map(item => item);
        tempAnswers.push({
            correct: false,
            answer: "",
            active: true,
            hasImage: false,
            imgUrl: null
        });

        console.log(tempAnswers);
        console.log(questionForm);

        setQuestionForm(prevForm => {
            return {...prevForm, answers: tempAnswers}
        })
    }

    function removeAnswer(id) {
        let tempAnswers = questionForm.answers.filter((item, index) => {
            return index !== id;
        })
        setQuestionForm(prevForm => {
            return {...prevForm, answers: tempAnswers};
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(questionForm));
        UseApi("https://quizwebsite.azurewebsites.net/question/withAnswers", "POST", JSON.stringify(questionForm), (res) => {
            console.log("add was successful, res: " + res);
            dispatch(toogleAdd());
        })

    }

    let modalRef = useClickedOutside(() => {
        dispatch(toogleAdd());
    });

    return (
        <aside className="modal-container">
            <div ref={modalRef} className="modal">
                <h1>{header}</h1>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="element">

                    <p>question</p>
                    <input 
                        name="question"
                        type="text"
                        value={questionForm.question.question}
                        onChange={handleQuestoinChange}
                        placeholder="question"
                    />
                    </div>
                    <div className="element">
                    <p>difficulty</p>
                    <select
                    name="difficulty"
                    onChange={handleQuestoinChange}
                    >
                        <option value={1}>very easy</option>
                        <option value={2}>easy</option>
                        <option value={3}>normal</option>
                        <option value={4}>hard</option>
                        <option value={5}>very hard</option>
                    </select>
                    </div>
                    {
                        questionForm.answers.map((item, index) => {
                            return(
                                <div className="add-question-answer" key={index}>
                                    <div className="element">
                                    <p>answer</p>
                                    <input
                                        id={index}
                                        type="text"
                                        name="answer"
                                        value={questionForm.answers[index].answer}
                                        onChange={handleAnswersChange}
                                        placeholder="answer"
                                    />
                                    </div>
                                    <div className="element">
                                    <p>correct</p>
                                    <input 
                                        id={index}
                                        type="checkbox"
                                        name="correct"
                                        checked={questionForm.answers[index].correct}
                                        onChange={handleAnswersChange}
                                    />
                                    </div>
                                    <button type="button" onClick={() => removeAnswer(index)}>Remove Answer</button>
                                </div>
                            );
                        })
                    }
                    <div className="add-questions-buttons">
                        <button type="button" onClick={addAnswer}> Add New Answer </button>
                        <div className="add-questions-buttons-buttonss">
                        <button type="submit" >Add Questions</button>
                        <button type="button" onClick={() => {dispatch(toogleAdd())}}>Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
        </aside>
    );
}



export default AddQuestionModal;