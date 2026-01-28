import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/app/types';

interface Props {
  data: ChartData[];
  loading: boolean;
}

const UserDistributionChart: React.FC<Props> = ({ data, loading }) => {

  return (
    <div className="col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg">User Distribution</h2>
      </div>

      <div className="h-80 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => {
                if (!percent || percent === 0) return null;
                return `${name}: ${(percent * 100).toFixed(0)}%`;
              }}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {!loading && (
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <div className="font-bold text-lg">{item.value}</div>
              <div className="text-xs text-gray-600">{item.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      {/* <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }}></div>
            <div className="font-bold text-lg">{item.value}</div>
            <div className="text-xs text-gray-600">{item.name}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default UserDistributionChart;