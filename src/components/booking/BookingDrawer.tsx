'use client';

import React, { useState } from 'react';
import { 
  Video, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  UserCircle, 
  CheckCircle2, 
  QrCode, 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Service, ConsultationMode, Consultation } from '@/types';
import { useAstroStore } from '@/lib/store/useAstroStore';
import { CHAMBERS } from '@/lib/data/chambers';
import { BottomSheet } from '../ui/BottomSheet';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  onBookingSuccess?: (consultation: Consultation) => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  service,
  onBookingSuccess,
}) => {
  const { profiles, addProfile, confirmBooking } = useAstroStore();

  // Multi-step state: 1 = Mode & Profile, 2 = Date & Slot, 3 = Concerns & Add-ons, 4 = Payment
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [selectedMode, setSelectedMode] = useState<ConsultationMode>(service.modesAllowed[0] || 'video');
  const [selectedChamber, setSelectedChamber] = useState<string>(CHAMBERS[0].title);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(profiles[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-08');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM – 11:45 AM');
  const [clientQuestions, setClientQuestions] = useState<string>('');
  const [floorPlanFileName, setFloorPlanFileName] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Inline profile creator if user has no profile or wants to add another
  const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);
  const [newFullName, setNewFullName] = useState<string>('');
  const [newRelation, setNewRelation] = useState<'self' | 'spouse' | 'child' | 'parent' | 'partner'>('self');
  const [newDob, setNewDob] = useState<string>('1990-05-15');
  const [newTime, setNewTime] = useState<string>('09:30');
  const [newPlace, setNewPlace] = useState<string>('Jalpaiguri, West Bengal');

  const handleSaveInlineProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim()) return;
    const created = addProfile({
      fullName: newFullName.trim(),
      relation: newRelation,
      gender: 'male',
      dob: newDob,
      exactTime: newTime,
      placeOfBirth: newPlace,
      rashi: 'Karka (Cancer)',
      nakshatra: 'Pushya',
      ascendant: 'Kanya'
    });
    setSelectedProfileId(created.id);
    setIsCreatingProfile(false);
  };

  const timeSlots = [
    { slot: '10:15 AM – 11:00 AM', tag: 'Auspicious' },
    { slot: '11:00 AM – 11:45 AM', tag: 'Abhijit Muhurat' },
    { slot: '12:00 PM – 12:45 PM', tag: 'Available' },
    { slot: '04:30 PM – 05:15 PM', tag: 'Available' },
    { slot: '05:30 PM – 06:15 PM', tag: 'Evening Sandhya' },
    { slot: '07:00 PM – 07:45 PM', tag: 'Available' },
  ];

  const handleCompletePayment = (method: 'UPI' | 'QR' | 'NetBanking') => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      // Create consultation record in store
      const consultation = confirmBooking(method, `UPI-GURUDIKSHA-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsProcessingPayment(false);

      // Trigger gold celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF1C5', '#B87333', '#FFFFFF']
        });
      } catch {
        // ignore
      }

      onClose();
      if (onBookingSuccess) {
        onBookingSuccess(consultation);
      }
    }, 1200);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={service.title}
      subtitle={`Duration: ${service.durationMinutes} mins • Dakshina / Fee: ₹${service.feeINR.toLocaleString('en-IN')}`}
    >
      {/* Progress Indicators */}
      <div className="flex items-center justify-between mb-6 border-b border-[#D4AF37]/15 pb-3">
        {[
          { num: 1, label: 'Mode & Profile' },
          { num: 2, label: 'Date & Time' },
          { num: 3, label: 'Questions' },
          { num: 4, label: 'Instant UPI' },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num
                  ? 'bg-[#D4AF37] text-[#0A1128] ring-4 ring-[#D4AF37]/20 shadow-[0_0_10px_#D4AF37]'
                  : step > s.num
                  ? 'bg-[#16425B] text-[#D4AF37] border border-[#D4AF37]'
                  : 'bg-[#1C2541] text-[#CED4DA]/50'
              }`}
            >
              {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
            </div>
            <span className={`text-[10px] hidden sm:block ${step === s.num ? 'text-[#F3E5AB] font-semibold' : 'text-[#CED4DA]/60'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: Mode & Profile */}
      {step === 1 && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
              Select Consultation Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {service.modesAllowed.includes('video') && (
                <button
                  type="button"
                  onClick={() => setSelectedMode('video')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                    selectedMode === 'video'
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F8F9FA] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-[#1C2541]/50 border-[#D4AF37]/20 text-[#CED4DA] hover:bg-[#1C2541]'
                  }`}
                >
                  <Video className={`w-5 h-5 mb-1.5 ${selectedMode === 'video' ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold">1-on-1 Video Meet</span>
                  <span className="text-[10px] text-[#CED4DA]/70 mt-0.5">Google Meet / Private</span>
                </button>
              )}

              {service.modesAllowed.includes('audio') && (
                <button
                  type="button"
                  onClick={() => setSelectedMode('audio')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                    selectedMode === 'audio'
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F8F9FA] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-[#1C2541]/50 border-[#D4AF37]/20 text-[#CED4DA] hover:bg-[#1C2541]'
                  }`}
                >
                  <Phone className={`w-5 h-5 mb-1.5 ${selectedMode === 'audio' ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold">Encrypted Audio Call</span>
                  <span className="text-[10px] text-[#CED4DA]/70 mt-0.5">Direct Voice Session</span>
                </button>
              )}

              {service.modesAllowed.includes('in_person') && (
                <button
                  type="button"
                  onClick={() => setSelectedMode('in_person')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                    selectedMode === 'in_person'
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F8F9FA] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-[#1C2541]/50 border-[#D4AF37]/20 text-[#CED4DA] hover:bg-[#1C2541]'
                  }`}
                >
                  <MapPin className={`w-5 h-5 mb-1.5 ${selectedMode === 'in_person' ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold">In-Person Chamber</span>
                  <span className="text-[10px] text-[#CED4DA]/70 mt-0.5">Jalpaiguri / Siliguri</span>
                </button>
              )}
            </div>
          </div>

          {/* Chamber choice if in_person */}
          {selectedMode === 'in_person' && (
            <div className="p-3 rounded-xl bg-[#16425B]/30 border border-[#D4AF37]/30">
              <label className="block text-xs font-semibold text-[#F3E5AB] mb-1.5">
                Select Chamber Location:
              </label>
              <div className="space-y-2">
                {CHAMBERS.filter((c) => c.city !== 'Global Online').map((chamber) => (
                  <label
                    key={chamber.id}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border cursor-pointer text-xs ${
                      selectedChamber === chamber.title
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37]'
                        : 'border-[#D4AF37]/15 hover:bg-[#1C2541]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="chamber"
                      checked={selectedChamber === chamber.title}
                      onChange={() => setSelectedChamber(chamber.title)}
                      className="mt-0.5 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <div>
                      <p className="font-bold text-[#F8F9FA]">{chamber.title}</p>
                      <p className="text-[11px] text-[#CED4DA]/80">{chamber.address}</p>
                      <p className="text-[10px] text-[#D4AF37] mt-0.5">Timing: {chamber.timings} ({chamber.days})</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Select Kundli Profile */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Whose Birth Details / Kundli?
              </label>
              <button
                type="button"
                onClick={() => setIsCreatingProfile(!isCreatingProfile)}
                className="text-[11px] text-[#F3E5AB] hover:underline"
              >
                {isCreatingProfile ? 'Select Existing' : '+ Add New Family Member'}
              </button>
            </div>

            {isCreatingProfile ? (
              <form onSubmit={handleSaveInlineProfile} className="p-3.5 rounded-xl bg-[#1C2541]/90 border border-[#D4AF37]/40 space-y-2.5">
                <p className="text-xs font-bold text-[#F3E5AB]">Add New Astrological Profile</p>
                <div>
                  <label className="block text-[10px] text-[#CED4DA] mb-0.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="e.g. Sourav Banerjee"
                    className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#CED4DA] mb-0.5">Relation</label>
                    <select
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value as any)}
                      className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-2 py-1.5 text-xs text-white"
                    >
                      <option value="self">Self</option>
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="parent">Parent</option>
                      <option value="partner">Business Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#CED4DA] mb-0.5">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={newDob}
                      onChange={(e) => setNewDob(e.target.value)}
                      className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-2 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#CED4DA] mb-0.5">Exact Time of Birth</label>
                    <input
                      type="time"
                      required
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-2 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#CED4DA] mb-0.5">Place of Birth (City)</label>
                    <input
                      type="text"
                      required
                      value={newPlace}
                      onChange={(e) => setNewPlace(e.target.value)}
                      placeholder="e.g. Siliguri"
                      className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-2 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full gold-btn py-1.5 rounded-lg text-xs font-bold mt-1"
                >
                  Save &amp; Select Profile
                </button>
              </form>
            ) : (
              <div className="space-y-2">
                {profiles.map((profile) => {
                  const isSelected = selectedProfileId === profile.id;
                  return (
                    <div
                      key={profile.id}
                      onClick={() => setSelectedProfileId(profile.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                          : 'bg-[#1C2541]/40 border-[#D4AF37]/15 hover:bg-[#1C2541]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isSelected ? 'bg-[#D4AF37] text-[#0A1128]' : 'bg-[#0A1128] text-[#CED4DA]'}`}>
                          <UserCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#F8F9FA]">{profile.fullName}</p>
                          <p className="text-[11px] text-[#CED4DA]/70">
                            {profile.relation.toUpperCase()} • DOB: {profile.dob} ({profile.exactTime}) • {profile.placeOfBirth}
                          </p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-[#CED4DA]/40'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0A1128]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedProfileId}
              className="w-full gold-btn py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <span>Continue to Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Date & Time-slot selection */}
      {step === 2 && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
              Select Preferred Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-4 py-2.5 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
              />
              <Calendar className="absolute right-3.5 top-3 w-4 h-4 text-[#D4AF37] pointer-events-none" />
            </div>
            <p className="text-[11px] text-[#CED4DA]/80 mt-1">
              *Sri Suvabrata Bharati conducts consultations strictly on prior appointment to ensure dedicated chart preparation time.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
              Available Time Slots (IST)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {timeSlots.map((item) => {
                const isSelected = selectedSlot === item.slot;
                return (
                  <button
                    key={item.slot}
                    type="button"
                    onClick={() => setSelectedSlot(item.slot)}
                    className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : 'bg-[#1C2541]/50 border-[#D4AF37]/15 text-[#CED4DA] hover:bg-[#1C2541]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                      <span className="text-xs font-semibold">{item.slot}</span>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      item.tag.includes('Muhurat') || item.tag.includes('Auspicious')
                        ? 'bg-[#D4AF37]/30 text-[#F3E5AB] border border-[#D4AF37]/50'
                        : 'bg-slate-700/50 text-slate-300'
                    }`}>
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-xl border border-[#D4AF37]/30 text-xs font-semibold text-[#CED4DA] hover:bg-[#1C2541] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 gold-btn py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
            >
              <span>Add Life Queries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Questions & Vastu Plan Upload */}
      {step === 3 && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Your Specific Dilemmas or Life Questions
            </label>
            <p className="text-[11px] text-[#CED4DA]/70 mb-2">
              Share details regarding career changes, business disputes, marriage compatibility, health, or progeny so Guruji can calculate planetary periods in advance.
            </p>
            <textarea
              rows={3}
              value={clientQuestions}
              onChange={(e) => setClientQuestions(e.target.value)}
              placeholder="e.g. Currently facing financial delays in land deal, asking about best remedy and Rahu mahadasha end timing..."
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl p-3 text-xs text-[#F8F9FA] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Vastu Floor Plan Upload (if Vastu service or optional) */}
          <div className="p-3.5 rounded-xl bg-[#16425B]/25 border border-[#D4AF37]/30">
            <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
              Architectural Floor Plan or Compass Direction Map (Optional)
            </label>
            <p className="text-[11px] text-[#CED4DA]/70 mb-2.5">
              Crucial for 16-zone Vastu Shastra audits. Attach house layout, blueprint, or rough hand-drawn directional sketch.
            </p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D4AF37]/40 rounded-xl p-4 cursor-pointer hover:bg-[#1C2541]/50 transition-colors">
              <UploadCloud className="w-6 h-6 text-[#D4AF37] mb-1" />
              <span className="text-xs font-bold text-[#F8F9FA]">
                {floorPlanFileName ? floorPlanFileName : 'Click to attach layout (PDF, PNG, JPG)'}
              </span>
              <span className="text-[10px] text-[#CED4DA]/60">Max size: 15MB • Zero-demolition audit ready</span>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFloorPlanFileName(e.target.files[0].name);
                  }
                }}
              />
            </label>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-3 rounded-xl border border-[#D4AF37]/30 text-xs font-semibold text-[#CED4DA] hover:bg-[#1C2541] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="flex-1 gold-btn py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
            >
              <span>Proceed to Instant Dakshina / UPI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Checkout & Instant UPI */}
      {step === 4 && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          {/* Order Summary Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#1C2541] to-[#0A1128] border border-[#D4AF37]/40">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">
                  Consultation Booking Summary
                </span>
                <h3 className="text-sm font-bold text-[#F8F9FA] mt-0.5">{service.title}</h3>
                <p className="text-xs text-[#CED4DA] mt-0.5">
                  {selectedMode === 'video' && '1-on-1 High Definition Video Call'}
                  {selectedMode === 'audio' && 'Encrypted Audio Consultation'}
                  {selectedMode === 'in_person' && `In-Person Chamber: ${selectedChamber}`}
                </p>
                <p className="text-[11px] text-[#D4AF37] mt-1 font-semibold">
                  Scheduled: {selectedDate} at {selectedSlot}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#CED4DA]/70 block">Total Dakshina</span>
                <span className="text-xl font-extrabold text-[#F3E5AB]">
                  ₹{service.feeINR.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* UPI Direct QR Code Simulator */}
          <div className="p-4 rounded-xl bg-[#0A1128] border border-[#D4AF37]/30 text-center">
            <p className="text-xs font-bold text-[#F8F9FA] mb-1">
              Scan with Any UPI App (GPay / PhonePe / Paytm)
            </p>
            <p className="text-[10px] text-[#CED4DA]/70 mb-3">
              Direct Verified VPA: <strong className="text-[#D4AF37]">srisuvabrata.bharati@okhdfcbank</strong>
            </p>

            <div className="relative inline-block p-3 rounded-2xl bg-white shadow-2xl border-4 border-[#D4AF37]">
              {/* Clean simulated QR code visualization with Vedic center mark */}
              <div className="w-36 h-36 bg-slate-900 rounded-lg flex flex-col items-center justify-center p-2 relative overflow-hidden">
                <QrCode className="w-28 h-28 text-white" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-[#0A1128] border border-[#D4AF37] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] font-semibold border border-[#D4AF37]/30">
                100% Secure &amp; Instant Confirmation
              </span>
            </div>
          </div>

          {/* Action Buttons for UPI & Test Payment */}
          <div className="space-y-2">
            <button
              type="button"
              disabled={isProcessingPayment}
              onClick={() => handleCompletePayment('UPI')}
              className="w-full gold-btn py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm active:scale-98 disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A1128] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying UPI Transaction &amp; Reserving Slot...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simulate Instant UPI Payment (₹{service.feeINR})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#CED4DA]/70 px-1">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-[#CED4DA] hover:underline"
              >
                ← Back to Edit Details
              </button>
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Instant Calendar Token
              </span>
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};
