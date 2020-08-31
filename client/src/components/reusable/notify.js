import React from "react";

const Notify = ({ title, content, type, visible, close }) => (
    <div
        className="notify"
        style={{ display: visible ? "block" : "none" }}
    >
        <div className={`notify__content-holder notify--${type}`}>
            <span className="notify__close" onClick={close}>
                x
            </span>
            <h5 className="notify__title">{title}</h5>
            <h6 className="notify__content">{content}</h6>
        </div>
    </div>
);

export default Notify;
