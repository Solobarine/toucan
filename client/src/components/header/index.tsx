import { Link, NavLink, useNavigate } from "react-router-dom";
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

  return (
    <header className="sticky top-0 z-50 px-2 md:px-10 py-2 flex items-center justify-between gap-3 bg-gray-100/40 backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-1 shrink-0 font-bold">
        <img src="/favicon-32x32.png" alt="Logo of Toucan" />
        <h2>TOUCAN</h2>
      </Link>
      <div
        className={`absolute py-4 md:py-0 md:static grow flex flex-col md:flex-row bg-primary gap-10 md:bg-transparent w-full top-12 left-0 items-center justify-between transition-transform duration-700 md:translate-y-0 opacity-100 ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0"
        }`}
      >
        <nav className="grid md:justify-center grow gap-6 md:flex items-center md:gap-4">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
          <NavLink to="/security">Security</NavLink>
          <NavLink to="features">Features</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
        </nav>
        <nav className="flex items-center gap-4">
          <PrimaryButton onClick={() => navigate("/login")}>
            Login
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate("/register")}>
            Register
          </SecondaryButton>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <button
          className="md:hidden text-2xl px-2 rounded-md hover:outline shadow-md hover:outline-primary focus:outline-primary"
          onClick={() => dispatch(toggleMenu())}
        >
          {isMenuOpen ? (
            <i className="bx bx-x" />
          ) : (
            <i className="bx bx-menu"></i>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
