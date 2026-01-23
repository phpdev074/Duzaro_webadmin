"use client";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TopHeader() {
  const pathname = usePathname();
  const title =
    pathname === "/admin"
      ? "Dashboard"
      : pathname.split("/").pop()?.toUpperCase();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b px-8 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-600">Admin Control Center</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <button className="relative w-10 h-10 border rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </button>

          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
