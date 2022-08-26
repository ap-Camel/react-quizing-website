import React from "react";
import { useParams } from "react-router-dom";
import UseApi from "../../../helpers/UseApi";
import ExaminationAnswersInfo from "../../reusables/fragments/cards/ExaminationAnswersInfo";

function UserQuizHistoryDetailsPage() {

    const {id} = useParams();

    const [list, setList] = React.useState("");

    React.useEffect(() => {
        UseApi(`https://quizwebsite.azurewebsites.net/examination/${id}`, "GET", null, (res) => {
            setList(res);
            console.log(res);
        });
    }, []);

    if(list === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    if(!list) {
        return(
            <div>
                you have no answers
            </div>
        );
    }

    return(
        <div className="user-quiz-details-page-wrapper">
            {
                list.map(item => {
                    return(
                        <ExaminationAnswersInfo key={item.questionID} data={item} />
                    );
                })
            }
        </div>
    )
}


export default UserQuizHistoryDetailsPage;