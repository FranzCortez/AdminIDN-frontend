import React, { Fragment } from 'react'
import FormSelectCheckList from '../components/form/form-select-check-list'
import FormCheckTypeCheckList from '../components/form/form-check-type-check-list'

function FormCheckListPart1({
    tipo,
    selectionForm,
    dataPrimero,
    dataSegundo,
    dataTercero,
    dataCuarto,
    handleChangePrimero,
    handleChangeSegundo,
    handleChangeTercero,
    handleChangeCuarto,
}) {
  return (
    <Fragment>
        {tipo === 0 ? (
            <div style={{ textAlign: "center", margin: "20px" }}>
              <h2>Seleccionar tipo de equipo</h2>

              <FormSelectCheckList selectionForm={selectionForm} />
            </div>
          ) : (
            <Fragment>
              <h2 className="card-body-subtitle">
                {" "}
                Llene todos los campos según corresponda:{" "}
              </h2>
              <FormCheckTypeCheckList
                condicion="CONDICIONES GENERALES DEL EQUIPO"
                adicional="---------"
                data={dataPrimero}
                onChange={handleChangePrimero}
                key={1}
                start={1}
              />
            </Fragment>
          )}

          {tipo === 1 ? (
            <div style={{ marginTop: "20px" }}>
              <FormCheckTypeCheckList
                condicion="CONDICIONES DE HERRAMIENTAS ELÉCTRICAS"
                adicional="---------"
                data={dataSegundo}
                onChange={handleChangeSegundo}
                key={2}
                start={2}
              />
            </div>
          ) : null}

          {tipo === 2 ? (
            <div style={{ marginTop: "20px" }}>
              <FormCheckTypeCheckList
                condicion="CONDICIONES DE HERRAMIENTAS HIDRÁULICAS / NEUMÁTICAS"
                adicional="PSI/BAR"
                data={dataTercero}
                onChange={handleChangeTercero}
                key={3}
                start={3}
              />
            </div>
          ) : null}

          {tipo === 3 ? (
            <div style={{ marginTop: "20px" }}>
              <FormCheckTypeCheckList
                condicion="CONDICIONES DE HERRAMIENTAS TORQUE / IMPACTO"
                adicional="NM/FT-LB"
                data={dataCuarto}
                onChange={handleChangeCuarto}
                key={4}
                start={4}
              />
            </div>
          ) : null}

    </Fragment>
  )
}

export default FormCheckListPart1