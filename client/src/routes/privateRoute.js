import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../helpers/auth";

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
        render={({ location}) =>
            isAuthenticated() ? (
                children
            ) : (
                <Redirect
                to={{
                    pathname: "/signin",
                    state: { from: location }
                }} />
            )
        } />
    )
}

export default PrivateRoute;