import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";

/** CLIENTES */
import ClientesEmpresas from "./components/clientes/clienteEmpresa/ClientesEmpresas";
import ClientesContactos from "./components/clientes/clienteContacto/ClientesContactos";

/** USUARIOS */
import Usuarios from "./components/usuarios/Usuarios";
import FormNuevoUsuario from "./components/usuarios/FormNuevoUsuario";
import FormEditarUsuario from "./components/usuarios/FormEditarUsuario";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/clientes" element={<ClientesEmpresas/>} />
                <Route path="/clientes/contacto/:id" element={<ClientesContactos/>} />

                <Route path="/usuarios" element={<Usuarios/>} /> 
                <Route path="/usuarios/nuevo" element={<FormNuevoUsuario/>} />
                <Route path="/usuarios/editar/:id" element={<FormEditarUsuario/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
