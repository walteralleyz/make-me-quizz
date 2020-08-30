import React, { useCallback, useEffect, useState } from "react";

import { GET } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";
import { getLogin } from "../helpers/auth";

function Categories() {
    const [questions, setQuestions] = useState(false);

    const searchString = window.location.search.split("?c=")[1];
    const user = getLogin();

    const memoized = useCallback(() => {
        GET({
            url:
                URL_LIST.base +
                URL_LIST.categories +
                "/" +
                searchString.toLocaleLowerCase(),
            token: "Bearer " + user.token,
        }).then((response) => {
            setQuestions(response.result);
        });
    }, [searchString, user.token]);

    useEffect(() => {
        memoized();
    }, [memoized]);

    return (
        <>
            {questions &&
                questions.map((question, index) => (
                    <div className="question-holder" key={`question-${index}`}>
                        <p className="question-holder__question">
                            {question.pergunta}
                        </p>
                        <ul className="question-holder__choices">
                            <li>{question.escolhas.a}</li>
                            <li>{question.escolhas.b}</li>
                            <li>{question.escolhas.c}</li>
                            <li>{question.escolhas.d}</li>
                            <li>{question.escolhas.e}</li>
                        </ul>
                    </div>
                ))}
        </>
    );
}

export default Categories;
