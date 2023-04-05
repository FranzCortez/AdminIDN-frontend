import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

function GraficoTortaComparacion({ data01, data02 }) {

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#ff4242",
        "#ff42ef",
        "#42ff71",
        "#ff42a4",
        "#ed6e6e",
        "#2200ff",
        "#00921d",
        "#c8152d"
    ];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        // const sin = Math.sin(-RADIAN * midAngle);
        // const cos = Math.cos(-RADIAN * midAngle);
        // const sx = cx + (outerRadius + 10) * cos;
        // const sy = cy + (outerRadius + 10) * sin;
        // const mx = cx + (outerRadius + 30) * cos;
        // const my = cy + (outerRadius + 30) * sin;
        // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        // const ey = my;
        
        if((percent * 100).toFixed(0) === '0') {
            return null
        } 
        return (
            <text
              x={x}
              y={y}
              fill="black"
              textAnchor={x > cx ? "start" : "end"}
              doeinantBaseline="central"
            >
              {`${data01[index].name} ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={500}>
                    <Pie
                        data={data01}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={160}
                        fill="#0d6efd"
                        label={renderCustomizedLabel}
                    />
                    <Pie
                        data={data02}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={190}
                        outerRadius={230}
                        fill="#ff8533"
                        label={renderCustomizedLabel}
                    />
                </PieChart>
                {/* <PieChart
                    width={500}
                    height={500}
                >
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius="100%"
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip/>
                </PieChart> */}
            </ResponsiveContainer>
        </div>
    )
}

export default GraficoTortaComparacion
