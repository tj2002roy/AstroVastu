# Sri Suvabrata Bharati — Astro-Vastu & Spiritual Wellness Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/tj2002roy/AstroVastu)

A full-stack, mobile-first consultation ecosystem and Shastric authority platform engineered for **Sri Suvabrata Bharati** (Gold Medalist Astrologer, Palmist, Numerologist & 16-Zone Vastu Consultant).

---

## Key Capabilities & Architecture

1. **Automated Mathematical Panchang & Muhurat Engine (`/api/panchang`)**:
   - Computes daily Tithi, Nakshatra, Moon Sign (Rashi), and daily solar windows for North Bengal coordinates (`26.7271° N, 88.3953° E`).
   - **Real-Time Temporal Awareness**: Dynamically detects current time (IST) to highlight the active window or the next upcoming auspicious timing (Abhijit, Vijaya, Godhuli Sandhya, Rahu Kaal).
   - Zero-dependency mathematical algorithms with automated midnight rollovers.

2. **Isolated Multi-Factor Administrative Backoffice (`/secure-backoffice`)**:
   - Completely segregated route hidden from public client navigation.
   - **2-Step 2FA Gate**: Master Password + Time-Based OTP (TOTP) verification.
   - Real-time gross dakshina telemetry, CRM client ledger, astrologer remedy prescriptions, and CSV export.

3. **6 Specialized Shastric Services & Booking Engine**:
   - Vedic Kundli & Karma Analysis
   - 16-Zone Scientific Vastu Audits (Zero Demolition)
   - KP System Prashna Charting
   - Hastarekha (Palmistry) & Mount Analysis
   - Astro-Numerology & Name Correction
   - Certified Planetary Gemstones & Rudraksha Upayas
   - Multi-step booking drawer with UPI QR generator, Google Meet video integration, and `.ics` calendar generation.

4. **Authentic Photographic Brand Assets**:
   - Official Facebook discourse posters integrated for Ketu Dosha and Palmistry Accident-line analysis.
   - Verified chamber hotlines for Jalpaiguri (`+91 70767 15202`) and Siliguri (`+91 94743 23694`).
   - Official royal gold concentric brand logo emblem (`/images/brand_logo_emblem.jpg`).

5. **Data Sovereignty & Compliance (DPDP / GDPR)**:
   - **Right to Access**: Automated JSON download of complete profile and consultation records.
   - **Right to be Forgotten**: Frictionless account deletion triggering a hard cascade scrub of all PII.

---

## Quick Start (Local Development)

```bash
# 1. Clone repository
git clone https://github.com/tj2002roy/AstroVastu.git
cd AstroVastu

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open browser
http://localhost:3000
```

---

## Deployment on Render (Render.com)

This repository includes a native [`render.yaml`](render.yaml) blueprint for automated zero-configuration deployment.

### Method 1: Using the Render Blueprint (Recommended)
1. Sign in to [Render.com](https://dashboard.render.com/).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub account and select repository: `tj2002roy/AstroVastu`.
4. Render will automatically read `render.yaml` and configure:
   - **Service Type**: Web Service (Node.js)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Region**: Singapore / Oregon
   - **Node Version**: `20.18.0`
5. Click **Apply** to deploy!

### Method 2: Manual Web Service on Render
1. In Render Dashboard, click **New +** -> **Web Service**.
2. Select `https://github.com/tj2002roy/AstroVastu`.
3. Configure the settings:
   - **Name**: `astrovastu`
   - **Language**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add Environment Variable:
   - `NODE_VERSION` = `20.18.0`
5. Click **Create Web Service**.

---

## Tech Stack

- **Framework**: Next.js 16.3 (App Router, Webpack engine)
- **UI Engine**: React 19, Tailwind CSS v4, Lucide React
- **State Store**: Zustand (with client persistence & hydration gates)
- **Database Schema**: Prisma PostgreSQL (`prisma/schema.prisma`)
- **Typography**: Cinzel (Heading) & Inter (Body)
- **Animations**: Canvas Confetti, Tailwind transitions
