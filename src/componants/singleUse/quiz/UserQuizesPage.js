import React from "react";
import { useDispatch, useSelector } from "react-redux";

import QuizInfoCard from "../../reusables/fragments/cards/QuizInfoCard";
import AddModal from "../../reusables/modals/AddModal";

import UseApi from "../../../helpers/UseApi";
import { toogleAdd } from '../../../features/modals/modalSlice';
 
function UserQuizesPage() {

    const modal = useSelector(store => store.modal);
    const dispatch = useDispatch();

    const [userQuizes, setUserQuizes] = React.useState("");

    React.useEffect(() => {

        UseApi("https://quizwebsite.azurewebsites.net/exam", "GET", null, (res) => {
            setUserQuizes(res);
        })
    }, []);

    function handleAddExam(event) {
        console.log("adding new exam");
        dispatch(toogleAdd());
    }

    let addObject = {
        title: {
            value: "",
            type: "text",
            name: "title"
        },
        numOfQuestions: {
            value: 10,
            type: "number",
            name: "num of Questoins"
        },
        duration: {
            value: 60,
            type: "number",
            name: "duration"
        },
        active: {
            value: true,
            type: "checkbox",
            name: "active"
        },
        difficulty: {
            value: 3,
            type: "select",
            name: "difficulty",
            options: [
                {
                    value: 1,
                    option: "very easy"
                },
                {
                    value: 2,
                    option: "easy"
                },
                {
                    value: 3,
                    option: "normal"
                },
                {
                    value: 4,
                    option: "hard"
                },
                {
                    value: 5,
                    option: "very hard"
                },
            ]
        },
        imgURL: {
            value: "https://www.viewstorm.com/wp-content/uploads/2014/10/default-img.gif",
            type: "text",
            name: "URL"
        }
    }



    if(userQuizes === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    return (
        <div className="user-quiz-page-wrapper">
            {modal.addIsOpen && <AddModal addObject={addObject} url="https://quizwebsite.azurewebsites.net/exam" header={"New Quiz"}/>}
            <div className="user-quiz-page-button">
                <button onClick={handleAddExam}>Add New</button>
            </div>
            <div>
                {
                    userQuizes.map(item => {
                        return(
                            <QuizInfoCard key={item.id} data={item} />
                        );
                    })
                }
            </div>
        </div>
    );
}



export default UserQuizesPage;