import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // Ensure you have image helper (see below)
import Link from "next/link";

// Helper to get data
async function getFrames() {
  return client.fetch(`*[_type == "frame"] | order(_createdAt desc)`);
}

export default async function Catalog() {
  const frames = await getFrames();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Catalog</h1>
        <Link href="/" className="text-sm underline">Back Home</Link>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {frames.map((frame: any) => (
          <div key={frame._id} className="bg-white p-4 shadow-sm">
            {frame.photo && (
              <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
                {/* We use standard img tag for simplicity in free tier setup */}
                <img 
                  src={urlFor(frame.photo).width(500).url()} 
                  alt={frame.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <h2 className="font-bold text-lg">{frame.name}</h2>
            <p className="text-gray-500 text-sm uppercase">{frame.category}</p>
            <Link href={`/book?frame=${frame.name}`} className="mt-4 block text-center border border-black py-2 text-sm hover:bg-black hover:text-white transition">
              Request This Frame
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}