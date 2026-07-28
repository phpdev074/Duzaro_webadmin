"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/admin/Sidebar";
import TopHeader from "@/app/components/admin/TopHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="w-8 h-8 border-4 border-gray-600 border-t-[#FFC93C] rounded-full animate-spin" />
      </div>
    );
  }

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
