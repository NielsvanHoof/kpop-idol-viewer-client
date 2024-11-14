import GroupHeroSection from "@/components/groups/profile/groupHeroSection";
import GroupTabsContent from "@/components/groups/profile/groupTabs";
import FetchGroup from "@/queries/groups/fetchGroup";
import { Group } from "@/types/models";
import Response from "@/types/response";

export const revalidate = 120;
export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`);

  if (!response.ok) {
    throw new Error(`Failed to fetch groups: ${response.statusText}`);
  }

  const groups: Response<Group[]> = await response.json();

  return groups.data.map((group) => ({
    slug: group.slug,
  }));
}

export default async function GroupProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const group = await FetchGroup((await params).slug, ["schedules", "idols"]);

  return (
    <div className="space-y-16">
      <GroupHeroSection group={group.data} />

      <GroupTabsContent group={group.data} />
    </div>
  );
}
