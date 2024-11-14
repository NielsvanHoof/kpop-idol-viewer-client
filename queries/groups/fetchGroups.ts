import { Group } from "@/types/models";
import Response from "@/types/response";

export default async function fetchGroups(searchQuery: string | null = null) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`);

  const params = new URLSearchParams();

  if (searchQuery) {
    params.append("filter[search]", searchQuery);
  }

  url.search = params.toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch groups: ${response.statusText}`);
  }

  const data: Response<Group[]> = await response.json();
  return data;
}
