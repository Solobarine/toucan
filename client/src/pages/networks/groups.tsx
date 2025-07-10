import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Star,
  Globe,
  Lock,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  category: string;
  privacy: "public" | "private";
  isJoined: boolean;
  isAdmin?: boolean;
  recentActivity: string;
  tags: string[];
  growthRate?: number;
}

const GroupsPage = () => {
  const [activeTab, setActiveTab] = useState<"joined" | "discover">("joined");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [joinedGroups] = useState<Group[]>([
    {
      id: "1",
      name: "React Developers",
      description:
        "A thriving community for React enthusiasts to share knowledge, discuss best practices, and collaborate on projects.",
      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
      members: 45000,
      category: "Technology",
      privacy: "public",
      isJoined: true,
      isAdmin: true,
      recentActivity: "2 hours ago",
      tags: ["React", "JavaScript", "Frontend"],
      growthRate: 15,
    },
    {
      id: "2",
      name: "Design Systems Hub",
      description:
        "Exploring design systems, component libraries, and design tokens with fellow designers and developers.",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      members: 12000,
      category: "Design",
      privacy: "public",
      isJoined: true,
      recentActivity: "5 hours ago",
      tags: ["Design Systems", "UI/UX", "Components"],
      growthRate: 8,
    },
    {
      id: "3",
      name: "Startup Founders Network",
      description:
        "Private community for startup founders to share experiences, seek advice, and build valuable connections.",
      image:
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
      members: 3500,
      category: "Business",
      privacy: "private",
      isJoined: true,
      recentActivity: "1 day ago",
      tags: ["Startup", "Entrepreneurship", "Networking"],
      growthRate: 25,
    },
  ]);

  const [discoverGroups] = useState<Group[]>([
    {
      id: "4",
      name: "AI & Machine Learning",
      description:
        "Cutting-edge discussions about artificial intelligence, machine learning algorithms, and their real-world applications.",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      members: 67000,
      category: "Technology",
      privacy: "public",
      isJoined: false,
      recentActivity: "1 hour ago",
      tags: ["AI", "Machine Learning", "Data Science"],
      growthRate: 35,
    },
    {
      id: "5",
      name: "Digital Marketing Masters",
      description:
        "Advanced strategies and tactics for digital marketing, growth hacking, and brand building in the modern era.",
      image:
        "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
      members: 28000,
      category: "Marketing",
      privacy: "public",
      isJoined: false,
      recentActivity: "3 hours ago",
      tags: ["Digital Marketing", "Growth", "Branding"],
      growthRate: 18,
    },
    {
      id: "6",
      name: "Creative Photography",
      description:
        "A visual feast for photographers of all levels to showcase work, share techniques, and inspire creativity.",
      image:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400",
      members: 89000,
      category: "Photography",
      privacy: "public",
      isJoined: false,
      recentActivity: "30 minutes ago",
      tags: ["Photography", "Art", "Creative"],
      growthRate: 12,
    },
  ]);

  const categories = [
    "all",
    "technology",
    "design",
    "business",
    "marketing",
    "photography",
  ];

  const currentGroups = activeTab === "joined" ? joinedGroups : discoverGroups;
  const filteredGroups = currentGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" ||
      group.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const GroupCard = ({ group }: { group: Group }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-32 overflow-hidden">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {group.privacy === "private" ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
              <Lock className="w-3 h-3" />
              Private
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
              <Globe className="w-3 h-3" />
              Public
            </div>
          )}
          {group.growthRate && group.growthRate > 20 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg mb-1">{group.name}</h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Users className="w-4 h-4" />
            <span>{group.members.toLocaleString()} members</span>
            <span>•</span>
            <span>{group.category}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-4">
          {group.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {group.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 text-sm mb-4">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            Active {group.recentActivity}
          </span>
          {group.growthRate && (
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />+{group.growthRate}% this month
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {group.isJoined ? (
            <>
              <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                {group.isAdmin ? "Manage" : "View Group"}
              </button>
              {group.isAdmin && (
                <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg text-sm font-medium">
                  Admin
                </div>
              )}
            </>
          ) : (
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              Join Group
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Groups
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Join communities and discover new interests
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 mb-6">
            <button
              onClick={() => setActiveTab("joined")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "joined"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              }`}
            >
              <span className="font-medium">My Groups</span>
              <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                {joinedGroups.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("discover")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "discover"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              }`}
            >
              <span className="font-medium">Discover</span>
              <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                {discoverGroups.length}
              </span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200">
              <Plus className="w-4 h-4" />
              Create Group
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
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

          {/* Stats for Joined Groups */}
          {activeTab === "joined" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {joinedGroups.length}
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 text-sm">
                      Joined Groups
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {joinedGroups.filter((g) => g.isAdmin).length}
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 text-sm">
                      Admin Of
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {
                        joinedGroups.filter((g) => g.privacy === "private")
                          .length
                      }
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 text-sm">
                      Private
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
                        joinedGroups.reduce((sum, g) => sum + g.members, 0) /
                          1000
                      )}
                      K
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 text-sm">
                      Total Members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-stone-400 dark:text-stone-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No groups found
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : activeTab === "joined"
                  ? "Join some groups to get started!"
                  : "Discover groups that match your interests."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
