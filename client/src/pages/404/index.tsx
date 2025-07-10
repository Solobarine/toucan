import {
  Home,
  Users,
  Search,
  MessageCircle,
  Settings,
  ArrowLeft,
  RefreshCw,
  HelpCircle,
  Mail,
} from "lucide-react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

const NotFound = () => {
  const quickLinks = [
    {
      icon: Home,
      label: "Home",
      description: "Return to your feed",
      href: "/feed",
    },
    {
      icon: Users,
      label: "Friends",
      description: "Connect with friends",
      href: "/network",
    },
    {
      icon: Search,
      label: "Explore",
      description: "Discover new content",
      href: "/explore",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      description: "Check your messages",
      href: "/chats",
    },
    {
      icon: Users,
      label: "Groups",
      description: "Join communities",
      href: "/network?category=groups",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Manage your account",
      href: "/settings",
    },
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const { isDarkTheme } = useSelector((state: RootState) => state.settings);
  // Set Theme
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-stone-800">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12 pt-16">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-white text-4xl font-bold">404</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-stone-500 dark:text-stone-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl hover:bg-stone-300 dark:hover:bg-stone-600 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh Page
          </button>
        </div>

        {/* Quick Links Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Where would you like to go?
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              Here are some popular sections to get you back on track
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <div
                key={link.label}
                className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => (window.location.href = link.href)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {link.label}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 text-sm">
                      {link.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white dark:bg-stone-800 rounded-xl p-8 border border-stone-200 dark:border-stone-700">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Still need help?
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              If you believe this is an error or need assistance, we're here to
              help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-50 dark:bg-stone-700 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                Contact Support
              </h4>
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">
                Get help from our support team
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium">
                Send Message
              </button>
            </div>
            <div className="bg-stone-50 dark:bg-stone-700 rounded-xl p-6 text-center">
              <HelpCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                Report Issue
              </h4>
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">
                Let us know about this problem
              </p>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium">
                Report Bug
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
