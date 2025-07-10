import { useEffect, useState } from "react";
import { Bell, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { getNotifications } from "../../features/thunks/notifications";
import NotificationCard from "../../components/notifications/card";

const Notifications = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  const dispatch: AppDispatch = useDispatch();

  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "All", count: notifications.data.length },
    {
      id: "unread",
      label: "Unread",
      count: notifications.data.filter((n) => !n.read_at).length,
    },
    {
      id: "mentions",
      label: "Mentions",
      count: notifications.data.filter((n) => n.verb === "mention").length,
    },
    {
      id: "likes",
      label: "Likes",
      count: notifications.data.filter((n) => n.verb === "like").length,
    },
  ];

  const markAllAsRead = () => {
    console.log("Hi");
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  console.log(notifications);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Notifications
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Stay updated with your latest activity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Mark all as read
              </button>
              <button className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-700 rounded-xl p-1">
            {filters.map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  filter === filterOption.id
                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                <span className="font-medium">{filterOption.label}</span>
                {filterOption.count > 0 && (
                  <span className="px-2 py-1 bg-stone-200 dark:bg-stone-600 text-stone-700 dark:text-stone-300 text-xs rounded-full">
                    {filterOption.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-stone-800">
          {notifications.data.length > 0 ? (
            notifications.data.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-stone-400 dark:text-stone-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No notifications
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                {filter === "all"
                  ? "You're all caught up!"
                  : `No ${filter} notifications found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
