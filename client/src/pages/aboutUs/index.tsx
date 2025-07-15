import { useState } from "react";
import {
  Users,
  Target,
  Heart,
  Shield,
  Globe,
  Zap,
  TrendingUp,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Play,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story");
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: "Active Users", value: "2.5M+", color: "blue" },
    { icon: Globe, label: "Countries", value: "150+", color: "green" },
    { icon: Heart, label: "Posts Shared", value: "50M+", color: "red" },
    { icon: Shield, label: "Safety Score", value: "99.9%", color: "purple" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Authentic Connections",
      description:
        "We believe in fostering genuine relationships and meaningful interactions between people.",
      color: "red",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Creating a safe, respectful environment where everyone can express themselves freely.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Our platform is built by the community, for the community, with user feedback at its core.",
      color: "green",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Continuously pushing boundaries to create the best social media experience possible.",
      color: "yellow",
    },
  ];

  const team = [
    {
      name: "Solomon Akpuru",
      role: "CEO & Co-Founder",
      image: "https://i.postimg.cc/d35Q23MS/avatar.jpg",
      bio: "Former Software Engineering Consultant at Sollyverse, passionate about building authentic social connections.",
      social: {
        linkedin: "https://linkedin.com/in/solomon-akpuru",
        twitter: "https://twitter.com/solomonakpuru",
      },
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image:
        "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Senior Engineer at Google, expert in scalable systems and user privacy.",
      social: {
        linkedin: "https://linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen",
      },
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Design",
      image:
        "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Award-winning designer focused on creating intuitive and accessible user experiences.",
      social: {
        linkedin: "https://linkedin.com/in/emmarodriguez",
        twitter: "https://twitter.com/emmarodriguez",
      },
    },
    {
      name: "David Kim",
      role: "Head of Safety",
      image:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Trust & Safety lead at Twitter, dedicated to creating safe online communities.",
      social: {
        linkedin: "https://linkedin.com/in/davidkim",
      },
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Beginning",
      description:
        "Toucan was founded with a vision to create authentic social connections.",
      icon: Target,
    },
    {
      year: "2024",
      title: "Beta Launch",
      description:
        "Launched private beta with 10,000 users and received overwhelming positive feedback.",
      icon: Zap,
    },
    {
      year: "2024",
      title: "Public Launch",
      description:
        "Opened to the public and reached 100,000 users in the first month.",
      icon: TrendingUp,
    },
    {
      year: "2025",
      title: "Global Expansion",
      description:
        "Expanded to 150+ countries with 2.5M+ active users worldwide.",
      icon: Globe,
    },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Content Creator",
      image:
        "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "Toucan has completely changed how I connect with my audience. The authentic interactions here are unmatched.",
    },
    {
      name: "Maria Garcia",
      role: "Small Business Owner",
      image:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "The community-focused approach has helped my business build genuine relationships with customers.",
    },
    {
      name: "James Wilson",
      role: "Student",
      image:
        "https://images.pexels.com/photos/3681591/pexels-photo-3681591.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "Finally, a social platform that prioritizes meaningful connections over vanity metrics.",
    },
  ];

  const TabButton = ({
    label,
    isActive,
    onClick,
  }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? "bg-purple-500 text-white shadow-lg"
          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Toucan
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Building authentic connections in a world that values genuine
              human interaction
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
                <Play className="w-4 h-4" />
                Watch Our Story
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors duration-200 font-medium"
                onClick={() => navigate("/contact-us")}
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 text-center shadow-lg"
            >
              <div
                className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon
                  className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                />
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {stat.value}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 bg-white dark:bg-neutral-800 rounded-xl p-2 border border-neutral-200 dark:border-neutral-700 mb-12">
          <TabButton
            label="Our Story"
            isActive={activeTab === "story"}
            onClick={() => setActiveTab("story")}
          />
          <TabButton
            label="Our Values"
            isActive={activeTab === "values"}
            onClick={() => setActiveTab("values")}
          />
          <TabButton
            label="Our Team"
            isActive={activeTab === "team"}
            onClick={() => setActiveTab("team")}
          />
          <TabButton
            label="Timeline"
            isActive={activeTab === "timeline"}
            onClick={() => setActiveTab("timeline")}
          />
        </div>

        {/* Our Story */}
        {activeTab === "story" && (
          <div className="space-y-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Story
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Born from a desire to create meaningful connections in an
                increasingly disconnected digital world
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  The Problem We Saw
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  Social media had become a place of superficial interactions,
                  endless scrolling, and algorithm-driven content that
                  prioritized engagement over genuine connection. We saw people
                  feeling more isolated despite being more "connected" than
                  ever.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  We believed there had to be a better way—a platform that would
                  foster authentic relationships, meaningful conversations, and
                  genuine community building.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <Quote className="w-12 h-12 text-white/60 mb-6" />
                <blockquote className="text-lg leading-relaxed mb-4">
                  "We wanted to create a space where people could be their
                  authentic selves and form real connections, not just collect
                  likes and followers."
                </blockquote>
                <cite className="text-blue-100">
                  — Solomon Akpuru, CEO & Founder
                </cite>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    What Makes Us Different
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "No vanity metrics - focus on meaningful interactions",
                      "Community-driven moderation and safety",
                      "Privacy-first approach to data handling",
                      "Algorithm transparency and user control",
                      "Support for authentic self-expression",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Our Solution
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  Toucan was built from the ground up with authentic connection
                  at its core. We removed the features that encourage
                  superficial engagement and instead focused on tools that help
                  people have meaningful conversations and build lasting
                  relationships.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Every feature we build is evaluated against one simple
                  question: "Does this help people form genuine connections?"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Our Values */}
        {activeTab === "values" && (
          <div className="space-y-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                The principles that guide everything we do at Toucan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-${value.color}-100 dark:bg-${value.color}-900/30 rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <value.icon
                      className={`w-8 h-8 text-${value.color}-600 dark:text-${value.color}-400`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Our Team */}
        {activeTab === "team" && (
          <div className="space-y-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                The passionate people behind Toucan's mission to connect the
                world authentically
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 text-center hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                      >
                        <Linkedin className="w-4 h-4 text-neutral-600 dark:text-neutral-400 hover:text-blue-600" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                      >
                        <Twitter className="w-4 h-4 text-neutral-600 dark:text-neutral-400 hover:text-blue-600" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="text-blue-100 mb-6">
                  We're always looking for passionate people who share our
                  vision of authentic connection.
                </p>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium mx-auto">
                  View Open Positions
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {activeTab === "timeline" && (
          <div className="space-y-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Key milestones in Toucan's growth and evolution
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center relative z-10">
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              What People Say
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Hear from our community about their experience with Toucan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {testimonial.name}
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white mb-20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience authentic social media where genuine connections matter
            more than follower counts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
              Get Started Today
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors duration-200 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
