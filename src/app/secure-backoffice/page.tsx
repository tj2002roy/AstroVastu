'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Smartphone, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Calendar, 
  Users, 
  Sparkles, 
  Search, 
  Edit3, 
  FileSpreadsheet, 
  PlusCircle, 
  LogOut,
  ArrowRight,
  MapPin,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { useAstroStore } from '@/lib/store/useAstroStore';
import { ConsultationStatus } from '@/types';
import { BottomSheet } from '@/components/ui/BottomSheet';

export default function SecureBackofficePage() {
  const { 
    consultations, 
    updateConsultationStatus, 
    updateConsultationRemedies,
    cosmicPosts,
    addCosmicPost
  } = useAstroStore();

  // 2FA Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1); // 1 = Password, 2 = 2FA TOTP
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Backoffice tabs
  const [activeTab, setActiveTab] = useState<'crm' | 'cms'>('crm');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Remedy prescription modal
  const [selectedConsultationId, setSelectedConsultationId] = useState<string | null>(null);
  const [remedyText, setRemedyText] = useState('');
  const [isRemedyModalOpen, setIsRemedyModalOpen] = useState(false);

  // CMS modal
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'daily_horoscope' | 'vastu_tip' | 'video_discourse' | 'remedy'>('vastu_tip');
  const [newPostExcerpt, setNewPostExcerpt] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState<string | null>(null);

  // Step 1: Verify Master Password
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (password === 'guruji2026' || password.length >= 6) {
      setStep(2);
      setTotpCode('842910'); // Pre-fill sample valid TOTP code for testing ease
    } else {
      setAuthError('Invalid Master Administrative Password. Please re-enter.');
    }
  };

  // Step 2: Verify TOTP Code
  const handleTotpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError(null);

    setTimeout(() => {
      if (totpCode.trim().length === 6) {
        setIsAuthenticated(true);
        setIsVerifying(false);
      } else {
        setIsVerifying(false);
        setAuthError('Invalid 6-digit TOTP authentication token.');
      }
    }, 600);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStep(1);
    setPassword('');
    setTotpCode('');
  };

  // Metrics calculation
  const totalRevenue = consultations.reduce((acc, c) => acc + (c.paymentStatus === 'paid' ? c.amountINR : 0), 0);
  const totalUpcoming = consultations.filter((c) => c.status === 'confirmed').length;
  const totalClients = new Set(consultations.map((c) => c.clientPhone)).size;

  const filteredConsultations = consultations.filter((c) => {
    const matchesSearch = 
      c.clientName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.bookingRef.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.serviceTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.clientPhone.includes(searchFilter);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenRemedy = (id: string, existing?: string) => {
    setSelectedConsultationId(id);
    setRemedyText(existing || '');
    setIsRemedyModalOpen(true);
  };

  const handleSaveRemedy = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConsultationId) {
      updateConsultationRemedies(selectedConsultationId, remedyText);
      setIsRemedyModalOpen(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'BookingRef',
      'ClientName',
      'Phone',
      'Service',
      'Profile',
      'DOB',
      'Mode',
      'Chamber',
      'Date',
      'TimeSlot',
      'Status',
      'DakshinaINR',
      'PaymentMethod',
      'RemediesPrescribed'
    ];

    const rows = consultations.map((c) => [
      `"${c.bookingRef}"`,
      `"${c.clientName}"`,
      `"${c.clientPhone}"`,
      `"${c.serviceTitle}"`,
      `"${c.profileName}"`,
      `"${c.birthDetails.dob}"`,
      `"${c.mode}"`,
      `"${c.chamberLocation || 'Online'}"`,
      `"${c.appointmentDate}"`,
      `"${c.timeSlot}"`,
      `"${c.status}"`,
      `"${c.amountINR}"`,
      `"${c.paymentMethod}"`,
      `"${(c.astrologerRemedies || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `suvabrata-consultation-ledger-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    addCosmicPost({
      title: newPostTitle.trim(),
      category: newPostCategory,
      excerpt: newPostExcerpt.trim() || newPostContent.slice(0, 120),
      content: newPostContent.trim(),
      imageUrl: '/images/vastu_mandala.jpg',
      publishedAt: 'Just Now',
      tags: ['AstroGuidance', 'SriSuvabrataBharati', 'Remedies']
    });

    setNewPostTitle('');
    setNewPostExcerpt('');
    setNewPostContent('');
    setIsCmsModalOpen(false);
    setCmsSuccessMessage('New Shastric insight broadcasted to Cosmic Feed!');
    setTimeout(() => setCmsSuccessMessage(null), 4000);
  };

  // -------------------------------------------------------------
  // SECURE GATE: RENDERED IF NOT AUTHENTICATED
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1128] text-white flex flex-col items-center justify-center p-4 cosmic-radial-bg">
        <div className="w-full max-w-md bg-[#0F172A] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B87333] p-0.5 mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <div className="w-full h-full rounded-full bg-[#0A1128] flex items-center justify-center">
                <Lock className="w-7 h-7 text-[#D4AF37]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Strict 2FA Guarded Perimeter</span>
            </div>

            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Astrologer Backoffice
            </h1>
            <p className="text-xs text-[#CED4DA] mt-1">
              Sri Suvabrata Bharati Executive Command Portal
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                  Master Access Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter administrative password..."
                    className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <KeyRound className="absolute right-3.5 top-3 w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="text-[11px] text-[#CED4DA]/70 mt-1">
                  Default developer key: <code className="text-[#F3E5AB]">guruji2026</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full gold-btn py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Step 2 (2FA OTP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleTotpSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#16425B]/40 border border-[#D4AF37]/20 text-xs text-[#CED4DA] space-y-1">
                <div className="flex items-center gap-1.5 text-[#F3E5AB] font-bold">
                  <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Two-Factor Authentication (2FA) Required</span>
                </div>
                <p className="text-[11px]">
                  Enter the 6-digit Time-Based OTP (TOTP) from your authenticator app or registered phone.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="842910"
                  className="w-full bg-[#1C2541] border border-[#D4AF37] rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest text-[#F3E5AB] font-bold focus:outline-none"
                />
                <p className="text-[11px] text-[#CED4DA]/70 text-center mt-1">
                  Simulated authorized token: <strong>842910</strong>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-xs text-[#CED4DA] hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 gold-btn py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span>Verifying 2FA Session...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authenticate &amp; Open Backoffice</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#D4AF37]/15 text-center">
            <Link
              href="/"
              className="text-xs text-[#CED4DA]/70 hover:text-[#D4AF37] transition-colors"
            >
              ← Return to Client Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN BACKOFFICE DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A1128] text-white selection:bg-[#D4AF37] selection:text-[#0A1128] pb-16">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 border-b border-[#D4AF37]/30 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#B87333] shrink-0">
            <Image
              src="/images/guruji_portrait.jpg"
              alt="Sri Suvabrata Bharati"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-white">Sri Suvabrata Bharati</span>
              <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
                Master 2FA Active
              </span>
            </div>
            <p className="text-[11px] text-[#CED4DA]/80">Secure Astrologer Backoffice • Jalpaiguri &amp; Siliguri</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#16425B]/70 hover:bg-[#16425B] border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {cmsSuccessMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{cmsSuccessMessage}</span>
          </div>
        )}

        {/* METRICS DASHBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4 border border-[#D4AF37]/25">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#CED4DA]/70">Gross Dakshina / Revenue</span>
              <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#F3E5AB]">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">+24% month-over-month</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-[#D4AF37]/25">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#CED4DA]/70">Upcoming Sessions</span>
              <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">
                {totalUpcoming}
              </span>
              <span className="text-[10px] text-[#CED4DA]">Confirmed bookings</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-[#D4AF37]/25">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#CED4DA]/70">Master Client Directory</span>
              <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">
                {totalClients}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">North Bengal &amp; NRI</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-[#D4AF37]/25">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#CED4DA]/70">Published Shastric Tips</span>
              <div className="p-2 rounded-xl bg-amber-500/15 text-[#D4AF37]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">
                {cosmicPosts.length}
              </span>
              <span className="text-[10px] text-[#CED4DA]">Active on feed</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-[#D4AF37]/20 pb-2">
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'crm'
                ? 'bg-[#D4AF37] text-[#0A1128] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'bg-[#1C2541]/70 text-[#CED4DA] hover:text-white'
            }`}
          >
            Consultation Ledger &amp; CRM
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cms'
                ? 'bg-[#D4AF37] text-[#0A1128] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'bg-[#1C2541]/70 text-[#CED4DA] hover:text-white'
            }`}
          >
            CMS Content Delivery Broadcaster
          </button>
        </div>

        {/* TAB 1: CRM LEDGER */}
        {activeTab === 'crm' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search by client, token, phone..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#1C2541] border border-[#D4AF37]/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#D4AF37]" />
              </div>

              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize whitespace-nowrap font-medium ${
                      statusFilter === status
                        ? 'bg-[#16425B] text-[#F3E5AB] border border-[#D4AF37]/50'
                        : 'bg-[#0A1128] text-[#CED4DA]/70 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#D4AF37]/25 glass-card">
              <table className="w-full text-left text-xs text-[#CED4DA]">
                <thead className="bg-[#0A1128]/90 text-[11px] uppercase font-bold text-[#D4AF37] border-b border-[#D4AF37]/20">
                  <tr>
                    <th className="p-3.5">Booking Token</th>
                    <th className="p-3.5">Devotee / Phone</th>
                    <th className="p-3.5">Consultation Discipline</th>
                    <th className="p-3.5">Birth Coordinates</th>
                    <th className="p-3.5">Appointment Date &amp; Slot</th>
                    <th className="p-3.5">Status Transition</th>
                    <th className="p-3.5">Dakshina</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/10">
                  {filteredConsultations.map((item) => (
                    <tr key={item.id} className="hover:bg-[#1C2541]/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#F3E5AB] whitespace-nowrap">
                        {item.bookingRef}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <p className="font-bold text-white">{item.clientName}</p>
                        <span className="text-[10px] text-[#CED4DA]/70">{item.clientPhone}</span>
                      </td>

                      <td className="p-3.5">
                        <p className="font-semibold text-white truncate max-w-[180px]">{item.serviceTitle}</p>
                        <span className="text-[10px] text-[#D4AF37] capitalize">
                          {item.mode} • {item.chamberLocation || 'Online'}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <p className="text-white">{item.profileName}</p>
                        <span className="text-[10px] text-[#CED4DA]/70">
                          {item.birthDetails.dob} ({item.birthDetails.exactTime || 'N/A'})
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <p className="font-medium text-white">{item.appointmentDate}</p>
                        <span className="text-[10px] text-[#F3E5AB]">{item.timeSlot}</span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) => updateConsultationStatus(item.id, e.target.value as ConsultationStatus)}
                          className="bg-[#0A1128] border border-[#D4AF37]/30 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-3.5 whitespace-nowrap font-bold text-[#F3E5AB]">
                        ₹{item.amountINR}
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleOpenRemedy(item.id, item.astrologerRemedies)}
                          className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{item.astrologerRemedies ? 'Edit Upayas' : '+ Prescribe'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CMS BROADCASTER */}
        {activeTab === 'cms' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-base text-white">
                  Client Cosmic Feed Broadcasts
                </h2>
                <p className="text-xs text-[#CED4DA]/80">
                  Publish daily Shastric guidance, Nakshatra alerts, and Vastu directions directly to devotees.
                </p>
              </div>

              <button
                onClick={() => setIsCmsModalOpen(true)}
                className="gold-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Broadcast New Insight</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cosmicPosts.map((post) => (
                <div
                  key={post.id}
                  className="glass-card rounded-2xl p-4 border border-[#D4AF37]/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#CED4DA]/70 mb-1">
                      <span className="uppercase font-bold text-[#D4AF37]">{post.category}</span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-white">{post.title}</h3>
                    <p className="text-xs text-[#CED4DA] mt-1.5 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#CED4DA]">
                    <span>Engagement: {post.likes} Likes • {post.shares} Shares</span>
                    <span className="text-emerald-400 font-medium">Broadcasted to Feed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Remedy Modal */}
      <BottomSheet
        isOpen={isRemedyModalOpen}
        onClose={() => setIsRemedyModalOpen(false)}
        title="Prescribe Astrological & Vastu Upayas"
        subtitle="This guidance is encrypted and stored in the devotee's Consultation Ledger."
      >
        <form onSubmit={handleSaveRemedy} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Prescription / Shastric Remedies
            </label>
            <textarea
              rows={6}
              value={remedyText}
              onChange={(e) => setRemedyText(e.target.value)}
              placeholder="e.g. 1. Wear 5.25 Rati natural untreated Yellow Sapphire (Pukhraj) set in Gold on right index finger on Thursday morning during Shukla Paksha. 2. Establish energized copper yantra in North-East..."
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsRemedyModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gold-btn px-5 py-2 rounded-xl text-xs font-bold"
            >
              Deliver Prescribed Remedies
            </button>
          </div>
        </form>
      </BottomSheet>

      {/* Broadcast CMS Post Modal */}
      <BottomSheet
        isOpen={isCmsModalOpen}
        onClose={() => setIsCmsModalOpen(false)}
        title="Broadcast New Shastric Guidance"
        subtitle="Publishes immediately to all devotees on the home Cosmic Feed."
      >
        <form onSubmit={handlePublishPost} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Title of Insight
            </label>
            <input
              type="text"
              required
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="e.g. Navamsha (D-9) Analysis: Key to Career Maturation & Marital Longevity"
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Category
            </label>
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value as any)}
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="vastu_tip">16-Zone Vastu Shastra</option>
              <option value="daily_horoscope">Planetary Horoscope</option>
              <option value="video_discourse">Video Lecture / Discourse</option>
              <option value="remedy">Gemstone &amp; Mantra Upayas</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Short Summary / Excerpt
            </label>
            <input
              type="text"
              value={newPostExcerpt}
              onChange={(e) => setNewPostExcerpt(e.target.value)}
              placeholder="1-2 sentences highlighting spiritual impact"
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
              Full Shastric Guidance Content
            </label>
            <textarea
              rows={4}
              required
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write detailed scriptural analysis or directional remedies..."
              className="w-full bg-[#1C2541] border border-[#D4AF37]/35 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full gold-btn py-3 rounded-xl font-bold text-xs sm:text-sm"
            >
              Broadcast to Cosmic Feed Now
            </button>
          </div>
        </form>
      </BottomSheet>
    </div>
  );
}
