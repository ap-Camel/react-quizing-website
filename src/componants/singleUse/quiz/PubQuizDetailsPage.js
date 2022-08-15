import React from "react";
import { useParams } from 'react-router-dom'

function PubQuizDetailsPage() {

    const {id} = useParams();


    return (
        <div>
            {id}
        </div>

    );
}



export default PubQuizDetailsPage;