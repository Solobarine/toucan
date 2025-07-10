import { useLocation } from "react-router-dom";
import Link from "../link";
import { BotMessageSquare, Cog, User } from "lucide-react";

const Menu = () => {
  const { pathname } = useLocation();
  const routes = [
    {
      name: "Profile",
      to: "/settings/profile",
      icon: User,
    },
    {
      name: "Notifications",
      to: "/settings/notifications",
      icon: BotMessageSquare,
    },
    {
      name: "Account",
      to: "/settings/account",
      icon: Cog,
    },
  ];
  return (
    <div className="m-4">
      <div className="bg-white dark:bg-stone-700 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden ">
        <nav className="space-y-1 p-2">
          {routes.map((route, index) => (
            <Link
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                route.to === pathname
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              }`}
              to={route.to}
            >
              <route.icon className="w-5 h-5" />
              <span className="font-medium">{route.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Menu;
