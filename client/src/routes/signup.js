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
                    placeholder={"Digite seu Nick"}
                />

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

                <button className="form__button">Enviar</button>
            </Form>
        </Content>
    );
}

export default Signup;
