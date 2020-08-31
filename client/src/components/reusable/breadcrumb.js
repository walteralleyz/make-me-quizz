import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb() {
    const pathname = window.location.pathname;
    const search = window.location.search;

    const bread = search ? pathname.split(search) : pathname;

    return (
        <div className="breadcrumb">
            <Link to="/">Menu</Link> {bread}
        </div>
    )
};

export default Breadcrumb;