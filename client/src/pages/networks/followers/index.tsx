import { useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";

interface Follower {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isFollowingBack: boolean;
  followedSince: string;
  verified?: boolean;
  mutualFriends?: number;
}

const FollowersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");

  const [followers, setFollowers] = useState<Follower[]>([
    {
      id: "1",
      name: "Anna Rodriguez",
      username: "annar_design",
      avatar:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Creative director and brand strategist helping businesses tell their stories",
      followers: 15200,
      following: 890,
      isFollowingBack: false,
      followedSince: "2 weeks ago",
      verified: true,
      mutualFriends: 8,
    },
    {
      id: "2",
      name: "James Chen",
      username: "jameschen_code",
      avatar:
        "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Full-stack developer passionate about clean code and user experience",
      followers: 8900,
      following: 1200,
      isFollowingBack: true,
      followedSince: "1 month ago",
      mutualFriends: 15,
    },
    {
      id: "3",
      name: "Sophie Williams",
      username: "sophiew_art",
      avatar:
        "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Digital artist and illustrator creating vibrant worlds and characters",
      followers: 12000,
      following: 2100,
      isFollowingBack: false,
      followedSince: "3 days ago",
      mutualFriends: 3,
    },
    {
      id: "4",
      name: "Marcus Thompson",
      username: "marcust_photo",
      avatar:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Photographer capturing moments that matter, travel and lifestyle enthusiast",
      followers: 25000,
      following: 450,
      isFollowingBack: true,
      followedSince: "2 months ago",
      verified: true,
      mutualFriends: 12,
    },
    {
      id: "5",
      name: "Elena Martinez",
      username: "elenam_writer",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Content writer and storyteller helping brands connect with their audience",
      followers: 7800,
      following: 980,
      isFollowingBack: false,
      followedSince: "1 week ago",
      mutualFriends: 6,
    },
  ]);

  const followBack = (id: string) => {
    setFollowers(
      followers.map((follower) =>
        follower.id === id ? { ...follower, isFollowingBack: true } : follower
      )
    );
  };

  const filteredFollowers = followers.filter((follower) => {
    const matchesSearch =
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.username.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (filterBy === "not-following") {
      matchesFilter = !follower.isFollowingBack;
    } else if (filterBy === "mutual") {
      matchesFilter = follower.isFollowingBack;
    } else if (filterBy === "verified") {
      matchesFilter = !!follower.verified;
    }

    return matchesSearch && matchesFilter;
  });

  const FollowerCard = ({ follower }: { follower: Follower }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <img
          src={follower.avatar}
          alt={follower.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate">
              {follower.name}
            </h3>
            {follower.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{follower.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {follower.bio}
          </p>

          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-3">
            <span>{follower.followers.toLocaleString()} followers</span>
            <span>{follower.following.toLocaleString()} following</span>
            {follower.mutualFriends && (
              <span>{follower.mutualFriends} mutual friends</span>
            )}
          </div>

          <p className="text-stone-500 dark:text-stone-400 text-xs mb-4">
            Following you since {follower.followedSince}
          </p>

          <div className="flex items-center gap-2">
            {follower.isFollowingBack ? (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <div className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg text-sm font-medium">
                  Following
                </div>
              </>
            ) : (
              <button
                onClick={() => followBack(follower.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <UserPlus className="w-4 h-4" />
                Follow Back
              </button>
            )}
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
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Followers
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                People who follow your content
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search followers..."
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
                <option value="all">All Followers</option>
                <option value="not-following">Not Following Back</option>
                <option value="mutual">Mutual</option>
                <option value="verified">Verified</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name (A-Z)</option>
                <option value="followers">Most Followers</option>
                <option value="mutual">Most Mutual</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {followers.length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Total Followers
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {followers.filter((f) => f.isFollowingBack).length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Following Back
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {followers.filter((f) => f.verified).length}
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
                  <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {Math.round(
                      followers
                        .filter((f) => f.mutualFriends)
                        .reduce((sum, f) => sum + (f.mutualFriends || 0), 0) /
                        followers.filter((f) => f.mutualFriends).length
                    ) || 0}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Avg. Mutual
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Followers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFollowers.length > 0 ? (
            filteredFollowers.map((follower) => (
              <FollowerCard key={follower.id} follower={follower} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-stone-400 dark:text-stone-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No followers found
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "Start creating content to gain followers!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersPage;
