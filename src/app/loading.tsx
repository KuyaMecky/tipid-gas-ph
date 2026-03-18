export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-8">
          {/* Hero skeleton */}
          <div className="skeleton h-44 md:h-56 rounded-2xl" />

          {/* Category pills skeleton */}
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-10 w-24 rounded-full" />
            ))}
          </div>

          {/* Breaking news skeleton */}
          <div className="skeleton h-24 rounded-2xl" />

          {/* Featured article skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border-2 border-gray-100">
            <div className="skeleton aspect-[4/3] rounded-xl" />
            <div className="space-y-4 py-4">
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-8 w-full" />
              <div className="skeleton h-8 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-10 w-32 rounded-lg" />
            </div>
          </div>

          {/* News grid skeleton */}
          <div>
            <div className="skeleton h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="skeleton aspect-[16/10] rounded-xl" />
                  <div className="skeleton h-3 w-24" />
                  <div className="skeleton h-5 w-full" />
                  <div className="skeleton h-3 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="hidden lg:block space-y-6">
          <div className="skeleton h-80 rounded-2xl" />
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
