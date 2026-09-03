'use client';

import React, { useState } from 'react';
import { 
  UserSquare2, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Compass, 
  MapPin, 
  Clock, 
  Calendar, 
  Sparkles, 
  ShieldCheck,
  User,
  Heart
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useAstroStore } from '@/lib/store/useAstroStore';
import { BirthProfile, RelationType } from '@/types';
import { BottomSheet } from '@/components/ui/BottomSheet';

export default function ProfilesPage() {
  const { profiles, activeProfileId, setActiveProfileId, addProfile, updateProfile, deleteProfile } = useAstroStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [relation, setRelation] = useState<RelationType>('self');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [dob, setDob] = useState('1990-01-01');
  const [exactTime, setExactTime] = useState('10:00');
  const [placeOfBirth, setPlaceOfBirth] = useState('Kolkata, West Bengal');
  const [notes, setNotes] = useState('');

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const handleOpenAdd = () => {
    setEditingProfileId(null);
    setFullName('');
    setRelation('self');
    setGender('male');
    setDob('1992-06-15');
    setExactTime('11:30');
    setPlaceOfBirth('Siliguri, West Bengal');
    setNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (profile: BirthProfile) => {
    setEditingProfileId(profile.id);
    setFullName(profile.fullName);
    setRelation(profile.relation);
    setGender(profile.gender);
    setDob(profile.dob);
    setExactTime(profile.exactTime);
    setPlaceOfBirth(profile.placeOfBirth);
    setNotes(profile.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (editingProfileId) {
      updateProfile(editingProfileId, {
        fullName: fullName.trim(),
        relation,
        gender,
        dob,
        exactTime,
        placeOfBirth: placeOfBirth.trim(),
        notes: notes.trim(),
      });
    } else {
      addProfile({
        fullName: fullName.trim(),
        relation,
        gender,
        dob,
        exactTime,
        placeOfBirth: placeOfBirth.trim(),
        rashi: 'Simha (Leo)',
        nakshatra: 'Magha (Pada 1)',
        ascendant: 'Dhanu (Sagittarius)',
        notes: notes.trim(),
      });
    }

    setIsModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Profile Kundli Vault</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F8F9FA] mt-1.5">
              Saved Birth Charts &amp; Family Profiles
            </h1>
            <p className="text-xs sm:text-sm text-[#CED4DA] mt-1">
              Maintain precise birth coordinates (Date, Exact Time, City) for instantaneous astrological computations.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="gold-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Family Profile</span>
          </button>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => {
            const isActive = profile.id === activeProfileId;

            return (
              <div
                key={profile.id}
                className={`glass-card rounded-2xl p-5 border transition-all ${
                  isActive
                    ? 'border-[#D4AF37] bg-[#1C2541]/90 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isActive ? 'bg-[#D4AF37] text-[#0A1128]' : 'bg-[#0A1128] text-[#CED4DA] border border-[#D4AF37]/30'
                    }`}>
                      {profile.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="font-serif font-bold text-base text-[#F8F9FA]">
                          {profile.fullName}
                        </h2>
                        {isActive && (
                          <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-1.5 py-0.2 rounded font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#D4AF37] capitalize font-medium">
                        Relation: {profile.relation} • {profile.gender}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(profile)}
                      className="p-1.5 text-[#CED4DA] hover:text-white rounded-lg hover:bg-[#0A1128]/50"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {profiles.length > 1 && (
                      <button
                        onClick={() => deleteProfile(profile.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-[#0A1128]/50"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Birth Coordinates details */}
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 space-y-1.5 text-xs text-[#CED4DA]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>DOB: <strong>{profile.dob}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Exact Time: <strong>{profile.exactTime} (IST)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="truncate">Place: <strong>{profile.placeOfBirth}</strong></span>
                  </div>

                  {profile.rashi && (
                    <div className="mt-2 pt-2 border-t border-[#D4AF37]/10 flex items-center justify-between text-[11px]">
                      <span className="text-[#F3E5AB]">Rashi: {profile.rashi}</span>
                      <span className="text-[#CED4DA]/70">Star: {profile.nakshatra || 'Calculated'}</span>
                    </div>
                  )}

                  {profile.notes && (
                    <p className="text-[11px] text-[#CED4DA]/60 italic mt-1 line-clamp-1">
                      &quot;{profile.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Select as Active */}
                {!isActive && (
                  <button
                    onClick={() => setActiveProfileId(profile.id)}
                    className="mt-4 w-full py-2 rounded-xl bg-[#16425B]/50 hover:bg-[#16425B] text-[#F3E5AB] text-xs font-semibold border border-[#D4AF37]/25 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Set as Default Active Chart</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* ACTIVE PROFILE KUNDLI / LAGNA WHEEL VISUALIZER */}
        {activeProfile && (
          <div className="glass-card rounded-3xl p-5 sm:p-7 border border-[#D4AF37]/35 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 border-b border-[#D4AF37]/20 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#D4AF37]">
                  Active Astrological Snapshot
                </span>
                <h3 className="font-serif text-lg font-bold text-[#F8F9FA]">
                  Lagna &amp; Planetary Grid: {activeProfile.fullName}
                </h3>
              </div>
              <span className="text-xs text-[#CED4DA] bg-[#0A1128] px-3 py-1 rounded-full border border-[#D4AF37]/25">
                Vedic Geocentric System
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* North-Indian Kundli Diamond Chart Representation */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-[#D4AF37] bg-[#0A1128] shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                  {/* Diagonal and Cross lines forming North Indian Kundli chart */}
                  <svg className="absolute inset-0 w-full h-full stroke-[#D4AF37]/60 stroke-1 pointer-events-none">
                    <line x1="0" y1="0" x2="100%" y2="100%" />
                    <line x1="100%" y1="0" x2="0" y2="100%" />
                    <polygon points="50%,0 100%,50% 50%,100% 0,50%" fill="none" />
                  </svg>

                  {/* 1st House (Lagna - Top Diamond) */}
                  <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center">
                    <span className="text-[10px] font-bold text-[#D4AF37] block">1st (Lagna)</span>
                    <span className="text-xs font-extrabold text-[#F8F9FA]">
                      {activeProfile.ascendant?.split(' ')[0] || 'Scorpio'}
                    </span>
                    <span className="text-[9px] text-[#F3E5AB] block">Jup (Guru)</span>
                  </div>

                  {/* 4th House (Sukha Bhava - Left) */}
                  <div className="absolute top-1/2 left-[20%] -translate-y-1/2 text-center">
                    <span className="text-[10px] font-bold text-[#D4AF37] block">4th (Sukha)</span>
                    <span className="text-xs font-bold text-white">Sun</span>
                  </div>

                  {/* 7th House (Kalatra Bhava - Bottom) */}
                  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center">
                    <span className="text-[10px] font-bold text-[#D4AF37] block">7th (Kalatra)</span>
                    <span className="text-xs font-bold text-white">Moon (Exalted)</span>
                  </div>

                  {/* 10th House (Karma Bhava - Right) */}
                  <div className="absolute top-1/2 right-[20%] -translate-y-1/2 text-center">
                    <span className="text-[10px] font-bold text-[#D4AF37] block">10th (Karma)</span>
                    <span className="text-xs font-bold text-white">Saturn</span>
                  </div>
                </div>
              </div>

              {/* Planetary Summary Table */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-[#0A1128]/80 border border-[#D4AF37]/20 text-xs space-y-2">
                  <div className="flex justify-between border-b border-[#D4AF37]/10 pb-1.5">
                    <span className="text-[#CED4DA]/70">Ascendant (Lagna):</span>
                    <span className="font-bold text-[#F3E5AB]">{activeProfile.ascendant || 'Vrishchika (Scorpio)'}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4AF37]/10 pb-1.5">
                    <span className="text-[#CED4DA]/70">Moon Sign (Rashi):</span>
                    <span className="font-bold text-[#F3E5AB]">{activeProfile.rashi || 'Vrishabha (Taurus)'}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4AF37]/10 pb-1.5">
                    <span className="text-[#CED4DA]/70">Birth Constellation:</span>
                    <span className="font-bold text-[#F3E5AB]">{activeProfile.nakshatra || 'Rohini (Pada 2)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#CED4DA]/70">Current Vimshottari Mahadasha:</span>
                    <span className="font-bold text-emerald-400">Brihaspati (Jupiter) Mahadasha</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#16425B]/30 border border-[#D4AF37]/20 text-xs text-[#CED4DA] leading-relaxed">
                  <strong className="text-[#D4AF37]">Vedic Synthesis: </strong>
                  The native possesses a fortified Lagna Lord with Jupiter casting its auspicious aspect on the 9th house of fortune. Excellent potential in trading, consultancy, and land investments.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Profile Modal */}
      <BottomSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProfileId ? 'Edit Astrological Profile' : 'Add New Family Kundli Profile'}
        subtitle="Ensure birth time is accurate to within 2 minutes for precise Navamsha calculation."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Sourav Mukherjee"
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                Relation
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value as any)}
                className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3 py-2.5 text-xs text-white"
              >
                <option value="self">Self</option>
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="parent">Parent</option>
                <option value="partner">Business Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3 py-2.5 text-xs text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                Exact Time of Birth
              </label>
              <input
                type="time"
                required
                value={exactTime}
                onChange={(e) => setExactTime(e.target.value)}
                className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Place of Birth (City &amp; State)
            </label>
            <input
              type="text"
              required
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              placeholder="e.g. Jalpaiguri, West Bengal, India"
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Astrological Life Notes / Context (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Planning business expansion in Q4, questions on Manglik dosha..."
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full gold-btn py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md"
            >
              {editingProfileId ? 'Update Birth Profile' : 'Save & Cast Birth Profile'}
            </button>
          </div>
        </form>
      </BottomSheet>
    </AppShell>
  );
}
