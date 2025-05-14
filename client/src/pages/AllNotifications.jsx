import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Course Enrolled!",
    message: "You have successfully enrolled in 'Web Development Bootcamp'.",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Assignment Due",
    message: "Your assignment for 'Machine Learning' is due tomorrow.",
    time: "1 hr ago",
  },
  {
    id: 3,
    title: "New Message",
    message: "You received a message from your mentor.",
    time: "3 hrs ago",
  },
];

export default function AllNotifications() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mr-4">Back</Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" /> All Notifications
          </h1>
        </div>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {notifications.map((n) => (
            <li key={n.id} className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{n.title}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{n.message}</div>
                </div>
                <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">{n.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 