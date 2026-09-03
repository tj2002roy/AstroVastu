'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useAstroStore } from '@/lib/store/useAstroStore';

export default function ConsultationsPage() {
  const { consultations } = useAstroStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filtered = consultations.filter((c) => {
    if (filter === 'active') return c.status === 'confirmed' || c.status === 'pending';
    if (filter === 'completed') return c.status === 'completed';
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consultation Ledger</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F8F9FA] mt-1.5">
              My Astrological Consultations
            </h1>
            <p className="text-xs sm:text-sm text-[#CED4DA] mt-1">
              Track upcoming 1-on-1 sessions, chamber appointments, and prescribed Vedic remedies.
            </p>
          </div>

          <Link
            href="/services"
            className="gold-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md self-start sm:self-auto"
          >
            <span>+ Book New Session</span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 border-b border-[#D4AF37]/15 pb-2">
          {[
            { key: 'all', label: 'All Consultations' },
            { key: 'active', label: 'Upcoming / Active' },
            { key: 'completed', label: 'Past / Remedies Prescribed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === tab.key
                  ? 'bg-[#D4AF37] text-[#0A1128]'
                  : 'bg-[#1C2541]/70 text-[#CED4DA] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Consultations List */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl border border-[#D4AF37]/20 p-8 max-w-md mx-auto">
            <CalendarCheck className="w-12 h-12 text-[#D4AF37]/60 mx-auto mb-3" />
            <h2 className="font-serif text-lg font-bold text-white">No Consultations Found</h2>
            <p className="text-xs text-[#CED4DA] mt-1 mb-4">
              You do not have any appointments under this filter.
            </p>
            <Link href="/services" className="gold-btn px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5">
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/25 hover:border-[#D4AF37]/45 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4AF37]/15 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold bg-[#0A1128] text-[#F3E5AB] px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                      {item.bookingRef}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      item.status === 'confirmed'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : item.status === 'completed'
                        ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                        : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs text-[#CED4DA]/70">
                    Reserved on: {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>

                {/* Body Details */}
                <div className="my-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-8 space-y-2">
                    <h2 className="font-serif font-bold text-base sm:text-lg text-[#F8F9FA]">
                      {item.serviceTitle}
                    </h2>
                    <p className="text-xs text-[#D4AF37] font-medium">
                      Kundli: {item.profileName} • DOB: {item.birthDetails.dob} ({item.birthDetails.placeOfBirth})
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-[#CED4DA] pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{item.appointmentDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{item.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.mode === 'video' && <Video className="w-3.5 h-3.5 text-blue-400" />}
                        {item.mode === 'audio' && <Phone className="w-3.5 h-3.5 text-emerald-400" />}
                        {item.mode === 'in_person' && <MapPin className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{item.chamberLocation || 'Online Tele-Consult'}</span>
                      </div>
                    </div>

                    {item.clientConcerns && (
                      <p className="text-xs text-[#CED4DA]/80 bg-[#0A1128]/50 p-2.5 rounded-xl border border-[#D4AF37]/10 mt-2">
                        <strong className="text-white">Query Context: </strong>
                        {item.clientConcerns}
                      </p>
                    )}
                  </div>

                  {/* Right Action / Payment Column */}
                  <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end gap-3 p-3 rounded-xl bg-[#0A1128]/60 border border-[#D4AF37]/15">
                    <div>
                      <span className="text-[10px] text-[#CED4DA]/70 block md:text-right">Dakshina</span>
                      <span className="text-base font-extrabold text-[#F3E5AB]">
                        ₹{item.amountINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-400 block md:text-right font-medium">
                        ✓ {item.paymentMethod} Verified
                      </span>
                    </div>

                    {item.mode !== 'in_person' && item.meetingLink && item.status === 'confirmed' && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto gold-btn px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Video Room</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Prescribed Remedies Section (if completed or added) */}
                {item.astrologerRemedies && (
                  <div className="mt-3 p-3.5 rounded-xl bg-[#16425B]/40 border border-[#D4AF37]/30 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#F3E5AB] font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Prescribed Vedic Remedies from Sri Suvabrata Bharati:</span>
                    </div>
                    <p className="text-[#CED4DA] leading-relaxed">
                      {item.astrologerRemedies}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
