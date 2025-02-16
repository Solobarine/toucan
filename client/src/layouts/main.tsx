import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import { AppDispatch, RootState } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setSideBarState, toggleSideBar } from "../features/slices/settings";
import { me } from "../features/thunks/auth";
import Loading from "../components/loading";
import NetworkError from "../pages/errors/networkError";
import { ToastContainer } from "react-toastify";
import { Bell, Menu, Settings, X } from "lucide-react";

const Main = () => {
  const { isDarkTheme, isSideBarOpen } = useSelector(
    (state: RootState) => state.settings
  );
  const {
    isLoggedIn,
    me: { status, error, statusCode },
  } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  // Set Theme
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  useEffect(() => {
    dispatch(me());
  }, []);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isSwipeRight = distance < -minSwipeDistance;
    const isSwipeLeft = distance > minSwipeDistance;

    console.log(distance, isSwipeRight, isSwipeLeft);

    if (isSwipeRight) {
      dispatch(setSideBarState(true));
    } else if (isSwipeLeft) {
      dispatch(setSideBarState(false));
    }

    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const navigate = useNavigate();

  const token = localStorage.getItem("auth_token");
  if (!token) return <Navigate to="login" />;

  if (status === "pending") return <Loading />;

  if (statusCode == 401) return <Navigate to="/login" />;

  return (
    <section className="main font-itim bg-light dark:bg-dark text-gray-800 dark:text-gray-100">
      <div className="flex items-start min-h-svh">
        <SideBar />
        <section
          className="grow min-h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ToastContainer />
          <header className="sticky top-0 z-20 bg-white dark:bg-stone-800 py-3 px-4 flex items-center justify-between border-b border-gray-200 dark:border-stone-700 shadow-sm">
            <div className="flex items-center gap-2">
              <img
                src="/favicon-32x32.png"
                alt="Toucan"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="font-semibold text-gray-900 dark:text-white hidden sm:block">
                Toucan
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors duration-200"
                onClick={() => navigate("/settings/account")}
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors duration-200"
                  onClick={() => navigate("/notifications")}
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-stone-800"></span>
              </div>

              <button
                className="sm:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors duration-200"
                onClick={() => toggleSideBar()}
                aria-label={isSideBarOpen ? "Close menu" : "Open menu"}
              >
                {isSideBarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </header>
          {!isLoggedIn && error ? <NetworkError message={error} /> : <Outlet />}
        </section>
      </div>
      {/** <Footer /> **/}
    </section>
  );
};

export default Main;
