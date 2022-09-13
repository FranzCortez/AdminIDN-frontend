import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";

/** CLIENTES */
// Empresa
import ClientesEmpresas from "./components/clientes/clienteEmpresa/ClientesEmpresas";
//Contacto
import ClientesContactos from "./components/clientes/clienteContacto/ClientesContactos";
import FormularioEditarContacto from "./components/clientes/clienteContacto/FormularioEditarContacto";
import FormularioCrearContacto from "./components/clientes/clienteContacto/FormularioNuevoContacto";

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
                <Route path="/clientes/contacto/:idEmpresa/nuevo" element={<FormularioCrearContacto/>} />
                <Route path="/clientes/contacto/:idEmpresa/editar/:id" element={<FormularioEditarContacto/>} />

                <Route path="/usuarios" element={<Usuarios/>} /> 
                <Route path="/usuarios/nuevo" element={<FormNuevoUsuario/>} />
                <Route path="/usuarios/editar/:id" element={<FormEditarUsuario/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
