import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  Shield,
  Users,
  Zap,
  Handshake,
  EyeOff,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import { toggleMenu } from "../../features/slices/settings";

const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isMenuOpen } = useSelector((state: RootState) => state.settings);

  const navLinks = [
    {
      to: "/about-us",
      label: "About",
      icon: Users,
      description: "Learn about our mission",
    },
    {
      to: "/terms-and-conditions",
      label: "Terms and Conditions",
      icon: Handshake,
      description: "View Our Terms and Coonditions",
    },
    {
      to: "/privacy",
      label: "Privacy",
      icon: EyeOff,
      description: "View Our Privacy Policy",
    },
    {
      to: "/contact-us",
      label: "Contact",
      icon: Zap,
      description: "Get in touch with us",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMenuOpen) {
      dispatch(toggleMenu());
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <img
                  src="/favicon-32x32.png"
                  alt="Toucan Logo"
                  className="w-6 h-6"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900 animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
                TOUCAN
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1">
                Social Network
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`
                }
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleNavigation("/login")}
              className="px-6 py-2 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 hover:scale-110 active:scale-95"
              onClick={() => dispatch(toggleMenu())}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-2 mb-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`
                      }
                      onClick={() => dispatch(toggleMenu())}
                    >
                      <div
                        className={`p-2 rounded-lg ${({
                          isActive,
                        }: {
                          isActive: boolean;
                        }) =>
                          isActive
                            ? "bg-white/20"
                            : "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700"}`}
                      >
                        <link.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{link.label}</p>
                        <p className="text-sm opacity-75">{link.description}</p>
                      </div>
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800"
              >
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                >
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleNavigation("/register")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started Free</span>
                </button>
              </motion.div>

              {/* Mobile Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center"
              >
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  Join thousands of users already connected
                </p>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      2.4K+ Active Users
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
