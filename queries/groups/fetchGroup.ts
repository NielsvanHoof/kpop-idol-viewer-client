import { Group } from "@/types/models";
import Response from "@/types/response";

export default async function FetchGroup(slug: string, include: string[] = []) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/groups/${slug}`);

  const params = new URLSearchParams();

  if (include.length > 0) {
    params.append("include", include.join(","));
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data: Response<Group> = await response.json();

  return data;
}
