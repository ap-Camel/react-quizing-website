import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import './containers.css';

import TopListQuizCard from "../fragments/cards/TopListQuizCard";
import SearchButton from "../fragments/buttons/SearchButton";

function TopQuizList() {

    const {exams} = useSelector(store => store.examSearchResults);
    const dispatch = useDispatch();

    return (
        <div className="container-topQuizList">
            <div>
                <SearchButton placeholder="search exams" type="topList"/>
                <h5>top quizes</h5>
            </div>
            <div>

            </div>
            {exams.map(item => {
                return(
                    <TopListQuizCard key={item.id} data={item}/>
                );
            })}
        </div>
    );
}



export default TopQuizList;