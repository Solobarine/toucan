import { useState } from "react";
import {
  Download,
  ExternalLink,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  FileText,
  ImageIcon,
  Video,
} from "lucide-react";
import BetaBanner from "../../components/banner/betabanner";

interface PressRelease {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: "product" | "company" | "partnership" | "funding";
  featured: boolean;
}

interface MediaAsset {
  id: string;
  name: string;
  type: "logo" | "screenshot" | "photo" | "video";
  format: string;
  size: string;
  url: string;
}

interface PressContact {
  name: string;
  title: string;
  email: string;
  phone?: string;
  region: string;
}

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const pressReleases: PressRelease[] = [
    {
      id: "1",
      title:
        "Toucan Announces $50M Series B Funding to Accelerate Global Expansion",
      date: "2024-01-15",
      excerpt:
        "Leading social media platform raises funding from top-tier investors to expand internationally and enhance AI-powered features.",
      category: "funding",
      featured: true,
    },
    {
      id: "2",
      title: "New Privacy-First Features Launch to Give Users More Control",
      date: "2024-01-10",
      excerpt:
        "Enhanced privacy settings and data transparency tools now available to all users worldwide.",
      category: "product",
      featured: true,
    },
    {
      id: "3",
      title: "Toucan Partners with Leading Mental Health Organizations",
      date: "2024-01-05",
      excerpt:
        "New partnership brings mental health resources and support directly to the platform.",
      category: "partnership",
      featured: false,
    },
    {
      id: "4",
      title: "Company Reaches 100 Million Active Users Milestone",
      date: "2023-12-20",
      excerpt:
        "Platform celebrates significant growth milestone with enhanced community features.",
      category: "company",
      featured: false,
    },
    {
      id: "5",
      title:
        "AI-Powered Content Moderation System Reduces Harmful Content by 85%",
      date: "2023-12-15",
      excerpt:
        "Advanced machine learning technology creates safer online environment for users.",
      category: "product",
      featured: false,
    },
  ];

  const mediaAssets: MediaAsset[] = [
    {
      id: "1",
      name: "Toucan Logo - Primary",
      type: "logo",
      format: "PNG, SVG",
      size: "Various",
      url: "/assets/logo-primary.zip",
    },
    {
      id: "2",
      name: "Toucan Logo - Dark Mode",
      type: "logo",
      format: "PNG, SVG",
      size: "Various",
      url: "/assets/logo-dark.zip",
    },
    {
      id: "3",
      name: "App Screenshots - Mobile",
      type: "screenshot",
      format: "PNG",
      size: "1080x1920",
      url: "/assets/screenshots-mobile.zip",
    },
    {
      id: "4",
      name: "App Screenshots - Desktop",
      type: "screenshot",
      format: "PNG",
      size: "1920x1080",
      url: "/assets/screenshots-desktop.zip",
    },
    {
      id: "5",
      name: "Executive Team Photos",
      type: "photo",
      format: "JPG",
      size: "High Resolution",
      url: "/assets/team-photos.zip",
    },
    {
      id: "6",
      name: "Product Demo Video",
      type: "video",
      format: "MP4",
      size: "1080p",
      url: "/assets/demo-video.mp4",
    },
  ];

  const pressContacts: PressContact[] = [
    {
      name: "Sarah Johnson",
      title: "Head of Communications",
      email: "press@toucan.com",
      phone: "+1 (555) 123-4567",
      region: "Global",
    },
    {
      name: "Michael Chen",
      title: "Regional PR Manager",
      email: "press-apac@toucan.com",
      region: "Asia Pacific",
    },
    {
      name: "Emma Rodriguez",
      title: "European Communications Lead",
      email: "press-eu@toucan.com",
      region: "Europe",
    },
  ];

  const categories = [
    { id: "all", label: "All News" },
    { id: "product", label: "Product Updates" },
    { id: "company", label: "Company News" },
    { id: "partnership", label: "Partnerships" },
    { id: "funding", label: "Funding" },
  ];

  const filteredReleases =
    selectedCategory === "all"
      ? pressReleases
      : pressReleases.filter(
          (release) => release.category === selectedCategory
        );

  const getCategoryColor = (category: string) => {
    const colors = {
      product:
        "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      company:
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      partnership:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      funding:
        "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
    );
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "logo":
        return Building;
      case "screenshot":
        return ImageIcon;
      case "photo":
        return User;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  const handleDownload = (url: string, name: string) => {
    console.log(`Downloading: ${name} from ${url}`);
    // In a real app, this would trigger the download
    alert(`Download started: ${name}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Press Center
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Latest news, press releases, and media resources from Toucan. Stay
            updated with our company announcements and product launches.
          </p>
        </div>
        <BetaBanner />

        {/* Featured News */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Featured News
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pressReleases
              .filter((release) => release.featured)
              .map((release) => (
                <div
                  key={release.id}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        release.category
                      )}`}
                    >
                      {release.category.charAt(0).toUpperCase() +
                        release.category.slice(1)}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(release.date).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {release.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {release.excerpt}
                  </p>
                  <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1">
                    Read More
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* All Press Releases */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4 sm:mb-0">
              All Press Releases
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReleases.map((release) => (
              <div
                key={release.id}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          release.category
                        )}`}
                      >
                        {release.category.charAt(0).toUpperCase() +
                          release.category.slice(1)}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(release.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      {release.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {release.excerpt}
                    </p>
                  </div>
                  <button className="mt-4 sm:mt-0 sm:ml-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1">
                    Read More
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Assets */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Media Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaAssets.map((asset) => {
              const IconComponent = getAssetIcon(asset.type);
              return (
                <div
                  key={asset.id}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                      <IconComponent className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-900 dark:text-white mb-1">
                        {asset.name}
                      </h3>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        <div>{asset.format}</div>
                        <div>{asset.size}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(asset.url, asset.name)}
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Press Contacts */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Press Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressContacts.map((contact, index) => (
              <div key={index} className="space-y-3">
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-white">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {contact.title}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {contact.region}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                    >
                      {contact.email}
                    </a>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
