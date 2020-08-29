import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { getLogin, delLogin } from "../../helpers/auth";
import { GET } from "../../helpers/fetch";
import { URL_LIST, AVATAR_LIST } from "../../helpers/config";

const Navbar = () => {
    const [redirect, setRedirect] = useState(false);

    const user = getLogin() || undefined;
    const avatar = user ? AVATAR_LIST.filter(av => av.description === user.avatar)[0] : AVATAR_LIST[1];

    const signout = e => {
        if(getLogin()) {
            e.preventDefault();

            GET({ url: URL_LIST.base + URL_LIST.signout })
            .then(response => {
                delLogin();
                
                setTimeout(() => setRedirect(true), 500);
            });
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <Link to="/" className="navbar__item">
                    <h1>|MakeMeQuizz|</h1>
                </Link>
                { user && (
                    <Link to={`/profile?p=${user.nick}`} className="navbar__item navbar__item--background">
                        <img
                            className="navbar__profpic"
                            src={avatar.img}
                            alt="profile"
                        />
                        <small>Meu Perfil</small>
                    </Link>
                )}
                <li onClick={signout} className="navbar__item">
                    <small>{user ? "Sair" : "Entrar"}</small>
                </li>
            </ul>

            { redirect && <Redirect to="/signin" /> }
        </nav>
    );
};

export default Navbar;
