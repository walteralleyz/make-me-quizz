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

import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
    return (
        <div className="container">
            <Router>
                <Navbar logged={false} />
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route exact path="/signin">
                        <Signin />
                    </Route>

                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
