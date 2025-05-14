/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, UserIcon } from "lucide-react";

function generateGoogleCalendarLink(title, description, startTime, endTime, location) {
  const formatDate = (date) => {
    return new Date(date).toISOString().replace(/[-:]|\.\d{3}/g, "");
  };
  const start = formatDate(startTime);
  const end = formatDate(endTime);
  const url = new URL("https://www.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", title);
  url.searchParams.set("dates", `${start}/${end}`);
  url.searchParams.set("details", description);
  url.searchParams.set("location", location);
  return url.toString();
}

export default function CollaborationMeetingCard({
  title,
  description,
  host,
  time,
  durationMinutes = 60,
  discordLink,
  participants = [],
  attachmentLink = null,
  recordingAvailable = false,
  isRecurring = false,
}) {
  const handleJoin = () => {
    if (discordLink) {
      window.open(discordLink, "_blank");
    }
  };

  const endTime = new Date(new Date(time).getTime() + durationMinutes * 60000);
  const calendarLink = generateGoogleCalendarLink(
    title,
    description,
    time,
    endTime,
    discordLink || "Online"
  );

  return (
    <Card className="max-w-md mx-auto p-4 shadow-xl rounded-2xl bg-white dark:bg-gray-900">
      <CardContent>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <UserIcon className="w-4 h-4 mr-1" /> Hosted by <span className="ml-1 font-medium">{host}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <CalendarIcon className="w-4 h-4 mr-1" /> {new Date(time).toLocaleString()}
          {isRecurring && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">Recurring</span>}
        </div>

        <Button
          onClick={handleJoin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mb-3"
        >
          Join on Discord
        </Button>

        <Button
          variant="outline"
          onClick={() => window.open(calendarLink, "_blank")}
          className="w-full mb-3"
        >
          Add to Google Calendar
        </Button>

        {attachmentLink && (
          <a
            href={attachmentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline text-sm mb-3"
          >
            📎 View Resources / Attachments
          </a>
        )}

        {recordingAvailable && (
          <p className="text-sm text-green-600 mb-3">📹 Recording will be available after the session</p>
        )}

        <div className="flex -space-x-2 overflow-hidden">
          {participants.slice(0, 5).map((user, i) => (
            <img
              key={i}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
              src={user.avatar}
              alt={user.name}
              title={user.name}
            />
          ))}
          {participants.length > 5 && (
            <span className="text-sm text-gray-500 ml-2">
              +{participants.length - 5} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
