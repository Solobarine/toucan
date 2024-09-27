import { NavLink, NavLinkProps, useLocation } from "react-router-dom";

const Link = ({
  to,
  icon,
  name,
  isSideBarOpen,
}: NavLinkProps & { icon: string; name: string; isSideBarOpen: boolean }) => {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={to}
      className={`relative flex items-center gap-2 px-2 py-1 rounded-md hover:bg-light hover:dark:bg-stone-700 ${
        pathname === to ? "bg-light dark:bg-stone-700" : ""
      }`}
    >
      <i className={`${icon} text-lg`} />
      {isSideBarOpen && <p className="text-sm">{name}</p>}
      {pathname === to && (
        <span className="absolute block w-0.5 h-3 bg-primary rounded-lg left-0" />
      )}
    </NavLink>
  );
};

export default Link;
