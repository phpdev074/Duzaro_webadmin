"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Briefcase,
  FileText,
  CreditCard,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

const menu = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "User", href: "/admin/users", icon: Users },
  { name: "Category", href: "/admin/category", icon: FolderOpen },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Subscription", href: "/admin/subscription", icon: CreditCard },
  { name: "Setting", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/"; // change route if different
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC93C] rounded-full flex items-center justify-center font-bold">
            d
          </div>
          <span className="text-white text-xl font-bold">duezaro</span>
        </div>
        <p className="text-gray-400 text-xs mt-2">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active
                ? "bg-[#FFC93C] text-black font-semibold"
                : "text-gray-300 hover:bg-gray-700"
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        {/* <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
            AM
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">Admin</p>
            <p className="text-gray-400 text-xs">admin@duezaro.com</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div> */}

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>

      {showLogoutModal &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-2">
                Confirm Logout
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Are you sure you want to logout?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}


    </aside>
  );
}
