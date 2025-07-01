"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Bell,
  MessageCircle,
  PlusCircle,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Bookmark,
  Moon,
  Sun,
  ChevronDown,
  Hash,
} from "lucide-react";
import type { RootState } from "../../features/store";
import { toggleSideBar, toggleTheme } from "../../features/slices/settings";
import { capitalizeText } from "../../utils";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

interface SearchSuggestion {
  id: string;
  type: "user" | "hashtag" | "trending";
  content: string;
  subtitle?: string;
  avatar?: string;
}

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkTheme, isSideBarOpen } = useSelector(
    (state: RootState) => state.settings
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);

  // Mock data
  const currentUser = {
    name: "John Doe",
    username: "johndoe",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  };

  const notifications: Notification[] = [
    {
      id: "1",
      type: "like",
      user: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "liked your post",
      timestamp: "2m",
      read: false,
    },
    {
      id: "2",
      type: "follow",
      user: {
        name: "Mike Chen",
        username: "mikechen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "started following you",
      timestamp: "1h",
      read: false,
    },
    {
      id: "3",
      type: "comment",
      user: {
        name: "Emma Wilson",
        username: "emmaw",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "commented on your post",
      timestamp: "3h",
      read: true,
    },
  ];

  const searchSuggestions: SearchSuggestion[] = [
    {
      id: "1",
      type: "trending",
      content: "#TechNews",
      subtitle: "Trending in Technology",
    },
    {
      id: "2",
      type: "user",
      content: "Sarah Johnson",
      subtitle: "@sarahj_dev",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      type: "hashtag",
      content: "#WebDevelopment",
      subtitle: "125K posts",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        createRef.current &&
        !createRef.current.contains(event.target as Node)
      ) {
        setShowCreateMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return "❤️";
      case "comment":
        return "💬";
      case "follow":
        return "👤";
      case "mention":
        return "@";
      default:
        return "🔔";
    }
  };

  return (
    <header className="sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md py-3 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 shadow-lg z-20">
      {/* Left Section - Logo & Navigation */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/favicon-32x32.png"
              alt="Toucan"
              className="w-8 h-8 rounded-xl object-cover shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white dark:border-stone-900"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-xl text-stone-900 dark:text-stone-100">
              Toucan
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 -mt-1">
              Social Network
            </p>
          </div>
        </div>

        {/* Quick Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          <button
            onClick={() => navigate("/feed")}
            className="px-4 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/explore")}
            className="px-4 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 font-medium"
          >
            Explore
          </button>
          <button
            onClick={() => navigate("/trending")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 font-medium"
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
        </nav>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
          <input
            type="text"
            placeholder="Search Toucan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full pl-12 pr-4 py-3 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 rounded-2xl border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-stone-700 transition-all duration-200 outline-none"
          />
        </div>

        {/* Search Suggestions Dropdown */}
        {isSearchFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50">
            <div className="p-3 border-b border-stone-200 dark:border-stone-700">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Recent searches
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {searchSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="w-full flex items-center gap-3 p-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
                  onClick={() => {
                    setSearchQuery(suggestion.content);
                    setIsSearchFocused(false);
                  }}
                >
                  {suggestion.type === "user" ? (
                    <img
                      src={suggestion.avatar || "/placeholder.svg"}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : suggestion.type === "hashtag" ? (
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Hash className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <p className="font-medium text-stone-900 dark:text-stone-100">
                      {suggestion.content}
                    </p>
                    {suggestion.subtitle && (
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {suggestion.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* Create Post Button */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            Create
          </button>

          {/* Create Menu Dropdown */}
          {showCreateMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-stone-800 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50">
              <button
                onClick={() => navigate("/create/post")}
                className="w-full flex items-center gap-3 p-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <PlusCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  New Post
                </span>
              </button>
              <button
                onClick={() => navigate("/create/story")}
                className="w-full flex items-center gap-3 p-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">
                    S
                  </span>
                </div>
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  Story
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Messages */}
        <button
          onClick={() => navigate("/chats")}
          className="p-3 rounded-xl text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Messages"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 rounded-xl text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-stone-800 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50">
              <div className="p-4 border-b border-stone-200 dark:border-stone-700">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  Notifications
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-4 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200 ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <img
                      src={notification.user.avatar || "/placeholder.svg"}
                      alt={notification.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-900 dark:text-stone-100">
                        <span className="font-semibold">
                          {notification.user.name}
                        </span>{" "}
                        {notification.content}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                    <span className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-stone-200 dark:border-stone-700">
                <button className="w-full text-center text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
          >
            <img
              src={currentUser.avatar || "/placeholder.svg"}
              alt={user?.first_name}
              className="w-8 h-8 rounded-full object-cover border-2 border-stone-200 dark:border-stone-700"
            />
            <ChevronDown className="w-4 h-4 text-stone-500 dark:text-stone-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-stone-800 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50">
              <div className="p-4 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">
                      {capitalizeText(user?.first_name) +
                        " " +
                        capitalizeText(user?.last_name)}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      @{user?.username}
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={() => navigate(`/u/${user?.id}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
                >
                  <User className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                  <span className="text-stone-900 dark:text-stone-100">
                    Profile
                  </span>
                </button>
                <button
                  onClick={() => navigate("/bookmarks")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
                >
                  <Bookmark className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                  <span className="text-stone-900 dark:text-stone-100">
                    Bookmarks
                  </span>
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
                >
                  <Settings className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                  <span className="text-stone-900 dark:text-stone-100">
                    Settings
                  </span>
                </button>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
                >
                  {isDarkTheme ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-500" />
                  )}
                  <span className="text-stone-900 dark:text-stone-100">
                    {isDarkTheme ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
              </div>

              <div className="border-t border-stone-200 dark:border-stone-700 py-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-red-600 dark:text-red-400">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden p-3 rounded-xl text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
          onClick={() => dispatch(toggleSideBar())}
          aria-label={isSideBarOpen ? "Close menu" : "Open menu"}
        >
          {isSideBarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navigation;
