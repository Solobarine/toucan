import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronRight, Eye, Shield, User } from "lucide-react";

type SettingsSection =
  | "privacy"
  | "notifications"
  | "account"
  | "content"
  | "security";

const Menu = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("privacy");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const sections = [
    {
      id: "account" as const,
      title: "Account",
      description: "Password, data, and account management",
      to: "/settings/account",
      icon: User,
    },
    {
      id: "notifications" as const,
      title: "Notifications",
      description: "Manage your notification preferences",
      to: "/settings/notifications",
      icon: Bell,
    },
    {
      id: "privacy" as const,
      title: "Privacy",
      description: "Control who can see your content",
      to: "/settings/privacy",
      icon: Eye,
    },
    {
      id: "security" as const,
      title: "Security",
      description: "Security Alerts and Login sessions",
      to: "/settings/security",
      icon: Shield,
    },
  ];

  return (
    <div className="lg:w-80">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Mobile menu toggle */}
        <div className="lg:hidden p-4 border-b border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-3">
              {(() => {
                const currentSection = sections.find(
                  (s) => s.id === activeSection
                );
                const IconComponent = currentSection?.icon;
                return IconComponent ? (
                  <IconComponent className="w-5 h-5 text-purple-600" />
                ) : null;
              })()}
              <span className="font-medium text-neutral-900 dark:text-white">
                {sections.find((s) => s.id === activeSection)?.title}
              </span>
            </div>
            <ChevronRight
              className={`w-5 h-5 text-neutral-400 transition-transform ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${isMobileMenuOpen ? "block" : "hidden"} lg:block`}>
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsMobileMenuOpen(false);
                  navigate(section.to);
                }}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 ${
                  location.pathname == section.to
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-r-2 border-r-purple-600"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="flex-1">
                  <div className="font-medium">{section.title}</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {section.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Menu;
