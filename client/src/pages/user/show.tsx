import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeText } from "../../utils";
import { Helmet } from "react-helmet";
import { getProfile } from "../../features/thunks/auth";
import NetworkError from "../errors/networkError";
import {
  Calendar,
  Camera,
  Ellipsis,
  Link,
  MapPin,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import Card from "../../components/posts/card";
import { getUserPosts } from "../../features/thunks/posts";

const tabs = [
  { id: "posts", label: "Posts", count: 42 },
  { id: "about", label: "About", count: null },
  { id: "photos", label: "Photos", count: 128 },
  { id: "connections", label: "Connections", count: 1234 },
];

const ShowUser: React.FC = () => {
  const { user, profile } = useSelector((state: RootState) => state.auth);
  const { userPosts } = useSelector((state: RootState) => state.posts);
  const dispatch: AppDispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    Promise.all([dispatch(getProfile()), dispatch(getUserPosts())]);
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
              <div className="w-32 h-32 rounded-full bg-white dark:bg-stone-800 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {user && (
                    <span className="text-white font-bold text-4xl">
                      {user?.first_name.charAt(0).toUpperCase() +
                        user?.last_name.charAt(0).toUpperCase()}
                    </span>
                  )}
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
              <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
                {capitalizeText(user?.first_name) +
                  " " +
                  capitalizeText(user?.last_name)}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-stone-500 dark:text-stone-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined March 2020</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Link className="w-4 h-4" />
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    sarahjohnson.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-stone-900 dark:text-white">
                    1,234
                  </div>
                  <div className="text-sm text-stone-500 dark:text-stone-400">
                    Connections
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-stone-900 dark:text-white">
                    567
                  </div>
                  <div className="text-sm text-stone-500 dark:text-stone-400">
                    Following
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-stone-900 dark:text-white">
                    89
                  </div>
                  <div className="text-sm text-stone-500 dark:text-stone-400">
                    Posts
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6 md:mt-0">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center space-x-2 px-6 py-2 font-medium rounded-lg transition-colors ${
                  isFollowing
                    ? "bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600"
                    : "bg-primary hover:bg-primary/80 text-white"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{isFollowing ? "Following" : "Connect"}</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600 font-medium rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </button>
              <button className="p-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors">
                <Ellipsis className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-stone-200 dark:border-stone-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className="ml-2 px-2 py-1 text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "posts" && (
            <div className="space-y-6">
              {userPosts.data.map((post, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-stone-800 rounded-xl shadow-sm overflow-hidden"
                >
                  <Card post={post} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-6">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
                About
              </h2>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                Passionate software engineer with 5+ years of experience
                building scalable web applications. I love creating
                user-friendly interfaces and solving complex technical
                challenges. When I'm not coding, you can find me hiking, reading
                tech blogs, or experimenting with new technologies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-stone-900 dark:text-white mb-3">
                    Experience
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-stone-900 dark:text-white">
                        Senior Software Engineer
                      </h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        TechCorp • 2022 - Present
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-900 dark:text-white">
                        Software Engineer
                      </h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        StartupXYZ • 2020 - 2022
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-stone-900 dark:text-white mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "Node.js",
                      "Python",
                      "AWS",
                      "Docker",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "photos" && (
            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-6">
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

          {activeTab === "connections" && (
            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-900 dark:text-white">
                        User {index + 1}
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        @luka
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
};

export default ShowUser;
