import React from "react";

import errorImage from "../images/404.svg";

const PageNotFound = () => (
    <div className="error-page">
        <img className="error-page__image" src={errorImage} alt="error" />
        <div className="error-page__text">
            <h3>Você tá perdido?</h3>
        </div>
    </div>
);

export default PageNotFound;