export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse"></div>
      </header>
      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 shadow-sm">
              <div className="h-4 w-32 bg-gray-200 animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 shadow-sm h-48 animate-pulse"></div>
          ))}
        </div>
      </main>
    </div>
  );
}
