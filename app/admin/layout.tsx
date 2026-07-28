"use client";
import Sidebar from "@/app/components/admin/Sidebar";
import TopHeader from "@/app/components/admin/TopHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="!text-black h-screen h-dvh flex overflow-hidden bg-gradient-to-br from-gray-100 to-green-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-full overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto min-h-0 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
