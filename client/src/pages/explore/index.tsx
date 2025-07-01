import { useState } from "react";
import {
  Compass,
  ImageIcon,
  Users,
  Calendar,
  Star,
  TrendingUp,
} from "lucide-react";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tabs = [
    { id: "discover", label: "Discover", icon: Compass },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "people", label: "People", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
  ];

  const categories = [
    "all",
    "technology",
    "design",
    "business",
    "lifestyle",
    "sports",
    "entertainment",
  ];

  interface FeatureContent {
    id: string;
    type: string;
    title: string;
    description: string;
    image: string;
    author?: string;
    engagement?: string;
    category: string;
    location?: string;
    date?: string;
  }

  const featuredContent: FeatureContent[] = [
    {
      id: "1",
      type: "post",
      title: "The Future of Web Development",
      description:
        "Exploring the latest trends and technologies shaping the web",
      image: "/placeholder.svg?height=300&width=500",
      author: "Tech Weekly",
      engagement: "12K views",
      category: "technology",
    },
    {
      id: "2",
      type: "event",
      title: "Design Conference 2024",
      description: "Join leading designers from around the world",
      image: "/placeholder.svg?height=300&width=500",
      date: "March 15, 2024",
      location: "San Francisco",
      category: "design",
    },
  ];

  interface DiscoveryGrid {
    id: string;
    type: string;
    name: string;
    username?: string;
    avatar?: string;
    bio?: string;
    followers?: string;
    verified?: boolean;
    description?: string;
    members?: string;
    image?: string;
    category?: string;
  }

  const discoverGrid: DiscoveryGrid[] = [
    {
      id: "1",
      type: "user",
      name: "Sarah Johnson",
      username: "sarahj_dev",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Full-stack developer & tech educator",
      followers: "25K",
      verified: true,
    },
    {
      id: "2",
      type: "group",
      name: "React Developers",
      description: "Community for React enthusiasts",
      members: "45K",
      image: "/placeholder.svg?height=80&width=80",
      category: "technology",
    },
  ];

  const FeaturedCard = ({ item }: { item: FeatureContent }) => (
    <div className="relative bg-white dark:bg-stone-800 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
            Featured
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-white/90 text-sm">{item.description}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.type === "event" ? (
              <>
                <Calendar className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                <span className="text-stone-600 dark:text-stone-400 text-sm">
                  {item.date}
                </span>
              </>
            ) : (
              <>
                <span className="text-stone-600 dark:text-stone-400 text-sm">
                  {item.author}
                </span>
                <span className="text-stone-500 dark:text-stone-400">·</span>
                <span className="text-stone-500 dark:text-stone-400 text-sm">
                  {item.engagement}
                </span>
              </>
            )}
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 opacity-0 group-hover:opacity-100">
            {item.type === "event" ? "Join" : "View"}
          </button>
        </div>
      </div>
    </div>
  );

  const DiscoverCard = ({ item }: { item: DiscoveryGrid }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200 group cursor-pointer">
      {item.type === "user" ? (
        <div className="text-center">
          <img
            src={item.avatar || "/placeholder.svg"}
            alt={item.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          />
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100">
              {item.name}
            </h3>
            {item.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{item.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm mb-4">
            {item.bio}
          </p>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">
            {item.followers} followers
          </p>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
            Follow
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                {item.name}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
                {item.description}
              </p>
              <p className="text-stone-500 dark:text-stone-400 text-sm">
                {item.members} members
              </p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
            Join Group
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Explore
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Discover new content, people, and communities
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
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-200 capitalize ${
                  selectedCategory === category
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                    : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredContent.map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Discover Grid */}
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            Discover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {discoverGrid.map((item) => (
              <DiscoverCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 font-medium">
            Load More Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
