import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import Home from "../pages/home";
import Main from "../layouts/main";
import Chat from "../pages/chat";
import Splash from "../pages/chat/splash";
import CallSplash from "../pages/call/splash";
import ChatBox from "../pages/chat/chatBox";
import Settings from "../pages/settings";
import Account from "../pages/settings/account";
import Notifications from "../pages/settings/notifications";
import NotificationsPage from "../pages/notifications";
import Security from "../pages/settings/security";
import Call from "../pages/call";
import CallInfo from "../pages/call/callInfo";
import Feed from "../pages/feed";
import Profile from "../pages/profile";
import Post from "../pages/feed/post";
import LoadingPage from "../components/loading";
import Explore from "../pages/explore";
import Network from "../pages/networks";
import Trending from "../pages/trending";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "loading",
        Component: LoadingPage,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/reset-password",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "feed",
        Component: Feed,
      },
      { path: "posts/:id", Component: Post },
      {
        path: "explore",
        Component: Explore,
      },
      { path: "network", Component: Network },
      { path: "trending", Component: Trending },
      {
        path: "notifications",
        Component: NotificationsPage,
      },
      { path: "/u/:id", Component: Profile },
      {
        path: "chats",
        Component: Chat,
        children: [
          {
            index: true,
            Component: Splash,
          },
          {
            path: ":id",
            Component: ChatBox,
          },
        ],
      },
      {
        path: "calls",
        Component: Call,
        children: [
          {
            index: true,
            Component: CallSplash,
          },
          {
            path: ":id",
            Component: CallInfo,
          },
        ],
      },
      {
        path: "settings",
        Component: Settings,
        children: [
          {
            index: true,
            Component: Account,
          },
          {
            path: "account",
            Component: Account,
          },
          {
            path: "notifications",
            Component: Notifications,
          },
          {
            path: "security",
            Component: Security,
          },
        ],
      },
    ],
  },
]);

export default router;
