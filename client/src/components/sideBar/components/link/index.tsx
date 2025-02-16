import { NavLink, NavLinkProps, useLocation } from "react-router-dom";

const Link = ({
  to,
  icon,
  name,
  isSideBarOpen,
  handleClick,
}: NavLinkProps & {
  icon: string;
  name: string;
  isSideBarOpen: boolean;
  handleClick?: () => void;
}) => {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={to}
      className={`relative flex items-center gap-2 px-2 py-1 rounded-md hover:bg-light ${
        pathname === to ? "bg-light text-primary" : ""
      }`}
      onClick={handleClick}
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
