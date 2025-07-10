import { useEffect, useState } from "react";
import { Users, UserPlus, Search } from "lucide-react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getFollowing,
  getFriends,
} from "../../features/thunks/connections";
import { QuickStatsLoader } from "../../components/networks/loaders";
import { getUserMetrics } from "../../features/thunks/user";
import { useLocation, useNavigate } from "react-router-dom";
import Content from "../../components/networks/content";

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

const Network = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const { friends, followers, following } = useSelector(
    (state: RootState) => state.users
  );
  const { metrics } = useSelector((state: RootState) => state.users);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserMetrics(user?.id as number));
  }, [dispatch, user]);

  useEffect(() => {
    if (category == "friends") {
      dispatch(getFriends({ id: user?.id as number, page: 1, per: 20 }));
    } else if (category == "groups") {
    } else if (category == "followers") {
      dispatch(getFollowers());
    } else if (category == "following") {
      dispatch(getFollowing());
    } else {
      navigate("/network?category=friends");
    }
  }, [dispatch, category]);

  const tabs = [
    { id: "friends", label: "Friends", count: metrics.data.friends_count },
    {
      id: "followers",
      label: "Followers",
      count: metrics.data.followers_count,
    },
    {
      id: "following",
      label: "Following",
      count: metrics.data.following_count,
    },
    { id: "groups", label: "Groups", count: 0 },
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

  const mockGroups: any[] = [
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

  const currentTabData = category === "groups" ? mockGroups : mockUsers;
  const filteredData = currentTabData.filter((item) =>
    "name" in item
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  return (
    <div className="min-h-screen dark:bg-stone-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-purple-500 rounded-xl flex items-center justify-center">
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
                onClick={() => navigate(`/network?category=${tab.id}`)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  category === tab.id
                    ? "bg-purple-500 text-white shadow-lg"
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
                placeholder={`Search ${category}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name (A-Z)</option>
              <option value="followers">Most Followers</option>
              {category === "groups" && (
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
                {category} ({filteredData.length})
              </h2>
              {category !== "groups" && (
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200">
                  <UserPlus className="w-4 h-4" />
                  Find People
                </button>
              )}
            </div>

            {category == "friends" && (
              <Content
                loading={friends.state === "pending"}
                data={friends.data}
                searchQuery={searchQuery}
                category={category}
                error={friends.error}
              />
            )}
            {category == "followers" && (
              <Content
                loading={followers.state === "pending"}
                data={followers.data}
                searchQuery={searchQuery}
                category={category}
                error={followers.error}
              />
            )}
            {category == "following" && (
              <Content
                loading={following.state === "pending"}
                data={following.data}
                searchQuery={searchQuery}
                category={category}
                error={following.error}
              />
            )}
            {category == "groups" && (
              <Content
                loading={false}
                data={mockGroups}
                searchQuery={searchQuery}
                category={category}
                error={""}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
                Your Network
              </h3>
              {metrics.state == "pending" ? (
                <QuickStatsLoader />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 dark:text-stone-400">
                      Friends
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {metrics.data.friends_count}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 dark:text-stone-400">
                      Followers
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {metrics.data.followers_count}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 dark:text-stone-400">
                      Following
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {metrics.data.following_count}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 dark:text-stone-400">
                      Groups
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      0
                    </span>
                  </div>
                </div>
              )}
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
                    <button className="px-3 py-1 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors duration-200">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-purple-600 dark:text-purple-400 font-medium hover:underline">
                See all suggestions
              </button>
            </div>

            {/* Trending Groups */}
            {category !== "groups" && (
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
                <button className="w-full mt-4 text-purple-600 dark:text-purple-400 font-medium hover:underline">
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
