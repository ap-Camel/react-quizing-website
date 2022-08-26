import React from "react";
import UseApi from "../../../helpers/UseApi";
import ExaminationInfo from "../../reusables/fragments/cards/ExaminationInfo";

function UserQuizHistoryPage() {


    const [examinations, setExaminations] = React.useState("");


    React.useEffect(() => {
        UseApi("https://quizwebsite.azurewebsites.net/examination", "GET", null, (res) => {
            setExaminations(res);
            console.log(res);
        })
    }, []);

    if(examinations === "") {
        return(
            <div>
                wait
            </div>
        )
    }

    return(
        <div>
            <div className="quiz-history-header">
                <h3>Quiz</h3>
                <h3>Date</h3>
                <h3>Result</h3>
            </div>
            <div className="quiz-history-items">
            {
                examinations.map(item => {
                    return(
                        <ExaminationInfo key={item.id} data={item}/>
                    );
                })
            }
            </div>
            
        </div>
    );
}

export default UserQuizHistoryPage;