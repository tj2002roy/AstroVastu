'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Content Container */}
      <div
        className="relative w-full md:max-w-2xl bg-[#0F172A] border-t md:border border-[#D4AF37]/35 rounded-t-3xl md:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300 overflow-hidden"
        style={{
          boxShadow: '0 -10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.15)'
        }}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-[#CED4DA]/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#D4AF37]/20 bg-[#1C2541]/40">
          <div>
            <h2 className="font-serif font-bold text-lg text-[#F8F9FA] tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[#CED4DA] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#CED4DA] hover:text-white hover:bg-[#1C2541] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
};
