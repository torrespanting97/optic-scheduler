"use client"
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Book() {
  const searchParams = useSearchParams();
  const interestedFrame = searchParams.get('frame');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    
    const res = await fetch('/api/create-appointment', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (res.ok) setStatus('done');
  }

  if (status === 'done') return (
    <div className="flex h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">Request Received</h1>
        <p>I will call you shortly to confirm your home visit.</p>
        <a href="/" className="mt-8 block underline">Back Home</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Schedule Home Exam</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-sm font-bold mb-2">Full Name</label>
            <input name="fullName" required className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-black" />
        </div>
        <div>
            <label className="block text-sm font-bold mb-2">Phone</label>
            <input name="phone" type="tel" required className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-black" />
        </div>
        <div>
            <label className="block text-sm font-bold mb-2">Address</label>
            <textarea name="address" required rows={3} className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black"></textarea>
        </div>
        <div>
            <label className="block text-sm font-bold mb-2">Preferred Date</label>
            <input name="date" type="datetime-local" required className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-black" />
        </div>
        
        <input type="hidden" name="notes" value={interestedFrame ? `Interested in: ${interestedFrame}` : ''} />
        
        {interestedFrame && (
            <div className="bg-gray-100 p-4 text-sm">
                Selected Frame: <strong>{interestedFrame}</strong>
            </div>
        )}

        <button disabled={status === 'submitting'} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800">
            {status === 'submitting' ? 'Sending...' : 'Confirm Request'}
        </button>
      </form>
    </div>
  );
}