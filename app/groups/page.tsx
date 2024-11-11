import GroupCards from "@/components/groups/overview/groupCards";
import GroupFilters from "@/components/groups/overview/groupFilters";
import GroupSearchBar from "@/components/groups/overview/searchBar";

export default function GroupsOverview() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold">Explore K-Pop Groups</h1>
          <p className="mt-2 text-lg">
            Find your favorite idols and discover new groups
          </p>
        </div>

        {/* Collapsible Filtering Panel */}
        <GroupFilters />

        {/* Search Bar */}
        <GroupSearchBar />

        {/* Group cards in a horizontal layout */}
        <GroupCards />
      </div>
    </section>
  );
}
