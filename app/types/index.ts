import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

export interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
}

export interface Activity {
  user: string;
  action: string;
  time: string;
  amount: string;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}