import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import Link from "./components/link";
import {
  setSideBarState,
  toggleSideBar,
  toggleTheme,
} from "../../features/slices/settings";
import { logoutUser } from "../../features/thunks/auth";

const SideBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isDarkTheme, isSideBarOpen } = useSelector(
    (state: RootState) => state.settings
  );

  const handleClick = () => {
    dispatch(setSideBarState(false));
  };

  return (
    <aside
      className={`fixed sm:sticky top-0 flex flex-col bg-white dark:bg-stone-900 justify-between h-screen px-1 py-2 transition-all duration-700 shrink-0 z-20 sm:translate-x-0 ${
        isSideBarOpen ? "translate-x-0 w-52" : "-translate-x-52 w-auto"
      }`}
    >
      <div className="grid gap-2">
        <button
          className="text-lg w-fit px-2 py-1"
          onClick={() => dispatch(toggleSideBar())}
        >
          <i className="bx bx-menu" />
        </button>
        <Link
          to="/feed"
          icon="bx bx-layer"
          name="Feed"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <Link
          to="/chats"
          icon="bx bx-message-square-dots"
          name="Chats"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <Link
          to="/calls"
          icon="bx bx-phone"
          name="Calls"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <Link
          to="/status"
          icon="bx bx-hive"
          name="Status"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <button
          className="text-lg w-fit px-2 py-1 flex items-center gap-2"
          onClick={() => dispatch(toggleTheme())}
        >
          {isDarkTheme ? (
            <i className="bx bxs-sun" />
          ) : (
            <i className="bx bx-moon" />
          )}
          {isSideBarOpen && (
            <p className="text-sm">{isDarkTheme ? "Light" : "Dark"}</p>
          )}
        </button>
      </div>
      <div className="grid gap-2">
        <Link
          to="/settings"
          icon="bx bx-cog"
          name="Settings"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <Link
          to="/profile"
          icon="bx bx-user"
          name="Profile"
          isSideBarOpen={isSideBarOpen}
          handleClick={handleClick}
        />
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 text-red-500"
          onClick={() => dispatch(logoutUser())}
        >
          <i className="bx bx-log-out-circle text-lg" />
          {isSideBarOpen && <p className="text-sm">Logout</p>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
