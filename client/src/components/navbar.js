import React from "react";

import Batman from "../images/avatar.png";

const Navbar = ({ logged }) => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <h1>|MakeMeQuizz|</h1>
                </li>
                <li className="navbar__item">
                    <h5>{logged ? "0 pontos" : ""}</h5>
                </li>
                <li className="navbar__item">
                    <img
                        className="navbar__profpic"
                        src={Batman}
                        alt="profile"
                    />
                    <small>{logged ? "Sair" : "Entrar"}</small>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
