import React from "react";

function CheckListTable({ primero = true, condicion = '', adicional= '--------', data}) {

  return (
    <div style={{ width: "100%" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "8pt",
          textAlign: "center",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#ff9c3c",
              fontWeight: "bold",
              fontSize: "8.6pt",
              textTransform: "uppercase",
            }}
          >
            <th style={{ border: "1px solid #bebebe", borderTop: primero ? '1px solid #bebebe': 'none' }}>ITEM</th>
            <th style={{ border: "1px solid #bebebe", width: "50%", borderTop: primero ? '1px solid #bebebe': 'none' }}>
                {condicion}
            </th>
            <th style={{ border: "1px solid #bebebe", borderTop: primero ? '1px solid #bebebe': 'none' }}>sí</th>
            <th style={{ border: "1px solid #bebebe", borderTop: primero ? '1px solid #bebebe': 'none' }}>no</th>
            <th style={{ border: "1px solid #bebebe", borderTop: primero ? '1px solid #bebebe': 'none' }}>n/a</th>
            <th style={{ border: "1px solid #bebebe", borderTop: primero ? '1px solid #bebebe': 'none' }}>{adicional}</th>
            <th style={{ border: "1px solid #bebebe", borderTop: primero ? '1px solid #bebebe': 'none' }}>OBSERVACIONES</th>
          </tr>
        </thead>

        <tbody style={{ textAlign: "left" }}>
            {data.map((item) => (
                <tr key={item.id}>
                <td style={{ border: "1px solid #bebebe", textAlignLast: "center"  }}>{item.id}</td>
                <td style={{ border: "1px solid #bebebe" }}>
                    {item.condicion}
                </td>
                <td style={{ border: "1px solid #bebebe", textAlign: "center", fontSize: "8pt", fontWeight: "bold", width: "5%" }}>
                    {item.si ? "X" : ""}
                </td>
                <td style={{ border: "1px solid #bebebe", textAlign: "center", fontSize: "8pt", fontWeight: "bold", width: "5%" }}>
                    {item.no ? "X" : ""}
                </td>
                <td style={{ border: "1px solid #bebebe", textAlign: "center", fontSize: "8pt", fontWeight: "bold", width: "5%" }}>
                    {item.na ? "X" : ""}
                </td>
                <td style={{ border: "1px solid #bebebe", width: "8%" }}>
                    {item.adicional}
                </td>
                <td style={{ border: "1px solid #bebebe" }}>
                    {item.observaciones}
                </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckListTable;
