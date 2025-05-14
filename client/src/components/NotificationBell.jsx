import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Sample notifications
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <span className="inline-block animate-bell-shake">
            <Bell className="w-6 h-6 text-gray-500" />
          </span>
          {/* Notification dot if there are notifications */}
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
          <style>{`
            @keyframes bell-shake {
              0% { transform: rotate(0deg); }
              10% { transform: rotate(-15deg); }
              20% { transform: rotate(10deg); }
              30% { transform: rotate(-10deg); }
              40% { transform: rotate(6deg); }
              50% { transform: rotate(-4deg); }
              60% { transform: rotate(2deg); }
              70% { transform: rotate(-1deg); }
              80% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
            }
            .animate-bell-shake {
              animation: bell-shake 1.5s infinite cubic-bezier(.36,.07,.19,.97);
              transform-origin: 50% 0%;
              display: inline-block;
            }
          `}</style>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full p-0 rounded-2xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-8 flex flex-col items-center justify-center min-h-[350px]">
            <Bell className="w-16 h-16 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Haven't got any notifications?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
              You will soon get notifications. Meanwhile, browse relevant jobs on Naukri.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
              Go to recommendations
            </Button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 p-0 min-h-[350px] flex flex-col">
            <div className="px-6 pt-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
              <span className="text-xs text-gray-400">{notifications.length} new</span>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[320px] overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full w-full max-w-xs" onClick={() => { setOpen(false); navigate('/notifications'); }}>
                View all notifications
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 