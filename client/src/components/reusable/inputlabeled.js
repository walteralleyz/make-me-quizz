import React from "react";

const InputLabeled = ({ label, id, ...rest }) => (
    <div className="form__input-holder">
        <label className="form__input-label" htmlFor={id}>
            {label}
        </label>
        <input
            className="form__input"
            id={id}
            { ...rest }
        />
    </div>
);

export default InputLabeled;
