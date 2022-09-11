import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";

/** USUARIOS */
import Usuarios from "./components/usuarios/Usuarios";
import FormNuevoUsuario from "./components/usuarios/FormNuevoUsuario";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/usuarios" element={<Usuarios/>} /> 
                <Route path="/usuarios/nuevo" element={<FormNuevoUsuario/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
