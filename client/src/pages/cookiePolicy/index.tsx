import { Shield, CheckCircle, XCircle, Info, Clock, Globe } from "lucide-react";

export default function CookiePolicy() {
  const lastUpdated = "January 15, 2024";

  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "Required for basic website functionality and security",
      examples: [
        "Authentication tokens",
        "Security preferences",
        "Session management",
      ],
      used: true,
      canDisable: false,
      icon: Shield,
    },
    {
      name: "Functional Cookies",
      description: "Remember your preferences and settings",
      examples: [
        "Theme preferences (dark/light mode)",
        "Language settings",
        "Accessibility options",
      ],
      used: true,
      canDisable: true,
      icon: CheckCircle,
    },
    {
      name: "Analytics Cookies",
      description: "Help us understand how you use our website",
      examples: ["Page views", "Feature usage", "Performance metrics"],
      used: false,
      canDisable: true,
      icon: XCircle,
    },
    {
      name: "Advertising Cookies",
      description: "Used to show you relevant advertisements",
      examples: ["Ad targeting", "Conversion tracking", "Remarketing"],
      used: false,
      canDisable: true,
      icon: XCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Learn about how we use cookies and similar technologies on our
            platform
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            <Clock className="w-4 h-4" />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Privacy-First Notice */}
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                Privacy-First Approach
              </h2>
              <p className="text-green-700 dark:text-green-300 mb-3">
                We believe in protecting your privacy. Unlike many social media
                platforms, we do not use cookies to track you across the web,
                build advertising profiles, or sell your data to third parties.
              </p>
              <ul className="space-y-1 text-green-700 dark:text-green-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No tracking cookies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No data selling to advertisers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No cross-site tracking
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What Are Cookies */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            What Are Cookies?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Cookies are small text files that are stored on your device when you
            visit a website. They help websites remember information about your
            visit, such as your preferences and login status.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            We use cookies sparingly and only for essential functionality and
            improving your experience on our platform. We never use them to
            track you for advertising purposes or to sell your information to
            third parties.
          </p>
        </div>

        {/* Cookie Types */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Types of Cookies We Use
          </h2>
          <div className="space-y-6">
            {cookieTypes.map((type, index) => (
              <div
                key={index}
                className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      type.used
                        ? "bg-blue-100 dark:bg-blue-900/20"
                        : "bg-neutral-100 dark:bg-neutral-700"
                    }`}
                  >
                    <type.icon
                      className={`w-5 h-5 ${
                        type.used
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        {type.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          type.used
                            ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {type.used ? "Used" : "Not Used"}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                      {type.description}
                    </p>

                    <div className="mb-3">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                        Examples:
                      </h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, exampleIndex) => (
                          <li
                            key={exampleIndex}
                            className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                          >
                            <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Can be disabled:
                        </span>
                        {type.canDisable ? (
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            Yes
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400 font-medium">
                            No (Required)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Use Cookies */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            How We Use Cookies
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Authentication & Security
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                We use essential cookies to keep you logged in securely and
                protect your account from unauthorized access. These cookies are
                necessary for the platform to function properly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                User Preferences
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                We store your preferences like theme settings (dark/light mode),
                language choices, and accessibility options to provide you with
                a personalized experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                What We Don't Do
              </h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Track your browsing activity across other websites
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Build advertising profiles based on your behavior
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Sell your data to third-party advertisers
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Use cookies for behavioral targeting
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Managing Your Cookie Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                In Your Browser
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                You can control cookies through your browser settings. Most
                browsers allow you to:
              </p>
              <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                  View and delete existing cookies
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                  Block cookies from specific websites
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                  Set preferences for accepting cookies
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                On Our Platform
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                You can manage your cookie preferences in your account settings.
                Note that disabling essential cookies may affect the
                functionality of our platform.
              </p>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Manage Cookie Preferences
              </button>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Third-Party Services
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We use minimal third-party services, and when we do, we ensure they
            align with our privacy-first approach:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white">
                  Content Delivery Network (CDN)
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  We use a CDN to deliver content faster. This may set technical
                  cookies for performance optimization.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white">
                  Security Services
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  We use security services to protect against spam and abuse.
                  These may use cookies for security purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Updates to Policy */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Updates to This Policy
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for legal reasons. When we make
            significant changes, we will:
          </p>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
            <li className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              Notify you through our platform or via email
            </li>
            <li className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              Update the "Last updated" date at the top of this policy
            </li>
            <li className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              Give you the opportunity to review and accept the changes
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl border border-purple-200 dark:border-purple-800 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Questions About Our Cookie Policy?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              If you have any questions about how we use cookies or this policy,
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Contact Privacy Team
              </button>
              <button className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                View Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
