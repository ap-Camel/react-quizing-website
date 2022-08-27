import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import './containers.css';

import TopListQuizCard from "../fragments/cards/TopListQuizCard";
import SearchButton from "../fragments/buttons/SearchButton";
import UseApi from "../../../helpers/UseApi";

import apiUrl from "../../../helpers/apiUrl";

function TopQuizList() {

    const {exams} = useSelector(store => store.examSearchResults);    
    const dispatch = useDispatch();

    const [topQuizes, setTopQuizes] = React.useState("");

    React.useEffect(() => {
        UseApi(`${apiUrl}/exam/topExams/${10}`, "GET", null, (res) => {
            setTopQuizes(res);
        })
    }, [])

    if(topQuizes === "") {
        return(
            <div>
                wait
            </div>
        );
    }

    return (
        <div className="top-list-wrapper">
            <div>
                <SearchButton placeholder="search exams" type="topList"/>
                <h4>Top Quizes</h4>
            </div>
            <div className="top-list">
                {topQuizes.map((item, index) => {
                    if(index < 6) {
                        return(
                            <TopListQuizCard key={item.id} data={item}/>
                        );
                    }
                })}
            </div>
        </div>
    );
}



export default TopQuizList;