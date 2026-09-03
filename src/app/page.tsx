'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  Sparkles, 
  MapPin, 
  Compass, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Share2, 
  Video, 
  PhoneCall, 
  Home, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { SERVICES } from '@/lib/data/services';
import { COSMIC_POSTS } from '@/lib/data/posts';
import { CHAMBERS } from '@/lib/data/chambers';
import { useAstroStore } from '@/lib/store/useAstroStore';
import { Service, Consultation } from '@/types';
import { BookingDrawer } from '@/components/booking/BookingDrawer';
import { ConfirmationModal } from '@/components/booking/ConfirmationModal';
import { calculateDailyPanchang, PanchangResult } from '@/lib/astro/panchangEngine';

export default function HomePage() {
  const { cosmicPosts, likedPostIds, toggleLikePost } = useAstroStore();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [confirmedConsultation, setConfirmedConsultation] = useState<Consultation | null>(null);
  const [panchang, setPanchang] = useState<PanchangResult>(() => calculateDailyPanchang(new Date()));

  useEffect(() => {
    setPanchang(calculateDailyPanchang(new Date()));
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
    const ms = midnight.getTime() - now.getTime();
    const timer = setTimeout(() => {
      setPanchang(calculateDailyPanchang(new Date()));
    }, ms);
    return () => clearTimeout(timer);
  }, []);

  // Quick Daily Horoscope sign selector
  const [selectedSign, setSelectedSign] = useState<string>('Taurus');

  const zodiacSigns = [
    { name: 'Aries', element: 'Fire', rashi: 'Mesha', icon: '♈' },
    { name: 'Taurus', element: 'Earth', rashi: 'Vrishabha', icon: '♉' },
    { name: 'Gemini', element: 'Air', rashi: 'Mithuna', icon: '♊' },
    { name: 'Cancer', element: 'Water', rashi: 'Karka', icon: '♋' },
    { name: 'Leo', element: 'Fire', rashi: 'Simha', icon: '♌' },
    { name: 'Virgo', element: 'Earth', rashi: 'Kanya', icon: '♍' },
    { name: 'Libra', element: 'Air', rashi: 'Tula', icon: '♎' },
    { name: 'Scorpio', element: 'Water', rashi: 'Vrishchika', icon: '♏' },
    { name: 'Sagittarius', element: 'Fire', rashi: 'Dhanu', icon: '♐' },
    { name: 'Capricorn', element: 'Earth', rashi: 'Makara', icon: '♑' },
    { name: 'Aquarius', element: 'Air', rashi: 'Kumbha', icon: '♒' },
    { name: 'Pisces', element: 'Water', rashi: 'Meena', icon: '♓' },
  ];

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <AppShell>
      {/* HERO SECTION: Sri Suvabrata Bharati Master Authority */}
      <section className="relative overflow-hidden rounded-3xl glass-card border border-[#D4AF37]/35 p-5 sm:p-8 md:p-10 mb-8">
        {/* Background glow and subtle geometry */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4AF37]/15 via-[#16425B]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Guruji Portrait with Gold Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#B87333] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-2xl bg-[#0A1128]">
                <Image
                  src="/images/brand_logo_emblem.jpg"
                  alt="Sri Suvabrata Bharati Gold Medalist Astrologer"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0A1128]/95 border border-[#D4AF37] px-4 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-[#F3E5AB]">Gold Medalist Astrologer</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#16425B]/60 text-[#CED4DA] border border-[#D4AF37]/25">
                Vedic Astrology &amp; Kundli
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#16425B]/60 text-[#CED4DA] border border-[#D4AF37]/25">
                16-Zone Vastu Shastra
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#16425B]/60 text-[#CED4DA] border border-[#D4AF37]/25">
                হস্তরেখা ও সংখ্যাতত্ত্ব
              </span>
            </div>
          </div>

          {/* Authority Details & Value Proposition */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>North Bengal Chambers &amp; Worldwide Digital Consultations</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8F9FA] tracking-tight leading-snug">
              Transforming Karmic Destinies Through <span className="gold-gradient-text">Authentic Shastric Guidance</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#CED4DA] leading-relaxed max-w-2xl">
              Consult with <strong>Sri Suvabrata Bharati</strong>, trusted spiritual guide and renowned Gold Medalist Astrologer serving devotees across <strong>Jalpaiguri, Siliguri, and the global South Asian diaspora</strong>. Providing time-tested solutions for career transitions, business expansion, marital harmony, and zero-demolition scientific Vastu remedies.
            </p>

            {/* Quick chamber tags with verified numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-[#0A1128]/70 border border-[#D4AF37]/20 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F3E5AB]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Jalpaiguri Chamber</span>
                </div>
                <p className="text-[11px] text-[#CED4DA]/70 mt-0.5">Kadamtala Main Chamber</p>
                <p className="text-[11px] text-[#D4AF37] font-semibold mt-1">Direct: +91 70767 15202</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0A1128]/70 border border-[#D4AF37]/20 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F3E5AB]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Siliguri Clinic</span>
                </div>
                <p className="text-[11px] text-[#CED4DA]/70 mt-0.5">Cosmos Complex, Sevoke Rd</p>
                <p className="text-[11px] text-[#D4AF37] font-semibold mt-1">Direct: +91 94743 23694</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleBookNow(SERVICES[0])}
                className="w-full sm:w-auto gold-btn px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/services"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#D4AF37]/40 text-[#CED4DA] hover:text-white hover:bg-[#1C2541]/80 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Explore All 6 Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S VEDIC PANCHANG & AUSPICIOUS TIMINGS */}
      <section className="mb-8">
        <div className="p-4 sm:p-6 rounded-2xl glass-card border border-[#D4AF37]/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-[#D4AF37]/15 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h2 className="font-serif font-bold text-sm sm:text-base text-[#F8F9FA]">
                  Today&apos;s Shastric Panchang &amp; Live Muhurat
                </h2>
              </div>
              <p className="text-[11px] text-[#CED4DA]/80 mt-0.5">{panchang.date} • IST Clock: {panchang.currentTimeStr}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] px-3 py-1 rounded-full bg-[#16425B]/80 text-[#D4AF37] font-semibold border border-[#D4AF37]/30">
                Moon Sign: {panchang.moonSign} ({panchang.moonSignBengali})
              </span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                {panchang.activeMuhuratTicker}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0A1128]/70 border border-[#D4AF37]/15">
              <span className="text-[10px] uppercase font-semibold text-[#CED4DA]/60 block">Nakshatra</span>
              <p className="font-bold text-[#F3E5AB] mt-0.5 truncate">{panchang.nakshatra} ({panchang.nakshatraBengali})</p>
              <span className="text-[10px] text-[#CED4DA]/60 block mt-0.5">Moon Constellation</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0A1128]/70 border border-[#D4AF37]/15">
              <span className="text-[10px] uppercase font-semibold text-[#CED4DA]/60 block">Tithi</span>
              <p className="font-bold text-[#F8F9FA] mt-0.5 truncate">{panchang.tithi}</p>
              <span className="text-[10px] text-[#CED4DA]/60 block mt-0.5">{panchang.tithiBengali}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0A1128]/70 border border-emerald-500/25">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-emerald-400">Abhijit Muhurat</span>
                {panchang.currentMinutes > 741 ? (
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-semibold">Completed</span>
                ) : panchang.currentMinutes >= 693 ? (
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold animate-pulse">Active Now</span>
                ) : (
                  <span className="text-[9px] bg-[#D4AF37]/20 text-[#F3E5AB] px-1.5 py-0.2 rounded font-semibold">Upcoming</span>
                )}
              </div>
              <p className="font-bold text-white mt-0.5 truncate">{panchang.abhijitMuhurat}</p>
              <span className="text-[10px] text-emerald-400/80 block mt-0.5">Mid-Day Solar Window</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0A1128]/70 border border-amber-500/25">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-amber-400">Godhuli Sandhya</span>
                {panchang.currentMinutes > 1110 ? (
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-semibold">Completed</span>
                ) : panchang.currentMinutes >= 1050 ? (
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold animate-pulse">Active Now</span>
                ) : (
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">Upcoming Shubh</span>
                )}
              </div>
              <p className="font-bold text-[#F3E5AB] mt-0.5 truncate">{panchang.godhuliMuhurat}</p>
              <span className="text-[10px] text-[#CED4DA]/60 block mt-0.5">Sunset Twilight Window</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CONSULTATION SERVICES */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Direct Consultations</span>
            </div>
            <h2 className="font-serif font-bold text-lg sm:text-xl text-[#F8F9FA]">
              Prescriptive Consultation Services
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-5 border border-[#D4AF37]/25 flex flex-col justify-between relative overflow-hidden group hover:border-[#D4AF37]/50"
            >
              {service.badge && (
                <div className="absolute top-3.5 right-3.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {service.badge}
                </div>
              )}

              <div>
                <h3 className="font-serif font-bold text-base text-[#F8F9FA] pr-16 group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                {service.bengaliTitle && (
                  <p className="text-[11px] text-[#CED4DA]/70 mt-0.5">{service.bengaliTitle}</p>
                )}
                <p className="text-xs text-[#CED4DA] mt-2.5 line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables snippet */}
                <div className="mt-3.5 pt-3 border-t border-[#D4AF37]/15 space-y-1.5">
                  {service.deliverables.slice(0, 2).map((del, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#CED4DA]/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#CED4DA]/60 block">Dakshina</span>
                  <span className="text-base font-extrabold text-[#F3E5AB]">
                    ₹{service.feeINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#CED4DA]/60 ml-1">/ {service.durationMinutes}m</span>
                </div>

                <button
                  onClick={() => handleBookNow(service)}
                  className="gold-btn px-3.5 py-2 rounded-xl text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Consult Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK HOROSCOPE INSIGHT BAR */}
      <section className="mb-10 p-5 rounded-2xl glass-card border border-[#D4AF37]/20">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#F8F9FA]">
            Daily Rashi Alignment &amp; Planetary Advice
          </h3>
        </div>

        {/* Horizontal Zodiac Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {zodiacSigns.map((z) => (
            <button
              key={z.name}
              onClick={() => setSelectedSign(z.name)}
              className={`px-3 py-2 rounded-xl border text-xs whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedSign === z.name
                  ? 'bg-[#D4AF37]/25 border-[#D4AF37] text-[#F3E5AB] font-bold shadow-[0_0_8px_rgba(212,175,55,0.2)]'
                  : 'bg-[#0A1128]/60 border-[#D4AF37]/15 text-[#CED4DA] hover:bg-[#1C2541]'
              }`}
            >
              <span className="text-sm">{z.icon}</span>
              <span>{z.name}</span>
              <span className="text-[10px] text-[#CED4DA]/60">({z.rashi})</span>
            </button>
          ))}
        </div>

        <div className="mt-3 p-3.5 rounded-xl bg-[#0A1128]/80 border border-[#D4AF37]/20 text-xs text-[#CED4DA] leading-relaxed">
          <strong className="text-[#F3E5AB]">{selectedSign} Today: </strong>
          With Moon and Jupiter in favorable aspect, your career negotiations yield positive traction today. Maintain transparency in financial agreements. Auspicious color is Golden Yellow, and chant Om Namah Shivaya 11 times before stepping out.
        </div>
      </section>

      {/* THE "COSMIC FEED" (CONTENT DELIVERY & USER RETENTION ENGINE) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cosmic Retention Feed</span>
            </div>
            <h2 className="font-serif font-bold text-lg sm:text-xl text-[#F8F9FA]">
              Daily Astrology Insights &amp; Vastu Remedies
            </h2>
          </div>

          <a
            href="https://www.facebook.com/srisubhabratabharati"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#1877F2] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Facebook Page</span>
            <Share2 className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cosmicPosts.map((post) => {
            const isLiked = likedPostIds.includes(post.id);

            return (
              <article
                key={post.id}
                className="glass-card rounded-2xl border border-[#D4AF37]/25 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/45 transition-all"
              >
                <div>
                  {/* Authentic Vedic Discourse & Shastric Video Banner */}
                  {post.youtubeId ? (
                    <div className="relative aspect-video w-full bg-[#0A1128] overflow-hidden border-b border-[#D4AF37]/20 group">
                      <Image
                        src="/images/guruji_portrait.jpg"
                        alt={post.title}
                        fill
                        className="object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0A1128]/60 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
                        <div className="flex items-center justify-between">
                          <span className="bg-[#D4AF37] text-[#0A1128] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Recorded Shastric Discourse
                          </span>
                          <span className="text-[11px] text-[#F3E5AB] font-semibold bg-[#0A1128]/80 px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                            Bengali &amp; Hindi
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white drop-shadow">Sri Suvabrata Bharati</p>
                            <p className="text-[10px] text-[#CED4DA] drop-shadow">Chamber Lecture Series • 18 Mins</p>
                          </div>
                          <a
                            href="https://www.facebook.com/srisubhabratabharati"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-[#D4AF37] text-[#0A1128] shadow-[0_0_15px_#D4AF37] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
                            title="Watch complete video on Sri Suvabrata Bharati Facebook Page"
                          >
                            <Video className="w-4 h-4 fill-current" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : post.imageUrl ? (
                    <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden border-b border-[#D4AF37]/20 bg-[#0A1128]">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-contain sm:object-cover transition-transform duration-500 hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-40" />
                      <div className="absolute top-3 left-3 bg-[#0A1128]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {post.category === 'vastu_tip' ? '16-Zone Vastu Shastra' : 'Shastric Remedy'}
                      </div>
                    </div>
                  ) : null}

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-[11px] text-[#CED4DA]/60 mb-2">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span className="text-[#D4AF37] font-medium">Sri Suvabrata Bharati</span>
                    </div>

                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#F8F9FA] leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#CED4DA]/90 mt-2 leading-relaxed whitespace-pre-line line-clamp-4">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-[#16425B]/40 text-[#CED4DA] px-2 py-0.5 rounded-md border border-[#D4AF37]/15"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="px-4 sm:px-5 py-3 border-t border-[#D4AF37]/15 bg-[#0A1128]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        isLiked ? 'text-rose-500 font-bold' : 'text-[#CED4DA] hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
                        }
                      }}
                      className="flex items-center gap-1.5 text-[#CED4DA] hover:text-white"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleBookNow(SERVICES[0])}
                    className="text-[11px] text-[#D4AF37] font-bold hover:underline"
                  >
                    Consult on this Issue →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CHAMBER INFORMATION & MAPS */}
      <section className="mb-8">
        <div className="p-5 sm:p-7 rounded-3xl glass-card border border-[#D4AF37]/35">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F9FA]">
              In-Person Consultation Chambers
            </h2>
            <p className="text-xs text-[#CED4DA] mt-1">
              Visit Guruji directly at official chambers in North Bengal or connect anywhere in the world via private video link.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CHAMBERS.map((chamber) => (
              <div
                key={chamber.id}
                className="p-4 rounded-2xl bg-[#0A1128]/80 border border-[#D4AF37]/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F3E5AB] mb-1">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>{chamber.title}</span>
                  </div>
                  <p className="text-xs text-[#CED4DA] mt-2 leading-relaxed">
                    {chamber.address}
                  </p>
                  <p className="text-[11px] text-[#CED4DA]/70 mt-1">
                    <strong>Landmark:</strong> {chamber.landmark}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4AF37]/15">
                  <div className="text-[11px] text-[#D4AF37] font-semibold">
                    <p>Days: {chamber.days}</p>
                    <p>Time: {chamber.timings}</p>
                  </div>

                  <a
                    href={`tel:${chamber.helpline.replace(/\s+/g, '')}`}
                    className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-[#16425B] hover:bg-[#16425B]/80 text-[#F3E5AB] text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Chamber: {chamber.helpline}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Booking Drawer */}
      {selectedService && (
        <BookingDrawer
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          service={selectedService}
          onBookingSuccess={(consultation) => {
            setConfirmedConsultation(consultation);
          }}
        />
      )}

      {/* Confirmation Celebration Modal */}
      {confirmedConsultation && (
        <ConfirmationModal
          consultation={confirmedConsultation}
          onClose={() => setConfirmedConsultation(null)}
        />
      )}
    </AppShell>
  );
}
