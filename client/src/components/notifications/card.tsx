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
import { capitalizeText, formatTimestamp } from "../../utils";
import { User } from "../../types/auth";

const getNotificationIcon = (verb: string) => {
  switch (verb) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500 fill-current" />;
    case "comment":
      return <MessageCircle className="w-5 h-5 text-blue-500" />;
    case "reply":
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
      return <Bell className="w-5 h-5 text-neutral-500" />;
  }
};

const constructNotification = (notification: Notification, user: User) => {
  switch (notification.verb) {
    case "like":
      return (
        <>
          <p>
            Liked your{" "}
            {capitalizeText(notification.object.content_type as string)}
          </p>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-3">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {notification.object.preview}
            </p>
          </div>
        </>
      );
    case "post":
      return (
        <>
          <p>Created a Post</p>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-3">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {notification.object.body}
            </p>
          </div>
        </>
      );
    case "repost":
      return (
        <>
          <p>
            Commented on your{" "}
            {capitalizeText(notification.object.content_type as string)}
          </p>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-3">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {notification.object.body}
            </p>
          </div>
        </>
      );
    case "comment":
      return (
        <>
          <p>Commented on your Post</p>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-3">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {notification.object.body}
            </p>
          </div>
        </>
      );
    case "reply":
      return (
        <>
          <p>Replied a comment</p>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-3">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {notification.object.text}
            </p>
          </div>
        </>
      );
    default:
      return <div></div>;
  }
};

const markAsRead = (id: number) => {
  console.log("Hi " + id);
};

const deleteNotification = (id: number) => {
  console.log("Hi " + id);
};

const NotificationCard = ({
  notification,
  user,
}: {
  notification: Notification;
  user: User;
}) => (
  <div
    className={`p-6 border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 ${
      !notification.read_at
        ? "bg-purple-50 dark:bg-purple-700/20 border-l-4 border-l-purple-500"
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
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-1">
          {getNotificationIcon(notification.verb)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {notification.actor.first_name +
                " " +
                notification.actor.last_name}
            </span>
            {notification.actor.email && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <span className="text-neutral-500 dark:text-neutral-400">
              @{notification.actor.username}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 dark:text-neutral-400 text-sm whitespace-nowrap">
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
              className="p-1 rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
              title="Delete notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {constructNotification(notification, user)}

        {notification.verb === "follow" && (
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              Follow Back
            </button>
            <button className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200">
              View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default NotificationCard;
