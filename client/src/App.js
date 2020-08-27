import React from "react";
import "./sass/style.scss";

import Signup from "./routes/signup";

import Navbar from './components/navbar';

function App() {
    return (
        <div className="container">
            <Navbar logged={false} />
            <Signup />
        </div>
    );
}

export default App;
