import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import './containers.css';

import SearchResultQuizCard from "../fragments/cards/SearchResultQuizCard";

function SearchResultList() {

    const {exams} = useSelector(store => store.examSearchResults);
    const dispatch = useDispatch();


    return (
        <div className="search-results-list-wrapper">
            <div>
                <h5>searchresults</h5>
            </div>
            <div className="search-results">
                {exams.map(item => {
                    return(
                        <SearchResultQuizCard key={item.id} data={item} />
                    );
                })}
            </div>
        </div>
    );
}



export default SearchResultList;