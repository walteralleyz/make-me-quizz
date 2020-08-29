import React, { useState } from "react";

import { getLogin } from "../helpers/auth";

import Content from "../components/reusable/content";
import Form from "../components/reusable/form";
import InputLabeled from "../components/reusable/inputlabeled";
import AvatarHolder from "../components/reusable/avatarholder";
import Button from "../components/reusable/button";

function Profile() {
    const [userData, setUserData] = useState({
        nick: getLogin().nick,
        email: getLogin().email,
        avatar: getLogin().avatar,
    });

    const [questionData, setQuestionData] = useState({
        pergunta: "",
        escolhas: {
            a: "",
            b: "",
            c: "",
            d: "",
            e: "",
        },
        resposta: "",
        categoria: ""
    });

    const [editable, setEditable] = useState(false);
    const [create, setCreate] = useState(false);

    const selectAvatar = (e) => {
        setUserData({
            ...userData,
            avatar: e.currentTarget.getAttribute("alt"),
        });
    };

    return (
        <Content>
            <Form title={create ? "Nova Pergunta" : "Dados Pessoais"}>
                <div style={{ display: create ? "none" : "block" }}>
                    <span
                        onClick={() => setCreate(!create)}
                        style={{
                            visibility:
                                getLogin().id === 2 &&
                                getLogin().nick === "alleyz"
                                    ? "show"
                                    : "hidden",
                        }}
                        className="form__edit--left"
                    >
                        Nova Pergunta
                    </span>
                    <span
                        onClick={() => setEditable(!editable)}
                        className="form__edit"
                    >
                        Editar
                    </span>

                    <AvatarHolder
                        selected={userData.avatar}
                        select={selectAvatar}
                    />

                    <InputLabeled
                        label={"Nick"}
                        id={"nick"}
                        value={userData.nick}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                nick: e.currentTarget.value,
                            })
                        }
                        disabled={!editable}
                    />

                    <InputLabeled
                        label={"Email"}
                        id={"email"}
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                email: e.currentTarget.value,
                            })
                        }
                        disabled={!editable}
                    />

                    <Button
                        handleClick={(e) => null}
                        text={"Atualizar"}
                        disabled={!editable}
                    />
                </div>
                <div style={{ display: create ? "block" : "none" }}>
                    <span
                        onClick={() => setCreate(!create)}
                        className="form__edit"
                    >
                        Dados Pessoais
                    </span>
                    <InputLabeled
                        label={"Pergunta"}
                        id={"pergunta"}
                        placeholder={"Escreva a pergunta"}
                        value={questionData.pergunta}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                pergunta: e.currentTarget.value,
                            })
                        }
                    />

                    <InputLabeled
                        label={"A"}
                        id={"a"}
                        placeholder={"Ex.: George Washington"}
                        value={questionData.escolhas.a}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                escolhas: {
                                    ...questionData.escolhas,
                                    a: e.currentTarget.value,
                                },
                            })
                        }
                    />

                    <InputLabeled
                        label={"B"}
                        id={"b"}
                        placeholder={"Ex.: George Washington"}
                        value={questionData.escolhas.b}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                escolhas: {
                                    ...questionData.escolhas,
                                    b: e.currentTarget.value,
                                },
                            })
                        }
                    />

                    <InputLabeled
                        label={"C"}
                        id={"c"}
                        placeholder={"Ex.: George Washington"}
                        value={questionData.escolhas.c}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                escolhas: {
                                    ...questionData.escolhas,
                                    c: e.currentTarget.value,
                                },
                            })
                        }
                    />

                    <InputLabeled
                        label={"D"}
                        id={"d"}
                        placeholder={"Ex.: George Washington"}
                        value={questionData.escolhas.d}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                escolhas: {
                                    ...questionData.escolhas,
                                    d: e.currentTarget.value,
                                },
                            })
                        }
                    />

                    <InputLabeled
                        label={"E"}
                        id={"e"}
                        placeholder={"Ex.: George Washington"}
                        value={questionData.escolhas.e}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                escolhas: {
                                    ...questionData.escolhas,
                                    e: e.currentTarget.value,
                                },
                            })
                        }
                    />

                    <InputLabeled
                        label={"Resposta"}
                        id={"resposta"}
                        placeholder={"Escreva a letra da resposta"}
                        value={questionData.resposta}
                        maxLength="1"
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                resposta: e.currentTarget.value,
                            })
                        }
                    />

                    <InputLabeled
                        label={"Categoria"}
                        id={"categoria"}
                        placeholder={"Ex.: Historia"}
                        value={questionData.categoria}
                        onChange={(e) =>
                            setQuestionData({
                                ...questionData,
                                categoria: e.currentTarget.value
                            })
                        }
                    />

                    <Button handleClick={(e) => null} text={"Enviar"} />
                </div>
            </Form>
        </Content>
    );
}

export default Profile;
