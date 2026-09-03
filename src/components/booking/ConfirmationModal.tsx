'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone, 
  ExternalLink, 
  Download, 
  Award,
  Sparkles,
  Share2
} from 'lucide-react';
import { Consultation } from '@/types';

interface ConfirmationModalProps {
  consultation: Consultation | null;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  consultation,
  onClose,
}) => {
  if (!consultation) return null;

  // Generate downloadable .ics calendar invite content
  const handleDownloadCalendar = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sri Suvabrata Bharati//Astro-Vastu Consultations//EN
BEGIN:VEVENT
UID:${consultation.id}@suvabratabharati.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${consultation.appointmentDate.replace(/-/g, '')}T103000Z
DTEND:${consultation.appointmentDate.replace(/-/g, '')}T111500Z
SUMMARY:${consultation.serviceTitle} with Sri Suvabrata Bharati
DESCRIPTION:Consultation Ref: ${consultation.bookingRef}\\nMode: ${consultation.mode}\\nChamber: ${consultation.chamberLocation || 'Online'}
LOCATION:${consultation.chamberLocation || 'Google Meet'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${consultation.bookingRef}-Consultation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaskar Guruji Sri Suvabrata Bharati, I have reserved appointment #${consultation.bookingRef} for ${consultation.serviceTitle} on ${consultation.appointmentDate} (${consultation.timeSlot}). Looking forward to your guidance.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-[#D4AF37]/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Decorative Golden Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Success Icon Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF1C5] p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-3">
            <div className="w-full h-full rounded-full bg-[#0A1128] flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-[#D4AF37]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Consultation Confirmed &amp; Reserved</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F9FA]">
            Subho Kalyan! Appointment Confirmed
          </h2>
          <p className="text-xs text-[#CED4DA] mt-1">
            Sri Suvabrata Bharati looks forward to analyzing your astrological charts.
          </p>
        </div>

        {/* Details Card */}
        <div className="my-5 p-4 rounded-2xl bg-[#1C2541]/70 border border-[#D4AF37]/20 space-y-2.5 text-xs">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-2">
            <span className="text-[#CED4DA]/70">Booking Token:</span>
            <span className="font-mono font-bold text-[#F3E5AB] bg-[#0A1128] px-2 py-0.5 rounded border border-[#D4AF37]/30">
              {consultation.bookingRef}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#CED4DA]/70">Service:</span>
            <span className="font-semibold text-white text-right truncate max-w-[220px]">
              {consultation.serviceTitle}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#CED4DA]/70">Profile Name:</span>
            <span className="font-medium text-white">{consultation.profileName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#CED4DA]/70">Date &amp; Slot:</span>
            <span className="font-bold text-[#D4AF37] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {consultation.appointmentDate} • {consultation.timeSlot}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#CED4DA]/70">Mode / Location:</span>
            <span className="font-semibold text-white flex items-center gap-1">
              {consultation.mode === 'video' && <Video className="w-3.5 h-3.5 text-blue-400" />}
              {consultation.mode === 'audio' && <Phone className="w-3.5 h-3.5 text-emerald-400" />}
              {consultation.mode === 'in_person' && <MapPin className="w-3.5 h-3.5 text-amber-400" />}
              {consultation.chamberLocation || 'Online Tele-Consult'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#D4AF37]/15">
            <span className="text-[#CED4DA]/70">Dakshina Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Paid via {consultation.paymentMethod} (₹{consultation.amountINR})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* Direct WhatsApp Confirmation */}
          <a
            href={`https://wa.me/919434012345?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-colors"
          >
            <span>Notify Chamber Desk on WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Calendar Download and Dashboard */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadCalendar}
              className="py-2.5 px-3 rounded-xl border border-[#D4AF37]/30 text-[#CED4DA] hover:text-white hover:bg-[#1C2541] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Add to Calendar (.ics)</span>
            </button>

            <Link
              href="/consultations"
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-[#16425B] hover:bg-[#16425B]/80 text-[#F3E5AB] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <span>My Consultations</span>
            </Link>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 text-center text-xs text-[#CED4DA]/60 hover:text-white"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
