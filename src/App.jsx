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

/** FACTURA  */
import Facturas from "./components/factura/Facturas";
import FormNuevaFactura from "./components/factura/FormNuevaFactura";
import FormEditarFactura from "./components/factura/FormEditarFactura";
import FacturaPagar from "./components/factura/FacturaPagar";
import FacturaNotaCredito from "./components/factura/FacturaNotaCredito";
import FacturaNoExiste from "./components/factura/FacturaNoExiste";

/** BALANCE */
import SeleccionBalance from "./components/balance/SeleccionBalance";

/** QR */
import FormQr from "./components/qr/FormQr";
import Qr from "./components/qr/Qr";
import Mantencion from "./components/qr/Mantencion";
import DescargarQr from "./components/qr/DescargarQr";
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
import InicioPrueba from "./components/main/InicioPrueba";
import Nosotros from "./components/main/Nosotros";
import Reparacion from "./components/main/servicios/Reparacion";
import Venta from "./components/main/servicios/Venta";
import Insumos from "./components/main/servicios/Insumos";
import Fabricacion from "./components/main/servicios/Fabricacion";
import Torque from "./components/main/servicios/Torque";
import Error404 from "./components/layout/Error404";

/** PRESENTACION */
import PresentacionGerente from "./components/presentacion/PresentacionGerente";
import PresentacionAdm from "./components/presentacion/PresentacionAdm";
import PresentacionVenta from "./components/presentacion/PresentacionVenta";
import PresentacionAdal from "./components/presentacion/PresentacionAdal";
import PresentacionEdu from "./components/presentacion/PresentacionEdu";
import PresentacionSant from "./components/presentacion/PresentacionSant";
import PresentacionJoam from "./components/presentacion/PresentacionJoam";
import PresentacionDavid from "./components/presentacion/PresentacionDavid";

/** CheckList */
import Solicitudes from "./components/checklist/Solicitudes";
import FormNuevoSolicitud from "./components/checklist/FormNuevoSolicitud";
import FormEditarSolicitud from "./components/checklist/FormEditarSolicitud";

/** COMERCIALIZADORA */
/** HOME COM */
import HomeCom from "./components/comercializadora/homeCom/HomeCom";
/** CLIENTES COM */
import ClienteEmpresasCom from "./components/comercializadora/clienteEmpresaCom/ClienteEmpresasCom";
import FormNuevoEmpresaCom from "./components/comercializadora/clienteEmpresaCom/FormNuevoEmpresaCom";
import FormEditarEmpresaCom from "./components/comercializadora/clienteEmpresaCom/FormEditarEmpresaCom";
import ClientesContactosCom from "./components/comercializadora/clienteContactoCom/ClientesContactosCom";
import FormNuevoContactoCom from "./components/comercializadora/clienteContactoCom/FormNuevoContactoCom";
import FormEditarContactoCom from "./components/comercializadora/clienteContactoCom/FormEditarContactoCom";
/** EQUIPOS */
import EquiposCom from "./components/comercializadora/equipoCom/EquiposCom";
import FormNuevoEquipoCom from "./components/comercializadora/equipoCom/FormNuevoEquipoCom";
import FormEditarEquipoCom from "./components/comercializadora/equipoCom/FormEditarEquipoCom";

import EquiposHijosCom from "./components/comercializadora/equipoCom/equiposHijoCom/EquiposHijosCom";

import FormNuevoEquiposHijosCom from "./components/comercializadora/equipoCom/equiposHijoCom/FormNuevoEquiposHijosCom";
import FormEditarEquiposHijosCom from "./components/comercializadora/equipoCom/equiposHijoCom/FormEditarEquiposHijosCom";

/** PROVEEDOR */
import ProveedoresCom from "./components/comercializadora/proveedorCom/ProveedoresCom";
import FormNuevoProveedorCom from "./components/comercializadora/proveedorCom/FormNuevoProveedorCom";
import FormEditarProveedorCom from "./components/comercializadora/proveedorCom/FormEditarProveedorCom";
import ProveedorContactosCom from "./components/comercializadora/proveedorContactoCom/ProveedorContactosCom";
import FormEditarProveedorContactoCom from "./components/comercializadora/proveedorContactoCom/FormEditarProveedorContactoCom";
import FormNuevoProveedorContactoCom from "./components/comercializadora/proveedorContactoCom/FormNuevoProveedorContactoCom";

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

                        <Route path="/cotizacion/nuevo/:id" element={<FormGenerarCot/>}/>

                        <Route path="/informe/nuevo/:id" element={<FormInforme/>}/>

                        <Route path="/certificado/tipoa/nuevo/:id" element={<FormCertificadoA/>}/>
                        <Route path="/certificado/tipob/nuevo/:id" element={<FormCertificadoB/>}/>

                        <Route path="/facturas" element={<Facturas/>}/>
                        <Route path="/facturas/nuevo" element={<FormNuevaFactura/>}/>
                        <Route path="/facturas/editar/:id" element={<FormEditarFactura/>}/>
                        <Route path="/facturas/pagar/:id" element={<FacturaPagar/>}/>
                        <Route path="/facturas/nota/:id" element={<FacturaNotaCredito/>}/>
                        <Route path="/facturas/error" element={<FacturaNoExiste/>}/>

                        <Route path="/balance" element={<SeleccionBalance/>}/>

                        <Route path="/qr/form/:id/:tipo" element={<FormQr/>}/>
                        <Route path="/qr/:token/:id/:otin" element={<Qr/>}/>
                        <Route path="/qr/descargar/:id" element={<DescargarQr/>}/>

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
                        <Route path="/administracion" element={<PresentacionAdm/>} />
                        <Route path="/ventas" element={<PresentacionVenta/>} />
                        <Route path="/edubel" element={<PresentacionEdu/>} />
                        <Route path="/davnil" element={<PresentacionDavid/>} />
                        <Route path="/adamed" element={<PresentacionAdal/>} />
                        <Route path="/sangam" element={<PresentacionSant/>} />
                        <Route path="/joamp" element={<PresentacionJoam/>} />
                
                        <Route path="/checklist" element={<Solicitudes/>} />
                        <Route path="/checklist/nuevo" element={<FormNuevoSolicitud/>} />
                        <Route path="/checklist/editar/:id" element={<FormEditarSolicitud/>} />

                        
                        <Route path='/homecom' element={<HomeCom/>} />

                        <Route path='/clientescom' element={<ClienteEmpresasCom/>} />
                        <Route path='/clientescom/nuevo' element={<FormNuevoEmpresaCom/>} />
                        <Route path='/clientescom/editar/:id' element={<FormEditarEmpresaCom/>} />
                        <Route path='/clientescom/contacto/:id' element={<ClientesContactosCom/>} />
                        <Route path='/clientescom/contacto/:idEmpresa/nuevo' element={<FormNuevoContactoCom/>} />
                        <Route path='/clientescom/contacto/:idEmpresa/editar/:id' element={<FormEditarContactoCom/>} />

                        <Route path='/equiposcom' element={<EquiposCom/>} />
                        <Route path='/equiposcom/nuevo' element={<FormNuevoEquipoCom/>} />
                        <Route path='/equiposcom/editar/:id' element={<FormEditarEquipoCom/>} />
                        
                        <Route path='/equiposcom/:id' element={<EquiposHijosCom/>} />
                        <Route path='/equiposcom/:id/nuevo' element={<FormNuevoEquiposHijosCom/>} />
                        <Route path='/equiposcom/:idEmpresa/editar/:id' element={<FormEditarEquiposHijosCom/>} />

                        <Route path='/proveedorescom' element={<ProveedoresCom/>} />
                        <Route path='/proveedorescom/nuevo' element={<FormNuevoProveedorCom/>} />
                        <Route path='/proveedorescom/editar/:id' element={<FormEditarProveedorCom/>} />
                        <Route path='/proveedorescom/contacto/:id' element={<ProveedorContactosCom/>} />
                        <Route path='/proveedorescom/contacto/:idEmpresa/nuevo' element={<FormNuevoProveedorContactoCom/>} />
                        <Route path='/proveedorescom/contacto/:idEmpresa/editar/:id' element={<FormEditarProveedorContactoCom/>} />
                        
                        <Route path="/home" element={<Home/>} />
                        
                        <Route path="/login" element={<Login/>} />
                        {/* <Route path="/" element={<Inicio/>} /> */}
                        <Route path="/" element={<InicioPrueba/>} />
                        <Route path="/nosotros" element={<Nosotros/>} />
                        <Route path="/servicios/reparacion" element={<Reparacion/>} />
                        <Route path="/servicios/venta" element={<Venta/>} />
                        <Route path="/servicios/insumos" element={<Insumos/>} />
                        <Route path="/servicios/fabricacion" element={<Fabricacion/>} />
                        <Route path="/servicios/torque" element={<Torque/>} />
                        <Route path="/not_found" element={<Error404/>} />
                        <Route path="*" element={<Navigate to='/not_found'/>} />
                    </Routes>
                </CRMPovider>                
            </Fragment>
        </HashRouter>
    );
}

export default App;
