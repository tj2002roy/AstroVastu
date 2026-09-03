'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, BirthProfile, Consultation, CosmicPost, ConsultationMode, ConsultationStatus } from '@/types';
import { COSMIC_POSTS } from '@/lib/data/posts';
import { SERVICES } from '@/lib/data/services';

const INITIAL_USER: User = {
  id: 'usr-client-101',
  phone: '+91 98310 54321',
  name: 'Rajesh Mukherjee',
  email: 'rajesh.mukherjee@example.com',
  role: 'client',
  createdAt: '2026-01-15T10:00:00Z',
};

const INITIAL_PROFILES: BirthProfile[] = [
  {
    id: 'prof-self',
    userId: 'usr-client-101',
    fullName: 'Rajesh Mukherjee',
    relation: 'self',
    gender: 'male',
    dob: '1988-11-24',
    exactTime: '06:45',
    placeOfBirth: 'Siliguri, West Bengal',
    rashi: 'Vrishabha (Taurus)',
    nakshatra: 'Rohini (Pada 2)',
    ascendant: 'Vrishchika (Scorpio)',
    notes: 'Career transition queries, considering starting new tea packaging venture.',
    createdAt: '2026-01-15T10:30:00Z'
  },
  {
    id: 'prof-spouse',
    userId: 'usr-client-101',
    fullName: 'Priyanka Mukherjee',
    relation: 'spouse',
    gender: 'female',
    dob: '1992-04-18',
    exactTime: '14:20',
    placeOfBirth: 'Jalpaiguri, West Bengal',
    rashi: 'Kanya (Virgo)',
    nakshatra: 'Hasta (Pada 3)',
    ascendant: 'Simha (Leo)',
    notes: 'Health and academic promotion queries.',
    createdAt: '2026-02-01T12:00:00Z'
  }
];

const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'cons-9001',
    bookingRef: 'SB-2026-9001',
    userId: 'usr-client-101',
    clientName: 'Rajesh Mukherjee',
    clientPhone: '+91 98310 54321',
    clientEmail: 'rajesh.mukherjee@example.com',
    serviceId: 'vedic-kundli-analysis',
    serviceTitle: 'Complete Vedic Kundli & Life Forecast',
    profileId: 'prof-self',
    profileName: 'Rajesh Mukherjee (Self)',
    birthDetails: {
      dob: '1988-11-24',
      exactTime: '06:45',
      placeOfBirth: 'Siliguri, West Bengal',
      rashi: 'Vrishabha',
      nakshatra: 'Rohini',
      ascendant: 'Scorpio'
    },
    mode: 'video',
    appointmentDate: '2026-09-08',
    timeSlot: '11:00 AM – 11:45 AM',
    status: 'confirmed',
    paymentStatus: 'paid',
    amountINR: 2100,
    paymentMethod: 'UPI',
    paymentUpiRef: 'UPI-AXIS-992812034',
    clientConcerns: 'Facing delay in partnership registration and want advice on upcoming Rahu sub-period.',
    meetingLink: 'https://meet.google.com/sb-astro-9001',
    createdAt: '2026-09-01T09:15:00Z'
  },
  {
    id: 'cons-8942',
    bookingRef: 'SB-2026-8942',
    userId: 'usr-client-101',
    clientName: 'Rajesh Mukherjee',
    clientPhone: '+91 98310 54321',
    serviceId: '16-zone-vastu-consultation',
    serviceTitle: '16-Zone Scientific Vastu Shastra Audit',
    profileId: 'prof-self',
    profileName: 'Family Residence (Jalpaiguri)',
    birthDetails: {
      dob: '1988-11-24',
      exactTime: '06:45',
      placeOfBirth: 'Siliguri, West Bengal'
    },
    mode: 'in_person',
    chamberLocation: 'Jalpaiguri Main Chamber',
    appointmentDate: '2026-08-20',
    timeSlot: '05:30 PM – 06:30 PM',
    status: 'completed',
    paymentStatus: 'paid',
    amountINR: 5100,
    paymentMethod: 'UPI',
    paymentUpiRef: 'UPI-HDFC-8821932',
    clientConcerns: 'South-West master bedroom energy check and main gate review.',
    astrologerRemedies: 'Installed brass helix in North-East. Shifted heavy iron almirah towards South-West wall. Recommended yellow night lamp in Nairutya zone.',
    createdAt: '2026-08-14T14:30:00Z'
  }
];

export interface BookingDraft {
  serviceId: string;
  profileId: string;
  mode: ConsultationMode;
  chamberLocation?: string;
  appointmentDate: string;
  timeSlot: string;
  clientQuestions: string;
  floorPlanUrl?: string;
}

interface AstroStore {
  user: User | null;
  profiles: BirthProfile[];
  activeProfileId: string;
  consultations: Consultation[];
  cosmicPosts: CosmicPost[];
  likedPostIds: string[];
  bookingDraft: BookingDraft;
  
  // Auth
  loginWithPhone: (phone: string, name?: string) => void;
  loginAsAdmin: () => void;
  toggleRole: () => void;
  logout: () => void;
  
  // Profiles
  addProfile: (profile: Omit<BirthProfile, 'id' | 'userId' | 'createdAt'>) => BirthProfile;
  updateProfile: (id: string, updates: Partial<BirthProfile>) => void;
  deleteProfile: (id: string) => void;
  setActiveProfileId: (id: string) => void;

  // Booking
  updateBookingDraft: (updates: Partial<BookingDraft>) => void;
  resetBookingDraft: () => void;
  confirmBooking: (paymentMethod: 'UPI' | 'QR' | 'NetBanking', upiRef?: string) => Consultation;

  // Consultations / Admin
  updateConsultationStatus: (id: string, status: ConsultationStatus) => void;
  updateConsultationRemedies: (id: string, remedies: string) => void;
  
  // CMS
  addCosmicPost: (post: Omit<CosmicPost, 'id' | 'likes' | 'shares'>) => void;
  toggleLikePost: (postId: string) => void;

  // GDPR & Compliance (Right to Access & Right to be Forgotten)
  exportUserData: () => { exportBlobUrl: string; filename: string };
  deleteAccountData: () => void;
}

export const useAstroStore = create<AstroStore>()(
  persist(
    (set, get) => ({
      user: INITIAL_USER,
      profiles: INITIAL_PROFILES,
      activeProfileId: 'prof-self',
      consultations: INITIAL_CONSULTATIONS,
      cosmicPosts: COSMIC_POSTS,
      likedPostIds: ['post-1'],
      bookingDraft: {
        serviceId: 'vedic-kundli-analysis',
        profileId: 'prof-self',
        mode: 'video',
        chamberLocation: 'Online Tele-Consult',
        appointmentDate: '',
        timeSlot: '',
        clientQuestions: '',
      },

      loginWithPhone: (phone, name = 'Valued Client') => {
        set({
          user: {
            id: `usr-${Date.now()}`,
            phone,
            name,
            role: 'client',
            createdAt: new Date().toISOString()
          }
        });
      },

      loginAsAdmin: () => {
        set({
          user: {
            id: 'admin-suvabrata',
            phone: '+91 94340 12345',
            name: 'Sri Suvabrata Bharati (Admin)',
            email: 'astrologer.suvabrata@gmail.com',
            role: 'admin',
            createdAt: '2020-01-01T00:00:00Z'
          }
        });
      },

      toggleRole: () => {
        const current = get().user;
        if (!current) return;
        set({
          user: {
            ...current,
            role: current.role === 'admin' ? 'client' : 'admin'
          }
        });
      },

      logout: () => {
        set({ user: null });
      },

      addProfile: (data) => {
        const newProf: BirthProfile = {
          ...data,
          id: `prof-${Date.now()}`,
          userId: get().user?.id || 'guest',
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          profiles: [newProf, ...state.profiles],
          activeProfileId: newProf.id
        }));
        return newProf;
      },

      updateProfile: (id, updates) => {
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...updates } : p))
        }));
      },

      deleteProfile: (id) => {
        set((state) => {
          const remaining = state.profiles.filter((p) => p.id !== id);
          return {
            profiles: remaining,
            activeProfileId: remaining.length > 0 ? remaining[0].id : ''
          };
        });
      },

      setActiveProfileId: (id) => set({ activeProfileId: id }),

      updateBookingDraft: (updates) => {
        set((state) => ({
          bookingDraft: { ...state.bookingDraft, ...updates }
        }));
      },

      resetBookingDraft: () => {
        set({
          bookingDraft: {
            serviceId: 'vedic-kundli-analysis',
            profileId: get().activeProfileId || 'prof-self',
            mode: 'video',
            chamberLocation: 'Online Tele-Consult',
            appointmentDate: '',
            timeSlot: '',
            clientQuestions: '',
          }
        });
      },

      confirmBooking: (paymentMethod, upiRef) => {
        const { bookingDraft, profiles, user } = get();
        const service = SERVICES.find((s) => s.id === bookingDraft.serviceId) || SERVICES[0];
        const profile = profiles.find((p) => p.id === bookingDraft.profileId) || profiles[0];

        const newConsultation: Consultation = {
          id: `cons-${Date.now().toString().slice(-6)}`,
          bookingRef: `SB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: user?.id || 'guest-user',
          clientName: user?.name || profile?.fullName || 'Valued Devotee',
          clientPhone: user?.phone || '+91 94340 00000',
          clientEmail: user?.email,
          serviceId: service.id,
          serviceTitle: service.title,
          profileId: profile?.id || 'default',
          profileName: `${profile?.fullName || 'Client'} (${profile?.relation || 'Self'})`,
          birthDetails: {
            dob: profile?.dob || '1990-01-01',
            exactTime: profile?.exactTime || '12:00',
            placeOfBirth: profile?.placeOfBirth || 'Kolkata, WB',
            rashi: profile?.rashi,
            nakshatra: profile?.nakshatra,
            ascendant: profile?.ascendant,
          },
          mode: bookingDraft.mode,
          chamberLocation: bookingDraft.mode === 'in_person' ? (bookingDraft.chamberLocation || 'Jalpaiguri Main Chamber') : 'Online Tele-Consult',
          appointmentDate: bookingDraft.appointmentDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          timeSlot: bookingDraft.timeSlot || '11:00 AM – 11:45 AM',
          status: 'confirmed',
          paymentStatus: 'paid',
          amountINR: service.feeINR,
          paymentMethod,
          paymentUpiRef: upiRef || `UPI-AUTOPAY-${Math.floor(100000 + Math.random() * 900000)}`,
          clientConcerns: bookingDraft.clientQuestions,
          floorPlanUrl: bookingDraft.floorPlanUrl,
          meetingLink: bookingDraft.mode !== 'in_person' ? 'https://meet.google.com/sb-astro-session' : undefined,
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          consultations: [newConsultation, ...state.consultations]
        }));

        return newConsultation;
      },

      updateConsultationStatus: (id, status) => {
        set((state) => ({
          consultations: state.consultations.map((c) => (c.id === id ? { ...c, status } : c))
        }));
      },

      updateConsultationRemedies: (id, remedies) => {
        set((state) => ({
          consultations: state.consultations.map((c) => (c.id === id ? { ...c, astrologerRemedies: remedies } : c))
        }));
      },

      addCosmicPost: (post) => {
        const newPost: CosmicPost = {
          ...post,
          id: `post-${Date.now()}`,
          likes: 0,
          shares: 0,
        };
        set((state) => ({
          cosmicPosts: [newPost, ...state.cosmicPosts]
        }));
      },

      toggleLikePost: (postId) => {
        set((state) => {
          const isLiked = state.likedPostIds.includes(postId);
          const newLiked = isLiked
            ? state.likedPostIds.filter((id) => id !== postId)
            : [...state.likedPostIds, postId];

          const updatedPosts = state.cosmicPosts.map((p) => {
            if (p.id === postId) {
              return { ...p, likes: isLiked ? Math.max(0, p.likes - 1) : p.likes + 1 };
            }
            return p;
          });

          return {
            likedPostIds: newLiked,
            cosmicPosts: updatedPosts
          };
        });
      },

      exportUserData: () => {
        const state = get();
        const exportPayload = {
          platform: 'Sri Suvabrata Bharati Consultations',
          exportedAt: new Date().toISOString(),
          complianceProtocol: 'GDPR / DPDP Indian Data Sovereignty (Right to Access)',
          user: state.user,
          birthProfiles: state.profiles,
          consultationLedger: state.consultations.map((c) => ({
            bookingRef: c.bookingRef,
            service: c.serviceTitle,
            mode: c.mode,
            chamber: c.chamberLocation,
            appointmentDate: c.appointmentDate,
            timeSlot: c.timeSlot,
            status: c.status,
            paymentStatus: c.paymentStatus,
            amountINR: c.amountINR,
            prescribedRemedies: c.astrologerRemedies || 'None yet'
          }))
        };

        const jsonString = JSON.stringify(exportPayload, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const exportBlobUrl = URL.createObjectURL(blob);
        const filename = `suvabrata-bharati-userData-${Date.now()}.json`;

        return { exportBlobUrl, filename };
      },

      deleteAccountData: () => {
        // Right to be forgotten: scrub all PII, birth records, consultations notes, and reset
        set({
          user: null,
          profiles: [],
          activeProfileId: '',
          consultations: [],
          bookingDraft: {
            serviceId: 'vedic-kundli-analysis',
            profileId: '',
            mode: 'video',
            chamberLocation: 'Online Tele-Consult',
            appointmentDate: '',
            timeSlot: '',
            clientQuestions: '',
          }
        });
      }
    }),
    {
      name: 'astro-vastu-storage-v1',
    }
  )
);
