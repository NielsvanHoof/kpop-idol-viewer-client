import IdolProfileSection from "@/components/idols/profile/idolProfileSection";
import IdolTabs from "@/components/idols/profile/idolTabs";
import fetchIdol from "@/queries/idols/fetchIdol";
import { Idol, Schedule } from "@/types/models";
import Response from "@/types/response";
import { remark } from "remark";

export const revalidate = 120;
export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/idols`);

  if (!response.ok) {
    throw new Error(`Failed to fetch idols: ${response.statusText}`);
  }

  const idols: Response<Idol[]> = await response.json();

  return idols.data.map((idol) => ({
    slug: idol.slug,
  }));
}

export default async function IdolProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const idol = await fetchIdol((await params).slug);
  const processedBio = (await remark().process(idol.data.bio)).toString();
  const events: Schedule[] = [];

  if (idol.data.group.schedules) {
    events.push(...idol.data.group.schedules);
  }

  if (idol.data.schedules) {
    events.push(...idol.data.schedules);
  }

  return (
    <div>
      {/* Sections */}
      <IdolProfileSection
        name={idol.data.name}
        profilePicture={idol.data.profile_picture}
      />

      {/* Tab Navigation */}
      <IdolTabs idol={idol.data} events={events} description={processedBio} />
    </div>
  );
}
