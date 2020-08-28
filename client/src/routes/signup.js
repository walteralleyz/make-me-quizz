import React from "react";

import Content from "../components/content";
import Form from "../components/form";
import InputLabeled from "../components/inputLabeled";

function Signup() {
    return (
        <Content>
            <Form title={"Cadastre-se"}>
                <InputLabeled
                    label={"Nick"}
                    id={"nick"}
                    type={"text"}
                    placeholder={"Ex.: Gilberto333"}
                />

                <InputLabeled
                    label={"Email"}
                    id={"email"}
                    type={"email"}
                    placeholder={"email@dominio.com"}
                />

                <InputLabeled
                    label={"Senha"}
                    id={"pwd"}
                    type={"password"}
                    placeholder={"********"}
                />

                <button className="form__button">Enviar</button>
            </Form>
        </Content>
    );
}

export default Signup;
