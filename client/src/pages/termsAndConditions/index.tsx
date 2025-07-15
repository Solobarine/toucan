import { useState } from "react";
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Shield,
  Users,
  AlertTriangle,
  Code,
  Image,
  Eye,
  Lock,
  Calendar,
  BookOpen,
  UserX,
  AlertCircle,
  Edit,
  Mail,
  Check,
  Printer,
  ExternalLink,
} from "lucide-react";

const TermsAndConditions = () => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );
  const [allExpanded, setAllExpanded] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const toggleSection = (sectionIndex: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const toggleAllSections = () => {
    if (allExpanded) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
    }
    setAllExpanded(!allExpanded);
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            By registering for, accessing, or using Toucan, you agree to abide
            by these Terms and Conditions, as well as any future updates. It is
            your responsibility to review these terms periodically.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "User Conduct",
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            You agree to use Toucan responsibly and lawfully. You must not use
            the platform to post, share, upload, or distribute content that:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Violates any applicable local, national, or international laws or regulations",
              "Contains or promotes child sexual abuse material (CSAM) or any form of child pornography",
              "Contains hate speech, threats, or targeted harassment based on race, ethnicity, nationality, gender, sexual orientation, religion, or disability",
              "Involves or encourages violence, terrorism, or criminal activities",
              "Includes non-consensual nudity, revenge porn, or sexually explicit content involving minors",
              "Infringes on intellectual property rights",
              "Promotes or facilitates scams, fraud, or impersonation",
              "Contains malware, spyware, or attempts to interfere with other users' access or security",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-stone-700 dark:text-stone-300"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-200 font-semibold mb-2">
              <AlertTriangle className="w-5 h-5" />
              Zero Tolerance Policy
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">
              Toucan has zero tolerance for content that violates these rules.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Prohibited Technical Uses",
      icon: Code,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            In addition to content restrictions, you must not:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Attempt to gain unauthorized access to Toucan systems or user accounts",
              "Use automated tools (e.g., bots, scrapers) to collect data or interact with the platform",
              "Reverse-engineer, decompile, or tamper with the platform's underlying code or security",
              "Misuse reporting systems to harass others or submit false claims",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-stone-700 dark:text-stone-300"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: "User-Generated Content",
      icon: Image,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            You retain full ownership of all content you create and share on
            Toucan. However, by posting content on the platform, you grant
            Toucan a non-exclusive, worldwide, royalty-free license to use,
            display, reproduce, and distribute your content within the platform
            for the purpose of operating and improving the service.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "Content Moderation",
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            Toucan reserves the right to:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Remove, restrict, or disable access to content that violates these Terms",
              "Suspend or terminate accounts involved in prohibited activity without prior notice",
              "Report illegal content or activity to the appropriate law enforcement agencies",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-stone-700 dark:text-stone-300"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 6,
      title: "Privacy and Data",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            We respect your privacy. Any personal information you provide or
            share on Toucan is handled in accordance with our Privacy Policy.
            You are responsible for maintaining the confidentiality of your
            account credentials and all activity under your account.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: "Age Restrictions",
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            You must be at least 13 years old, or the minimum legal age in your
            jurisdiction, to use Toucan. By using the platform, you affirm that
            you meet this requirement.
          </p>
        </div>
      ),
    },
    {
      id: 8,
      title: "Community Guidelines",
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            Use of the platform is also governed by our Community Guidelines,
            which define expected behavior and community standards. Repeated or
            severe violations of these guidelines may result in immediate
            suspension or termination of your account.
          </p>
        </div>
      ),
    },
    {
      id: 9,
      title: "Account Termination",
      icon: UserX,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            Toucan may suspend or permanently terminate your access if you:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Violate these Terms",
              "Repeatedly or egregiously breach our Community Guidelines",
              "Are found to be involved in harmful, illegal, or abusive behavior",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-stone-700 dark:text-stone-300"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Account Deletion:</strong> You may delete your account at
              any time through the account settings page. Deleted accounts
              cannot be recovered.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "Disclaimer",
      icon: AlertCircle,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            Toucan is provided "as is." We do not guarantee uninterrupted
            service, error-free functionality, or complete security. You use the
            platform at your own risk. Toucan is not responsible for any
            user-generated content or damages resulting from misuse of the
            service.
          </p>
        </div>
      ),
    },
    {
      id: 11,
      title: "Changes to These Terms",
      icon: Edit,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            Toucan may revise these Terms and Conditions at any time. Updates
            will be posted here with a revised "Effective Date." Continued use
            of the platform after updates constitutes acceptance of the revised
            terms.
          </p>
        </div>
      ),
    },
    {
      id: 12,
      title: "Contact",
      icon: Mail,
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            To report violations, ask questions, or reach our support team,
            please contact us at:
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a
                href="mailto:support@toucanapp.io"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                support@toucanapp.io
              </a>
              <ExternalLink className="w-4 h-4 text-blue-500" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Toucan – Terms and Conditions
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Effective Date: July 15, 2025
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 mb-8">
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              Welcome to <strong>Toucan</strong>, a modern social media platform
              built to encourage authentic interactions within a respectful and
              safe environment. By accessing or using Toucan, you agree to the
              following Terms and Conditions. If you do not agree, please do not
              use the platform.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={toggleAllSections}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              {allExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4" />
                  Expand All
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4 mb-8">
          {sections.map((section, index) => {
            const isExpanded = expandedSections.has(section.id);
            const IconComponent = section.icon;

            return (
              <div
                key={section.id}
                className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                          {index + 1}. {section.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-stone-200 dark:border-stone-700">
                    <div className="pt-6">{section.content}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Terms Acceptance */}
        <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
          <div className="flex items-start gap-4">
            <button
              onClick={() => setTermsAccepted(!termsAccepted)}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                termsAccepted
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-stone-300 dark:border-stone-600 hover:border-green-500"
              }`}
            >
              {termsAccepted && <Check className="w-4 h-4" />}
            </button>
            <div className="flex-1">
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                I have read and agree to the Toucan Terms and Conditions. I
                understand that by using the platform, I am bound by these terms
                and any future updates.
              </p>
              {termsAccepted && (
                <div className="mt-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Terms accepted</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-stone-200 dark:border-stone-700">
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            Last updated: July 15, 2025 • Toucan Social Media Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
