import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const appointments = await client.fetch(`
      *[_type == "client"] | order(appointmentDate desc) {
        _id,
        fullName,
        phone,
        appointmentDate,
        status,
        creditBalance,
        _createdAt
      }
    `);

    const stats = {
      total: appointments.length,
      newRequests: appointments.filter((a: any) => a.status === 'New Request').length,
      confirmed: appointments.filter((a: any) => a.status === 'Confirmed').length,
      inProgress: appointments.filter((a: any) => a.status === 'In Progress').length,
      completed: appointments.filter((a: any) => a.status === 'Completed').length,
      cancelled: appointments.filter((a: any) => a.status === 'Cancelled').length,
      totalCreditsOwed: appointments.reduce((sum: number, a: any) => sum + (a.creditBalance || 0), 0),
      upcomingToday: appointments.filter((a: any) => {
        const today = new Date();
        const aptDate = new Date(a.appointmentDate);
        return aptDate.toDateString() === today.toDateString() && 
               (a.status === 'Confirmed' || a.status === 'In Progress');
      }).length
    };

    return NextResponse.json({ success: true, stats, appointments });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
