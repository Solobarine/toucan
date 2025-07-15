import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Shield,
  Lock,
  Eye,
  Users,
  MessageCircle,
  Database,
  Settings,
  Trash2,
  Mail,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: Database,
      color: "blue",
      subsections: [
        {
          title: "Account Information",
          items: [
            "Username, display name",
            "Email address",
            "Profile photo (if uploaded)",
          ],
        },
        {
          title: "Content You Provide",
          items: [
            "Posts, comments, likes",
            "Messages (private 1:1 chats)",
            "Uploaded images or media",
          ],
        },
        {
          title: "Usage Data",
          items: [
            "Device and browser information",
            "IP address (temporarily stored for abuse prevention)",
            "Interaction logs (e.g., likes, follows, post views)",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: Settings,
      color: "green",
      items: [
        "Create and manage your account",
        "Display your content and interactions to others",
        "Enable core features like feeds, chats, and notifications",
        "Maintain platform safety, prevent spam, abuse, and violations",
        "Improve performance, troubleshoot errors, and analyze usage",
      ],
    },
    {
      id: "private-messaging",
      title: "Private Messaging",
      icon: MessageCircle,
      color: "purple",
      content:
        "Private 1:1 messages are stored securely and are only visible to the participants involved. Toucan does not access private messages unless required to investigate Terms of Use violations or comply with legal obligations.",
    },
    {
      id: "cookies-tracking",
      title: "Cookies and Tracking",
      icon: Eye,
      color: "orange",
      items: [
        "Session management (keeping you logged in)",
        "Security and CSRF protection",
        "Basic analytics to improve user experience",
      ],
      note: "We do not use third-party advertising cookies or behavioral tracking tools.",
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      icon: Users,
      color: "red",
      items: [
        "With your consent",
        "To comply with legal obligations or government requests",
        "When necessary to detect, prevent, or respond to abuse or threats",
      ],
      highlight:
        "We never share or sell your data to advertisers or data brokers.",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: Shield,
      color: "emerald",
      items: [
        "Access and review your data",
        "Update your profile or account settings",
        "Request deletion of your account and associated data",
        "Withdraw consent for non-essential data collection (where applicable)",
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: Calendar,
      color: "indigo",
      content:
        "We retain your data only as long as necessary to provide the service and comply with legal obligations. When you delete your account, your posts, profile, and messages are permanently removed from our active systems.",
    },
    {
      id: "childrens-privacy",
      title: "Children's Privacy",
      icon: AlertTriangle,
      color: "amber",
      content:
        "Toucan is not intended for users under the age of 13 (or the minimum legal age in your region). We do not knowingly collect personal data from children. If we discover such data, we will delete it immediately.",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      green:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      orange:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
      emerald:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      indigo:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      amber:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <Helmet>
        <title>Toucan - Privacy Policy</title>
        <meta
          name="description"
          content="Learn how Toucan protects your privacy and handles your data"
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100">
                Privacy Policy
              </h1>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                Effective Date: July 15, 2025
              </span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              Toucan is committed to protecting your privacy and maintaining a
              secure, transparent environment for social interaction. This
              Privacy Policy explains what data we collect, how we use it, and
              what choices you have.
            </p>
          </div>

          {/* Key Commitment */}
          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
                Our Commitment
              </h3>
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg">
              We do not sell, rent, or share your personal data with advertisers
              or third-party marketers.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-3 p-3 rounded-xl text-left hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200"
              >
                <div
                  className={`p-2 rounded-lg ${getColorClasses(section.color)}`}
                >
                  <section.icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-900 dark:text-stone-100 font-medium">
                    {index + 1}. {section.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${getColorClasses(
                      section.color
                    )}`}
                  >
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {index + 1}. {section.title}
                    </h2>
                  </div>
                </div>
                {expandedSections[section.id] ? (
                  <ChevronDown className="w-6 h-6 text-stone-500 dark:text-stone-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-stone-500 dark:text-stone-400" />
                )}
              </button>

              {expandedSections[section.id] && (
                <div className="px-6 pb-6 border-t border-stone-200 dark:border-stone-700">
                  <div className="pt-6 space-y-4">
                    {section.content && (
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                        {section.content}
                      </p>
                    )}

                    {section.items && (
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-stone-700 dark:text-stone-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.subsections && (
                      <div className="space-y-6">
                        {section.subsections.map((subsection, subIndex) => (
                          <div
                            key={subIndex}
                            className="bg-stone-50 dark:bg-stone-700 rounded-xl p-4"
                          >
                            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
                              {subsection.title}
                            </h4>
                            <ul className="space-y-2">
                              {subsection.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-stone-600 dark:text-stone-400">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.note && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <p className="text-blue-800 dark:text-blue-200 font-medium">
                            {section.note}
                          </p>
                        </div>
                      </div>
                    )}

                    {section.highlight && (
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                          <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                            {section.highlight}
                          </p>
                        </div>
                      </div>
                    )}

                    {section.id === "your-rights" && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3 mb-4">
                          <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                            Managing Your Privacy
                          </h4>
                        </div>
                        <p className="text-blue-700 dark:text-blue-300 mb-4">
                          You can manage most of your privacy settings from your
                          account settings. For deletion or privacy requests,
                          contact us at{" "}
                          <a
                            href="mailto:privacy@toucanapp.io"
                            className="font-medium underline hover:no-underline"
                          >
                            privacy@toucanapp.io
                          </a>
                          .
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Link
                            to="/settings"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                          >
                            <Settings className="w-4 h-4" />
                            Account Settings
                          </Link>
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 rounded-2xl p-8 border border-stone-200 dark:border-stone-600">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Questions About Privacy?
            </h3>
            <p className="text-stone-700 dark:text-stone-300 mb-6 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we
              handle your data, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@toucanapp.io"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                privacy@toucanapp.io
              </a>
              <Link
                to="/contact-us"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-600 dark:bg-stone-500 text-white rounded-xl hover:bg-stone-700 dark:hover:bg-stone-400 transition-colors duration-200"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
