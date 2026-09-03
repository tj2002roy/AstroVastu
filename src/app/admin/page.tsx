'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the protected segregated 2FA backoffice route
    const timer = setTimeout(() => {
      router.replace('/secure-backoffice');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A1128] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0F172A] border border-[#D4AF37]/40 rounded-3xl p-8 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-amber-500/20 text-[#D4AF37] flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-xl font-bold text-white mb-2">
          Protected Administrative Perimeter
        </h1>
        <p className="text-xs text-[#CED4DA] mb-6 leading-relaxed">
          Public routes are isolated from administrative environments. Redirecting to the secure 2FA authentication portal...
        </p>
        <Link
          href="/secure-backoffice"
          className="gold-btn w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow"
        >
          <span>Open Secure 2FA Backoffice</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
