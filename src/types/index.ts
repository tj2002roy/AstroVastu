export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  role: UserRole;
  createdAt: string;
}

export type RelationType = 'self' | 'spouse' | 'child' | 'parent' | 'partner';

export interface BirthProfile {
  id: string;
  userId: string;
  fullName: string;
  relation: RelationType;
  gender: 'male' | 'female' | 'other';
  dob: string; // YYYY-MM-DD
  exactTime: string; // HH:mm
  placeOfBirth: string; // City, State
  rashi?: string; // Moon sign
  nakshatra?: string; // Birth star
  ascendant?: string; // Lagna
  notes?: string;
  createdAt: string;
}

export type ServiceCategory = 'vedic' | 'kp' | 'nadi' | 'numerology' | 'vastu' | 'gemstone';
export type ConsultationMode = 'video' | 'audio' | 'in_person';
export type ConsultationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface Service {
  id: string;
  title: string;
  bengaliTitle?: string;
  category: ServiceCategory;
  badge?: string;
  durationMinutes: number;
  feeINR: number;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  modesAllowed: ConsultationMode[];
  icon: string;
}

export interface Consultation {
  id: string;
  bookingRef: string;
  userId: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceTitle: string;
  profileId: string;
  profileName: string;
  birthDetails: {
    dob: string;
    exactTime: string;
    placeOfBirth: string;
    rashi?: string;
    nakshatra?: string;
    ascendant?: string;
  };
  mode: ConsultationMode;
  chamberLocation?: string; // 'Jalpaiguri Chamber' | 'Siliguri Clinic' | 'Online Tele-Consult'
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string;
  status: ConsultationStatus;
  paymentStatus: PaymentStatus;
  amountINR: number;
  paymentMethod: 'UPI' | 'QR' | 'NetBanking' | 'CashAtChamber';
  paymentUpiRef?: string;
  clientConcerns?: string;
  floorPlanUrl?: string; // For Vastu consultations
  astrologerRemedies?: string;
  meetingLink?: string;
  createdAt: string;
}

export interface CosmicPost {
  id: string;
  title: string;
  category: 'daily_horoscope' | 'vastu_tip' | 'video_discourse' | 'muhurat' | 'remedy';
  excerpt: string;
  content: string;
  youtubeId?: string;
  imageUrl?: string;
  publishedAt: string;
  likes: number;
  shares: number;
  tags: string[];
}

export interface DailyPanchang {
  date: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  rahuKaal: string;
  abhijitMuhurat: string;
  moonSign: string;
}

export interface ChamberInfo {
  id: string;
  city: string;
  title: string;
  address: string;
  landmark: string;
  timings: string;
  days: string;
  helpline: string;
}
