import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Card from "../../components/posts/card";

import {
  Calendar,
  Camera,
  Check,
  CircleCheck,
  CircleX,
  Ellipsis,
  Fan,
  Flag,
  MapPin,
  MessageCircleMore,
  UserRound,
  UserRoundCheck,
  UserRoundMinus,
  UserRoundX,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { capitalizeText } from "../../utils";
import { format } from "date-fns";
import { getUserPosts } from "../../features/thunks/posts";
import { useParams } from "react-router-dom";
import { getProfile } from "../../features/thunks/auth";
import {
  getFriends,
  sendFriendRequest as handleSendFriendRequest,
  cancelFriendRequest as handleCancelFriendRequest,
  acceptFriendRequest as handleAcceptFriendRequest,
  rejectFriendRequest as handleRejectFriendRequest,
} from "../../features/thunks/connections";
import { getUserMetrics } from "../../features/thunks/user";
import ProfileLoading from "../../components/profile/loading";
import ApiErrorPage from "../../components/apiError";

export default function Profile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [showMore, setShowMore] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { profile, user } = useSelector((state: RootState) => state.auth);
  const { userPosts } = useSelector((state: RootState) => state.posts);
  const {
    metrics,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useSelector((state: RootState) => state.users);

  const tabs = [
    { id: "posts", label: "Posts", count: metrics.data.total_posts },
    { id: "photos", label: "Photos", count: 0 },
    {
      id: "friends",
      label: "Friends",
      count: metrics.data.followers_count + metrics.data.friends_count,
    },
  ];

  useEffect(() => {
    Promise.all([
      dispatch(getProfile(id as string)),
      dispatch(getUserPosts(id as string)),
      dispatch(getUserMetrics(parseInt(id as string))),
    ]);
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getFriends({ id: parseInt(id as string), page: 1, per: 20 }));
  }, [dispatch, id]);

  if (profile.status == "pending") return <ProfileLoading />;

  if (profile.status == "failed")
    return <ApiErrorPage statusCode={profile.statusCode} />;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Helmet>
        <title>
          {profile.data
            ? profile.data?.first_name + " " + profile.data?.last_name
            : "User"}
          's Profile
        </title>
        <meta
          name="description"
          content={`Toucan Profile of ${
            profile.data
              ? profile.data?.first_name + " " + profile.data?.last_name
              : "User"
          }`}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Photo */}
        <div className="relative">
          <div className="h-48 md:h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-xl">
            <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white dark:bg-neutral-800 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">
                    {capitalizeText(profile.data?.first_name[0]) +
                      capitalizeText(profile.data?.last_name[0])}
                  </span>
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                {capitalizeText(profile.data?.first_name) +
                  " " +
                  capitalizeText(profile.data?.last_name)}
              </h1>
              {profile.data?.username && (
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-1">
                  @{profile.data.username}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  {profile.data?.inserted_at && (
                    <span>
                      Joined {format(profile.data.inserted_at, "MMMM yyyy")}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    {metrics.data.friends_count}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Friends
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    {metrics.data.following_count}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Following
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    {metrics.data.total_posts}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Posts
                  </div>
                </div>
              </div>
            </div>

            {profile.data?.id !== user?.id && (
              <div className="relative flex items-center space-x-3 mt-6 md:mt-0">
                {profile.data?.friend_request_sent && (
                  <>
                    <button
                      onClick={() =>
                        dispatch(
                          handleCancelFriendRequest(profile.data?.id as number)
                        )
                      }
                      className="flex items-center space-x-2 px-6 py-2 font-medium rounded-lg transition-colors border border-red-500 text-red-500"
                    >
                      {cancelFriendRequest.state == "pending" ? (
                        <>
                          <Fan />
                          <span>Cancelling</span>
                        </>
                      ) : (
                        <>
                          <X className="w-6 h-6" />
                          <span>Cancel Friend Request</span>
                        </>
                      )}
                    </button>
                  </>
                )}
                {profile.data?.friend_request_received && (
                  <>
                    <button
                      className="flex items-center space-x-2 px-6 py-2 font-medium rounded-lg transition-colors border border-purple-500 text-purple-500"
                      onClick={() =>
                        dispatch(
                          handleAcceptFriendRequest(profile.data?.id as number)
                        )
                      }
                    >
                      {acceptFriendRequest.state == "pending" ? (
                        <Fan className="w-4 h-4" />
                      ) : (
                        <CircleCheck className="w-4 h-4" />
                      )}
                      <span>
                        {acceptFriendRequest.state == "pending"
                          ? "Accepting..."
                          : "Accept Request"}
                      </span>
                    </button>
                    <button
                      className="flex items-center space-x-2 px-6 py-2 font-medium rounded-lg transition-colors border border-red-500 text-red-500"
                      onClick={() =>
                        dispatch(
                          handleRejectFriendRequest(profile.data?.id as number)
                        )
                      }
                    >
                      {rejectFriendRequest.state == "pending" ? (
                        <Fan className="w-4 h-4" />
                      ) : (
                        <CircleX className="w-4 h-4" />
                      )}
                      <span>
                        {rejectFriendRequest.state == "pending"
                          ? "Rejecting..."
                          : "Reject Request"}
                      </span>
                    </button>
                  </>
                )}
                {!profile.data?.is_friend &&
                  !profile.data?.friend_request_received &&
                  !profile.data?.friend_request_sent && (
                    <button
                      className="flex items-center gap-2 px-6 py-2 font-medium rounded-lg transition-colors bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() =>
                        dispatch(
                          handleSendFriendRequest(parseInt(id as string))
                        )
                      }
                    >
                      {sendFriendRequest.state == "pending" ? (
                        <>
                          <Fan className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <UserRound className="w-4 h-4" />
                          <span>Connect</span>
                        </>
                      )}
                    </button>
                  )}
                {profile.data?.is_friend && (
                  <button className="flex items-center space-x-2 px-6 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 font-medium rounded-lg transition-colors">
                    <MessageCircleMore className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                )}
                <button
                  className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                  onClick={() => setShowMore(!showMore)}
                >
                  <Ellipsis className="w-5 h-5" />
                </button>
                <div
                  className={`bg-white dark:bg-neutral-700 shadow-lg absolute w-60 right-0 top-12 flex flex-col gap-3 p-4 rounded-md ${
                    showMore ? "z-20" : "-z-20"
                  } transition-all duration-700`}
                >
                  {profile.data?.is_friend && (
                    <button className="flex items-center gap-3">
                      <UserRoundMinus /> Unfriend
                    </button>
                  )}
                  {profile.data?.friend_request_sent && (
                    <button className="flex items-center gap-3">
                      <UserRoundX /> Cancel Friend Request
                    </button>
                  )}
                  {profile.data?.friend_request_received && (
                    <button className="flex items-center gap-3">
                      <UserRoundCheck /> Accept Friend Request
                    </button>
                  )}
                  {profile.data?.friend_request_received && (
                    <button className="flex items-center gap-3">
                      <CircleX /> Reject Friend Request
                    </button>
                  )}
                  {profile.data?.is_following ? (
                    <button className="flex items-center gap-3">
                      <X /> Unfollow
                    </button>
                  ) : (
                    <button className="flex items-center gap-3">
                      <Check /> Follow
                    </button>
                  )}
                  <button className="flex gap-3">
                    <Flag /> Report / Block
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-neutral-200 dark:border-neutral-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                {tab.label}

                <span className="ml-2 px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "posts" && (
            <div className="space-y-5">
              {userPosts.data.map((post, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  <Card post={post} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "photos" && (
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "friends" && (
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-900 dark:text-white">
                        User {index + 1}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Software Engineer
                      </p>
                    </div>
                    <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
