import React from "react";

import './quiz.css'

import SearchResultList from "../../reusables/containers/SearchResultList";
import TopQuizList from "../../reusables/containers/TopQuizList";

function QuizSearchResultPage() {

    return(
        <div className="container-quizSearchResultPage">
            <SearchResultList />
            <TopQuizList />
        </div> 
    );
}


export default QuizSearchResultPage;