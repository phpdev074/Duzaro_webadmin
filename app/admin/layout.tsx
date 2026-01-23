"use client";
import Sidebar from "@/app/components/admin/Sidebar";
import TopHeader from "@/app/components/admin/TopHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="!text-black min-h-screen flex bg-gradient-to-br from-gray-100 to-green-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopHeader />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
