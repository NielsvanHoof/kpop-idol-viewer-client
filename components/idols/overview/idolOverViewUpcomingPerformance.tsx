import { Schedule } from "@/types/models";

export default function IdolOverViewUpcomingPerformance({
  schedules,
}: {
  schedules: Schedule[];
}) {
  const latestSchedule = schedules.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0];

  if (!latestSchedule) {
    return (
      <div>
        <p className="text-sm text-gray-500">No Performances</p>
      </div>
    );
  }

  const isUpcoming = latestSchedule.date > new Date().toISOString();

  return (
    <div className="mt-2">
      {/* Performance Label */}
      <span
        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
          isUpcoming
            ? "bg-green-100 text-green-600"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {isUpcoming ? "Upcoming Performance" : "Latest Performance"}
      </span>

      {/* Date Display */}
      <p className="text-sm text-gray-600 mt-1">
        {new Date(latestSchedule.date).toDateString()}
      </p>
    </div>
  );
}
