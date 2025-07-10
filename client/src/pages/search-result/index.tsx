import { useState } from "react";
import { Search, Users, Hash, ImageIcon, Verified } from "lucide-react";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  verified: boolean;
  isFollowing: boolean;
}

interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  timestamp: string;
  likes: number;
  reposts: number;
  comments: number;
}

const SearchResults = () => {
  const [query] = useState("web development");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const filters = [
    { id: "all", label: "All", icon: Search },
    { id: "users", label: "People", icon: Users },
    { id: "posts", label: "Posts", icon: Hash },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "groups", label: "Groups", icon: Users },
  ];

  const mockUsers: User[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahj_dev",
      avatar: "/placeholder.svg?height=48&width=48",
      bio: "Full-stack developer passionate about React and Node.js. Building the future of web development.",
      followers: 12500,
      verified: true,
      isFollowing: false,
    },
    {
      id: "2",
      name: "Mike Chen",
      username: "mikechen_code",
      avatar: "/placeholder.svg?height=48&width=48",
      bio: "Frontend engineer at TechCorp. Love creating beautiful user experiences.",
      followers: 8900,
      verified: false,
      isFollowing: true,
    },
  ];

  const mockPosts: Post[] = [
    {
      id: "1",
      author: mockUsers[0],
      content:
        "Just finished building a new React component library! The developer experience is amazing. Check out the documentation and let me know what you think! #webdevelopment #react",
      images: ["/placeholder.svg?height=200&width=400"],
      timestamp: "2h",
      likes: 234,
      reposts: 45,
      comments: 67,
    },
  ];

  const UserCard = ({ user }: { user: User }) => (
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
              <Verified className="w-5 h-5 text-blue-500 fill-current" />
            )}
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{user.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {user.bio}
          </p>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">
            {user.followers.toLocaleString()} followers
          </p>
          <button
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
              user.isFollowing
                ? "bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            {user.isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );

  const PostCard = ({ post }: { post: Post }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-3 mb-4">
        <img
          src={post.author.avatar || "/placeholder.svg"}
          alt={post.author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {post.author.name}
            </span>
            {post.author.verified && (
              <Verified className="w-4 h-4 text-blue-500 fill-current" />
            )}
            <span className="text-stone-500 dark:text-stone-400">
              @{post.author.username}
            </span>
            <span className="text-stone-500 dark:text-stone-400">·</span>
            <span className="text-stone-500 dark:text-stone-400">
              {post.timestamp}
            </span>
          </div>
        </div>
      </div>
      <p className="text-stone-900 dark:text-stone-100 leading-relaxed mb-4">
        {post.content}
      </p>
      {post.images && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={post.images[0] || "/placeholder.svg"}
            alt=""
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-6 text-stone-500 dark:text-stone-400">
        <span>{post.likes} likes</span>
        <span>{post.reposts} reposts</span>
        <span>{post.comments} comments</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Search results for "{query}"
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Found 1,234 results in 0.12 seconds
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeFilter === filter.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
                }`}
              >
                <filter.icon className="w-4 h-4" />
                <span className="font-medium">{filter.label}</span>
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="relevance">Most Relevant</option>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {activeFilter === "all" || activeFilter === "users" ? (
              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                  People
                </h2>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            ) : null}

            {activeFilter === "all" || activeFilter === "posts" ? (
              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                  Posts
                </h2>
                <div className="space-y-4">
                  {mockPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Hashtags */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
                Related hashtags
              </h3>
              <div className="space-y-3">
                {[
                  "#webdevelopment",
                  "#javascript",
                  "#react",
                  "#frontend",
                  "#coding",
                ].map((hashtag) => (
                  <button
                    key={hashtag}
                    className="block w-full text-left p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {hashtag}
                    </span>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">
                      {Math.floor(Math.random() * 100)}K posts
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested People */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
                People you might know
              </h3>
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 dark:text-stone-100 truncate">
                        {user.name}
                      </p>
                      <p className="text-stone-500 dark:text-stone-400 text-sm truncate">
                        @{user.username}
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
