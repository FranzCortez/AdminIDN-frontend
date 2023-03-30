import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function GraficoBarra({ totalPrimero, totalSegundo, texto, uv, pv }) {
    const data = [
        {
          name: texto,
          [uv] : totalSegundo,
          [pv] : totalPrimero,
          amt: totalSegundo
        },
    ];


    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="90%" height="100%">
                
                <BarChart
                
                    width={500}
                    height={700}
                    data={data}
                    barCategoryGap={'5%'}
                    margin={{top: 20, right: 20, bottom: 20, left: 50}}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip/>
                    <Legend verticalAlign="top" align="center" />
                    <Bar dataKey={`${pv}`} fill="#8884d8" />
                    <Bar dataKey={`${uv}`} fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraficoBarra;