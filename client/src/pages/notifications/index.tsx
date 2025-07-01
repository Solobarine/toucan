"use client";

import { useState } from "react";
import {
  Bell,
  Settings,
  Check,
  X,
  Heart,
  MessageCircle,
  UserPlus,
  Repeat2,
  AtSign,
  Calendar,
} from "lucide-react";

interface NotificationInterface {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "repost" | "event";
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  post?: {
    id: string;
    preview: string;
  };
  timestamp: string;
  read: boolean;
  actionable?: boolean;
}

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState<NotificationInterface[]>([
    {
      id: "1",
      type: "like",
      user: {
        name: "Sarah Johnson",
        username: "sarahj_dev",
        avatar: "/placeholder.svg?height=48&width=48",
        verified: true,
      },
      content: "liked your post",
      post: {
        id: "1",
        preview: "Just finished building a new React component library...",
      },
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "follow",
      user: {
        name: "Mike Chen",
        username: "mikechen",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      content: "started following you",
      timestamp: "1 hour ago",
      read: false,
      actionable: true,
    },
    {
      id: "3",
      type: "comment",
      user: {
        name: "Emma Wilson",
        username: "emmaw",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      content:
        'commented on your post: "This is amazing! How did you implement the animation?"',
      post: {
        id: "2",
        preview: "CSS animations can make your website feel more alive...",
      },
      timestamp: "3 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "mention",
      user: {
        name: "Alex Rodriguez",
        username: "alexr",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      content: "mentioned you in a post",
      post: {
        id: "3",
        preview: "Thanks to @johndoe for the inspiration on this project...",
      },
      timestamp: "5 hours ago",
      read: true,
    },
  ]);

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    {
      id: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.read).length,
    },
    {
      id: "mentions",
      label: "Mentions",
      count: notifications.filter((n) => n.type === "mention").length,
    },
    {
      id: "likes",
      label: "Likes",
      count: notifications.filter((n) => n.type === "like").length,
    },
  ];

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

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case "unread":
        return !notification.read;
      case "mentions":
        return notification.type === "mention";
      case "likes":
        return notification.type === "like";
      default:
        return true;
    }
  });

  const NotificationCard = ({
    notification,
  }: {
    notification: NotificationInterface;
  }) => (
    <div
      className={`p-6 border-b border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-200 ${
        !notification.read
          ? "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500"
          : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={notification.user.avatar || "/placeholder.svg"}
            alt={notification.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-stone-900 rounded-full p-1">
            {getNotificationIcon(notification.type)}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {notification.user.name}
              </span>
              {notification.user.verified && (
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
                {notification.timestamp}
              </span>
              {!notification.read && (
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
            {notification.content}
          </p>

          {notification.post && (
            <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-3 mb-3">
              <p className="text-stone-600 dark:text-stone-400 text-sm">
                {notification.post.preview}
              </p>
            </div>
          )}

          {notification.actionable && notification.type === "follow" && (
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
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
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
