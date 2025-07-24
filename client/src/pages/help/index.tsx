import { useState } from "react";
import {
  Search,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Shield,
  Settings,
  Users,
  Smartphone,
  CreditCard,
  ThumbsUp,
  ThumbsDown,
  LucideIcon,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  articleCount: number;
}

interface ContactOption {
  type: "chat" | "email" | "phone";
  title: string;
  description: string;
  availability: string;
  icon: LucideIcon;
  action: string;
}

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const helpCategories: HelpCategory[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      icon: BookOpen,
      articleCount: 12,
    },
    {
      id: "account-settings",
      title: "Account & Settings",
      description: "Manage your account and privacy settings",
      icon: Settings,
      articleCount: 18,
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      description: "Keep your account safe and secure",
      icon: Shield,
      articleCount: 15,
    },
    {
      id: "community",
      title: "Community Guidelines",
      description: "Rules and best practices for our community",
      icon: Users,
      articleCount: 8,
    },
    {
      id: "mobile-app",
      title: "Mobile App",
      description: "Help with our iOS and Android apps",
      icon: Smartphone,
      articleCount: 10,
    },
    {
      id: "billing",
      title: "Billing & Subscriptions",
      description: "Payment, billing, and subscription help",
      icon: CreditCard,
      articleCount: 14,
    },
  ];

  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "How do I create an account?",
      answer:
        "To create an account, click the 'Sign Up' button on our homepage. You'll need to provide your email address, create a password, and verify your email. You can also sign up using your Google or Apple account for faster registration.",
      category: "getting-started",
      helpful: 245,
      notHelpful: 12,
    },
    {
      id: "2",
      question: "How do I change my password?",
      answer:
        "Go to Settings > Account > Password. Enter your current password, then your new password twice to confirm. Make sure your new password is at least 8 characters long and includes a mix of letters, numbers, and symbols.",
      category: "account-settings",
      helpful: 189,
      notHelpful: 8,
    },
    {
      id: "3",
      question: "How do I report inappropriate content?",
      answer:
        "Click the three dots menu on any post, comment, or profile and select 'Report'. Choose the reason for reporting and provide additional details if needed. Our moderation team reviews all reports within 24 hours.",
      category: "community",
      helpful: 156,
      notHelpful: 5,
    },
    {
      id: "4",
      question: "Why can't I see some posts in my feed?",
      answer:
        "Your feed is personalized based on your interactions, the people you follow, and our algorithm. Posts may not appear if they're from accounts you've muted, if they violate our guidelines, or if they're older content that's been filtered out.",
      category: "getting-started",
      helpful: 134,
      notHelpful: 23,
    },
    {
      id: "5",
      question: "How do I enable two-factor authentication?",
      answer:
        "Go to Settings > Security > Two-Factor Authentication. You can enable 2FA using an authenticator app, SMS, or email. We recommend using an authenticator app for the highest security. Follow the setup instructions to complete the process.",
      category: "privacy-security",
      helpful: 198,
      notHelpful: 7,
    },
    {
      id: "6",
      question: "How do I cancel my subscription?",
      answer:
        "Go to Settings > Billing > Manage Subscription. Click 'Cancel Subscription' and follow the prompts. Your subscription will remain active until the end of your current billing period, and you'll retain access to premium features until then.",
      category: "billing",
      helpful: 167,
      notHelpful: 15,
    },
  ];

  const contactOptions: ContactOption[] = [
    {
      type: "chat",
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      icon: MessageSquare,
      action: "Start Chat",
    },
    {
      type: "email",
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "Response within 24 hours",
      icon: Mail,
      action: "Send Email",
    },
    {
      type: "phone",
      title: "Phone Support",
      description: "Speak directly with a support representative",
      availability: "Mon-Fri, 9AM-6PM PST",
      icon: Phone,
      action: "Call Now",
    },
  ];

  const filteredFAQs =
    selectedCategory === "all"
      ? faqItems
      : faqItems.filter((faq) => faq.category === selectedCategory);

  const searchFilteredFAQs = filteredFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFeedback = (faqId: string, helpful: boolean) => {
    console.log(
      `FAQ ${faqId} marked as ${helpful ? "helpful" : "not helpful"}`
    );
    // In a real app, this would update the feedback counts
    alert(`Thank you for your feedback!`);
  };

  const handleContact = (type: string) => {
    console.log(`Initiating ${type} contact`);
    switch (type) {
      case "chat":
        alert("Opening live chat...");
        break;
      case "email":
        window.location.href = "mailto:support@social.com";
        break;
      case "phone":
        window.location.href = "tel:+1-555-123-4567";
        break;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            Find answers to common questions, browse our guides, or get in touch
            with our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
                    <category.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                      {category.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                      {category.articleCount} articles
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              Frequently Asked Questions
              {selectedCategory !== "all" && (
                <span className="text-lg font-normal text-neutral-500 dark:text-neutral-400 ml-2">
                  -{" "}
                  {
                    helpCategories.find((cat) => cat.id === selectedCategory)
                      ?.title
                  }
                </span>
              )}
            </h2>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium"
              >
                View All
              </button>
            )}
          </div>

          <div className="space-y-4">
            {searchFilteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                  }
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <h3 className="font-medium text-neutral-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  )}
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="pt-4">
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        {faq.answer}
                      </p>

                      {/* Feedback */}
                      <div className="flex items-center gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          Was this helpful?
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFeedback(faq.id, true)}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            Yes ({faq.helpful})
                          </button>
                          <button
                            onClick={() => handleFeedback(faq.id, false)}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            No ({faq.notHelpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {searchFilteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Try adjusting your search terms or browse our categories above.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
              Still Need Help?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option) => (
              <div
                key={option.type}
                className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 text-center hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                  {option.description}
                </p>
                <div className="flex items-center justify-center gap-1 text-xs text-neutral-500 dark:text-neutral-500 mb-4">
                  <Clock className="w-3 h-3" />
                  {option.availability}
                </div>
                <button
                  onClick={() => handleContact(option.type)}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
