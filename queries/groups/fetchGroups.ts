import { Group } from "@/types/models";
import Response from "@/types/response";

export default async function fetchGroups() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`);

  if (!response.ok) {
    throw new Error(`Failed to fetch groups: ${response.statusText}`);
  }

  const data: Response<Group[]> = await response.json();
  return data;
}
