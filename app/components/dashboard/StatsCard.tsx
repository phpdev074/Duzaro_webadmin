import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard as StatCardType } from '@/app/types';

interface StatsCardProps {
  stat: StatCardType;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  const Icon = stat.icon;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {/* <div className={`flex items-center gap-1 text-sm font-semibold ${
          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {stat.change}
        </div> */}
      </div>
      <div className="text-3xl font-bold mb-1">{stat.value}</div>
      <div className="text-sm text-gray-600">{stat.title}</div>
    </div>
  );
};

export default StatsCard;