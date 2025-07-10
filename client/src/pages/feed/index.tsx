import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Image, Video, Calendar, Users } from "lucide-react";
import Card from "../../components/posts/card";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFeed } from "../../features/thunks/posts";
import NetworkError from "../errors/networkError";
import RepostCard from "../../components/posts/card/repost";
import PostsLoader from "../../components/posts/loading";
import { getFriendSuggestions } from "../../features/thunks/connections";
import { UserSuggestionLoader } from "../../components/networks/loaders";
import { togglePostModal } from "../../features/slices/settings";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { friendSuggestions } = useSelector((state: RootState) => state.users);
  const {
    posts: { data, error, status },
  } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(getPostsFeed());
    if (user?.id) {
      dispatch(getFriendSuggestions({ id: user?.id as number, limit: 3 }));
    }
  }, [dispatch]);

  if (error) return <NetworkError message="Something went wrong" />;
  return (
    <>
      <Helmet>
        <title>Toucan - Posts Feed</title>
        <meta name="description" content="Posts Feed" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white dark:bg-stone-700 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="px-4 pb-4">
                <div className="flex flex-col items-center -mt-8">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-stone-800 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  </div>
                  <h3 className="mt-2 font-semibold text-stone-900 dark:text-white">
                    Welcome back!
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Here’s what you’ve been up to 👇
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 dark:text-stone-400">
                      Conversations Started
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      13
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 dark:text-stone-400">
                      Friends Replied to You
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      8
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 dark:text-stone-400">
                      Communities Shared In
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6">
            {/* Create Post Section */}
            <div className="bg-white dark:bg-stone-700 rounded-xl shadow-sm p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user!.first_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  className="flex-1 text-left px-4 py-3 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full text-stone-500 dark:text-stone-400 transition-colors"
                  onClick={() => dispatch(togglePostModal(true))}
                >
                  What's on your mind?
                </button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-700">
                <button className="flex items-center space-x-2 px-4 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Event</span>
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {status === "pending" ? (
              <PostsLoader />
            ) : (
              <div className="space-y-6">
                {data.map((post, index) =>
                  post.item_type === "post" ? (
                    <Card key={index} post={post} />
                  ) : (
                    <RepostCard key={index} repost={post} />
                  )
                )}
              </div>
            )}

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Load More Posts
              </button>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3">
            {/* Suggested Connections */}
            <div className="bg-white dark:bg-stone-700 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  People you may know
                </h3>
              </div>
              {friendSuggestions.state === "pending" ? (
                <UserSuggestionLoader count={3} />
              ) : (
                <div className="space-y-4">
                  {friendSuggestions.data.map((user, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {user.first_name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-900 dark:text-white">
                          {user.first_name + " " + user.last_name}
                        </p>
                        {user.username && (
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            @{user.username}
                          </p>
                        )}
                      </div>
                      <button
                        className="px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        onClick={() => navigate(`/u/${user.id}`)}
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-white dark:bg-stone-700 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-4">
              <h3 className="font-semibold text-stone-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-stone-900 dark:text-white">
                    You have{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      3 new
                    </span>{" "}
                    connection requests
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    2 hours ago
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-stone-900 dark:text-white">
                    Your post received{" "}
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      15 likes
                    </span>
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    4 hours ago
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-stone-900 dark:text-white">
                    New job opportunities in your area
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    1 day ago
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Feed;
