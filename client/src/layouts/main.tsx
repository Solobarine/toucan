import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import SideBar from "../components/sideBar";
import { AppDispatch, RootState } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setSideBarState, toggleSideBar } from "../features/slices/settings";
import SmallAvatar from "../components/avatar/small";
import { me } from "../features/thunks/auth";
import Loading from "../components/loading";
import NetworkError from "../pages/errors/networkError";

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
          <div className="sticky top-0 bg-white dark:bg-stone-900 py-2 px-4 flex items-center justify-between">
            <SmallAvatar src="/favicon-32x32.png" alt="Toucan Logo" />
            <div className="text-2xl text-gray-600 dark:text-gray-200 flex items-center gap-2">
              <button
                className="w-6 h-6 grid place-items-center"
                onClick={() => navigate("/settings")}
              >
                <i className="bx bx-cog" />
              </button>
              <button
                className="w-6 h-6 grid place-items-center"
                onClick={() => navigate("/notifications")}
              >
                <i className="bx bx-bell" />
              </button>
              <button
                className="sm:hidden w-6 h-6 grid place-items-center"
                onClick={() => dispatch(toggleSideBar())}
              >
                <i className={isSideBarOpen ? "bx bx-x" : "bx bx-menu"} />
              </button>
            </div>
          </div>
          {!isLoggedIn && error ? <NetworkError message={error} /> : <Outlet />}
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default Main;
