import { useEffect, useState } from "react";
import Card from "../../components/posts/card";
import Create from "../../components/posts/create";
import { Helmet } from "react-helmet";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFeed } from "../../features/thunks/posts";
import { AnimatePresence } from "framer-motion";
import NetworkError from "../errors/networkError";
import { Image, TrendingUp, Video, Calendar, Users } from "lucide-react";
import RepostCard from "../../components/posts/card/repost";

const Feed = () => {
  const [isCreatePost, setIsCreatePost] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const {
    posts: { data, error, status },
  } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(getPostsFeed());
  }, []);

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
                    Stay connected with your network
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 dark:text-stone-400">
                      Profile views
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      127
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 dark:text-stone-400">
                      Post impressions
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      1,234
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="mt-6 bg-white dark:bg-stone-700 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  Trending
                </h3>
              </div>
              <div className="space-y-3">
                <div className="cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-700 p-2 rounded-lg transition-colors">
                  <p className="text-sm font-medium text-stone-900 dark:text-white">
                    #TechInnovation
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    12.5K posts
                  </p>
                </div>
                <div className="cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-700 p-2 rounded-lg transition-colors">
                  <p className="text-sm font-medium text-stone-900 dark:text-white">
                    #RemoteWork
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    8.2K posts
                  </p>
                </div>
                <div className="cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-700 p-2 rounded-lg transition-colors">
                  <p className="text-sm font-medium text-stone-900 dark:text-white">
                    #Sustainability
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    5.7K posts
                  </p>
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
                  <span className="text-white font-semibold text-lg">U</span>
                </div>
                <button
                  className="flex-1 text-left px-4 py-3 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full text-stone-500 dark:text-stone-400 transition-colors"
                  onClick={() => setIsCreatePost(true)}
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
              <div>Loading...</div>
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
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-900 dark:text-white">
                        User {i}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Software Engineer
                      </p>
                    </div>
                    <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
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
      <AnimatePresence>
        {isCreatePost && <Create closeModal={() => setIsCreatePost(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Feed;
