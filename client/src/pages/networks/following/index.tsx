import { useState } from "react";
import {
  UserCheck,
  Search,
  UserMinus,
  MessageCircle,
  MoreHorizontal,
  Filter,
} from "lucide-react";

interface Following {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  followingSince: string;
  verified?: boolean;
  category?: string;
  isActive?: boolean;
}

const FollowingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");

  const [followingList, setFollowingList] = useState<Following[]>([
    {
      id: "1",
      name: "TechCorp",
      username: "techcorp_official",
      avatar:
        "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Leading technology company building the future of digital innovation",
      followers: 2400000,
      following: 150,
      followingSince: "2 years ago",
      verified: true,
      category: "Technology",
      isActive: true,
    },
    {
      id: "2",
      name: "Sarah Davis",
      username: "sarahd_ux",
      avatar:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "UX/UI Designer sharing insights about user-centered design and creativity",
      followers: 45000,
      following: 890,
      followingSince: "8 months ago",
      verified: true,
      category: "Design",
      isActive: false,
    },
    {
      id: "3",
      name: "Dev Weekly",
      username: "devweekly",
      avatar:
        "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Weekly newsletter featuring the latest in web development and programming",
      followers: 125000,
      following: 25,
      followingSince: "1 year ago",
      category: "Technology",
      isActive: true,
    },
    {
      id: "4",
      name: "Creative Studio",
      username: "creativestudio_co",
      avatar:
        "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Award-winning creative agency specializing in brand identity and digital design",
      followers: 78000,
      following: 1200,
      followingSince: "6 months ago",
      verified: true,
      category: "Design",
      isActive: false,
    },
    {
      id: "5",
      name: "Alex Chen",
      username: "alexchen_dev",
      avatar:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Full-stack developer and tech educator sharing coding tips and tutorials",
      followers: 32000,
      following: 456,
      followingSince: "3 months ago",
      category: "Technology",
      isActive: true,
    },
    {
      id: "6",
      name: "Design Inspiration",
      username: "design_inspire",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Curating the best design work from around the world for creative inspiration",
      followers: 156000,
      following: 50,
      followingSince: "1 month ago",
      category: "Design",
      isActive: true,
    },
  ]);

  const unfollowUser = (id: string) => {
    setFollowingList(followingList.filter((user) => user.id !== id));
  };

  const filteredFollowing = followingList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (filterBy === "verified") {
      matchesFilter = !!user.verified;
    } else if (filterBy === "technology") {
      matchesFilter = user.category === "Technology";
    } else if (filterBy === "design") {
      matchesFilter = user.category === "Design";
    } else if (filterBy === "active") {
      matchesFilter = !!user.isActive;
    }

    return matchesSearch && matchesFilter;
  });

  const FollowingCard = ({ user }: { user: Following }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {user.isActive && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-stone-800" />
          )}
        </div>

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
            {user.category && (
              <span className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 text-xs rounded-full">
                {user.category}
              </span>
            )}
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{user.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {user.bio}
          </p>

          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-3">
            <span>{user.followers.toLocaleString()} followers</span>
            <span>{user.following.toLocaleString()} following</span>
          </div>

          <p className="text-stone-500 dark:text-stone-400 text-xs mb-4">
            Following since {user.followingSince}
          </p>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200">
              <UserCheck className="w-4 h-4" />
              Following
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
            <div className="relative">
              <button className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200 group">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={() => unfollowUser(user.id)}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  <UserMinus className="w-4 h-4" />
                  Unfollow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const categories = ["all", "verified", "technology", "design", "active"];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Following
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Accounts you follow and their content
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search following..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="technology">Technology</option>
                <option value="design">Design</option>
                <option value="active">Recently Active</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Recently Followed</option>
                <option value="name">Name (A-Z)</option>
                <option value="followers">Most Followers</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterBy(category)}
                className={`px-4 py-2 rounded-full transition-all duration-200 capitalize ${
                  filterBy === category
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {followingList.length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Following
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
                    {followingList.filter((u) => u.isActive).length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Recently Active
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {followingList.filter((u) => u.verified).length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Verified
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Filter className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {
                      new Set(
                        followingList.map((u) => u.category).filter(Boolean)
                      ).size
                    }
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Following Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFollowing.length > 0 ? (
            filteredFollowing.map((user) => (
              <FollowingCard key={user.id} user={user} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-stone-400 dark:text-stone-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No accounts found
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "Start following people to see them here!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingPage;
