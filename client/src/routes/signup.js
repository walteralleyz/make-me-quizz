import React, { useState } from "react";

import { GET, POST } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";

import Content from "../components/reusable/content";
import Form from "../components/reusable/form";
import InputLabeled from "../components/reusable/inputlabeled";
import AvatarHolder from "../components/reusable/avatarholder";
import Button from "../components/reusable/button";

import OK from "../images/checked.png";
import NOT from "../images/error.png";

function Signup() {
    const [userData, setUserData] = useState({
        nick: "",
        email: "",
        phone: "",
        avatar: "artist",
    });

    const [isNick, setNick] = useState(false);

    const selectAvatar = (e) => {
        setUserData({
            ...userData,
            avatar: e.currentTarget.getAttribute("alt"),
        });
    };

    const nickExists = () => {
        GET({ url: URL_LIST.base + URL_LIST.nick + userData.nick })
        .then(response => {
            if(response.error) setNick(true);
            else setNick(false);
        })
        .catch(err => setNick(true));
    };

    const handleSubmit = () => {
        if(userData.nick
        && userData.email
        && userData.phone
        && userData.avatar) {
            POST({ url: URL_LIST.base + URL_LIST.signup, body: JSON.stringify(userData), method: 'POST' })
            .then(response => {
                console.log(response);
            });
        }
        else console.log("Faltam campos");
    }

    return (
        <Content>
            <Form title={"Cadastre-se"}>
                <AvatarHolder
                    selected={userData.avatar}
                    select={selectAvatar}
                />

                <InputLabeled
                    label={"Nick"}
                    id={"nick"}
                    type={"text"}
                    placeholder={"Ex.: Gilberto333"}
                    value={userData.nick}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            nick: e.currentTarget.value,
                        })
                    }

                    onBlur={nickExists}

                    style={{ 
                        backgroundImage: `url(${isNick ? NOT : OK})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "5%",
                        backgroundPosition: "right"
                    }}
                    required
                />

                <InputLabeled
                    label={"Email"}
                    id={"email"}
                    type={"email"}
                    placeholder={"email@dominio.com"}
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
                    placeholder={"(xx)xxxx-xxxxx"}
                    value={userData.phone}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            phone: e.currentTarget.value,
                        })
                    }
                    required
                />

                <div className="form__check">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">Eu concordo</label>
                </div>

                <Button handleClick={handleSubmit} text={"Enviar"} />
            </Form>
        </Content>
    );
}

export default Signup;
