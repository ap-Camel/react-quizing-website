import React  from "react";
import './Home.css';

import SearchButton from "../../reusables/fragments/buttons/SearchButton";

function Home() {

    return (
        <div className="container">
            <SearchButton placeholder='search exams' type="home" />
        </div>
    );
}


export default Home;