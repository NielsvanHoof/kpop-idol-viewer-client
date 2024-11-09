export default function SkeletonCard() {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-56 bg-gray-300"></div>

      {/* Content placeholder */}
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
}
