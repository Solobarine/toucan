import { NavLink, NavLinkProps, useLocation } from "react-router-dom";

const Link = ({
  to,
  icon: Icon,
  name,
  isSideBarOpen,
  handleClick,
}: NavLinkProps & {
  icon: React.ElementType;
  name: string;
  isSideBarOpen: boolean;
  handleClick?: () => void;
}) => {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={to}
      className={`relative flex items-center gap-2 px-2 py-1 rounded-md hover:bg-light hover:text-primary dark:hover:text-primary-dark ${
        pathname === to
          ? "bg-light text-primary dark:hover:text-primary-dark"
          : ""
      }`}
      onClick={handleClick}
    >
      {<Icon />}
      {isSideBarOpen && <p className="text-sm">{name}</p>}
      {pathname === to && (
        <span className="absolute block w-0.5 h-3 bg-primary rounded-lg left-0" />
      )}
    </NavLink>
  );
};

export default Link;
