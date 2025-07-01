"use client";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Card from "../../components/posts/card";

import {
  Calendar,
  Camera,
  Ellipsis,
  Link,
  MapPin,
  MessageCircleMore,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { capitalizeText } from "../../utils";
import { format } from "date-fns";
import { getUserPosts } from "../../features/thunks/posts";
import { useParams } from "react-router-dom";
import { getProfile } from "../../features/thunks/auth";

export default function Profile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();

  const { profile } = useSelector((state: RootState) => state.auth);
  const { userPosts } = useSelector((state: RootState) => state.posts);

  const tabs = [
    { id: "posts", label: "Posts", count: 42 },
    { id: "photos", label: "Photos", count: 128 },
    { id: "connections", label: "Connections", count: 1234 },
  ];

  useEffect(() => {
    Promise.all([dispatch(getProfile(id)), dispatch(getUserPosts(id))]);
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Helmet>
        <title>Sarah Johnson - Toucan</title>
        <meta name="description" content="Sarah Johnson's Profile" />
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
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-1">
                @sarajohnson
              </p>

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
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    1,234
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Connections
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    567
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Following
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    89
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
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
                    ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <User className="w-4 h-4" />
                <span>{isFollowing ? "Following" : "Connect"}</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 font-medium rounded-lg transition-colors">
                <MessageCircleMore className="w-4 h-4" />
                <span>Message</span>
              </button>
              <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                <Ellipsis className="w-5 h-5" />
              </button>
            </div>
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
                {tab.count && (
                  <span className="ml-2 px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full">
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
            <div className="">
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

          {activeTab === "connections" && (
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
