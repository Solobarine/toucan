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
      {
        path: "notifications",
        Component: NotificationsPage,
      },
      {
        path: "profile",
        Component: Profile,
      },
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
