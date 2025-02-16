import React, { useState } from "react";
import {
  Heart,
  MessageSquare,
  UserPlus,
  AtSign,
  Settings,
  Bell,
  Trash2,
  Check,
  ChevronRight,
} from "lucide-react";

type Notification = {
  id: number;
  type: "like" | "comment" | "follow" | "mention" | "system";
  message: string;
  timestamp: string;
  isRead: boolean;
  user?: string;
  avatar?: string;
};

const notificationsData: Notification[] = [
  {
    id: 1,
    type: "like",
    message: "Solly liked your post.",
    timestamp: "2 minutes ago",
    isRead: false,
    user: "Solly",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 2,
    type: "comment",
    message: 'Jessica commented: "Great post!"',
    timestamp: "10 minutes ago",
    isRead: false,
    user: "Jessica",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 3,
    type: "follow",
    message: "Michael started following you.",
    timestamp: "1 hour ago",
    isRead: true,
    user: "Michael",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 4,
    type: "mention",
    message: "Sarah mentioned you in a post.",
    timestamp: "Yesterday",
    isRead: false,
    user: "Sarah",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 5,
    type: "system",
    message: "Your password has been updated.",
    timestamp: "Yesterday",
    isRead: true,
  },
  {
    id: 6,
    type: "system",
    message: "New app version available.",
    timestamp: "2 days ago",
    isRead: false,
  },
];

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const renderNotificationIcon = (type: Notification["type"]) => {
    const iconClasses = "w-5 h-5";
    switch (type) {
      case "like":
        return <Heart className={iconClasses} />;
      case "comment":
        return <MessageSquare className={iconClasses} />;
      case "follow":
        return <UserPlus className={iconClasses} />;
      case "mention":
        return <AtSign className={iconClasses} />;
      case "system":
        return <Settings className={iconClasses} />;
      default:
        return null;
    }
  };

  const getIconBackground = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      case "comment":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
      case "follow":
        return "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400";
      case "mention":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "system":
        return "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  const renderGroupedNotifications = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toDateString();

    const todayNotifications = notifications.filter(
      (notification) =>
        new Date(notification.timestamp).toDateString() === today
    );
    const yesterdayNotifications = notifications.filter(
      (notification) =>
        new Date(notification.timestamp).toDateString() === yesterday
    );
    const earlierNotifications = notifications.filter(
      (notification) =>
        new Date(notification.timestamp).toDateString() !== today &&
        new Date(notification.timestamp).toDateString() !== yesterday
    );

    return (
      <div className="space-y-8">
        {todayNotifications.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Today
            </h2>
            <div className="space-y-3">
              {todayNotifications.map((notification) =>
                renderNotification(notification)
              )}
            </div>
          </section>
        )}
        {yesterdayNotifications.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Yesterday
            </h2>
            <div className="space-y-3">
              {yesterdayNotifications.map((notification) =>
                renderNotification(notification)
              )}
            </div>
          </section>
        )}
        {earlierNotifications.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Earlier
            </h2>
            <div className="space-y-3">
              {earlierNotifications.map((notification) =>
                renderNotification(notification)
              )}
            </div>
          </section>
        )}
      </div>
    );
  };

  const renderNotification = (notification: Notification) => (
    <div
      key={notification.id}
      className={`group relative p-4 rounded-xl transition-all duration-200 ${
        notification.isRead
          ? "bg-white dark:bg-stone-800"
          : "bg-blue-50 dark:bg-blue-500/10 shadow-sm"
      }`}
    >
      <div className="flex items-start gap-4">
        {notification.avatar ? (
          <img
            src={notification.avatar}
            alt={`${notification.user}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBackground(
              notification.type
            )}`}
          >
            {renderNotificationIcon(notification.type)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 dark:text-gray-100 leading-5">
            <span className="font-medium">
              {notification.user ? `${notification.user} ` : ""}
            </span>
            {notification.message}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {notification.timestamp}
          </p>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!notification.isRead && (
            <button
              onClick={() => markAsRead(notification.id)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-stone-700 text-gray-500 dark:text-gray-400"
              aria-label="Mark as read"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => deleteNotification(notification.id)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-stone-700 text-gray-500 dark:text-gray-400"
            aria-label="Delete notification"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-stone-700 rounded-2xl shadow-sm p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Mark all as read
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-stone-700 text-gray-500 dark:text-gray-400"
              aria-label="Notification settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {renderGroupedNotifications()}

        {notifications.length > 0 && (
          <footer className="mt-8 text-center">
            <button className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              View all notifications
              <ChevronRight className="w-4 h-4" />
            </button>
          </footer>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No notifications
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              We'll notify you when something arrives
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
