import { useState } from "react";
import {
  Users,
  MessageSquare,
  Calendar,
  ExternalLink,
  MapPin,
  Clock,
  Heart,
  BookOpen,
  Code,
  Lightbulb,
  HelpCircle,
  Zap,
  Github,
  Twitter,
  DiscIcon as Discord,
} from "lucide-react";
import BetaBanner from "../../components/banner/betabanner";

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "online" | "in-person" | "hybrid";
  location?: string;
  attendees: number;
  maxAttendees?: number;
  description: string;
  tags: string[];
}

interface CommunityResource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "tutorial" | "documentation" | "template";
  difficulty: "beginner" | "intermediate" | "advanced";
  readTime: string;
  likes: number;
  url: string;
}

interface CommunityStats {
  totalMembers: number;
  activeMembers: number;
  totalPosts: number;
  totalEvents: number;
}

export default function CommunityPage() {
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [selectedResourceType, setSelectedResourceType] =
    useState<string>("all");

  const communityStats: CommunityStats = {
    totalMembers: 125000,
    activeMembers: 45000,
    totalPosts: 890000,
    totalEvents: 156,
  };

  const upcomingEvents: CommunityEvent[] = [
    {
      id: "1",
      title: "Community Meetup: Building Better Social Features",
      date: "2024-02-15",
      time: "18:00 PST",
      type: "hybrid",
      location: "San Francisco, CA",
      attendees: 89,
      maxAttendees: 100,
      description:
        "Join us for an evening of networking and learning about the latest social media features and best practices.",
      tags: ["networking", "product", "design"],
    },
    {
      id: "2",
      title: "Developer Workshop: API Integration Masterclass",
      date: "2024-02-20",
      time: "14:00 UTC",
      type: "online",
      attendees: 234,
      maxAttendees: 500,
      description:
        "Deep dive into our API with hands-on examples and real-world use cases.",
      tags: ["development", "api", "workshop"],
    },
    {
      id: "3",
      title: "Design System Office Hours",
      date: "2024-02-25",
      time: "16:00 EST",
      type: "online",
      attendees: 67,
      description:
        "Monthly Q&A session with our design team about our design system and UI components.",
      tags: ["design", "ui", "q&a"],
    },
    {
      id: "4",
      title: "Community Showcase: February Edition",
      date: "2024-02-28",
      time: "19:00 CET",
      type: "online",
      attendees: 156,
      description:
        "Community members present their amazing projects and creations built with our platform.",
      tags: ["showcase", "community", "projects"],
    },
  ];

  const communityResources: CommunityResource[] = [
    {
      id: "1",
      title: "Getting Started with Social API",
      description:
        "Complete guide to integrating with our API, from authentication to advanced features.",
      type: "guide",
      difficulty: "beginner",
      readTime: "15 min",
      likes: 234,
      url: "/docs/getting-started",
    },
    {
      id: "2",
      title: "Building Custom Widgets",
      description:
        "Learn how to create custom widgets for your social media dashboard.",
      type: "tutorial",
      difficulty: "intermediate",
      readTime: "25 min",
      likes: 189,
      url: "/docs/custom-widgets",
    },
    {
      id: "3",
      title: "API Reference Documentation",
      description:
        "Complete API reference with all endpoints, parameters, and examples.",
      type: "documentation",
      difficulty: "intermediate",
      readTime: "45 min",
      likes: 567,
      url: "/docs/api-reference",
    },
    {
      id: "4",
      title: "Social Media Dashboard Template",
      description:
        "Ready-to-use dashboard template with common social media metrics and widgets.",
      type: "template",
      difficulty: "beginner",
      readTime: "5 min",
      likes: 345,
      url: "/templates/dashboard",
    },
    {
      id: "5",
      title: "Advanced Authentication Patterns",
      description:
        "Implement secure authentication flows with OAuth 2.0 and JWT tokens.",
      type: "guide",
      difficulty: "advanced",
      readTime: "30 min",
      likes: 123,
      url: "/docs/auth-patterns",
    },
    {
      id: "6",
      title: "Real-time Features with WebSockets",
      description:
        "Build real-time features like live chat and notifications using WebSockets.",
      type: "tutorial",
      difficulty: "advanced",
      readTime: "40 min",
      likes: 198,
      url: "/docs/websockets",
    },
  ];

  const communityChannels = [
    {
      name: "Discord Server",
      description:
        "Join our Discord for real-time discussions and community support",
      members: "25K+ members",
      icon: Discord,
      url: "https://discord.gg/social",
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      name: "GitHub Discussions",
      description:
        "Technical discussions, feature requests, and open source contributions",
      members: "8K+ developers",
      icon: Github,
      url: "https://github.com/social/discussions",
      color: "text-neutral-900 dark:text-white",
    },
    {
      name: "Twitter Community",
      description: "Follow us for updates, tips, and community highlights",
      members: "50K+ followers",
      icon: Twitter,
      url: "https://twitter.com/social",
      color: "text-blue-500 dark:text-blue-400",
    },
  ];

  const eventTypes = [
    { id: "all", label: "All Events" },
    { id: "online", label: "Online" },
    { id: "in-person", label: "In-Person" },
    { id: "hybrid", label: "Hybrid" },
  ];

  const resourceTypes = [
    { id: "all", label: "All Resources" },
    { id: "guide", label: "Guides" },
    { id: "tutorial", label: "Tutorials" },
    { id: "documentation", label: "Documentation" },
    { id: "template", label: "Templates" },
  ];

  const filteredEvents =
    selectedEventType === "all"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.type === selectedEventType);

  const filteredResources =
    selectedResourceType === "all"
      ? communityResources
      : communityResources.filter(
          (resource) => resource.type === selectedResourceType
        );

  const getEventTypeColor = (type: string) => {
    const colors = {
      online:
        "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "in-person":
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      hybrid:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner:
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      intermediate:
        "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
      advanced: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
    };
    return (
      colors[difficulty as keyof typeof colors] ||
      "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
    );
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "guide":
        return BookOpen;
      case "tutorial":
        return Code;
      case "documentation":
        return HelpCircle;
      case "template":
        return Lightbulb;
      default:
        return BookOpen;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Community
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Join our vibrant community of developers, designers, and creators.
            Connect, learn, and build amazing things together.
          </p>
        </div>

        <BetaBanner />

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              {formatNumber(communityStats.totalMembers)}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Total Members
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              {formatNumber(communityStats.activeMembers)}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Active Members
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              {formatNumber(communityStats.totalPosts)}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Total Posts
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              {communityStats.totalEvents}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Events Hosted
            </div>
          </div>
        </div>

        {/* Community Channels */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Join Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityChannels.map((channel, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                    <channel.icon className={`w-6 h-6 ${channel.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {channel.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                      {channel.members}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.open(channel.url, "_blank")}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Join Now
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4 sm:mb-0">
              Upcoming Events
            </h2>

            {/* Event Type Filter */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedEventType(type.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedEventType === type.id
                      ? "bg-purple-600 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
                        event.type
                      )}`}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {event.description}
                </p>

                {event.location && (
                  <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <Users className="w-4 h-4" />
                    {event.attendees}{" "}
                    {event.maxAttendees && `/ ${event.maxAttendees}`} attending
                  </div>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                    Register
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Resources */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4 sm:mb-0">
              Community Resources
            </h2>

            {/* Resource Type Filter */}
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedResourceType(type.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedResourceType === type.id
                      ? "bg-purple-600 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const IconComponent = getResourceIcon(resource.type);
              return (
                <div
                  key={resource.id}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                      <IconComponent className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            resource.difficulty
                          )}`}
                        >
                          {resource.difficulty.charAt(0).toUpperCase() +
                            resource.difficulty.slice(1)}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {resource.readTime}
                        </span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        {resource.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                      <Heart className="w-4 h-4" />
                      {resource.likes}
                    </div>
                    <button
                      onClick={() => window.open(resource.url, "_blank")}
                      className="px-3 py-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1"
                    >
                      Read More
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
