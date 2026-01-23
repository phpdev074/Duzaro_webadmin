import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/app/types';

const UserDistributionChart: React.FC = () => {
  const pieChartData: ChartData[] = [
    { name: 'Active Users', value: 0, color: '#3B82F6' },
    { name: 'Premium Users', value: 0, color: '#FFC93C' },
    { name: 'Free Users', value: 0, color: '#10B981' },
  ];

  return (
    <div className="col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg">User Distribution</h2>
      </div>

      <div className="h-80 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
label={({ name, percent }) =>
  `${name}: ${(((percent ?? 0) * 100).toFixed(0))}%`
}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        {pieChartData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }}></div>
            <div className="font-bold text-lg">{item.value}</div>
            <div className="text-xs text-gray-600">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDistributionChart;