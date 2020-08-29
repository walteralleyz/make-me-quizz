import React from "react";

import { AVATAR_LIST } from "../../helpers/config";

function AvatarHolder({ selected, select }) {
    return (
        <div>
            <h3 className="form__avatar-title">Escolha seu avatar</h3>

            <span className="form__avatar-holder">
                {AVATAR_LIST.map((avatar, index) => (
                    <img
                        className={selected === avatar.description ? `selected` : null}
                        key={`avatar-${index}`}
                        src={avatar.img}
                        alt={avatar.description}
                        onClick={select}
                    />
                ))}
            </span>

            <h5 className="form__avatar-selected">{selected}</h5>
        </div>
    );
}

export default AvatarHolder;
