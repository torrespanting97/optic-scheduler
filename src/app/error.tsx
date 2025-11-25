'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="block w-full border-2 border-black py-3 font-bold uppercase tracking-widest hover:bg-gray-100 transition"
          >
            Go Home
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-left">
            <p className="text-xs font-mono text-red-800 whitespace-pre-wrap">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
