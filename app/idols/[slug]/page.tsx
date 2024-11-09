import IdolDetailsSection from "@/components/idols/profile/idolDetailsSection";
import IdolPhotoGallery from "@/components/idols/profile/idolPhotoGallery";
import IdolProfileSection from "@/components/idols/profile/idolProfileSection";
import IdolTopSongs from "@/components/idols/profile/idolTopSongs";
import IdolUpcomingEvents from "@/components/idols/profile/idolUpcomingEvents";
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
      <IdolProfileSection
        name={idol.data.name}
        profilePicture={idol.data.profile_picture}
        description={processedBio}
      />
      <IdolDetailsSection
        debutYear={idol.data.debute_date}
        group={idol.data.group}
      />
      <IdolUpcomingEvents events={events} />
      <IdolPhotoGallery photos={idol.data.photos} />
      <IdolTopSongs idol={idol.data} />
    </div>
  );
}
