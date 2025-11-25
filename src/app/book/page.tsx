"use client"
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Book() {
  const searchParams = useSearchParams();
  const interestedFrame = searchParams.get('frame');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.fullName || !data.phone || !data.address || !data.date) {
      setError('Please fill in all required fields');
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/create-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to create appointment');
      }

      setStatus('done');
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  }

  if (status === 'done') return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <div className="text-center max-w-md bg-white p-8 shadow-sm">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4">Request Received!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your appointment request. I will call you shortly to confirm your home visit.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block w-full bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition">
            Back Home
          </Link>
          <Link href="/catalog" className="block w-full border-2 border-black py-3 font-bold uppercase tracking-widest hover:bg-gray-100 transition">
            Browse More Frames
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Book Appointment</h1>
        <Link href="/" className="text-sm underline hover:no-underline">Back</Link>
      </header>

      <main className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-8 shadow-sm">
          {interestedFrame && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm font-semibold text-blue-900">Selected Frame:</p>
              <p className="text-lg font-bold text-blue-900">{interestedFrame}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                name="fullName" 
                required 
                minLength={2}
                maxLength={100}
                className="w-full border-b-2 border-gray-200 p-3 outline-none focus:border-black transition" 
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Phone <span className="text-red-500">*</span>
              </label>
              <input 
                name="phone" 
                type="tel" 
                required 
                className="w-full border-b-2 border-gray-200 p-3 outline-none focus:border-black transition" 
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Email (Optional)
              </label>
              <input 
                name="email" 
                type="email" 
                className="w-full border-b-2 border-gray-200 p-3 outline-none focus:border-black transition" 
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Home Address <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="address" 
                required 
                rows={3} 
                className="w-full border-2 border-gray-200 p-3 outline-none focus:border-black transition resize-none"
                placeholder="Your complete home address"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Preferred Date & Time <span className="text-red-500">*</span>
              </label>
              <input 
                name="date" 
                type="datetime-local" 
                required 
                min={new Date().toISOString().slice(0, 16)}
                className="w-full border-b-2 border-gray-200 p-3 outline-none focus:border-black transition" 
              />
              <p className="text-xs text-gray-500 mt-1">I will confirm availability after receiving your request</p>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Additional Notes (Optional)
              </label>
              <textarea 
                name="notes" 
                rows={3} 
                className="w-full border-2 border-gray-200 p-3 outline-none focus:border-black transition resize-none"
                placeholder="Any special requirements or questions..."
                defaultValue={interestedFrame ? `Interested in: ${interestedFrame}` : ''}
              ></textarea>
            </div>

            <button 
              disabled={status === 'submitting'} 
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending Request...' : 'Confirm Appointment Request'}
            </button>

            <p className="text-xs text-center text-gray-500">
              By submitting, you agree to be contacted to confirm your appointment
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}