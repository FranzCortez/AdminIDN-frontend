import React, { Fragment } from "react";
import FormCheckTypeCheckList from "../components/form/form-check-type-check-list";
import FormInfoEntregaCheckList from "../components/form/form-info-entrega-check-list";

function FormCheckListPart2({
  data,
  handleChange,
  entrega,
  recibe,
  onChange,
}) {
  return (
    <Fragment>
      <div style={{ marginTop: "20px" }}>
        <FormCheckTypeCheckList
          condicion="DOCUMENTACIÓN ENTREGADA "
          adicional=""
          data={data}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <FormInfoEntregaCheckList
          entrega={entrega}
          recibe={recibe}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
}

export default FormCheckListPart2;
