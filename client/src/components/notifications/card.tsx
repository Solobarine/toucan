import {
  AtSign,
  Bell,
  Calendar,
  Check,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
  X,
} from "lucide-react";
import { Notification } from "../../types/notifications";
import { formatTimestamp } from "../../utils";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500 fill-current" />;
    case "comment":
      return <MessageCircle className="w-5 h-5 text-blue-500" />;
    case "follow":
      return <UserPlus className="w-5 h-5 text-green-500" />;
    case "mention":
      return <AtSign className="w-5 h-5 text-purple-500" />;
    case "repost":
      return <Repeat2 className="w-5 h-5 text-emerald-500" />;
    case "event":
      return <Calendar className="w-5 h-5 text-orange-500" />;
    default:
      return <Bell className="w-5 h-5 text-stone-500" />;
  }
};

const markAsRead = (id: number) => {
  console.log("Hi " + id);
};

const deleteNotification = (id: number) => {
  console.log("Hi " + id);
};

const NotificationCard = ({ notification }: { notification: Notification }) => (
  <div
    className={`p-6 border-b border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-200 ${
      !notification.read_at
        ? "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500"
        : ""
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="relative">
        <img
          src={"/placeholder.svg"}
          alt={
            notification.actor.first_name + " " + notification.actor.last_name
          }
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-stone-900 rounded-full p-1">
          {getNotificationIcon(notification.verb)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {notification.actor.first_name +
                " " +
                notification.actor.last_name}
            </span>
            {notification.actor.email && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <span className="text-stone-500 dark:text-stone-400">
              @{notification.user.username}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-500 dark:text-stone-400 text-sm whitespace-nowrap">
              {formatTimestamp(notification.inserted_at)}
            </span>
            {!notification.read_at && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="p-1 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                title="Mark as read"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => deleteNotification(notification.id)}
              className="p-1 rounded-full text-stone-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
              title="Delete notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-stone-700 dark:text-stone-300 mb-3">
          Notification Here
        </p>

        {notification.verb == "post" && (
          <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-3 mb-3">
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              {notification.object.preview}
            </p>
          </div>
        )}

        {notification.verb === "follow" && (
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              Follow Back
            </button>
            <button className="px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200">
              View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default NotificationCard;
