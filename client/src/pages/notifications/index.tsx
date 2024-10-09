import React, { useState } from "react";

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
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    type: "comment",
    message: 'Jessica commented: "Great post!"',
    timestamp: "10 minutes ago",
    isRead: false,
    user: "Jessica",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    type: "follow",
    message: "Michael started following you.",
    timestamp: "1 hour ago",
    isRead: true,
    user: "Michael",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    type: "mention",
    message: "Sarah mentioned you in a post.",
    timestamp: "Yesterday",
    isRead: false,
    user: "Sarah",
    avatar: "https://via.placeholder.com/150",
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
    switch (type) {
      case "like":
        return <i className="bx bx-heart text-red-500 text-2xl"></i>;
      case "comment":
        return <i className="bx bx-comment text-primary text-2xl"></i>;
      case "follow":
        return <i className="bx bx-user-plus text-green-500 text-2xl"></i>;
      case "mention":
        return <i className="bx bx-at text-yellow-500 text-2xl"></i>;
      case "system":
        return <i className="bx bx-cog text-gray-500 text-2xl"></i>;
      default:
        return null;
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
      <>
        {todayNotifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 opacity-85">Today</h2>
            {todayNotifications.map((notification) =>
              renderNotification(notification)
            )}
          </section>
        )}
        {yesterdayNotifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 opacity-85">Yesterday</h2>
            {yesterdayNotifications.map((notification) =>
              renderNotification(notification)
            )}
          </section>
        )}
        {earlierNotifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 opacity-85">Earlier</h2>
            {earlierNotifications.map((notification) =>
              renderNotification(notification)
            )}
          </section>
        )}
      </>
    );
  };

  const renderNotification = (notification: Notification) => (
    <div
      key={notification.id}
      className={`p-4 rounded-lg shadow-md flex items-center justify-between transition duration-200 mb-4 ${
        notification.isRead
          ? "bg-white/20"
          : "bg-primary/20 border-l-4 border-primary"
      }`}
    >
      <div className="flex items-center">
        {notification.avatar ? (
          <img
            src={notification.avatar}
            alt="User avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
            {renderNotificationIcon(notification.type)}
          </div>
        )}

        <div>
          <p className="text-lg">
            <span className="font-semibold">
              {notification.user ? `${notification.user} ` : ""}
            </span>
            {notification.message}
          </p>
          <p className="text-sm opacity-60">{notification.timestamp}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!notification.isRead && (
          <button
            onClick={() => markAsRead(notification.id)}
            className="text-primary hover:underline text-sm"
          >
            Mark as Read
          </button>
        )}
        <button
          onClick={() => deleteNotification(notification.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <i className="bx bx-bell text-4xl text-primary"></i>
      </header>

      <div className="flex justify-between mb-6">
        <button
          onClick={markAllAsRead}
          className="text-primary hover:underline text-sm"
        >
          Mark All as Read
        </button>
        <button className="text-primary hover:underline text-sm">
          Notification Settings
        </button>
      </div>

      {renderGroupedNotifications()}

      <footer className="text-center mt-8">
        <button className="text-primary hover:underline">
          View All Notifications
        </button>
      </footer>
    </div>
  );
};

export default NotificationPage;
