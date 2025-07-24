import { useState } from "react";
import {
  Shield,
  Heart,
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Flag,
  Eye,
  Zap,
  Scale,
  LucideIcon,
} from "lucide-react";

interface GuidelineSection {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  rules: GuidelineRule[];
}

interface GuidelineRule {
  id: string;
  title: string;
  description: string;
  examples?: {
    allowed: string[];
    notAllowed: string[];
  };
  consequences: string;
}

export default function GuidelinesPage() {
  const [activeSection, setActiveSection] = useState<string>(
    "community-standards"
  );

  const guidelineSections: GuidelineSection[] = [
    {
      id: "community-standards",
      title: "Community Standards",
      icon: Users,
      description:
        "Basic principles for respectful interaction in our community",
      rules: [
        {
          id: "respect",
          title: "Treat Everyone with Respect",
          description:
            "We believe in creating a welcoming environment for everyone. Be kind, considerate, and respectful in all your interactions.",
          examples: {
            allowed: [
              "Constructive feedback and discussions",
              "Celebrating others' achievements",
              "Asking questions politely",
              "Sharing different perspectives respectfully",
            ],
            notAllowed: [
              "Personal attacks or insults",
              "Discriminatory language or behavior",
              "Harassment or bullying",
              "Hate speech of any kind",
            ],
          },
          consequences:
            "Violations may result in content removal, warnings, or account suspension.",
        },
        {
          id: "authenticity",
          title: "Be Authentic",
          description:
            "Use your real identity and be honest in your interactions. Authentic connections make our community stronger.",
          examples: {
            allowed: [
              "Using your real name and photo",
              "Sharing genuine experiences",
              "Being honest about your background",
              "Representing yourself accurately",
            ],
            notAllowed: [
              "Creating fake accounts or impersonating others",
              "Misleading information about yourself",
              "Using someone else's photos without permission",
              "Catfishing or deceptive practices",
            ],
          },
          consequences: "Fake accounts will be permanently suspended.",
        },
      ],
    },
    {
      id: "content-policy",
      title: "Content Policy",
      icon: MessageSquare,
      description: "Guidelines for what content is appropriate on our platform",
      rules: [
        {
          id: "appropriate-content",
          title: "Keep Content Appropriate",
          description:
            "Share content that's suitable for a diverse, global audience. Consider how your content might affect others.",
          examples: {
            allowed: [
              "Educational and informative posts",
              "Creative and artistic content",
              "Personal stories and experiences",
              "Professional achievements and updates",
            ],
            notAllowed: [
              "Explicit sexual content or nudity",
              "Graphic violence or disturbing imagery",
              "Content promoting illegal activities",
              "Spam or repetitive content",
            ],
          },
          consequences:
            "Inappropriate content will be removed and may result in account restrictions.",
        },
        {
          id: "intellectual-property",
          title: "Respect Intellectual Property",
          description:
            "Only share content you own or have permission to use. Respect others' creative work and copyrights.",
          examples: {
            allowed: [
              "Your original photos, videos, and writing",
              "Content you have permission to share",
              "Properly attributed quotes and references",
              "Fair use of copyrighted material",
            ],
            notAllowed: [
              "Copying others' content without permission",
              "Using copyrighted music, images, or videos illegally",
              "Plagiarizing written content",
              "Sharing pirated or stolen content",
            ],
          },
          consequences:
            "Copyright violations will result in content removal and potential account suspension.",
        },
      ],
    },
    {
      id: "safety-security",
      title: "Safety & Security",
      icon: Shield,
      description: "Keeping our community safe and secure for everyone",
      rules: [
        {
          id: "privacy-protection",
          title: "Protect Privacy",
          description:
            "Respect others' privacy and protect personal information. Don't share private details without consent.",
          examples: {
            allowed: [
              "Sharing your own contact information if you choose",
              "Public information that's already available",
              "Information shared with explicit permission",
              "General location information (city/country)",
            ],
            notAllowed: [
              "Sharing others' private information without consent",
              "Posting personal addresses, phone numbers, or emails",
              "Sharing private messages or conversations",
              "Doxxing or exposing personal details maliciously",
            ],
          },
          consequences:
            "Privacy violations will result in immediate content removal and account penalties.",
        },
        {
          id: "no-threats",
          title: "No Threats or Violence",
          description:
            "We have zero tolerance for threats, violence, or content that could harm others physically or emotionally.",
          examples: {
            allowed: [
              "Discussing news events objectively",
              "Fictional content clearly marked as such",
              "Educational content about safety",
              "Reporting dangerous situations to authorities",
            ],
            notAllowed: [
              "Threats of violence against individuals or groups",
              "Content promoting self-harm or suicide",
              "Instructions for dangerous or illegal activities",
              "Glorifying violence or terrorism",
            ],
          },
          consequences:
            "Threats and violent content will result in immediate account suspension and law enforcement notification if necessary.",
        },
      ],
    },
    {
      id: "platform-integrity",
      title: "Platform Integrity",
      icon: Scale,
      description:
        "Maintaining the quality and trustworthiness of our platform",
      rules: [
        {
          id: "no-manipulation",
          title: "No Manipulation or Spam",
          description:
            "Don't try to artificially inflate engagement or manipulate our systems. Quality content should speak for itself.",
          examples: {
            allowed: [
              "Genuine engagement with others' content",
              "Sharing content because you find it valuable",
              "Building authentic relationships",
              "Promoting your work honestly",
            ],
            notAllowed: [
              "Buying fake followers, likes, or comments",
              "Creating multiple accounts to boost engagement",
              "Spam posting or excessive self-promotion",
              "Using bots or automated tools for engagement",
            ],
          },
          consequences:
            "Manipulation attempts will result in content removal and account restrictions.",
        },
        {
          id: "accurate-information",
          title: "Share Accurate Information",
          description:
            "Help maintain the quality of information on our platform by sharing accurate, truthful content.",
          examples: {
            allowed: [
              "Fact-checked information from reliable sources",
              "Personal experiences and opinions clearly marked as such",
              "Corrections when you realize you've shared incorrect information",
              "Linking to credible sources for claims",
            ],
            notAllowed: [
              "Deliberately spreading false information",
              "Conspiracy theories without factual basis",
              "Medical misinformation that could harm others",
              "False news or hoax content",
            ],
          },
          consequences:
            "Misinformation will be removed and repeated violations may result in account suspension.",
        },
      ],
    },
  ];

  const reportingProcess = [
    {
      step: 1,
      title: "Report the Content",
      description:
        "Click the report button on any post, comment, or profile that violates our guidelines.",
      icon: Flag,
    },
    {
      step: 2,
      title: "We Review",
      description:
        "Our moderation team reviews all reports within 24 hours using both automated tools and human reviewers.",
      icon: Eye,
    },
    {
      step: 3,
      title: "Action Taken",
      description:
        "If violations are found, we take appropriate action ranging from content removal to account suspension.",
      icon: Zap,
    },
    {
      step: 4,
      title: "Follow Up",
      description:
        "We notify you of the outcome and provide information about appeals if applicable.",
      icon: CheckCircle,
    },
  ];

  const activeGuideline = guidelineSections.find(
    (section) => section.id === activeSection
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Community Guidelines
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Our guidelines help create a safe, respectful, and authentic
            community for everyone. Please read and follow these rules to help
            us maintain a positive environment.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden sticky top-8">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Guidelines Sections
                </h3>
              </div>
              <nav className="p-2">
                {guidelineSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {section.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeGuideline && (
              <div className="space-y-8">
                {/* Section Header */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <activeGuideline.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {activeGuideline.title}
                      </h2>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {activeGuideline.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rules */}
                {activeGuideline.rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8"
                  >
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                      {rule.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      {rule.description}
                    </p>

                    {rule.examples && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Allowed */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <h4 className="font-medium text-green-700 dark:text-green-300">
                              What's Allowed
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {rule.examples.allowed.map((example, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-neutral-600 dark:text-neutral-400">
                                  {example}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Not Allowed */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <h4 className="font-medium text-red-700 dark:text-red-300">
                              What's Not Allowed
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {rule.examples.notAllowed.map((example, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-neutral-600 dark:text-neutral-400">
                                  {example}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Consequences */}
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                            Consequences
                          </h5>
                          <p className="text-amber-700 dark:text-amber-300 text-sm">
                            {rule.consequences}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reporting Process */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mt-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                How to Report Violations
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                If you see content that violates our guidelines, please report
                it. Here's how our reporting process works:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reportingProcess.map((step) => (
                  <div key={step.step} className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
                      Step {step.step}
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl border border-purple-200 dark:border-purple-800 p-8 mt-8">
              <div className="text-center">
                <Heart className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  Questions About Our Guidelines?
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  If you have questions about our community guidelines or need
                  clarification on any rules, we're here to help.
                </p>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
