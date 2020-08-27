import React from "react";

const Form = ({ title, children }) => (
    <form className="form">
        <h1 className="form__title">{title}</h1>
        {children}
    </form>
);

export default Form;
