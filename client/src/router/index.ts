import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import Home from "../pages/home";
import Main from "../layouts/main";
import Chat from "../pages/chat";
import Splash from "../pages/chat/splash";
import ChatBox from "../pages/chat/chatBox";
import Settings from "../pages/settings";
import Account from "../pages/settings/account";
import Notifications from "../pages/settings/notifications";
import NotificationsPage from "../pages/notifications";
import Security from "../pages/settings/security";
import Feed from "../pages/feed";
import Profile from "../pages/profile";
import Post from "../pages/feed/post";
import LoadingPage from "../components/loading";
import Network from "../pages/networks";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import SearchResults from "../pages/search-result";
import FriendsPage from "../pages/networks/friends";
import FriendRequestsPage from "../pages/networks/friend-requests";
import FollowersPage from "../pages/networks/followers";
import FollowingPage from "../pages/networks/following";
import GroupsPage from "../pages/networks/groups";
import NotFound from "../pages/404";
import TermsAndConditions from "../pages/termsAndConditions";
import ContactUs from "../pages/contactUs";
import AboutUs from "../pages/aboutUs";
import PrivacyPolicy from "../pages/privacy";
import AuthCallback from "../pages/auth/callback";
import UpdateRepost from "../pages/repost/update";
import UpdatePost from "../pages/posts/update";

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
      {
        path: "/terms-and-conditions",
        Component: TermsAndConditions,
      },
      { path: "/contact-us", Component: ContactUs },
      { path: "/about-us", Component: AboutUs },
      { path: "/privacy", Component: PrivacyPolicy },
      { path: "/callback", Component: AuthCallback },
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
      { path: "posts/:id/update", Component: UpdatePost },
      { path: "reposts/:id/update", Component: UpdateRepost },
      { path: "network", Component: Network },
      { path: "network/friends", Component: FriendsPage },
      { path: "network/friend-requests", Component: FriendRequestsPage },
      { path: "network/followers", Component: FollowersPage },
      { path: "network/following", Component: FollowingPage },
      { path: "network/groups", Component: GroupsPage },
      {
        path: "notifications",
        Component: NotificationsPage,
      },
      { path: "/u/:id", Component: Profile },
      { path: "/search-results", Component: SearchResults },
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
        path: "settings",
        Component: Settings,
        children: [
          {
            index: true,
            Component: Account,
          },
          {
            path: "profile",
            Component: Account,
          },
          {
            path: "notifications",
            Component: Notifications,
          },
          {
            path: "account",
            Component: Security,
          },
        ],
      },
    ],
  },
  { path: "*", Component: NotFound },
]);

export default router;
