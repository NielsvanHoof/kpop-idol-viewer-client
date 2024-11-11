import GroupTabsContent from "@/components/groups/profile/groupTabs";
import FetchGroup from "@/queries/groups/fetchGroup";
import { Group } from "@/types/models";
import Response from "@/types/response";
import Image from "next/image";
import { remark } from "remark";

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 rounded-lg shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="relative w-full md:w-1/3 h-64">
            <Image
              src={group.data.cover_picture}
              alt={group.data.name}
              fill={true}
              sizes="100%"
              className="rounded-lg object-cover shadow-lg"
              priority={true}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{group.data.name}</h1>
            <p className="text-lg">
              Debut Year: {new Date(group.data.debut_date).getFullYear()}
            </p>
            <p className="text-lg">Company: {group.data.company}</p>
            <p
              className="mt-4 text-gray-100"
              dangerouslySetInnerHTML={{
                __html: remark().processSync(group.data.bio).toString(),
              }}
            />
          </div>
        </div>
      </section>

      <GroupTabsContent group={group.data} />
    </div>
  );
}
