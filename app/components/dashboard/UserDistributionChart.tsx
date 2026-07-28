import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/app/types';

interface Props {
  data: ChartData[];
  loading: boolean;
}

const UserDistributionChart: React.FC<Props> = ({ data, loading }) => {

  return (
    <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 lg:p-4 border border-gray-100 shadow-2xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="font-bold text-sm lg:text-base text-gray-900">User Distribution</h2>
      </div>

      <div className="w-full flex-1 min-h-[180px] max-h-[260px] flex items-center justify-center">
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
              outerRadius={75}
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
        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div
                className="w-2.5 h-2.5 rounded-full mx-auto mb-1"
                style={{ backgroundColor: item.color }}
              />
              <div className="font-bold text-base lg:text-lg">{item.value}</div>
              <div className="text-xs text-gray-600">{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDistributionChart;