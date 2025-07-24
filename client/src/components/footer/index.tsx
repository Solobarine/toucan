import { NavLink, useNavigate } from "react-router-dom";
import { Heart, Github, Twitter, Mail, ExternalLink } from "lucide-react";
import Logo from "../loading/logo";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const navigate = useNavigate();
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blogs" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Community", href: "/community" },
        { label: "Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms-and-conditions" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Guidelines", href: "/guidelines" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://x.com/SolomonAkpuru",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "https://github.com/solobarine",
      icon: Github,
    },
    {
      name: "Email",
      href: "mailto:solobarine@gmail.com",
      icon: Mail,
    },
  ];

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer
      className={`bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <img
                    src="/favicon-32x32.png"
                    alt="Toucan"
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  Toucan
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 max-w-xs">
                Connect with friends, share moments, and discover amazing
                content in a safe and welcoming community.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <NavLink
                    to={social.href}
                    key={social.name}
                    className="w-9 h-9 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Link Sections */}
            {footerLinks.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        to={link.href}
                        className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm flex items-center gap-1 group"
                      >
                        {link.label}
                        {link.href.startsWith("https") && (
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
              Get the latest updates and features delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-sm">
              <span>© {new Date().getFullYear()} Social. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by Solomon Akpuru</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={() => handleLinkClick("/privacy")}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => handleLinkClick("/terms-and-conditions")}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => handleLinkClick("/cookies")}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
