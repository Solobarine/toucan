import { NavLink, NavLinkProps, useLocation } from "react-router-dom";

const Link = ({ to, children }: NavLinkProps) => {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={to}
      className={`flex items-center gap-2 p-2 rounded-md transition-colors duration-500 hover:bg-white hover:dark:bg-white/20 ${
        pathname === to ? "text-primary" : "text-inherit"
      }`}
    >
      {children}
    </NavLink>
  );
};

export default Link;
