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

/** INFORME */
import FormInforme from "./components/informe/FormInforme";

/** CERTIFICADO */
import FormCertificadoA from "./components/certificado/tipoA/FormCertificadoA";
import FormCertificadoB from "./components/certificado/tipoB/FormCertificadoB";

/** FOTO GALERIA */
import FotoGaleria from "./components/fotogaleria/FotoGaleria";
import FormFotoGaleria from "./components/fotogaleria/FormFotoGaleria";
import FormEliminarGaleria from "./components/fotogaleria/FormEliminarGaleria";

/** FACTURA */
import Facturas from "./components/factura/Facturas";
import FormNuevaFactura from "./components/factura/FormNuevaFactura";
import FormEditarFactura from "./components/factura/FormEditarFactura";
import FacturaPagar from "./components/factura/FacturaPagar";
import FacturaNotaCredito from "./components/factura/FacturaNotaCredito";

/** QR */
import FormQr from "./components/qr/FormQr";
import Qr from "./components/qr/Qr";
import Mantencion from "./components/qr/Mantencion";
// Sin datos
import FormQrSD from "./components/qrSinDato/FormQrSD";
import MantencionSD from "./components/qrSinDato/MantecionSD";

/** USUARIOS */
import Usuarios from "./components/usuarios/Usuarios";
import FormNuevoUsuario from "./components/usuarios/FormNuevoUsuario";
import FormEditarUsuario from "./components/usuarios/FormEditarUsuario";

/** LOGIN */
import Login from "./components/login/Login";
import Inicio from "./components/main/Inicio";
import Error404 from "./components/layout/Error404";

/** PRESENTACION */
import PresentacionGerente from "./components/presentacion/PresentacionGerente";
import PresentacionAdm from "./components/presentacion/PresentacionAdm";
import PresentacionVenta from "./components/presentacion/PresentacionVenta";

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

                        <Route path="/informe/nuevo/:id" element={<FormInforme/>}/>

                        <Route path="/certificado/tipoa/nuevo/:id" element={<FormCertificadoA/>}/>
                        {/* <Route path="/certificado/tipob/nuevo/:id" element={<FormCertificadoB/>}/> */}

                        <Route path="/facturas" element={<Facturas/>}/>
                        <Route path="/facturas/nuevo" element={<FormNuevaFactura/>}/>
                        <Route path="/facturas/editar/:id" element={<FormEditarFactura/>}/>
                        <Route path="/facturas/pagar/:id" element={<FacturaPagar/>}/>
                        <Route path="/facturas/nota/:id" element={<FacturaNotaCredito/>}/>

                        <Route path="/qr/form/:id/:tipo" element={<FormQr/>}/>
                        <Route path="/qr/:token/:id/:otin" element={<Qr/>}/>

                        <Route path="/qr/sd/form" element={<FormQrSD/>}/>

                        <Route path="/mantencion/:token/:id" element={<Mantencion/>}/>
                        <Route path="/mantencion/b/:mantencion/:proxima/:nserie/:modelo/:marca/:cliente/:equipo" element={<MantencionSD/>}/>

                        <Route path="/fotogaleria/:id" element={<FotoGaleria/>}/>
                        <Route path="/fotogaleria/nuevo/:id" element={<FormFotoGaleria/>}/>
                        <Route path="/fotogaleria/eliminar/:id" element={<FormEliminarGaleria/>}/>

                        <Route path="/usuarios" element={<Usuarios/>} /> 
                        <Route path="/usuarios/nuevo" element={<FormNuevoUsuario/>} />
                        <Route path="/usuarios/editar/:id" element={<FormEditarUsuario/>} />

                        <Route path="/gerente" element={<PresentacionGerente/>} />
                        <Route path="/adm" element={<PresentacionAdm/>} />
                        <Route path="/ventas" element={<PresentacionVenta/>} />
                
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
