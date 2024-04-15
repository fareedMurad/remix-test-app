import React from "react";

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
      <div className="lg:flex bg-light min-h-full">
          {children}
          </div>    
  );
}
