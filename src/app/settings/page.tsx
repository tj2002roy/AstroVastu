'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  LogOut,
  Sparkles,
  KeyRound,
  FileJson
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useAstroStore } from '@/lib/store/useAstroStore';

export default function SettingsPage() {
  const { 
    user, 
    loginWithPhone, 
    loginAsAdmin, 
    logout, 
    exportUserData, 
    deleteAccountData,
    profiles,
    consultations
  } = useAstroStore();

  // Phone + OTP login simulation state
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+91 98310 54321');
  const [nameInput, setNameInput] = useState(user?.name || 'Rajesh Mukherjee');
  const [otpInput, setOtpInput] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSendOtp = () => {
    if (!phoneInput.trim()) return;
    setIsOtpSent(true);
    setOtpInput('7890'); // Pre-fill with simulated valid OTP for ease of testing
    setSuccessMessage('OTP dispatched to ' + phoneInput + '. Enter 7890 to verify.');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithPhone(phoneInput, nameInput);
    setIsOtpSent(false);
    setSuccessMessage('Phone verified successfully! Session authenticated.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const { exportBlobUrl, filename } = exportUserData();
      const a = document.createElement('a');
      a.href = exportBlobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setIsExporting(false);
      setSuccessMessage('Your complete astrological profile and consultation archive has been exported.');
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 600);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmationText !== 'DELETE') return;
    deleteAccountData();
    setShowDeleteConfirm(false);
    setDeleteConfirmationText('');
    setSuccessMessage('Your account data and all associated birth profiles have been purged under Right to be Forgotten.');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data Sovereignty &amp; Privacy Architecture</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F8F9FA] mt-1.5">
            Account, Security &amp; Compliance Protocol
          </h1>
          <p className="text-xs sm:text-sm text-[#CED4DA] mt-1">
            Manage your Phone + OTP authentication, export your complete Kundli portfolio, or execute Right to be Forgotten data purge.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* AUTHENTICATION SECTION: Phone Number + OTP */}
        <section className="glass-card rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/30">
          <div className="flex items-center justify-between mb-4 border-b border-[#D4AF37]/15 pb-3">
            <div>
              <h2 className="font-serif font-bold text-base text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Phone + OTP Secure Authentication</span>
              </h2>
              <p className="text-xs text-[#CED4DA]/80 mt-0.5">
                Indian &amp; Diaspora standard instant mobile login.
              </p>
            </div>
            {user ? (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Verified Client</span>
              </span>
            ) : (
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">
                Guest Mode
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91 98310 54321"
                className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your Full Name"
                className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {isOtpSent && (
            <form onSubmit={handleVerifyOtp} className="mt-4 p-4 rounded-xl bg-[#16425B]/40 border border-[#D4AF37]/30 space-y-3">
              <label className="block text-xs font-bold text-[#F3E5AB]">
                Enter 4-Digit One-Time Password (OTP)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  maxLength={4}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-32 bg-[#0A1128] border border-[#D4AF37] rounded-xl px-3.5 py-2 text-center text-sm font-mono tracking-widest text-[#F3E5AB] font-bold"
                />
                <button
                  type="submit"
                  className="gold-btn px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Verify &amp; Establish Session
                </button>
              </div>
              <p className="text-[11px] text-[#CED4DA]/70">
                Simulated test OTP: <strong>7890</strong>
              </p>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-3">
            {!isOtpSent ? (
              <button
                onClick={handleSendOtp}
                className="gold-btn px-4 py-2 rounded-xl text-xs font-bold shadow"
              >
                Send Verification OTP
              </button>
            ) : null}

            {user && (
              <button
                onClick={logout}
                className="text-xs text-rose-400 hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out from Device</span>
              </button>
            )}
          </div>
        </section>

        {/* DATA SOVEREIGNTY: Right to Access (Export) */}
        <section className="glass-card rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-base text-white flex items-center gap-2">
                <FileJson className="w-4 h-4 text-[#D4AF37]" />
                <span>Export My Cosmic Data (Right to Access)</span>
              </h2>
              <p className="text-xs text-[#CED4DA] mt-1 leading-relaxed max-w-xl">
                Generate and download an encrypted, machine-readable JSON package containing all saved birth coordinates, Nakshatra details, consultation ledger, and prescribed remedies.
              </p>
              <div className="mt-2 text-[11px] text-[#CED4DA]/70">
                Included: {profiles.length} Birth Profiles • {consultations.length} Consultation Records
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="gold-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 shadow disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Packaging Archive...' : 'Download JSON'}</span>
            </button>
          </div>
        </section>

        {/* RIGHT TO BE FORGOTTEN: Account & PII Scrub */}
        <section className="glass-card rounded-2xl p-5 sm:p-6 border border-rose-500/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-base text-rose-400 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete Account &amp; Scrub PII (Right to be Forgotten)</span>
              </h2>
              <p className="text-xs text-[#CED4DA] mt-1 leading-relaxed max-w-xl">
                In strict compliance with modern DPDP and GDPR privacy frameworks. Triggering this permanently scrubs your phone number, exact birth coordinates, uploaded floor plans, and notes from our database.
              </p>
            </div>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 text-xs font-bold shrink-0 transition-colors"
              >
                Delete Account
              </button>
            ) : null}
          </div>

          {showDeleteConfirm && (
            <div className="mt-4 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Irreversible Cascaded Deletion Confirmation</span>
              </div>
              <p className="text-xs text-[#CED4DA]">
                Type <strong>DELETE</strong> below to permanently erase your profile and Kundli charts:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  placeholder="Type DELETE"
                  className="bg-[#0A1128] border border-rose-500/50 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmationText !== 'DELETE'}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold"
                >
                  Confirm Permanent Purge
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
