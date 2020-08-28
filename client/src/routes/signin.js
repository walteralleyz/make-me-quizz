import React from "react";
import { Link } from "react-router-dom";

import Content from "../components/content";
import Form from "../components/form";
import InputLabeled from "../components/inputLabeled";

function Signin() {
    return (
        <Content>
            <Form title={"Bem vindo de volta!"}>
                <InputLabeled
                    label={"Email"}
                    id={"email"}
                    type={"email"}
                    placeholder={"Digite seu Email"}
                />

                <InputLabeled
                    label={"Senha"}
                    id={"pwd"}
                    type={"password"}
                    placeholder={"Digite uma Senha"}
                />

                <button className="form__button">Entrar</button>

                <div className="form__description">
                    <small>Não sei minha senha!</small>
                    <Link to="/signup">Criar uma conta</Link>
                </div>
            </Form>
        </Content>
    );
}

export default Signin;
