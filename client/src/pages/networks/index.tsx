import { useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  Search,
  MoreHorizontal,
  MessageCircle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  isFollower: boolean;
  verified?: boolean;
  mutualFriends?: number;
}

interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  category: string;
  isJoined: boolean;
  privacy: "public" | "private";
  recentActivity: string;
}

const Network = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const tabs = [
    { id: "friends", label: "Friends", count: 234 },
    { id: "followers", label: "Followers", count: 1205 },
    { id: "following", label: "Following", count: 456 },
    { id: "groups", label: "Groups", count: 12 },
  ];

  const mockUsers: User[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahj_dev",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Full-stack developer passionate about React and Node.js",
      followers: 12500,
      following: 890,
      isFollowing: true,
      isFollower: true,
      verified: true,
      mutualFriends: 23,
    },
    {
      id: "2",
      name: "Mike Chen",
      username: "mikechen",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "UI/UX Designer creating beautiful digital experiences",
      followers: 8900,
      following: 1200,
      isFollowing: true,
      isFollower: false,
      mutualFriends: 15,
    },
  ];

  const mockGroups: Group[] = [
    {
      id: "1",
      name: "React Developers",
      description:
        "A community for React enthusiasts to share knowledge and best practices",
      image: "/placeholder.svg?height=64&width=64",
      members: 45000,
      category: "Technology",
      isJoined: true,
      privacy: "public",
      recentActivity: "2 hours ago",
    },
    {
      id: "2",
      name: "Design Systems",
      description:
        "Discussing design systems, component libraries, and design tokens",
      image: "/placeholder.svg?height=64&width=64",
      members: 12000,
      category: "Design",
      isJoined: false,
      privacy: "public",
      recentActivity: "5 hours ago",
    },
  ];

  const UserCard = ({
    user,
    showMutual = false,
  }: {
    user: User;
    showMutual?: boolean;
  }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate">
              {user.name}
            </h3>
            {user.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{user.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {user.bio}
          </p>

          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-4">
            <span>{user.followers.toLocaleString()} followers</span>
            <span>{user.following.toLocaleString()} following</span>
            {showMutual && user.mutualFriends && (
              <span>{user.mutualFriends} mutual friends</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "friends" ? (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </>
            ) : activeTab === "following" ? (
              <button className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200">
                <UserCheck className="w-4 h-4" />
                Following
              </button>
            ) : (
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <UserPlus className="w-4 h-4" />
                Follow Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const GroupCard = ({ group }: { group: Group }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        <img
          src={group.image || "/placeholder.svg"}
          alt={group.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100">
              {group.name}
            </h3>
            <span className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 text-xs rounded-full">
              {group.privacy}
            </span>
          </div>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
            {group.category}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {group.description}
          </p>

          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-4">
            <span>{group.members.toLocaleString()} members</span>
            <span>Active {group.recentActivity}</span>
          </div>

          <div className="flex items-center gap-2">
            {group.isJoined ? (
              <>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                  Joined
                </button>
                <button className="px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200">
                  View Group
                </button>
              </>
            ) : (
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Join Group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const currentTabData = activeTab === "groups" ? mockGroups : mockUsers;
  const filteredData = currentTabData.filter((item) =>
    "name" in item
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Networks
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Manage your connections and communities
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
                }`}
              >
                <span className="font-medium">{tab.label}</span>
                <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name (A-Z)</option>
              <option value="followers">Most Followers</option>
              {activeTab === "groups" && (
                <option value="members">Most Members</option>
              )}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 capitalize">
                {activeTab} ({filteredData.length})
              </h2>
              {activeTab !== "groups" && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <UserPlus className="w-4 h-4" />
                  Find People
                </button>
              )}
            </div>

            <div className="space-y-6">
              {filteredData.length > 0 ? (
                filteredData.map((item) =>
                  activeTab === "groups" ? (
                    <GroupCard key={item.id} group={item as Group} />
                  ) : (
                    <UserCard
                      key={item.id}
                      user={item as User}
                      showMutual={activeTab === "followers"}
                    />
                  )
                )
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-stone-400 dark:text-stone-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    No {activeTab} found
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">
                    {searchQuery
                      ? "Try adjusting your search terms."
                      : `You don't have any ${activeTab} yet.`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
                Your Network
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Friends
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    234
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Followers
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    1,205
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Following
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    456
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Groups
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    12
                  </span>
                </div>
              </div>
            </div>

            {/* Suggested Connections */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
                Suggested for you
              </h3>
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 dark:text-stone-100 truncate">
                        {user.name}
                      </p>
                      <p className="text-stone-500 dark:text-stone-400 text-sm truncate">
                        {user.mutualFriends} mutual friends
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                See all suggestions
              </button>
            </div>

            {/* Trending Groups */}
            {activeTab !== "groups" && (
              <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
                  Trending Groups
                </h3>
                <div className="space-y-4">
                  {mockGroups.slice(0, 3).map((group) => (
                    <div key={group.id} className="flex items-center gap-3">
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-900 dark:text-stone-100 truncate">
                          {group.name}
                        </p>
                        <p className="text-stone-500 dark:text-stone-400 text-sm truncate">
                          {group.members.toLocaleString()} members
                        </p>
                      </div>
                      <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-200">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  Explore all groups
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
