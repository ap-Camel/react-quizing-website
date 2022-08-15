import React from "react";
import QuizInfoCard from "../../reusables/fragments/cards/QuizInfoCard";

import UseApi from "../../../helpers/UseApi";

function UserQuizesPage() {

    const [userQuizes, setUserQuizes] = React.useState("");

    React.useEffect(() => {

        UseApi("https://localhost:7295/exam", "GET", null, (res) => {
            setUserQuizes(res);
        })
    }, []);



    if(userQuizes === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    return (
        <div>
            <div>
                <button>add new</button>
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