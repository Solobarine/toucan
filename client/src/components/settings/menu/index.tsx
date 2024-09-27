import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../../features/slices/settings";
import Link from "../link";
import { AppDispatch, RootState } from "../../../features/store";

const Menu = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSideBarOpen } = useSelector((state: RootState) => state.settings);

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
      <button
        onClick={() => dispatch(toggleSideBar())}
        className="sm:hidden text-primary font-semibold text-3xl absolute right-0 transform top-1/2 -translate-y-1/2"
      >
        {<i className={`bx bx-${isSideBarOpen ? "x" : "menu"}`} />}
      </button>
    </div>
  );
};

export default Menu;
