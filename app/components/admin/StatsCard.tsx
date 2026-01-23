import { LucideIcon } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
          <Icon className="text-white w-6 h-6" />
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
}
