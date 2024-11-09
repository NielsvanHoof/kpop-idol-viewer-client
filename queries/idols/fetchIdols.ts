import { Idol } from "@/types/models";
import Response from "@/types/response";

export default async function fetchIdols(
  searchQuery: string | null = null,
  filterGroup: number | null = null,
  sorting: "name" | "debute_date" = "name",
  include: string[] = [],
  cursor: string | null = null,
  perPage: number = 4
) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/idols`);

  const params = new URLSearchParams();

  if (searchQuery) {
    params.append("filter[search]", searchQuery);
  }

  if (filterGroup && filterGroup !== 0) {
    params.append("filter[group_id]", filterGroup.toString());
  }

  if (include.length > 0) {
    params.append("include", include.join(","));
  }

  params.append("sort", sorting);
  params.append("per_page", perPage.toString());

  if (cursor) {
    params.append("cursor", cursor);
  }

  url.search = params.toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch idols: ${response.statusText}`);
  }

  const data: Response<Idol[]> = await response.json();

  return {
    data: data.data,
    nextCursor: data.meta.next_cursor,
    prevCursor: data.meta.prev_cursor,
  };
}
