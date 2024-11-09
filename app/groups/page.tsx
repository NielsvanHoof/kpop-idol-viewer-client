import GroupCards from "@/components/groups/groupCards";
import GroupFilters from "@/components/groups/groupFilters";
import QuickViewModal from "@/components/groups/quickViewModal";
import GroupSearchBar from "@/components/groups/searchBar";

export default function GroupsOverview() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Featured Group Section */}
        {/* <FeaturedGroup /> */}

        {/* Collapsible Filtering Panel */}
        <GroupFilters />

        {/* Search Bar */}
        <GroupSearchBar />

        {/* Group cards in a horizontal layout */}
        <GroupCards />

        {/* Quick View Modal */}
        <QuickViewModal />
      </div>
    </section>
  );
}
