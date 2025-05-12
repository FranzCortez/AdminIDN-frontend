function FormCheckTypeCheckList({
  start,
  condicion = "",
  adicional = "--------",
  data = [],
  onChange,
}) {
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
            <th style={{ border: "1px solid #bebebe" }}>ITEM</th>
            <th style={{ border: "1px solid #bebebe", width: "50%" }}>
              {condicion}
            </th>
            <th style={{ border: "1px solid #bebebe" }}>SÍ</th>
            <th style={{ border: "1px solid #bebebe" }}>no</th>
            <th style={{ border: "1px solid #bebebe" }}>n/a</th>
            {adicional !== "" ? (
              <th style={{ border: "1px solid #bebebe" }}>{adicional}</th>
            ) : null}
            <th style={{ border: "1px solid #bebebe" }}>OBSERVACIONES</th>
          </tr>
        </thead>

        <tbody style={{ textAlign: "left" }}>
          {data.map((item) => (
            <tr start={item.id}>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid #bebebe",
                  textAlignLast: "center",
                }}
              >
                {item.id}
              </td>
              <td style={{ padding: "20px", border: "1px solid #bebebe" }}>
                {item.condicion}
              </td>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid #bebebe",
                  textAlign: "center",
                  fontSize: "8pt",
                  fontWeight: "bold",
                  width: "5%",
                }}
              >
                <input
                  type="radio"
                  name={`option-${item.id}-${start}`} // Agrupa los radios por fila
                  value="si"
                  checked={item.selected === "si"}
                  onChange={() => onChange(item.id, "si", "si")}
                />
              </td>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid #bebebe",
                  textAlign: "center",
                  fontSize: "8pt",
                  fontWeight: "bold",
                  width: "5%",
                }}
              >
                <input
                  type="radio"
                  name={`option-${item.id}-${start}`}
                  value="no"
                  checked={item.selected === "no"}
                  onChange={() => onChange(item.id, "no", "no")}
                />
              </td>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid #bebebe",
                  textAlign: "center",
                  fontSize: "8pt",
                  fontWeight: "bold",
                  width: "5%",
                }}
              >
                <input
                  type="radio"
                  name={`option-${item.id}-${start}`}
                  value="na"
                  checked={item.selected === "na"}
                  onChange={() => onChange(item.id, "na", "na")}
                />
              </td>
              {adicional !== "" ? (
                <td
                  style={{
                    padding: "20px",
                    border: "1px solid #bebebe",
                    width: "8%",
                  }}
                >
                  {adicional !== "---------" ? (
                    <input
                      type="text"
                      name={`adicional-${item.id}-${start}`}
                      value={item.adicional}
                      onChange={(e) =>
                        onChange(item.id, e.target.value, "adicional")
                      }
                    />
                  ) : null}
                </td>
              ) : null}
              <td style={{ padding: "20px", border: "1px solid #bebebe" }}>
                <textarea
                  type="text"
                  name={`observaciones-${item.id}-${start}`}
                  value={item.observaciones}
                  maxLength={50}
                  onChange={(e) =>
                    onChange(item.id, e.target.value, "observaciones")
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormCheckTypeCheckList;
