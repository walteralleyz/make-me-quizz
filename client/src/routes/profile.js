import React, { useState } from "react";

import { getLogin, saveLogin } from "../helpers/auth";
import { POST } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";

import Content from "../components/reusable/content";
import Form from "../components/reusable/form";
import FormUser from "../components/layout/formuser";
import FormQuestion from "../components/layout/formquestion";

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
        categoria: "",
    });

    const [editable, setEditable] = useState(false);
    const [create, setCreate] = useState(false);

    const selectAvatar = (e) => {
        setUserData({
            ...userData,
            avatar: e.currentTarget.getAttribute("alt"),
        });
    };

    const handleUserSubmit = () => {
        if (userData.nick && userData.email && userData.avatar) {
            POST({
                url: URL_LIST.base + URL_LIST,
                method: "POST",
                body: JSON.stringify(userData),
            }).then((response) => {
                if (response) {
                    saveLogin(response);
                }
            });
        }
    };

    const handleQuestionSubmit = () => {
        if (
            questionData.pergunta &&
            questionData.categoria &&
            questionData.resposta &&
            questionData.escolhas
        ) {
            if (
                questionData.escolhas.a &&
                questionData.escolhas.b &&
                questionData.escolhas.c &&
                questionData.escolhas.d &&
                questionData.escolhas.e
            ) {
                POST({
                    url:
                        URL_LIST.base +
                        URL_LIST.categories +
                        "/" +
                        questionData.categoria,
                    method: "POST",
                    body: JSON.stringify(questionData),
                    token: "Bearer " + getLogin().token
                }).then(response => {
                    setQuestionData({
                        pergunta: "",
                        escolhas: {
                            a: "",
                            b: "",
                            c: "",
                            d: "",
                            e: "",
                        },
                        resposta: "",
                        categoria: "",
                    });
                });
            } else {
                window.alert("Faltam campos!");
            }
        } else {
            window.alert("Faltam campos!");
        }
    };

    return (
        <Content>
            <Form title={create ? "Nova Pergunta" : "Dados Pessoais"}>
                <FormUser 
                    handleUserSubmit={handleUserSubmit}
                    setEditable={setEditable}
                    setUserData={setUserData}
                    userData={userData}
                    editable={editable}
                    setCreate={setCreate}
                    create={create}
                    selectAvatar={selectAvatar}
                />

                <FormQuestion
                    handleQuestionSubmit={handleQuestionSubmit}
                    setEditable={setEditable}
                    setCreate={setCreate}
                    setQuestionData={setQuestionData}
                    questionData={questionData}
                    editable={editable}
                    create={create}
                />
            </Form>
        </Content>
    );
}

export default Profile;
