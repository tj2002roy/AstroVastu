'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Home, 
  Clock, 
  HeartHandshake, 
  Hand, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { SERVICES } from '@/lib/data/services';
import { Service, ServiceCategory, Consultation } from '@/types';
import { BookingDrawer } from '@/components/booking/BookingDrawer';
import { ConfirmationModal } from '@/components/booking/ConfirmationModal';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [confirmedConsultation, setConfirmedConsultation] = useState<Consultation | null>(null);

  const categories = [
    { key: 'all', label: 'All Disciplines' },
    { key: 'vedic', label: 'Vedic Kundli' },
    { key: 'vastu', label: '16-Zone Vastu' },
    { key: 'kp', label: 'KP Horary' },
    { key: 'nadi', label: 'Marriage & Nadi' },
    { key: 'numerology', label: 'Palmistry & Numbers' },
    { key: 'gemstone', label: 'Gemstones' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Home': return Home;
      case 'Clock': return Clock;
      case 'HeartHandshake': return HeartHandshake;
      case 'Hand': return Hand;
      case 'Sparkles': return Sparkles;
      default: return Compass;
    }
  };

  const handleBook = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
            Shastric Consultation Catalog
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F8F9FA] mt-2">
            Consultation Disciplines &amp; Remedial Sessions
          </h1>
          <p className="text-xs sm:text-sm text-[#CED4DA] mt-1.5 leading-relaxed">
            Direct, personalized analysis with Gold Medalist Astrologer Sri Suvabrata Bharati. Select your discipline for Video, Audio, or In-Person Chamber sessions.
          </p>
        </div>

        {/* Search and Category Filter Pills */}
        <div className="space-y-3">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by issue (e.g. marriage, career, vastu, gemstone)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1C2541]/80 border border-[#D4AF37]/30 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37] placeholder:text-[#CED4DA]/50"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#D4AF37]" />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 justify-start sm:justify-center scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-all ${
                  activeCategory === c.key
                    ? 'bg-[#D4AF37] text-[#0A1128] font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'bg-[#1C2541]/70 text-[#CED4DA] hover:bg-[#1C2541] hover:text-white border border-[#D4AF37]/15'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {filteredServices.map((service) => {
            const Icon = getIcon(service.icon);

            return (
              <div
                key={service.id}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/25 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group"
              >
                <div>
                  {/* Top row with category badge and price */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37]/20 to-[#16425B] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        {service.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                            {service.badge}
                          </span>
                        )}
                        <h2 className="font-serif font-bold text-base sm:text-lg text-[#F8F9FA] group-hover:text-[#F3E5AB] transition-colors leading-snug">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg sm:text-xl font-extrabold text-[#F3E5AB]">
                        ₹{service.feeINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#CED4DA]/70 block">{service.durationMinutes} mins</span>
                    </div>
                  </div>

                  {service.bengaliTitle && (
                    <p className="text-xs text-[#D4AF37]/90 font-medium mb-2">{service.bengaliTitle}</p>
                  )}

                  <p className="text-xs sm:text-[13px] text-[#CED4DA] leading-relaxed mb-4">
                    {service.fullDesc}
                  </p>

                  {/* Deliverables */}
                  <div className="bg-[#0A1128]/60 rounded-xl p-3.5 border border-[#D4AF37]/15 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#F3E5AB] block mb-2">
                      What is Included:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#CED4DA]">
                      {service.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#CED4DA]/80">
                    <span className="font-medium text-[#D4AF37]">Available via:</span>
                    <div className="flex items-center gap-1.5">
                      {service.modesAllowed.includes('video') && <span title="Video Call"><Video className="w-3.5 h-3.5" /></span>}
                      {service.modesAllowed.includes('audio') && <span title="Audio Call"><Phone className="w-3.5 h-3.5" /></span>}
                      {service.modesAllowed.includes('in_person') && <span title="Chamber Visit"><MapPin className="w-3.5 h-3.5" /></span>}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(service)}
                    className="gold-btn px-4 py-2.5 rounded-xl text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Reserve Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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

      {/* Confirmation Modal */}
      {confirmedConsultation && (
        <ConfirmationModal
          consultation={confirmedConsultation}
          onClose={() => setConfirmedConsultation(null)}
        />
      )}
    </AppShell>
  );
}
