"use client";

import { Schedule } from "@/types/models";
import { CalendarIcon } from "@heroicons/react/16/solid";

interface GroupEventsProps {
  events: Schedule[];
}

export default function GroupEvents({ events }: GroupEventsProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <CalendarIcon className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">
          No Upcoming Events
        </h3>
        <p className="text-gray-600 mt-2">
          This idol doesn&apos;t have any upcoming events at the moment. Check
          back later for updates!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white p-4 shadow-lg rounded-lg">
          <h4 className="text-xl font-bold">{event.title}</h4>
          <p className="text-sm text-gray-500">
            Date: {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700">{event.description}</p>
        </div>
      ))}
    </div>
  );
}
