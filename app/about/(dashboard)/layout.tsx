
import React from "react";
import SideNav from "./_section/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Dashboard Sidebar */}
      <SideNav />

      {/* Dashboard Page Content */}
      <main className="ml-[25%] min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
