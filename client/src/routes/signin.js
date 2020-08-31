import React, { useState } from "react";
import { Link } from "react-router-dom";

import { POST } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";
import { saveLogin } from "../helpers/auth";

import Content from "../components/reusable/content";
import Form from "../components/reusable/form";
import InputLabeled from "../components/reusable/inputlabeled";
import Button from "../components/reusable/button";
import Notify from "../components/reusable/notify";

function Signin() {
    const [userData, setUserData] = useState({
        email: "",
        phone: "",
    });

    const [notify, setNotify] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        const body = JSON.stringify({
            email: userData.email,
            phone: "55" + userData.phone,
        });

        POST({
            url: URL_LIST.base + URL_LIST.signin,
            method: "POST",
            body
        }).then(response => {
            if(response.error) setNotify({
                title: "Falha no login",
                content: "Email ou Telefone inválido",
                type: "danger"
            });
            else {
                saveLogin(response);
                window.location.replace("/");
            }
        })
        .catch(error => console.log(error));
    };

    return (
        <Content>
            <Notify
                visible={notify}
                title={notify && notify.title}
                content={notify && notify.content}
                type={notify && notify.type}
                close={() => setNotify(false)}
            />

            <Form title={"Bem vindo de volta!"}>
                <InputLabeled
                    label={"Email"}
                    id={"email"}
                    type={"email"}
                    placeholder={"Digite seu Email"}
                    value={userData.email}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            email: e.currentTarget.value,
                        })
                    }

                    required
                />

                <InputLabeled
                    label={"Celular"}
                    id={"pwd"}
                    type={"tel"}
                    placeholder={"Digite seu numero"}
                    value={userData.phone}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            phone: e.currentTarget.value,
                        })
                    }

                    required
                />

                <Button handleClick={handleSubmit} text={"Entrar"} />

                <div className="form__description">
                    <small>Não sei minha senha!</small>
                    <Link to="/signup">Criar uma conta</Link>
                </div>
            </Form>
        </Content>
    );
}

export default Signin;
