"use client";
import React, { useEffect, useState } from 'react';
import { Users, Briefcase, DollarSign, Calendar } from 'lucide-react';
import StatsCard from '@/app/components/dashboard/StatsCard';
import UserDistributionChart from '@/app/components/dashboard/UserDistributionChart';
import QuickActions from '@/app/components/dashboard/QuickActions';
import { StatCard } from '@/app/types';
import { GetDashboardData } from '../api/ApiHelper/dashboardHelper';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const stats: StatCard[] = [
    {
      title: 'Total Users',
      value: dashboardData ? (dashboardData.users?.userCount ?? 0).toString() : '0',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      title: 'Active Services',
      value: dashboardData ? (dashboardData.categories?.serviceCount ?? 0).toString() : '0',
      change: '+8.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
    {
      title: 'Revenue',
      value: '₹0',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-amber-400 to-amber-500'
    },
    {
      title: 'Pending Dues',
      value: '₹0',
      change: '-5.4%',
      trend: 'down',
      icon: Calendar,
      color: 'bg-gradient-to-br from-rose-500 to-pink-600'
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await GetDashboardData();
        console.log(res.data.data)
        const stats = res.data.data;

        setDashboardData(stats);

        setData([
          { name: "Users", value: Number(stats?.users?.userCount) || 0, color: "#3B82F6" },
          { name: "Vendors", value: Number(stats?.users?.vendorCount) || 0, color: "#FFC93C" },
        ]);

      } catch (err) {
        console.error("Dashboard chart error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 lg:gap-5 justify-between px-4 lg:px-6 py-4 lg:py-5 min-h-0 overflow-hidden">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 flex-shrink-0">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-5 flex-1 min-h-0 items-stretch">
        <UserDistributionChart data={data} loading={loading} />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
