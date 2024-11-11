import IdolOverViewCards from "@/components/idols/overview/idolOverViewCards";
import IdolOverViewFilters from "@/components/idols/overview/idolOverViewFilters";

export default function Idols() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-purple-700">
                Idols Overview
              </h1>
              <p className="text-gray-600 mt-2">
                Discover your favorite idols and explore their profiles
              </p>
            </div>

            <IdolOverViewFilters />

            <IdolOverViewCards />
          </div>
        </section>
      </main>
    </div>
  );
}
