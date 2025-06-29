import { useDispatch, useSelector } from "react-redux";
import Link from "./components/link";
import {
  Cog,
  Layers,
  Mails,
  Menu,
  MessageSquareDot,
  Moon,
  Phone,
  Sun,
  Telescope,
  TrendingUp,
  User,
  UsersRound,
} from "lucide-react";

import {
  setSideBarState,
  toggleSideBar,
  toggleTheme,
} from "../../features/slices/settings";
import { logoutUser } from "../../features/thunks/auth";
import { AppDispatch, RootState } from "../../features/store";

const topLinks = [
  {
    to: "/feed",
    icon: Layers,
    name: "Feed",
  },
  {
    to: "/chats",
    icon: MessageSquareDot,
    name: "Chats",
  },
  {
    to: "/calls",
    icon: Phone,
    name: "Calls",
  },
  {
    to: "/network",
    icon: UsersRound,
    name: "My Network",
  },
  {
    to: "/explore",
    icon: Telescope,
    name: "Explore",
  },
  {
    to: "/trending",
    icon: TrendingUp,
    name: "Trending",
  },
  {
    to: "/notifications",
    icon: Mails,
    name: "Notifications",
  },
];

const SideBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isDarkTheme, isSideBarOpen } = useSelector(
    (state: RootState) => state.settings
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClick = () => {
    dispatch(setSideBarState(false));
  };

  return (
    <aside
      className={`fixed sm:sticky top-0 flex flex-col bg-primary dark:bg-primary-dark text-white justify-between h-screen px-1 py-2 transition-all duration-700 shrink-0 z-30 sm:translate-x-0 ${
        isSideBarOpen ? "translate-x-0 w-52" : "-translate-x-52 w-auto"
      }`}
    >
      <div className="grid gap-2">
        <button
          className="text-lg w-fit px-2 py-1"
          onClick={() => dispatch(toggleSideBar())}
        >
          <Menu />
        </button>
        {topLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            icon={link.icon}
            name={link.name}
            isSideBarOpen={isSideBarOpen}
            handleClick={handleClick}
          />
        ))}
        <button
          className="text-lg w-fit px-2 py-1 flex items-center gap-2"
          onClick={() => dispatch(toggleTheme())}
        >
          {isDarkTheme ? <Sun type="solid" /> : <Moon />}
          {isSideBarOpen && (
            <p className="text-sm">{isDarkTheme ? "Light" : "Dark"}</p>
          )}
        </button>
      </div>
      <div className="grid gap-2">
        <Link
          to="/settings"
          icon={Cog}
          name="Settings"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <Link
          to={`/u/${user?.id}`}
          icon={User}
          name="Profile"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 text-red-400"
          onClick={() => dispatch(logoutUser())}
        >
          <i className="bx bx-log-out-circle text-xl" />
          {isSideBarOpen && <p className="text-sm">Logout</p>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
