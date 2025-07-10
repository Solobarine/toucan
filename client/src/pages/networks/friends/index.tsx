import { useState } from "react";
import { Users, Search, MessageCircle, MoreHorizontal } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isOnline: boolean;
  lastSeen: string;
  mutualFriends: number;
  friendsSince: string;
  verified?: boolean;
}

const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const mockFriends: Friend[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahj_dev",
      avatar:
        "https://images.pexels.com/photos/3681591/pexels-photo-3681591.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Full-stack developer passionate about React and Node.js",
      isOnline: true,
      lastSeen: "Active now",
      mutualFriends: 23,
      friendsSince: "Friends since March 2023",
      verified: true,
    },
    {
      id: "2",
      name: "Mike Chen",
      username: "mikechen",
      avatar:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "UI/UX Designer creating beautiful digital experiences",
      isOnline: false,
      lastSeen: "2 hours ago",
      mutualFriends: 15,
      friendsSince: "Friends since January 2024",
    },
    {
      id: "3",
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Content creator and digital marketing specialist",
      isOnline: true,
      lastSeen: "Active now",
      mutualFriends: 8,
      friendsSince: "Friends since December 2023",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      username: "alexr",
      avatar:
        "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Software engineer and open source contributor",
      isOnline: false,
      lastSeen: "1 day ago",
      mutualFriends: 31,
      friendsSince: "Friends since August 2022",
    },
  ];

  const filteredFriends = mockFriends.filter((friend) => {
    const matchesSearch =
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnlineFilter = !showOnlineOnly || friend.isOnline;
    return matchesSearch && matchesOnlineFilter;
  });

  const FriendCard = ({ friend }: { friend: Friend }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-stone-800 ${
              friend.isOnline ? "bg-green-500" : "bg-stone-400"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate">
              {friend.name}
            </h3>
            {friend.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{friend.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {friend.bio}
          </p>

          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-4">
            <span
              className={
                friend.isOnline ? "text-green-600 dark:text-green-400" : ""
              }
            >
              {friend.lastSeen}
            </span>
            <span>{friend.mutualFriends} mutual friends</span>
          </div>
          <p className="text-stone-500 dark:text-stone-400 text-xs mb-4">
            {friend.friendsSince}
          </p>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
            <button className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Friends
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Stay connected with your network
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors duration-200 ${
                  showOnlineOnly
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                }`}
              >
                <div className="w-2 h-2 bg-current rounded-full" />
                Online Only
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Recently Active</option>
                <option value="name">Name (A-Z)</option>
                <option value="oldest">Oldest Friends</option>
                <option value="newest">Newest Friends</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {mockFriends.length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Total Friends
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {mockFriends.filter((f) => f.isOnline).length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Online Now
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    12
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Recent Chats
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {Math.round(
                      mockFriends.reduce((sum, f) => sum + f.mutualFriends, 0) /
                        mockFriends.length
                    )}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Avg. Mutual
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-stone-400 dark:text-stone-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No friends found
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "Start connecting with people!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
