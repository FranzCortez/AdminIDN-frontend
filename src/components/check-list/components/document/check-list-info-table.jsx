function CheckListInfoTable({
    cliente,
    otin,
    fecha,
    tipoHerramienta,
    marca,
    modelo,
    numeroSerie,
    numeroInterno,
    tecnicoResponsable,
}) {
  return (
    <div style={{ width: "100%" }}>
      <table
        style={{
          width: "100%",
          border: "2px solid #bebebe", // Borde general de la tabla
          borderCollapse: "collapse", // Fusiona los bordes para evitar doble borde
          textTransform: "uppercase",
          fontSize: "10pt",
          textAlign: "center",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#ff9c3c",
              fontWeight: "bold",
              fontSize: "9pt",
            }}
          >
            <th style={{ border: "1px solid #bebebe" }}>NOMBRE DEL CLIENTE</th>
            <th style={{ border: "1px solid #bebebe" }}>OTIN / OVIN</th>
            <th style={{ border: "1px solid #bebebe" }}>FECHA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #bebebe" }}>{cliente}</td>
            <td style={{ border: "1px solid #bebebe" }}>{otin}</td>
            <td style={{ border: "1px solid #bebebe" }}>{fecha}</td>
          </tr>
          <tr
            style={{
              backgroundColor: "#ff9c3c",
              fontWeight: "bold",
              fontSize: "9pt",
            }}
          >
            <th style={{ border: "1px solid #bebebe" }}>TIPO DE HERRAMIENTA</th>
            <th style={{ border: "1px solid #bebebe" }}>
              MARCA/MODELO/NO. SERIE/NO. INTERNO
            </th>
            <th style={{ border: "1px solid #bebebe" }}>TÉCNICO RESPONSABLE</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid #bebebe" }}>{tipoHerramienta}</td>
            <td style={{ border: "1px solid #bebebe", fontSize: "8pt" }}>
              {marca} / {modelo} / {numeroSerie} / {numeroInterno}
            </td>
            <td style={{ border: "1px solid #bebebe" }}>{tecnicoResponsable}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CheckListInfoTable;