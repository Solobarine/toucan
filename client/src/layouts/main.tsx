import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import SideBar from "../components/sideBar";
import { AppDispatch, RootState } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setSideBarState } from "../features/slices/settings";

const Main = () => {
  const { isDarkTheme } = useSelector((state: RootState) => state.settings);
  // Set Theme
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const dispatch: AppDispatch = useDispatch();
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
          <Outlet />
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default Main;
