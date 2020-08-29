import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { getLogin, delLogin } from "../../helpers/auth";
import { GET } from "../../helpers/fetch";
import { URL_LIST } from "../../helpers/config";

import Batman from "../../images/avatar/avatar.png";

const Navbar = () => {
    const [redirect, setRedirect] = useState(false);

    const user = getLogin() || undefined;

    const signout = e => {
        if(getLogin()) {
            e.preventDefault();

            GET({ url: URL_LIST.base + URL_LIST.signout })
            .then(response => {
                delLogin();
                
                window.location.replace("/signin");
            });
        } else {
            setRedirect(!redirect);
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <Link to="/" className="navbar__item">
                    <h1>|MakeMeQuizz|</h1>
                </Link>
                <li className="navbar__item">
                    <h5>{user ? user.nick : ""}</h5>
                </li>
                <li onClick={signout} className="navbar__item">
                    <img
                        className="navbar__profpic"
                        src={Batman}
                        alt="profile"
                    />
                    <small>{user ? "Sair" : "Entrar"}</small>
                </li>
            </ul>

            { redirect && <Redirect to="/signin" /> }
        </nav>
    );
};

export default Navbar;
