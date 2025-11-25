import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frame Catalog | OpticHome",
  description: "Browse our collection of stylish eyeglass frames for men, women, and kids.",
};

// Helper to get data
async function getFrames() {
  return client.fetch(`*[_type == "frame" && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    photo,
    category,
    description,
    material,
    inStock
  }`);
}

export default async function Catalog() {
  const frames = await getFrames();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm z-10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Catalog</h1>
        <Link href="/" className="text-sm underline hover:no-underline">Back Home</Link>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {frames.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No frames available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {frames.map((frame: any) => (
              <div key={frame._id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 group">
                {frame.photo && (
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img 
                      src={urlFor(frame.photo).width(600).quality(90).url()} 
                      alt={frame.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-1">{frame.name}</h2>
                  <p className="text-gray-500 text-sm uppercase mb-2">{frame.category}</p>
                  {frame.material && (
                    <p className="text-xs text-gray-400 mb-3">{frame.material}</p>
                  )}
                  <Link 
                    href={`/book?frame=${encodeURIComponent(frame.name)}`} 
                    className="block text-center border-2 border-black py-2 text-sm font-bold hover:bg-black hover:text-white transition uppercase tracking-wider"
                  >
                    Request This Frame
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}