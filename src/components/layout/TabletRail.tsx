'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Sparkles, 
  UserSquare2, 
  CalendarCheck, 
  Settings, 
  Award, 
  MapPin, 
  PhoneCall, 
  ExternalLink
} from 'lucide-react';
import { useAstroStore } from '@/lib/store/useAstroStore';

export const TabletRail: React.FC = () => {
  const pathname = usePathname();
  const { consultations } = useAstroStore();

  const activeConsultationsCount = consultations.filter(
    (c) => c.status === 'confirmed' || c.status === 'pending'
  ).length;

  const navLinks = [
    { label: 'Cosmic Feed & Forecasts', href: '/', icon: Sparkles },
    { label: 'Consultation Services', href: '/services', icon: Compass },
    { label: 'Birth Profiles (Kundli Vault)', href: '/profiles', icon: UserSquare2 },
    { 
      label: 'My Consultations', 
      href: '/consultations', 
      icon: CalendarCheck,
      badge: activeConsultationsCount > 0 ? activeConsultationsCount : undefined
    },
    { label: 'Settings & Privacy (GDPR)', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 fixed inset-y-0 left-0 z-40 bg-[#0A1128]/95 backdrop-blur-xl border-r border-[#D4AF37]/20 p-5 overflow-y-auto">
      {/* Brand & Guruji Card with Official Emblem Logo */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-[#D4AF37]/15">
        <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#FFF1C5] to-[#B87333] shadow-[0_0_15px_rgba(212,175,55,0.35)] shrink-0">
          <Image
            src="/images/brand_logo_emblem.jpg"
            alt="Sri Suvabrata Bharati Official Logo"
            width={56}
            height={56}
            className="w-full h-full object-cover rounded-full"
            priority
          />
          <div className="absolute -bottom-1 -right-1 bg-[#0A1128] rounded-full p-0.5 border border-[#D4AF37]">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
              Gold Medalist
            </span>
          </div>
          <h1 className="font-serif font-bold text-sm text-[#F8F9FA] truncate mt-0.5 leading-tight">
            Sri Suvabrata Bharati
          </h1>
          <p className="text-[11px] text-[#CED4DA]/80 truncate">
            Astro-Vastu, Palmist &amp; Numerology
          </p>
        </div>
      </div>

      {/* Chamber Status Indicator */}
      <div className="my-4 px-3 py-2.5 rounded-xl bg-[#1C2541]/70 border border-[#D4AF37]/15 text-xs">
        <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Active Chambers &amp; Clinics</span>
        </div>
        <div className="text-[11px] text-[#CED4DA] space-y-1">
          <p>• <strong>Jalpaiguri:</strong> Kadamtala Main Chamber</p>
          <p>• <strong>Siliguri:</strong> Cosmos Complex, Sevoke Rd</p>
          <p>• <strong>Worldwide:</strong> 1-on-1 Encrypted Tele-Consult</p>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1.5 my-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#CED4DA]/60 px-3 py-1">
          Client Portal
        </div>
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B87333]/10 text-[#F3E5AB] border border-[#D4AF37]/40 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                  : 'text-[#CED4DA] hover:bg-[#1C2541]/60 hover:text-[#F8F9FA]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Official Community & Direct Chamber Helpdesk */}
      <div className="pt-4 border-t border-[#D4AF37]/15 space-y-2.5">
        {/* Facebook Link */}
        <a
          href="https://www.facebook.com/srisubhabratabharati"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/30 text-[#F8F9FA] text-[11px] transition-colors"
        >
          <span>Official Facebook Channel</span>
          <ExternalLink className="w-3 h-3 text-[#1877F2]" />
        </a>

        {/* Direct Chamber Helpline */}
        <div className="text-center space-y-1">
          <a
            href="tel:+917076715202"
            className="block text-[11px] text-[#D4AF37] hover:underline font-semibold"
          >
            <PhoneCall className="w-3 h-3 inline mr-1" />
            <span>Jalpaiguri: +91 70767 15202</span>
          </a>
          <a
            href="tel:+919474323694"
            className="block text-[11px] text-[#D4AF37] hover:underline font-semibold"
          >
            <PhoneCall className="w-3 h-3 inline mr-1" />
            <span>Siliguri: +91 94743 23694</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
