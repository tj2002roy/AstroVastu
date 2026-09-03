import { NextResponse } from 'next/server';
import { calculateDailyPanchang } from '@/lib/astro/panchangEngine';

// Automatically revalidate every 30 minutes
export const revalidate = 1800;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    const targetDate = dateParam ? new Date(dateParam) : new Date();
    const panchang = calculateDailyPanchang(targetDate);

    return NextResponse.json({
      success: true,
      data: panchang,
      source: 'Algorithmic Drik Ganita Engine (Jalpaiguri & Siliguri)',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to compute daily panchang',
      },
      { status: 500 }
    );
  }
}
