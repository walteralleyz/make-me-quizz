import React, { useCallback, useEffect, useState } from "react";

import { GET, POST } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";
import { getLogin, saveLogin } from "../helpers/auth";

import Button from "../components/reusable/button";
import Check from "../images/checked.png";
import Breadcrumb from "../components/reusable/breadcrumb";
import Notify from "../components/reusable/notify";

import Fausto from "../images/gif/fausto.gif";

function Categories() {
    const [questions, setQuestions] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [notify, setNotify] = useState(false);
    const [user, setUser] = useState(getLogin());

    const searchString = window.location.search.split("?c=")[1];

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

    const handleSubmit = () => {
        if (answer.id && answer.answer) {
            POST({
                url: URL_LIST.base + URL_LIST.check + "/" + user.id,
                method: "POST",
                token: "Bearer " + user.token,
                body: JSON.stringify(answer),
            })
                .then((response) => {
                    if(response.message) {
                        let tempUser = {
                            ...user,
                            questionDone: user.questionDone + "," + answer.id,
                            points: parseInt(user.points) + 1
                        };
                        saveLogin(tempUser);
                        setUser(tempUser);
                        setNotify({
                            title: "Resposta correta",
                            content: "Você respondeu corretamente",
                            type: "success"
                        });

                        return false;
                    }
                    
                    setNotify({
                        title: "Você errou!",
                        content: <img src={Fausto} alt="faustao" />,
                        type: "danger"
                    });
                })
                .catch((err) => setNotify({
                    title: "Você errou",
                    content: <img src={Fausto} alt="faustao" />,
                    type: "danger"
                }));
        }
    };

    useEffect(() => {
        memoized();
    }, [memoized]);

    return (
        <>
            <Breadcrumb />
            <Notify
                visible={notify}
                title={notify && notify.title}
                content={notify && notify.content}
                type={notify && notify.type}
                close={() => setNotify(false)}
            />

            {questions &&
                questions.map((question, index) => (
                    <div className="question-holder" key={`question-${index}`}>
                        <span
                            className="question-holder__checked"
                            style={{
                                visibility:
                                    user.questionDone.split(",").indexOf(
                                        String(question.id)
                                    ) !== -1
                                        ? "show"
                                        : "hidden",
                            }}
                        >
                            Respondido
                            <img src={Check} alt="correto" />
                        </span>
                        <h3 className="question-holder__title"><i>Pergunta</i></h3>
                        <p className="question-holder__question">
                            {question.pergunta}
                        </p>

                        <h3 className="question-holder__title"><i>Escolhas</i></h3>
                        <ul className="question-holder__choices">
                            <li>
                                <input
                                    type="radio"
                                    className="form__check"
                                    id={`a-${index}`}
                                    name={`radio-${index}`}
                                    onClick={() =>
                                        setAnswer({
                                            answer: "a",
                                            id: question.id,
                                        })
                                    }
                                    disabled={
                                        user.questionDone.split(",").indexOf(
                                            String(question.id)
                                        ) !== -1
                                    }
                                />{" "}
                                <label htmlFor={`a-${index}`}>
                                    {question.escolhas.a}
                                </label>
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    className="form__check"
                                    id={`b-${index}`}
                                    name={`radio-${index}`}
                                    onClick={() =>
                                        setAnswer({
                                            answer: "b",
                                            id: question.id,
                                        })
                                    }
                                    disabled={
                                        user.questionDone.split(",").indexOf(
                                            String(question.id)
                                        ) !== -1
                                    }
                                />{" "}
                                <label htmlFor={`b-${index}`}>
                                    {question.escolhas.b}
                                </label>
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    className="form__check"
                                    id={`c-${index}`}
                                    name={`radio-${index}`}
                                    onClick={() =>
                                        setAnswer({
                                            answer: "c",
                                            id: question.id,
                                        })
                                    }
                                    disabled={
                                        user.questionDone.split(",").indexOf(
                                            String(question.id)
                                        ) !== -1
                                    }
                                />{" "}
                                <label htmlFor={`c-${index}`}>
                                    {question.escolhas.c}
                                </label>
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    className="form__check"
                                    id={`d-${index}`}
                                    name={`radio-${index}`}
                                    onClick={() =>
                                        setAnswer({
                                            answer: "d",
                                            id: question.id,
                                        })
                                    }
                                    disabled={
                                        user.questionDone.split(",").indexOf(
                                            String(question.id)
                                        ) !== -1
                                    }
                                />{" "}
                                <label htmlFor={`d-${index}`}>
                                    {question.escolhas.d}
                                </label>
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    className="form__check"
                                    id={`e-${index}`}
                                    name={`radio-${index}`}
                                    onClick={() =>
                                        setAnswer({
                                            answer: "e",
                                            id: question.id,
                                        })
                                    }
                                    disabled={
                                        user.questionDone.split(",").indexOf(
                                            String(question.id)
                                        ) !== -1
                                    }
                                />{" "}
                                <label htmlFor={`e-${index}`}>
                                    {question.escolhas.e}
                                </label>
                            </li>
                        </ul>

                        <Button
                            handleClick={handleSubmit}
                            text="Responder"
                            disabled={
                                user.questionDone.split(",").indexOf(String(question.id)) !== -1 || question.id !== answer.id
                            }
                        />
                    </div>
                ))}
        </>
    );
}

export default Categories;
