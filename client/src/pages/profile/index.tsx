import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/slices/settings";
import { capitalizeText } from "../../utils";
import { Helmet } from "react-helmet";
import { getProfile } from "../../features/thunks/auth";
import NetworkError from "../errors/networkError";

type Post = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
};

const posts: Post[] = [
  {
    id: 1,
    user: "Solly",
    avatar: "https://via.placeholder.com/150",
    content: "Exploring the beauty of nature 🌿",
    image: "https://via.placeholder.com/600x300",
    likes: 102,
    comments: 20,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: "Solly",
    avatar: "https://via.placeholder.com/150",
    content: "Had a fantastic day hiking! 🥾",
    likes: 78,
    comments: 15,
    timestamp: "5 hours ago",
  },
];

const Profile: React.FC = () => {
  const { isDarkTheme } = useSelector((state: RootState) => state.settings);
  const { user, profile } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (profile.error && profile.status === "failed")
    return <NetworkError message={profile.error} />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Helmet>
        <title>Toucan - {capitalizeText(user?.first_name)}'s Profile</title>
        <meta
          name="description"
          content={`${capitalizeText(user?.first_name)} ${capitalizeText(
            user?.last_name
          )}'s Profile on Toucan`}
        />
      </Helmet>
      <div className="bg-white dark:bg-stone-700 rounded-lg shadow-lg mb-6 overflow-hidden">
        <div className="p-6">
          <header className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
              <img
                src="https://via.placeholder.com/150"
                alt="User avatar"
                className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-blue-400"
              />
              <div className="mt-4 md:mt-0 md:ml-4">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                  {capitalizeText(user?.first_name)}{" "}
                  {capitalizeText(user?.last_name)}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {user?.email}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-200">
                  Adventurer | Photographer | Nature Enthusiast
                </p>
              </div>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {isDarkTheme ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
              <button className="p-2 ml-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {profile.data?.followers}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Followers</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {profile.data?.following}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Following</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {profile.data?.posts_count}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Posts</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
              Follow
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200">
              Unfollow
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-stone-800 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-stone-800/80 transition-colors duration-200">
              Message
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-700 rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === "posts"
                ? "bg-gray-100 dark:bg-stone-900 font-semibold"
                : "hover:bg-gray-50 dark:hover:bg-stone-900/80"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === "photos"
                ? "bg-gray-100 dark:bg-stone-900 font-semibold"
                : "hover:bg-gray-50 dark:hover:bg-stone-900/80"
            }`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === "about"
                ? "bg-gray-100 dark:bg-stone-900 font-semibold"
                : "hover:bg-gray-50 dark:hover:bg-stone-900/80"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
        </div>

        <div className="p-6">
          {activeTab === "posts" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Recent Posts
              </h2>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={post.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {post.user}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {post.content}
                  </p>
                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post"
                      className="rounded-lg mb-4 w-full"
                    />
                  )}
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "photos" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <img
                    key={i}
                    src={`https://via.placeholder.com/300x300?text=Photo+${i}`}
                    alt={`Photo ${i}`}
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                About Me
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Passionate about exploring the world and capturing its beauty
                through my lens. When I'm not hiking or photographing
                landscapes, you can find me experimenting with new recipes or
                curled up with a good book.
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-white">
                Interests
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Nature Photography</li>
                <li>Hiking and Outdoor Adventures</li>
                <li>Sustainable Living</li>
                <li>Travel</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center mt-6">
        <button className="text-blue-500 hover:underline">
          See More Activity
        </button>
      </footer>
    </div>
  );
};

export default Profile;
