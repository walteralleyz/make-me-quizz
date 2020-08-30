import React from "react";

import { getLogin } from "../../helpers/auth";

import AvatarHolder from "../../components/reusable/avatarholder";
import Button from "../../components/reusable/button";
import InputLabeled from "../../components/reusable/inputlabeled";

const FormUser = ({
    setCreate,
    setEditable,
    setUserData,
    userData,
    handleUserSubmit,
    editable,
    create,
    selectAvatar
}) => (
    <div style={{ display: create ? "none" : "block" }}>
        <span
            onClick={() => setCreate(!create)}
            style={{
                visibility:
                    getLogin().id === 2 && getLogin().nick === "alleyz"
                        ? "show"
                        : "hidden",
            }}
            className="form__edit--left"
        >
            Nova Pergunta
        </span>
        <span onClick={() => setEditable(!editable)} className="form__edit">
            Editar
        </span>

        <AvatarHolder selected={userData.avatar} select={selectAvatar} />

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
            handleClick={handleUserSubmit}
            text={"Atualizar"}
            disabled={!editable}
        />
    </div>
);

export default FormUser;
