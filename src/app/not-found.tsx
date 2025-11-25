import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
