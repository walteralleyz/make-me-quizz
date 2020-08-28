import React from "react";
import { Link } from "react-router-dom";

import Batman from "../images/avatar.png";

const Navbar = ({ logged }) => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <Link to="/" className="navbar__item">
                    <h1>|MakeMeQuizz|</h1>
                </Link>
                <li className="navbar__item">
                    <h5>{logged ? "0 pontos" : ""}</h5>
                </li>
                <Link to="/signin" className="navbar__item">
                    <img
                        className="navbar__profpic"
                        src={Batman}
                        alt="profile"
                    />
                    <small>{logged ? "Sair" : "Entrar"}</small>
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;
