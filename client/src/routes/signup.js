import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { GET, POST } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";

import Content from "../components/reusable/content";
import Form from "../components/reusable/form";
import InputLabeled from "../components/reusable/inputlabeled";
import AvatarHolder from "../components/reusable/avatarholder";
import Button from "../components/reusable/button";
import Notify from "../components/reusable/notify";

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
    const [notify, setNotify] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const selectAvatar = (e) => {
        setUserData({
            ...userData,
            avatar: e.currentTarget.getAttribute("alt"),
        });
    };

    const nickExists = () => {
        GET({ url: URL_LIST.base + URL_LIST.nick + userData.nick })
            .then((response) => {
                if (response.error) setNick(true);
                else setNick(false);
            })
            .catch((err) => setNick(true));
    };

    const handleSubmit = () => {
        if (
            userData.nick &&
            userData.email &&
            userData.phone &&
            userData.avatar
        ) {
            let tempUser = { ...userData, phone: "55" + userData.phone};

            POST({
                url: URL_LIST.base + URL_LIST.signup,
                body: JSON.stringify(tempUser),
                method: "POST",
            }).then((response) => {
                if (response.error)
                    setNotify({
                        title: "Falha no cadastro",
                        content: "Email ou nick já cadastrado",
                        type: "danger",
                    });
                else setRedirect(true);
            });
        } else console.log("Faltam campos");
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
                        backgroundPosition: "right",
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
                    placeholder={"Ex.: 47999219999"}
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

                <Button handleClick={handleSubmit} text={"Enviar"} disabled={!(userData.email && userData.avatar && userData.nick && userData.phone)} />
            </Form>

            {redirect && <Redirect to="/" />}
        </Content>
    );
}

export default Signup;
