import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Socket } from "phoenix";
import { AnimatePresence } from "framer-motion";

import SideBar from "../components/sideBar";
import { AppDispatch, RootState } from "../features/store";
import { setSideBarState, togglePostModal } from "../features/slices/settings";
import { me } from "../features/thunks/auth";
import Loading from "../components/loading";
import NetworkError from "../pages/errors/networkError";
import Navigation from "../components/navigation";
import { getSocket, initSocket } from "../socket";
import Create from "../components/posts/create";
import { appendNotifications } from "../features/slices/notifications";

import "react-toastify/dist/ReactToastify.min.css";

const Main = () => {
  const { isDarkTheme, isPostModalOpen } = useSelector(
    (state: RootState) => state.settings
  );
  const {
    user,
    isLoggedIn,
    me: { status, error, statusCode },
  } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const socketRef = useRef<Socket | null>(getSocket());

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

  // Subscribe to Notifications Channel
  useEffect(() => {
    if (socketRef.current == null) {
      const token = localStorage.getItem("auth_token");
      socketRef.current = initSocket(token!);
    }

    if (!socketRef.current || !user) return;

    const notificationsChannel = socketRef.current!.channel(
      `notifications:${user.id}`
    );

    notificationsChannel
      .join()
      .receive("ok", () => {
        console.log("connected to notifications channel");
      })
      .receive("error", () => {
        console.log("unable to connect");
      });

    notificationsChannel.on("new_notification", (response) => {
      dispatch(appendNotifications(response));
    });
  }, [dispatch, user]);

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
    <section className="main font-itim bg-neutral-200 dark:bg-dark text-gray-800 dark:text-gray-100">
      <div className="flex items-start min-h-svh">
        <SideBar />
        <section
          className="grow min-h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ToastContainer
            autoClose={3000}
            limit={5}
            theme={isDarkTheme ? "dark" : "light"}
          />
          <Navigation />
          {!isLoggedIn && error ? (
            <NetworkError message={error} />
          ) : (
            <>
              <AnimatePresence>
                {isPostModalOpen && (
                  <Create closeModal={() => dispatch(togglePostModal(false))} />
                )}
              </AnimatePresence>
              <Outlet />
            </>
          )}
        </section>
      </div>
      {/** <Footer /> **/}
    </section>
  );
};

export default Main;
