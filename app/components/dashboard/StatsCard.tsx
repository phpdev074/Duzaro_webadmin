import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard as StatCardType } from '@/app/types';

interface StatsCardProps {
  stat: StatCardType;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  const Icon = stat.icon;
  const isUp = stat.trend === 'up';

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 lg:p-4.5 border border-gray-200/80 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all group flex flex-col justify-between h-full">
      {/* Top Row: Icon & Trend Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className={`w-10 h-10 lg:w-11 lg:h-11 ${stat.color} rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {stat.change && (
          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold ${
            isUp ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
          }`}>
            {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {stat.change}
          </span>
        )}
      </div>

      {/* Bottom Row: Value & Title */}
      <div>
        <div className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">
          {stat.value}
        </div>
        <div className="text-xs lg:text-sm font-semibold text-gray-500">
          {stat.title}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;