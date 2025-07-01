import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/sideBar";
import { AppDispatch, RootState } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setSideBarState } from "../features/slices/settings";
import { me } from "../features/thunks/auth";
import Loading from "../components/loading";
import NetworkError from "../pages/errors/networkError";
import { ToastContainer } from "react-toastify";
import Navigation from "../components/navigation";

const Main = () => {
  const { isDarkTheme } = useSelector((state: RootState) => state.settings);
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
  }, [dispatch]);

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
          <ToastContainer
            className="fixed top-20 bg-white dark:bg-dark px-4 py-1 rounded-md right-2"
            autoClose={3000}
          />
          <Navigation />
          {!isLoggedIn && error ? <NetworkError message={error} /> : <Outlet />}
        </section>
      </div>
      {/** <Footer /> **/}
    </section>
  );
};

export default Main;
