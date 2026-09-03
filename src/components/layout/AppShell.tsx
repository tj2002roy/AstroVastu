'use client';

import React from 'react';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { TabletRail } from './TabletRail';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0A1128] text-[#F8F9FA] cosmic-radial-bg flex flex-col selection:bg-[#D4AF37] selection:text-[#0A1128]">
      {/* Tablet / Desktop Persistent Rail */}
      <TabletRail />

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col md:pl-64 lg:pl-72 transition-all">
        <Header />
        
        <main className="flex-1 w-full max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 pb-28 md:pb-16">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};
