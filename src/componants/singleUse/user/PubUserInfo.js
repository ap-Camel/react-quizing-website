import React from "react";
import { useParams } from "react-router-dom";
import UseApi from "../../../helpers/UseApi";
import SearchResultQuizCard from "../../reusables/fragments/cards/SearchResultQuizCard";

function PubUserInfo() {

    const {username} = useParams();

    const [list, setList] = React.useState("");

    React.useEffect(() => {
        UseApi(`https://quizwebsite.azurewebsites.net/exam/username/${username}`, "GET", null, (res) => {
            setList(res);
            console.log(res);
        })
    }, []);


    if(list === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    return(
        <div className="public-user-info-wrapper">
            <h2>{username}</h2>
            <div className="search-results">
            {
                list.map(item => {
                    return(
                        <SearchResultQuizCard data={item} />
                    );
                })
            }
            </div>
        </div>
    )
}


export default PubUserInfo;