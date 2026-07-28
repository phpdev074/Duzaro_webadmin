"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GetAdminProfile } from "@/app/api/ApiHelper/adminProfileHelper";

export default function TopHeader() {
  const pathname = usePathname();
  const [adminName, setAdminName] = useState<string>("");

  const title =
    pathname === "/admin"
      ? "Dashboard"
      : pathname.split("/").pop()?.replace(/-/g, " ").toUpperCase();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await GetAdminProfile();
        if (res.data?.data) {
          const admin = res.data.data;
          setAdminName(admin.name || admin.email || "Admin");
          localStorage.setItem("admin_user", JSON.stringify(admin));
        }
      } catch (error) {
        console.error("Failed to load admin profile in header:", error);
        const storedAdmin = localStorage.getItem("admin_user");
        if (storedAdmin) {
          try {
            const parsed = JSON.parse(storedAdmin);
            setAdminName(parsed.name || parsed.email || "Admin");
          } catch { }
        }
      }
    };

    fetchAdminProfile();

    // Listen for custom profile update events if profile updated in settings
    window.addEventListener("focus", fetchAdminProfile);
    return () => window.removeEventListener("focus", fetchAdminProfile);
  }, []);

  const initials = adminName
    ? adminName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "AD";

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b px-6 lg:px-8 py-3 lg:py-3.5 flex-shrink-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {adminName || "Admin User"}
            </p>
            <p className="text-xs text-gray-500 font-medium">Administrator</p>
          </div>
          <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base shadow-sm border border-gray-200">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
