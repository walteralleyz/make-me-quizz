import React from "react";

import Artist from "../../images/avatar/artist.png";
import Batman from "../../images/avatar/batman.png";
import Beard from "../../images/avatar/beard.png";
import Claus from "../../images/avatar/claus.png";
import Female from "../../images/avatar/female.png";
import Male from "../../images/avatar/male.png";
import Muslim from "../../images/avatar/muslim.png";
import Professor from "../../images/avatar/professor.png";
import Programmer from "../../images/avatar/programmer.png";

function AvatarHolder({ selected, select }) {
    const avatarStatus = [
        {
            img: Artist,
            description: "artist",
        },

        {
            img: Batman,
            description: "batman",
        },

        {
            img: Beard,
            description: "beard",
        },

        {
            img: Claus,
            description: "claus",
        },

        {
            img: Female,
            description: "female",
        },

        {
            img: Male,
            description: "male",
        },

        {
            img: Muslim,
            description: "muslim",
        },

        {
            img: Professor,
            description: "professor",
        },

        {
            img: Programmer,
            description: "programmer",
        },
    ];

    return (
        <div>
            <h3 className="form__avatar-title">Escolha seu avatar</h3>

            <span className="form__avatar-holder">
                {avatarStatus.map((avatar, index) => (
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
