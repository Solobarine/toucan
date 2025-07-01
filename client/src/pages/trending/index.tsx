"use client";

import { useState } from "react";
import {
  TrendingUp,
  Hash,
  MapPin,
  Calendar,
  Users,
  Eye,
  MessageCircle,
  Heart,
  Share,
} from "lucide-react";

interface TrendingTopic {
  id: string;
  hashtag: string;
  posts: number;
  category: string;
  growth: number;
  description?: string;
}

interface TrendingPost {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  engagement: {
    likes: number;
    reposts: number;
    comments: number;
    views: number;
  };
  timestamp: string;
  trending_reason: string;
}

const Trending = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");

  const categories = [
    { id: "all", label: "All", icon: TrendingUp },
    { id: "technology", label: "Technology", icon: Hash },
    { id: "sports", label: "Sports", icon: Users },
    { id: "entertainment", label: "Entertainment", icon: Eye },
    { id: "news", label: "News", icon: Calendar },
  ];

  const trendingTopics: TrendingTopic[] = [
    {
      id: "1",
      hashtag: "#WebDevelopment",
      posts: 125000,
      category: "Technology",
      growth: 45,
      description: "Latest trends in web development and frameworks",
    },
    {
      id: "2",
      hashtag: "#AI",
      posts: 89000,
      category: "Technology",
      growth: 78,
      description: "Artificial Intelligence breakthroughs and discussions",
    },
    {
      id: "3",
      hashtag: "#WorldCup",
      posts: 234000,
      category: "Sports",
      growth: 156,
      description: "FIFA World Cup updates and highlights",
    },
  ];

  const trendingPosts: TrendingPost[] = [
    {
      id: "1",
      content:
        "Just released a new open-source React component library! 🚀 It includes 50+ customizable components with TypeScript support. Check it out and let me know what you think! #webdevelopment #react #opensource",
      author: {
        name: "Sarah Johnson",
        username: "sarahj_dev",
        avatar: "/placeholder.svg?height=48&width=48",
        verified: true,
      },
      engagement: {
        likes: 1250,
        reposts: 340,
        comments: 89,
        views: 12500,
      },
      timestamp: "3h",
      trending_reason: "High engagement rate",
    },
  ];

  const TrendingTopicCard = ({ topic }: { topic: TrendingTopic }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Hash className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {topic.hashtag}
            </h3>
            <p className="text-stone-500 dark:text-stone-400">
              {topic.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-green-600 dark:text-green-400 font-medium">
            +{topic.growth}%
          </span>
        </div>
      </div>

      <p className="text-stone-700 dark:text-stone-300 mb-4">
        {topic.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-stone-500 dark:text-stone-400">
          {topic.posts.toLocaleString()} posts
        </span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 opacity-0 group-hover:opacity-100">
          Explore
        </button>
      </div>
    </div>
  );

  const TrendingPostCard = ({ post }: { post: TrendingPost }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
          <span className="text-red-600 dark:text-red-400 text-sm font-medium">
            🔥 Trending
          </span>
        </div>
        <span className="text-stone-500 dark:text-stone-400 text-sm">
          {post.trending_reason}
        </span>
      </div>

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
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
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

      <p className="text-stone-900 dark:text-stone-100 leading-relaxed mb-6">
        {post.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="text-sm">
              {post.engagement.views.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="text-sm">
              {post.engagement.likes.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.engagement.comments}</span>
          </div>
          <div className="flex items-center gap-2">
            <Share className="w-4 h-4" />
            <span className="text-sm">{post.engagement.reposts}</span>
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Trending
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Discover what's happening right now
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Last hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Topics */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              Trending Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {trendingTopics.map((topic) => (
                <TrendingTopicCard key={topic.id} topic={topic} />
              ))}
            </div>

            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              Trending Posts
            </h2>
            <div className="space-y-6">
              {trendingPosts.map((post) => (
                <TrendingPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Locations */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Trending by Location
              </h3>
              <div className="space-y-3">
                {["New York", "London", "Tokyo", "San Francisco", "Berlin"].map(
                  (location, index) => (
                    <div
                      key={location}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          {location}
                        </p>
                        <p className="text-stone-500 dark:text-stone-400 text-sm">
                          {Math.floor(Math.random() * 50) + 10}K posts
                        </p>
                      </div>
                      <span className="text-2xl">#{index + 1}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
                Today's Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Total Posts
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    2.4M
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Active Users
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    890K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Trending Topics
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    156
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
