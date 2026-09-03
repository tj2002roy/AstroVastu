'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Sparkles, UserCircle, ChevronDown, PhoneCall, Check, Compass } from 'lucide-react';
import { useAstroStore } from '@/lib/store/useAstroStore';
import { calculateDailyPanchang, PanchangResult } from '@/lib/astro/panchangEngine';

export const Header: React.FC = () => {
  const { profiles, activeProfileId, setActiveProfileId } = useAstroStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [panchang, setPanchang] = useState<PanchangResult>(() => calculateDailyPanchang(new Date()));

  useEffect(() => {
    // Dynamically recalculate on mount for actual client time
    setPanchang(calculateDailyPanchang(new Date()));

    // Automatic rollover at midnight
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
    const ms = midnight.getTime() - now.getTime();
    const timer = setTimeout(() => {
      setPanchang(calculateDailyPanchang(new Date()));
    }, ms);

    return () => clearTimeout(timer);
  }, []);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-[#D4AF37]/20 bg-[#0A1128]/85 backdrop-blur-md">
      {/* Top Auspicious Ticker Banner */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#16425B] to-[#0A1128] border-b border-[#D4AF37]/15 px-2.5 sm:px-4 py-1 text-[10.5px] sm:text-[11px] text-[#CED4DA] flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sacred Celestial Zodiac Wheel rotating slowly clockwise */}
          <Compass className="w-3.5 h-3.5 text-[#D4AF37] animate-spin-slow shrink-0" />
          <span className="text-[#D4AF37] font-semibold">Live Vedic Muhurat:</span>
          <span>{panchang.nakshatra} ({panchang.nakshatraBengali})</span>
          <span className="text-slate-500">•</span>
          <span className="text-[#F3E5AB] font-medium">{panchang.activeMuhuratTicker}</span>
        </div>
        <div className="hidden lg:flex items-center gap-3 text-[11px]">
          <span className="text-amber-300/90 font-medium">Chambers: Jalpaiguri &amp; Siliguri</span>
          <span className="text-slate-500">•</span>
          <a
            href="tel:+917076715202"
            className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Chamber Desk: +91 70767 15202 / 94743 23694</span>
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Mobile & Tablet Guruji Brand Identity with Official Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#FFF1C5] to-[#B87333] shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]">
            <Image
              src="/images/brand_logo_emblem.jpg"
              alt="Sri Suvabrata Bharati Official Logo"
              width={44}
              height={44}
              className="w-full h-full object-cover rounded-full"
              priority
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#0A1128] rounded-full p-0.5 border border-[#D4AF37]">
              <Award className="w-2.5 h-2.5 text-[#D4AF37]" />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-xs sm:text-base tracking-tight sm:tracking-wide text-[#F8F9FA] leading-tight truncate">
              Sri Suvabrata Bharati
            </h1>
            <p className="text-[9px] sm:text-[10px] text-[#D4AF37] font-medium leading-none mt-0.5 truncate">
              <span className="sm:hidden">Gold Medalist • Astro-Vastu</span>
              <span className="hidden sm:inline">Gold Medalist Astrologer, Palmist &amp; Vastu Expert</span>
            </p>
          </div>
        </Link>

        {/* Desktop title / Spiritual tagline */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2541]/80 border border-[#D4AF37]/25 text-xs text-[#F3E5AB]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Autonomous Astro-Vastu &amp; Spiritual Wellness Ecosystem</span>
        </div>

        {/* Right Actions: Kundli Profile Selector & Quick Consultation CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Kundli Profile Selector */}
          {profiles.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#1C2541]/90 hover:bg-[#1C2541] border border-[#D4AF37]/30 text-xs transition-colors"
                title="Switch Active Kundli Profile"
              >
                <UserCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="hidden sm:inline max-w-[85px] lg:max-w-[120px] truncate font-medium text-[#F8F9FA]">
                  {activeProfile?.fullName || 'Profiles'}
                </span>
                <ChevronDown className="w-3 h-3 text-[#CED4DA] shrink-0" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0A1128] border border-[#D4AF37]/40 shadow-2xl p-2 z-50 animate-in fade-in-50 zoom-in-95">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#CED4DA]/70 px-2 py-1">
                      Active Kundli Profile
                    </div>
                    <div className="space-y-1">
                      {profiles.map((p) => {
                        const isSelected = p.id === activeProfileId;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              setActiveProfileId(p.id);
                              setProfileDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-colors ${
                              isSelected
                                ? 'bg-[#D4AF37]/20 text-[#F3E5AB] font-semibold'
                                : 'text-[#CED4DA] hover:bg-[#1C2541] hover:text-white'
                            }`}
                          >
                            <div className="truncate">
                              <p className="truncate font-medium">{p.fullName}</p>
                              <span className="text-[10px] text-[#CED4DA]/60 capitalize">
                                {p.relation} • {p.dob}
                              </span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="border-t border-[#D4AF37]/15 mt-2 pt-2">
                      <Link
                        href="/profiles"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block text-center text-xs font-semibold text-[#D4AF37] hover:underline py-1"
                      >
                        + Manage / Add Family Kundli
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Quick Book CTA */}
          <Link
            href="/services"
            className="gold-btn text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 rounded-lg font-bold shadow-md active:scale-95 transition-transform shrink-0 whitespace-nowrap"
          >
            <span className="sm:hidden">Consult</span>
            <span className="hidden sm:inline">Consult Now</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
