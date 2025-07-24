import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Better Communities: Our Vision for Social Connection",
    excerpt:
      "Discover how we're reimagining social media to foster genuine connections and meaningful conversations in digital spaces.",
    content: "Full article content would go here...",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Head of Community",
    },
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    category: "Community",
    tags: ["community", "social", "connection"],
    featured: true,
    image: "/placeholder.svg?height=400&width=600&text=Community",
  },
  {
    id: "2",
    title: "Privacy First: How We Protect Your Data",
    excerpt:
      "Learn about our comprehensive approach to data privacy and the measures we take to keep your information secure.",
    content: "Full article content would go here...",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
      role: "Security Engineer",
    },
    publishedAt: "2024-01-12",
    readTime: "7 min read",
    category: "Privacy",
    tags: ["privacy", "security", "data"],
    featured: true,
    image: "/placeholder.svg?height=400&width=600&text=Privacy",
  },
  {
    id: "3",
    title: "New Features: Enhanced Profile Customization",
    excerpt:
      "Explore the latest updates to profile customization, including new themes, layouts, and personalization options.",
    content: "Full article content would go here...",
    author: {
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=MP",
      role: "Product Designer",
    },
    publishedAt: "2024-01-10",
    readTime: "4 min read",
    category: "Product",
    tags: ["features", "profiles", "customization"],
    featured: false,
    image: "/placeholder.svg?height=300&width=400&text=Features",
  },
  {
    id: "4",
    title: "The Future of Digital Wellness",
    excerpt:
      "Our commitment to promoting healthy digital habits and creating tools that support user well-being.",
    content: "Full article content would go here...",
    author: {
      name: "Dr. James Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=JW",
      role: "Wellness Researcher",
    },
    publishedAt: "2024-01-08",
    readTime: "6 min read",
    category: "Wellness",
    tags: ["wellness", "mental-health", "digital"],
    featured: false,
    image: "/placeholder.svg?height=300&width=400&text=Wellness",
  },
  {
    id: "5",
    title: "Behind the Scenes: Our Development Process",
    excerpt:
      "Take a look at how our engineering team builds and maintains the platform you love.",
    content: "Full article content would go here...",
    author: {
      name: "Emily Zhang",
      avatar: "/placeholder.svg?height=40&width=40&text=EZ",
      role: "Lead Developer",
    },
    publishedAt: "2024-01-05",
    readTime: "8 min read",
    category: "Engineering",
    tags: ["development", "engineering", "process"],
    featured: false,
    image: "/placeholder.svg?height=300&width=400&text=Development",
  },
  {
    id: "6",
    title: "Community Spotlight: Amazing Creators",
    excerpt:
      "Celebrating the incredible creators who make our platform a vibrant and inspiring place.",
    content: "Full article content would go here...",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      role: "Community Manager",
    },
    publishedAt: "2024-01-03",
    readTime: "5 min read",
    category: "Community",
    tags: ["creators", "spotlight", "community"],
    featured: false,
    image: "/placeholder.svg?height=300&width=400&text=Creators",
  },
];

const categories = [
  "All",
  "Community",
  "Privacy",
  "Product",
  "Wellness",
  "Engineering",
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Insights, updates, and stories from our team about building better
              social experiences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar || "/placeholder.svg"}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {post.author.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {post.author.role}
                            </p>
                          </div>
                        </div>
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Latest Articles
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar || "/placeholder.svg"}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.author.name}
                          </span>
                        </div>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest articles, product updates, and insights delivered
            straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
