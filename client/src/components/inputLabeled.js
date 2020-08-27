import React from "react";

const InputLabeled = ({ label, id, type, placeholder }) => (
    <div className="form__input-holder">
        <label className="form__input-label" htmlFor={id}>{label}</label>
        <input className="form__input" type={type} id={id} placeholder={placeholder} />
    </div>
);

export default InputLabeled;
