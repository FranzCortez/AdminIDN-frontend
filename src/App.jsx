import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/layout/Header";

/** CLIENTES */
// Empresa
import ClientesEmpresas from "./components/clientes/clienteEmpresa/ClientesEmpresas";
import FormularioNuevoEmpresa from "./components/clientes/clienteEmpresa/FormularioNuevoEmpresa";
import FormularioEditarEmpresa from "./components/clientes/clienteEmpresa/FormularioEditarEmpresa";
//Contacto
import ClientesContactos from "./components/clientes/clienteContacto/ClientesContactos";
import FormularioEditarContacto from "./components/clientes/clienteContacto/FormularioEditarContacto";
import FormularioCrearContacto from "./components/clientes/clienteContacto/FormularioNuevoContacto";

/** INGRESOS */
import Ingresos from "./components/ingreso/Ingresos";

/** USUARIOS */
import Usuarios from "./components/usuarios/Usuarios";
import FormNuevoUsuario from "./components/usuarios/FormNuevoUsuario";
import FormEditarUsuario from "./components/usuarios/FormEditarUsuario";

/** LOGIN */
import Login from "./components/login/Login";
import Error404 from "./components/layout/Error404";

import { CRMContext, CRMPovider } from "./components/context/CRMContext";

function App() {

      // utilizar context en el componente
    const [auth, guardarAuth] = useContext(CRMContext);

    return (
        <BrowserRouter>
            <Fragment>
                <CRMPovider value={[auth, guardarAuth]}>
                    <Header/>
                    <Routes>
                        <Route path="/clientes" element={<ClientesEmpresas/>} />
                        <Route path="/clientes/nuevo" element={<FormularioNuevoEmpresa/>} />
                        <Route path="/clientes/editar/:id" element={<FormularioEditarEmpresa/>} />
                        <Route path="/clientes/contacto/:id" element={<ClientesContactos/>} />
                        <Route path="/clientes/contacto/:idEmpresa/nuevo" element={<FormularioCrearContacto/>} />
                        <Route path="/clientes/contacto/:idEmpresa/editar/:id" element={<FormularioEditarContacto/>} />

                        <Route path="/ingresos" element={<Ingresos/>} />

                        <Route path="/usuarios" element={<Usuarios/>} /> 
                        <Route path="/usuarios/nuevo" element={<FormNuevoUsuario/>} />
                        <Route path="/usuarios/editar/:id" element={<FormEditarUsuario/>} />

                        <Route path="/login" element={<Login/>} />
                        <Route path="/not_found" element={<Error404/>} />
                        <Route path="*" element={<Navigate to='/not_found'/>} />
                    </Routes>
                </CRMPovider>                
            </Fragment>
        </BrowserRouter>
    );
}

export default App;
