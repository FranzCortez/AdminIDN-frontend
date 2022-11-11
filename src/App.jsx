import React, { Fragment, useContext } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

import Header from "./components/layout/Header";

/** HOME */
import Home from "./components/home/Home";

/** CLIENTES */
// Empresa
import ClientesEmpresas from "./components/clientes/clienteEmpresa/ClientesEmpresas";
import FormularioNuevoEmpresa from "./components/clientes/clienteEmpresa/FormularioNuevoEmpresa";
import FormularioEditarEmpresa from "./components/clientes/clienteEmpresa/FormularioEditarEmpresa";
// Contacto
import ClientesContactos from "./components/clientes/clienteContacto/ClientesContactos";
import FormularioEditarContacto from "./components/clientes/clienteContacto/FormularioEditarContacto";
import FormularioCrearContacto from "./components/clientes/clienteContacto/FormularioNuevoContacto";

/** INGRESOS */
import Ingresos from "./components/ingreso/Ingresos";
import FormNuevoIngreso from "./components/ingreso/FormNuevoIngreso";
import FormEditarIngreso from "./components/ingreso/FormEditarIngreso";
// Tipo Herramienta
import TiposHerramientas from "./components/ingreso/tipoHerramienta/TiposHerramientas";
import FormNuevoTipoHerramienta from "./components/ingreso/tipoHerramienta/FormNuevoTipoHerramienta";
import FromEditarTipoHerramienta from "./components/ingreso/tipoHerramienta/FromEditarTipoHerramienta";

/** COTIZADOR */
import Cotizar from "./components/cotizar/Cotizar";
import FormGenerarCot from "./components/cotizar/FormGenerarCot";

/** FOTO GALERIA */
import FotoGaleria from "./components/fotogaleria/FotoGaleria";
import FormFotoGaleria from "./components/fotogaleria/FormFotoGaleria";
import FormEliminarGaleria from "./components/fotogaleria/FormEliminarGaleria";

/** QR */
import FormQr from "./components/qr/FormQr";
import Qr from "./components/qr/Qr";

/** USUARIOS */
import Usuarios from "./components/usuarios/Usuarios";
import FormNuevoUsuario from "./components/usuarios/FormNuevoUsuario";
import FormEditarUsuario from "./components/usuarios/FormEditarUsuario";

/** LOGIN */
import Login from "./components/login/Login";
import Inicio from "./components/main/Inicio";
import Error404 from "./components/layout/Error404";

import { CRMContext, CRMPovider } from "./components/context/CRMContext";

function App() {

      // utilizar context en el componente
    const [auth, guardarAuth] = useContext(CRMContext);

    return (
        <HashRouter>
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
                        <Route path="/ingresos/nuevo" element={<FormNuevoIngreso/>} />
                        <Route path="/ingresos/editar/:id" element={<FormEditarIngreso/>} />
                        <Route path="/ingresos/tipoherramienta" element={<TiposHerramientas/>} />
                        <Route path="/ingresos/tipoherramienta/nuevo" element={<FormNuevoTipoHerramienta/>} />
                        <Route path="/ingresos/tipoherramienta/editar/:id" element={<FromEditarTipoHerramienta/>} />

                        <Route path="/cotizacion" element={<Cotizar/>}/>
                        <Route path="/cotizacion/nuevo/:id" element={<FormGenerarCot/>}/>

                        <Route path="/qr/form/:id/:tipo" element={<FormQr/>}/>
                        <Route path="/qr/:token/:id/:otin" element={<Qr/>}/>

                        <Route path="/mantencion/:token/:id" element={<Cotizar/>}/>

                        <Route path="/fotogaleria/:id" element={<FotoGaleria/>}/>
                        <Route path="/fotogaleria/nuevo/:id" element={<FormFotoGaleria/>}/>
                        <Route path="/fotogaleria/eliminar/:id" element={<FormEliminarGaleria/>}/>

                        <Route path="/usuarios" element={<Usuarios/>} /> 
                        <Route path="/usuarios/nuevo" element={<FormNuevoUsuario/>} />
                        <Route path="/usuarios/editar/:id" element={<FormEditarUsuario/>} />

                        <Route path="/home" element={<Home/>} />
                
                        <Route path="/login" element={<Login/>} />
                        <Route path="/" element={<Inicio/>} />
                        <Route path="/not_found" element={<Error404/>} />
                        <Route path="*" element={<Navigate to='/not_found'/>} />
                    </Routes>
                </CRMPovider>                
            </Fragment>
        </HashRouter>
    );
}

export default App;
