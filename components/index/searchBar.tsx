"use client";

import { Input } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import fetchIdols from "../../queries/idols/fetchIdols";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");

  // React Query hook to fetch data with the updated query
  const { data, isError } = useQuery({
    queryKey: ["idols", query],
    queryFn: () => fetchIdols(query),
    enabled: query.length > 0, // Only fetch when there's a query
  });

  return (
    <section className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">
          Search for Your Favorite Idols
        </h2>
        <div className="relative">
          <Input
            type="text"
            placeholder="Start typing an idol's name..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Icon inside input field */}
          <svg
            className="absolute top-3 left-3 w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zM10 16a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isError && <p className="text-red-500">Failed to load data.</p>}

        {data && data.data.length > 0 ? (
          <ul className="space-y-2">
            {data.data.map((idol) => (
              <Link key={idol.id} href={`/idols/${idol.slug}`}>
                <li className="p-2 border-b border-gray-200 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150">
                  {idol.name}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          query.length > 0 && <p className="text-gray-500">No idols found.</p>
        )}
      </div>
    </section>
  );
}
