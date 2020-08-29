import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import "./sass/style.scss";

import Main from './routes/main';
import Signup from "./routes/signup";
import Signin from "./routes/signin";
import PrivateRoute from "./routes/privateroute";
import PageNotFound from "./routes/404";

import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

function App() {
    return (
        <div className="container">
            <Router>
                <Navbar />
                <Switch>
                    <PrivateRoute exact path="/">
                        <Main />
                    </PrivateRoute>

                    <Route exact path="/signin">
                        <Signin />
                    </Route>

                    <Route exact path="/signup">
                        <Signup />
                    </Route>

                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
