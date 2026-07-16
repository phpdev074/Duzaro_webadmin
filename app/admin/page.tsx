// "use client";
// import StatsCard from "@/app/components/admin/StatsCard";
// import DashboardChart from "@/app/components/admin/DashboardChart";
// import { Users, Briefcase, DollarSign, Calendar } from "lucide-react";

// export default function AdminDashboard() {
//   return (
//     <>
//       <div className="grid grid-cols-4 gap-6 mb-8">
//         <StatsCard title="Total Users" value="1,248" icon={Users} />
//         <StatsCard title="Active Services" value="856" icon={Briefcase} />
//         <StatsCard title="Revenue" value="₹12.4L" icon={DollarSign} />
//         <StatsCard title="Pending Dues" value="₹2.8L" icon={Calendar} />
//       </div>

//       <DashboardChart />
//     </>
//   );
// }

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
      color: 'bg-blue-500'
    },
    {
      title: 'Active Services',
      value: dashboardData ? (dashboardData.categories?.serviceCount ?? 0).toString() : '0',
      change: '+8.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue',
      value: '₹0',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-[#FFC93C]'
    },
    {
      title: 'Pending Dues',
      value: '₹0',
      change: '-5.4%',
      trend: 'down',
      icon: Calendar,
      color: 'bg-red-500'
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
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <UserDistributionChart data={data} loading={loading} />
        <QuickActions />
      </div>
    </>
  );
};

export default Dashboard;
