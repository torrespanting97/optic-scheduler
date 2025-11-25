import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Secret token
  apiVersion: '2024-01-01',
  useCdn: false,
});

export async function POST(req: Request) {
  const data = await req.json();
  
  try {
    await client.create({
      _type: 'client',
      fullName: data.fullName,
      phone: data.phone,
      address: data.address,
      appointmentDate: new Date(data.date).toISOString(),
      notes: data.notes,
      creditBalance: 0, // Start with 0 debt
      status: 'New Request'
    });
    return NextResponse.json({ message: 'Success' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}