import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Secret token
  apiVersion: '2025-11-25',
  useCdn: false,
});

// Validation helper
function validateAppointmentData(data: any) {
  const errors: string[] = [];

  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length < 7) {
    errors.push('Valid phone number is required');
  }

  if (data.email && typeof data.email === 'string' && data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }

  if (!data.address || typeof data.address !== 'string' || data.address.trim().length < 10) {
    errors.push('Complete address is required');
  }

  if (!data.date) {
    errors.push('Appointment date is required');
  } else {
    const appointmentDate = new Date(data.date);
    const now = new Date();
    if (appointmentDate < now) {
      errors.push('Appointment date must be in the future');
    }
  }

  return errors;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate input
    const validationErrors = validateAppointmentData(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Create appointment document
    const appointment = await client.create({
      _type: 'client',
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || undefined,
      address: data.address.trim(),
      appointmentDate: new Date(data.date).toISOString(),
      notes: data.notes?.trim() || '',
      creditBalance: 0,
      status: 'New Request',
      creditHistory: []
    });

    return NextResponse.json({ 
      message: 'Appointment created successfully',
      appointmentId: appointment._id 
    });

  } catch (err) {
    console.error('Error creating appointment:', err);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}