import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "../primaryButton";
import SecondaryButton from "../secondaryButton";
import ThemeSwitch from "../themeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { toggleMenu } from "../../features/slices/settings";

const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isMenuOpen } = useSelector((state: RootState) => state.settings);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/privacy", label: "Privacy" },
    { to: "/security", label: "Security" },
    { to: "/features", label: "Features" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-primary-light"
          >
            <img
              src="/favicon-32x32.png"
              alt="Toucan Logo"
              className="w-8 h-8"
            />
            <span className="hidden sm:inline">TOUCAN</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <PrimaryButton onClick={() => navigate("/login")}>
              Login
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/register")}>
              Register
            </SecondaryButton>
            <ThemeSwitch />
          </div>

          <div className="flex items-center md:hidden">
            <ThemeSwitch />
            <button
              className="ml-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:hover:bg-gray-700"
              onClick={() => dispatch(toggleMenu())}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                  }
                  onClick={() => dispatch(toggleMenu())}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5 space-x-4">
                <PrimaryButton
                  onClick={() => {
                    navigate("/login");
                    dispatch(toggleMenu());
                  }}
                >
                  Login
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => {
                    navigate("/register");
                    dispatch(toggleMenu());
                  }}
                >
                  Register
                </SecondaryButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
