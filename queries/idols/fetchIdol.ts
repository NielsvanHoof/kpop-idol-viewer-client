import { Idol } from "@/types/models";
import Response from "@/types/response";

export default async function fetchIdol(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/idols/${slug}?include=group,schedules,group.schedules`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data: Response<Idol> = await response.json();

  return data;
}
