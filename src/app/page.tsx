import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <div className="max-w-md space-y-8">
        <h1 className="text-5xl font-bold tracking-tighter text-black">
          OPTIC<span className="text-gray-400">HOME</span>
        </h1>
        <p className="text-lg text-gray-600">
          Professional eye exams and frame fitting in the comfort of your living room.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link href="/catalog" className="w-full rounded-none border-2 border-black bg-black py-4 text-white hover:bg-white hover:text-black transition font-bold uppercase tracking-widest">
            View Frames
          </Link>
          <Link href="/book" className="w-full rounded-none border-2 border-black bg-white py-4 text-black hover:bg-gray-100 transition font-bold uppercase tracking-widest">
            Book Exam
          </Link>
        </div>
      </div>
    </main>
  );
}