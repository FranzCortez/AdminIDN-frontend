import { useState, useEffect, Fragment, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import Select from '../componentsForm/Select';
import Input from '../componentsForm/Input';
import Text from '../componentsForm/Text';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function FormEditarIngresoCom() {

    const { id, tipo } = useParams();
    
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    let entre = 0;

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1);
    const yyyy = today.getFullYear();
    let fechaActual = `${yyyy}-${mm}-${dd}`;

    // EIRL
    const [ clientesEmpresasEIRL, guardarClientesEmpresasEIRL ] = useState([]);
    const [ clienteEmpresaEIRL, guardarClienteEmpresaEIRL ] = useState(0);
    const [ clientesContactosEIRL, guardarClientesContactosEIRL ] = useState([]);

    const [ tiposHerramientas, guardarTiposHerramientas ] = useState([]);

    const [ ingresoEirl, guardarIngresoEirl ] = useState({
        otin: '',
        fecha: fechaActual,
        nombre: '',
        marca: '',
        modelo: '',
        numeroSerie: '',
        numeroInterno: '',
        numeroGuiaCliente: '',
        guiaDespacho: '',
        fechaGuiaDespacho: '',
        comentario: '',
        tipoHerramientaId: 0,
        clienteContactoId: 0,
        usuario: auth.nombre,
        usuarioId: auth.id
    });

    // SPA
    const [ clientesEmpresas, guardarClientesEmpresas ] = useState([]);
    const [ clienteEmpresa, guardarClienteEmpresa ] = useState(0);
    const [ clientesContactos, guardarClientesContactos ] = useState([]);

    const [ proveedorEmpresas, guardarProveedoresEmpresas ] = useState([]);

    const [ edps, guardarEdps ] = useState([
        {
            codigo: '',
            id: 1
        }
    ]);

    const [ proveedores, guardarProveedores ] = useState([
        {
            id: 1,
            idEmpresa: 0,
            idProveedor: 0,
            ocin: [],
            cantOcines: 0,
            proveedorContactos: []
        }
    ]);

    const [ empresa, guardarEmpresa ] = useState(0);
    const [ ingresoSpa, guardarIngresoSpa ] = useState({
        ovin: '',
        fecha: fechaActual,
        tipo: 0,
        descripcion: '',
        numeroGuiaDespacho: '',
        fechaGuiaDespacho: '',
        numeroOrdenCompra: '',
        fechaOrdenCompra: '',
        usuarioId: auth.id,
        clienteComId: 0,
        comentario: '',
        // adicionales
        ocines: false,
        edps: [],
        proveedoresContacto: []
    });
    const [ ingresoSpaAntiguo, guardarIngresoSpaAntiguo ] = useState({
        ovin: '',
        fecha: fechaActual,
        tipo: 0,
        descripcion: '',
        numeroGuiaDespacho: '',
        fechaGuiaDespacho: '',
        numeroOrdenCompra: '',
        fechaOrdenCompra: '',
        usuarioId: auth.id,
        clienteComId: 0,
        comentario: '',
        // adicionales
        ocines: false,
        edps: [],
        proveedoresContacto: []
    });

    const cantOcines = [
        { value: '0', text: '0' },
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
    ];

    const tipoArriendo = ['A','S','SA','SAM'];

    const opcionesIngresoSpa = [
        { value: 'A', text: 'Arriendo' },
        { value: 'S', text: 'Subarriendo' },
        { value: 'SA', text: 'Arriendo y Subarriendo' },
        { value: 'SAM', text: 'Subarriendo Multiple' },
        { value: 'V', text: 'Venta' },
        { value: 'F', text: 'Fabricacion' },
        { value: 'ST', text: 'Servicio Terreno' },
    ]

    const seleccionarEmpresa = e => {
        guardarEmpresa(parseInt(e.target.value));
        consultarAPI(parseInt(e.target.value));
    }
    
    const seleccionarClienteEmpresa = async e => {
        guardarClienteEmpresa(parseInt(e.target.value));

        try {        

            const res = await clienteAxios.get('/clientescom/empresacomForm/cliente/' + e.target.value ,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarClientesContactos(res.data)

        } catch (error) {
            console.error(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en el ingreso',
                text: error.response.data.msg,
                timer: 2500
            }); 
            // redireccionar
            navigate('/ingresoscom', {replace: true});
        }
        
    }

    const saveIngresoSpa = ( e ) => {
        console.log(e.target.name)
        guardarIngresoSpa({
            ...ingresoSpa,
            [e.target.name] : e.target.value
        });

        if ( e.target.name === 'tipo') {
            consultarProveedores();
        }
    }

    const saveIngresoEirl = ( e ) => {
        
        console.log({[e.target.name] : e.target.value})
        guardarIngresoEirl({
            ...ingresoEirl,
            [e.target.name] : e.target.value
        });
    }

    const saveEdpCodigo = e => {

        const id = parseInt(e.target.name.split('-')[1]);

        const existe = edps.find(edp => id === edp.id);

        existe.codigo = e.target.value;

        if ( edps.length === id ) {
            guardarEdps([
                ...edps,
                {
                    id: id + 1,
                    codigo: ''
                }
            ]);
        } else {
            guardarEdps([
                ...edps
            ]);
        }

    }

    const saveProveedores = e => {

        const id = parseInt(e.target.name.split('-')[1]);

        const existe = proveedores.find(proveedor => id === proveedor.id);
        existe.idProveedor = e.target.value;

        if ( proveedores.length === id ) {
            guardarProveedores([
                ...proveedores,
                {
                    id: id + 1,
                    idEmpresa: 0,
                    idProveedor: 0,
                    cantOcines: 0,
                    ocin: [],
                    proveedorContactos: []
                }
            ]);
        } else {
            guardarProveedores([
                ...proveedores
            ]);
        }

    }

    const saveCantOcines = e => {

        const id = parseInt(e.target.name.split('-')[1]);

        const existe = proveedores.find(proveedor => id === proveedor.id);
        existe.cantOcines = parseInt(e.target.value);
        existe.ocin = new Array(existe.cantOcines).fill('');
        console.log(existe)
        guardarProveedores([
            ...proveedores
        ]);
    }

    const saveOcinProveedor = e => {

        const name = e.target.name.split("-");
        const id = parseInt(name[0].split('_')[1]);
        const pos = parseInt(name[1]);

        const proveedor = proveedores.find(proveedor => id === proveedor.id);
        proveedor.ocin[pos] = e.target.value;

        guardarProveedores([
            ...proveedores
        ]);
    }

    const seleccionarContactoEmpresa = async e => {
        try {        
            const id = parseInt(e.target.name.split('-')[1]);
    
            const existe = proveedores.find(proveedor => id === proveedor.id);
            existe.idEmpresa = e.target.value;

            const res = await clienteAxios.get('/proveedor/proveedorform/contacto/' + e.target.value ,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            existe.proveedorContactos = res.data;
            
            if ( proveedores.length === id ) {
                guardarProveedores([
                    ...proveedores,
                    {
                        id: id + 1,
                        idEmpresa: 0,
                        idProveedor: 0,
                        ocin: [],
                        cantOcines: 0,
                        proveedorContactos: []
                    }
                ]);
            } else {
                guardarProveedores([
                    ...proveedores
                ]);
            }

        } catch (error) {
            console.error(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en el ingreso',
                text: error.response.data.msg,
                timer: 2500
            }); 
            // redireccionar
            navigate('/ingresoscom', {replace: true});
        }
        
    }

    const consultarProveedores = async () => {

        try {        

            const res = await clienteAxios.get('/proveedor/proveedorForm/select' ,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            console.log(res.data)
            guardarProveedoresEmpresas(res.data)

        } catch (error) {
            console.error(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en el ingreso',
                text: error.response.data.msg,
                timer: 2500
            }); 
            // redireccionar
            navigate('/ingresoscom', {replace: true});
        }
        
    }

    const consultarAPI = async (empresa) => {
        try {

            if ( empresa === 1 ) {
                const res = await clienteAxios.get('/clientescom/empresacomForm',{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                
                guardarClientesEmpresas(res.data)

            } else {
                
                const res = await clienteAxios.get(`empresas/empresaNombre/select`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                guardarClientesEmpresasEIRL(res.data)

                const resTipoHerramienta = await clienteAxios.get('/tipo/tipoherramienta/select',{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                guardarTiposHerramientas(resTipoHerramienta.data);

            }

        } catch (error) {
            console.error(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en el ingreso',
                text: error.response.data.msg,
                timer: 2500
            }); 
            // redireccionar
            navigate('/ingresoscom', {replace: true});
        }
    }

    const seleccionClienteEIRL = async (e) => {
        guardarClienteEmpresaEIRL(parseInt(e.target.value));

        try {        

            const res = await clienteAxios.get('/contactos/contactoNombre/select/' + e.target.value ,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarClientesContactosEIRL(res.data)

        } catch (error) {
            console.error(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en el ingreso',
                text: error.response.data.msg,
                timer: 2500
            }); 
            // redireccionar
            navigate('/ingresoscom', {replace: true});
        }
    }

    const avanzar = (event) => {
        if (event.keyCode === 13 && event.target.nodeName === "INPUT" && event.target.type !== 'submit') {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    const validarForm = () => {

        if ( empresa === 2) {
            const { nombre, marca, fecha, modelo, comentario, clienteContactoId, tipoHerramientaId, otin } = ingresoEirl;

            if( !(!nombre.length || !marca.length || !fecha.length || !modelo.length || !clienteContactoId || !comentario.length || !tipoHerramientaId  || !otin.length) ){
                return false;
            }
        } else {
            const { clienteComId, fecha, ovin, tipo  } = ingresoSpa;

            if( !(!(proveedores.length - 1) || !ovin.length || !fecha.length || !clienteComId || !tipo ) ){
                return false;
            }
        }

        return true;
    }

    const agregarIngreso = async (e) => {
        e.preventDefault();
        if( entre > 0) {
            return;
        }

        entre = 1;
        
        try {
            if ( empresa === 1) {

                ingresoSpa.edps = edps.slice(0, edps.length - 1);
                ingresoSpa.proveedoresContacto = proveedores.slice(0, proveedores.length - 1);
                const existenOcines = ingresoSpa.proveedoresContacto.filter(proveedores => proveedores.ocin.length > 1);
                ingresoSpa.ocines = existenOcines.length >= 1 ? true : false;
                console.log(ingresoSpa)
                const res = await clienteAxios.put('/ingresocom/ovin/' + id, ingresoSpa,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                Swal.fire({
                    title: 'Se agrego correctamente el ingreso',
                    text: res.data.msg,
                    type: 'success',
                    timer: 3500
                });

            } else {

                const res = await clienteAxios.post('/ih/ingreso', ingresoEirl,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
    
                Swal.fire({
                    title: 'Se agrego correctamente el ingreso',
                    text: res.data.msg,
                    type: 'success',
                    timer: 3500
                });
            } 
                
            // redireccionar
            navigate('/ingresoscom', {replace: true});
        } catch (error) {
            console.log(error)
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.msg,
                timer: 1500
            });            
        }
        
    }

    const getContacosProveedor = async (id) => {
        const res = await clienteAxios.get('/proveedor/proveedorform/contacto/' + id ,{
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        return res.data;
    }

    const consultarIngresoCom = async () => {

        try {
            
            // spa
            if ( parseInt(tipo) === 1 ) {

                const res = await clienteAxios.get('/ingresocom/' + id,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                guardarEmpresa(1);
                await consultarAPI(1);
                guardarClienteEmpresa(res.data.clienteContactoCom.clienteEmpresaCom.id)
                seleccionarClienteEmpresa({target: {value: res.data.clienteContactoCom.clienteEmpresaCom.id}})
                guardarIngresoSpa(res.data);
                guardarIngresoSpaAntiguo(res.data);
                consultarProveedores();

                const edpsArreglo = [];

                res.data.ingresoEdp.forEach((edp, index) => {
                    edpsArreglo.push({
                        id: index + 1,
                        codigo: edp.edpCom.codigo
                    })
                });

                edpsArreglo.push({
                    id: edpsArreglo.length + 1,
                    codigo: ''
                })

                guardarEdps(edpsArreglo);

                const proveedoresArreglo = [];

                let contador = 0;

                for (const proveedores of res.data.proveedorIngreso) {
                    proveedoresArreglo.push({
                        id: ++contador,
                        idEmpresa: proveedores.proveedorContactoCom.proveedorCom.id,
                        idProveedor: proveedores.proveedorContactoCom.id,
                        cantOcines: proveedores.ocin ? proveedores.ocin.length : 0,
                        ocin: proveedores.ocin ? proveedores.ocin.map(ocines => {
                            return ocines.ocinCom.ocin
                        }) : [],
                        proveedorContactos: await getContacosProveedor(proveedores.proveedorContactoCom.proveedorCom.id)
                    })
                }

                proveedoresArreglo.push({
                    id: proveedoresArreglo.length + 1,
                    idEmpresa: 0,
                    idProveedor: 0,
                    cantOcines: 0,
                    ocin: [],
                    proveedorContactos: []
                })

                guardarProveedores(proveedoresArreglo);

            } else {
            
                const res = await clienteAxios.get(`ih/ingreso/${id}`,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                guardarEmpresa(2);
                console.log(res.data)
                guardarIngresoEirl({
                    ...ingresoEirl,
                    nombre: res.data.nombre,
                    marca: res.data.marca,
                    fecha: res.data.fecha,
                    modelo: res.data.modelo,
                    comentario: res.data.comentario,
                    numeroInterno: res.data.numeroInterno,
                    numeroGuiaCliente: res.data.numeroGuiaCliente,
                    numeroSerie: res.data.numeroSerie,
                    clienteContactoId: res.data.clienteContactoId,
                    tipoHerramientaId: res.data.tipoHerramientaId,
                    fechaGuiaDespacho: res.data.fechaGuiaDespacho,
                    guiaDespacho: res.data.guiaDespacho,
                    otin: res.data.otin
                });

                // usuario: auth.nombre,
                // usuarioId: auth.id
    
                fechaActual = res.data.fecha;
    
                const resTipo = await clienteAxios.get('/tipo/tipoherramienta/select',{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                guardarTiposHerramientas(resTipo.data);
    
                const resEmpresa = await clienteAxios.get(`empresas/empresaNombre/select`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                guardarClientesEmpresasEIRL(resEmpresa.data);
                guardarClienteEmpresaEIRL(res.data.clienteContacto.clienteEmpresa.id);

                const resContacto = await clienteAxios.get('/contactos/contactoNombre/select/' + res.data.clienteContacto.clienteEmpresa.id ,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                guardarClientesContactosEIRL(resContacto.data);
            }

        } catch (error) {
            console.error(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en el ingreso',
                text: error.response.data.msg,
                timer: 2500
            }); 
            // redireccionar
            navigate('/ingresoscom', {replace: true});
        }
    }

    useEffect(() => {
        const tipos = [1,3,4]
        
        if(auth.token === '' || !tipos.includes(auth.tipo) ) navigate('/login', {replace: true}); 
        consultarIngresoCom();
    }, []);

    return (
        <section className='ingresoscom'>

            <div className='ic__header'>
                <h1 className='ic__header-h1'><MdOutlinePlaylistAdd size={50} color={"#333333"}/>Ingresos</h1>
            </div>

            <div className='ic__body'>
                
                <div className={`ic__card height-auto ${empresa === 1 ? 'ic__card-com' : empresa === 2 ? 'ic__card-eirl': ''}`}>
                    
                    <div className='ic__opciones'>
                        <div className='top-left'>
                            <Link to={'/ingresoscom'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                        </div>
                    </div>
                    <h2 className='ic__titulo mt-50'>Editar ingreso</h2>

                    <form className='ic__form' onSubmit={agregarIngreso} onKeyDown={avanzar}>

                        <Select value={empresa} saveValue={seleccionarEmpresa} id_name={"empresa"} label={"Seleccione Empresa"} opciones={[{ value: 1, text: 'SPA' }, { value: 2, text: 'EIRL' }]} key={1} disabledSelect={true}/>

                        {
                            empresa === 1 ?

                            <Fragment>

                                <Select value={clienteEmpresa} saveValue={seleccionarClienteEmpresa} id_name={"cliente_empresa"} label={"Seleccione Cliente"} opciones={clientesEmpresas} key={11111} />

                                <Select value={ingresoSpa.clienteComId} saveValue={saveIngresoSpa} id_name={"clienteComId"} label={"Seleccione Cliente Contacto"} opciones={clientesContactos} key={11112} />
                                
                                <Input disabled={parseInt(auth.tipo) === 1 ? false : true} id_name={"ovin"} label={"OVIN"} saveValue={saveIngresoSpa} tipo={"text"} value={ingresoSpa.ovin} placeholder={"Ingrese OVIN"} key={2} />

                                <Input disabled={false} id_name={"fecha"} label={"Fecha Ingreso"} saveValue={saveIngresoSpa} tipo={"date"} value={ingresoSpa.fecha} placeholder={"Seleccione Fecha"} key={3} />

                                <Select value={ingresoSpa.tipo} saveValue={saveIngresoSpa} id_name={"tipo"} label={"Seleccione Tipo Ingreso"} opciones={opcionesIngresoSpa} key={4} />

                                <Text value={ingresoSpa.descripcion} saveValue={saveIngresoSpa} placeholder={"Escriba una breve descripción del ingreso"} id_name={"descripcion"} cols={53} label={"Descripción"} rows={2} key={5} />

                                <Input disabled={false} id_name={"numeroGuiaDespacho"} label={"Guía de Despacho"} saveValue={saveIngresoSpa} tipo={"text"} value={ingresoSpa.numeroGuiaDespacho} placeholder={"Ingrese Guía de Despacho"} key={6} />

                                <Input disabled={false} id_name={"fechaGuiaDespacho"} label={"Fecha Guía de Despacho"} saveValue={saveIngresoSpa} tipo={"date"} value={ingresoSpa.fechaGuiaDespacho} placeholder={"Seleccione Fecha"} key={7} />

                                <Input disabled={false} id_name={"numeroOrdenCompra"} label={"N° Orden de Compra"} saveValue={saveIngresoSpa} tipo={"text"} value={ingresoSpa.numeroOrdenCompra} placeholder={"Ingrese Orden de Compra"} key={8} />

                                <Input disabled={false} id_name={"fechaOrdenCompra"} label={"Fecha Orden de Compra"} saveValue={saveIngresoSpa} tipo={"date"} value={ingresoSpa.fechaOrdenCompra} placeholder={"Seleccione Fecha"} key={9} />

                                <Text value={ingresoSpa.comentario} saveValue={saveIngresoSpa} placeholder={"Comentarios del ingreso"} id_name={"comentario"} cols={53} label={"Comentarios"} rows={2} key={10} />

                                <Fragment>
                                    <h2 className='ic__subtitulo'>Proveedor(es)</h2>
                                    <h3 className='ic__subtitulo-intruccion'>En caso de no necesitar más, dejar en blanco el último proveedor (Si no tiene OCIN, dejar en blanco el campo de seleccion cantidad de OCINES).</h3>

                                    {
                                        proveedores.map( (proveedor, index) => (
                                            
                                            <Fragment>
                                                <Select value={proveedor.idEmpresa} saveValue={seleccionarContactoEmpresa} id_name={`proveedor_empresa-${index + 1}`} label={"Seleccione Proveedor"} opciones={proveedorEmpresas} key={Math.floor(Math.random() * 1000)} />

                                                <Select value={proveedor.idProveedor} saveValue={saveProveedores} id_name={`contacto_proveedor_empresa-${index + 1}`} label={"Seleccione Proveedor Contacto"} opciones={proveedor.proveedorContactos} key={11010 + index + 1} />

                                                <Select value={proveedor.cantOcines} saveValue={saveCantOcines} id_name={`ocines_proveedor_empresa-${index + 1}`} label={"Seleccione Cant. OCINES"} opciones={cantOcines} key={10010 + index + 1} />

                                                {
                                                    proveedor.ocin.map((ocin, index) => (
                                                        <Input disabled={false} id_name={`ocin_${proveedor.id}-${index}`} label={`OCIN ${index + 1}`} saveValue={saveOcinProveedor} tipo={"text"} value={ocin} placeholder={"Ingrese OCIN N°" + (index + 1)} key={index + proveedor.id} />
                                                    ))
                                                }

                                                <div className="separacion" ></div>
                                            </Fragment>

                                        ))
                                    }
                                </Fragment>

                                {

                                    tipoArriendo.includes(ingresoSpa.tipo) ?
                                        <Fragment>
                                            <h2 className='ic__subtitulo'>Estados de pago</h2>
                                            <h3 className='ic__subtitulo-intruccion'>En caso de no necesitar más, dejar en blanco el último EDP.</h3>
                                            {
                                                edps.map((ed, index) => (
                                                    <Input disabled={false} id_name={`codigo-${index + 1}`} label={`Estado de Pago ${index + 1}`} saveValue={saveEdpCodigo} tipo={"text"} value={ed.codigo} placeholder={"Ingrese EDP"} key={index} />
                                                ))

                                            }                                        

                                        </Fragment>
                                    :
                                        null

                                }

                            </Fragment>

                            :
                            
                            empresa === 2 ?
                                <Fragment>

                                    <Select value={clienteEmpresaEIRL} saveValue={seleccionClienteEIRL} id_name={"empresa_id"} label={"Seleccione Cliente"} opciones={clientesEmpresasEIRL} key={11} />

                                    <Select value={ingresoEirl.clienteContactoId} saveValue={saveIngresoEirl} id_name={"clienteContactoId"} label={"Seleccione Cliente Contacto"} opciones={clientesContactosEIRL} key={12} />

                                    <Select value={ingresoEirl.tipoHerramientaId} saveValue={saveIngresoEirl} id_name={"tipoHerramientaId"} label={"Seleccione Tipo Herramienta"} opciones={tiposHerramientas} key={13} />

                                    <Input disabled={parseInt(auth.tipo) === 1 ? false : true} id_name={"otin"} label={"OTIN"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.otin} placeholder={"Ingrese OTIN"} key={14} />

                                    <Input disabled={false} id_name={"fecha"} label={"Fecha Ingreso"} saveValue={saveIngresoEirl} tipo={"date"} value={ingresoEirl.fecha} placeholder={"Seleccione Fecha"} key={15} />

                                    <Input disabled={false} id_name={"nombre"} label={"Nombre"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.nombre} placeholder={"Nombre de la herramienta"} key={16} />

                                    <Input disabled={false} id_name={"marca"} label={"Marca"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.marca} placeholder={"Marca de la herramienta"} key={17} />

                                    <Input disabled={false} id_name={"modelo"} label={"Modelo"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.modelo} placeholder={"Modelo de la herramienta"} key={18} />

                                    <Input disabled={false} id_name={"numeroSerie"} label={"N° Serie"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.numeroSerie} placeholder={"N° Serie de la herramienta"} key={19} />

                                    <Input disabled={false} id_name={"numeroInterno"} label={"N° Interno"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.numeroInterno} placeholder={"N° Interno de la herramienta"} key={20} />

                                    <Input disabled={false} id_name={"numeroGuiaCliente"} label={"N° Guía Cliente"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.numeroGuiaCliente} placeholder={"N° Guía Cliente de la herramienta"} key={21} />

                                    <Input disabled={false} id_name={"guiaDespacho"} label={"Guía de Despacho IDN"} saveValue={saveIngresoEirl} tipo={"text"} value={ingresoEirl.guiaDespacho} placeholder={"Guía de Despacho IDN"} key={22} />

                                    <Input disabled={false} id_name={"fechaGuiaDespacho"} label={"Fecha Guía de Despacho IDN"} saveValue={saveIngresoEirl} tipo={"date"} value={ingresoEirl.fechaGuiaDespacho} placeholder={"Fecha Guía de Despacho IDN"} key={23} />

                                    <Text value={ingresoEirl.comentario} saveValue={saveIngresoEirl} placeholder={"Comentarios del ingreso"} id_name={"comentario"} cols={53} label={"Comentarios"} rows={2} key={10} />
                                </Fragment>
                            :
                            null
                        }

                        {
                            empresa ?
                            <div className="enviar">
                                <input 
                                    type="submit" 
                                    className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                    value="Guardar Ingreso"
                                    disabled={validarForm()}
                                />
                            </div>
                            :
                            null
                        }
                    </form>


                </div>

            </div>

        </section>
    )
}

export default FormEditarIngresoCom;