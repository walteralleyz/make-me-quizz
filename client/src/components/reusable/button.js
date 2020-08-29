import React from "react";

const Button = ({ handleClick, text, ...rest }) => (
    <button type="submit" onClick={handleClick} className="form__button" {...rest}>
        {text}
    </button>
);

export default Button;