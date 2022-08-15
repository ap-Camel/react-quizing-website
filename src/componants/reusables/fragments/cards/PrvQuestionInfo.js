import React from "react";

function PrvQuestionInfo({data}) {
    return (
        <div>
            <div>
                <h4>{data.question.question}</h4>                
            </div>
            <div>
                {
                    data.answers.map(item => {
                        return(
                            <div>
                                <p>{item.answer}</p>
                                <p>{item.correct ? "correct" : "wrong"}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}



export default PrvQuestionInfo;