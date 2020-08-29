import React, { useState } from "react";
import { Link } from "react-router-dom";

import { POST } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";
import { saveLogin } from "../helpers/auth";

import Content from "../components/reusable/content";
import Form from "../components/reusable/form";
import InputLabeled from "../components/reusable/inputlabeled";
import Button from "../components/reusable/button";

function Signin() {
    const [userData, setUserData] = useState({
        email: "",
        phone: "",
    });

    const handleSubmit = e => {
        e.preventDefault();

        const body = JSON.stringify({
            email: userData.email,
            phone: userData.phone,
        });

        POST({
            url: URL_LIST.base + URL_LIST.signin,
            method: "POST",
            body
        }).then(response => {
            saveLogin(response);

            window.location.replace("/");
        })
        .catch(error => console.log(error));
    };

    return (
        <Content>
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
