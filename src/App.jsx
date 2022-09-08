import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";

function App() {
    return (
        <BrowserRouter>
            <Fragment>
            <Header/>

            </Fragment>
        </BrowserRouter>
    );
}

export default App;
