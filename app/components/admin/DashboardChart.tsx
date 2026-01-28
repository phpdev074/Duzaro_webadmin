"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Active Users", value: 856, color: "#3B82F6" },
  { name: "Premium Users", value: 245, color: "#FFC93C" },
  { name: "Free Users", value: 147, color: "#10B981" },
];

export default function DashboardChart() {

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold mb-6">User Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
