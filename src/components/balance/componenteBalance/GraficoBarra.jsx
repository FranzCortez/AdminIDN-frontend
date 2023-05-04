import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function GraficoBarra({ totalPrimero, totalSegundo, totalReal, texto, uv, pv, av }) {
    const data = [
        {
          name: texto,
          [uv] : totalSegundo,
          [pv] : totalPrimero,
          [av] : totalReal,
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip/>
                    <Legend verticalAlign="top" align="center" />
                    {
                        av ?
                        <Bar dataKey={`${av}`} stackId="a" fill="#ff8533" />
                        :
                        null
                    }
                    <Bar dataKey={`${pv}`} stackId="a" fill="#8884d8" />
                    <Bar dataKey={`${uv}`} fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraficoBarra;