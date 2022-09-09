import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Usuarios from "./components/usuarios/Usuarios";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                  <Route path="/usuarios" element={<Usuarios/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
