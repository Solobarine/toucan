import Link from "../link";

const Menu = () => {
  return (
    <div className="flex sm:flex-col sticky top-0 sm:basis-64 shrink-0 bg-white/60 dark:bg-stone-700 border-r-2 border-light dark:border-dark sm:min-h-full p-3 overflow-x-scroll">
      <Link
        to="/settings/account"
        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-500 hover:bg-white hover:dark:bg-white/20"
      >
        <i className="bx bx-user" />
        Account
      </Link>
      <Link
        to="/settings/notifications"
        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-500 hover:bg-white hover:dark:bg-white/20"
      >
        <i className="bx bx-bell" />
        Notifications
      </Link>
      <Link
        to="/settings/security"
        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-500 hover:bg-white hover:dark:bg-white/20"
      >
        <i className="bx bx-lock" />
        Security
      </Link>
    </div>
  );
};

export default Menu;
