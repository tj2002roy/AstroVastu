'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, UserSquare2, CalendarCheck, Settings } from 'lucide-react';
import { useAstroStore } from '@/lib/store/useAstroStore';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { consultations } = useAstroStore();

  const activeConsultationsCount = consultations.filter(
    (c) => c.status === 'confirmed' || c.status === 'pending'
  ).length;

  const navItems = [
    { label: 'Cosmic Feed', href: '/', icon: Sparkles },
    { label: 'Services', href: '/services', icon: Compass },
    { label: 'Kundli Vault', href: '/profiles', icon: UserSquare2 },
    { 
      label: 'Consultations', 
      href: '/consultations', 
      icon: CalendarCheck,
      badge: activeConsultationsCount > 0 ? activeConsultationsCount : undefined
    },
    { 
      label: 'Settings', 
      href: '/settings', 
      icon: Settings 
    },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-[#D4AF37]/25 pb-safe"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
    >
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center min-w-[60px] min-h-[50px] py-1 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#D4AF37] font-semibold scale-105'
                  : 'text-[#CED4DA] hover:text-[#F8F9FA] active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.4] drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-500 to-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center border border-[#0A1128]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'text-[#F3E5AB]' : 'text-slate-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
