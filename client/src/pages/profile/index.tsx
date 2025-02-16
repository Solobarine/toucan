import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/slices/settings";
import { capitalizeText } from "../../utils";
import { Helmet } from "react-helmet";
import { getProfile } from "../../features/thunks/auth";
import NetworkError from "../errors/networkError";
import PrimaryButton from "../../components/primaryButton";
import SecondaryButton from "../../components/secondaryButton";

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

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  if (profile.error && profile.status === "failed")
    return <NetworkError message={profile.error} />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Helmet>
        <title>Toucan - User Profile Page</title>
        <meta name="description" content="User Profile" />
      </Helmet>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center flex-wrap gap-y-3">
          <img
            src="https://via.placeholder.com/150"
            alt="User avatar"
            className="w-24 h-24 rounded-full border-4 border-primary"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-semibold">
              {capitalizeText(user?.first_name)}{" "}
              {capitalizeText(user?.last_name)}
            </h1>
            <p className="opacity-75">{user?.email}</p>
            <p className="opacity-90 mt-2">
              {"Adventurer | Photographer | Nature Enthusiast"}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:opacity-90"
          >
            {isDarkTheme ? (
              <i className="bx bx-moon text-2xl" />
            ) : (
              <i className="bx bx-sun text-2xl" />
            )}
          </button>
          <button className="p-2 ml-4 rounded-full">
            <i className="bx bx-cog text-2xl" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4 text-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">{profile.data?.followers}</h2>
          <p className="opacity-85">Followers</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile.data?.following}</h2>
          <p className="opacity-85">Following</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile.data?.posts_count}</h2>
          <p className="opacity-85">Posts</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 p-2">
        <PrimaryButton>Follow</PrimaryButton>
        <PrimaryButton className="bg-red-600">Unfollow</PrimaryButton>
        <PrimaryButton className="bg-white text-purple-600 dark:bg-stone-800 border border-primary p-6">
          Message
        </PrimaryButton>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-stone-900 rounded-lg shadow-md p-4">
          {posts.map((post) => (
            <div key={post.id} className="mb-6">
              <div className="flex items-center mb-2">
                <img
                  src={post.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{post.user}</p>
                  <p className="opacity-85 text-sm">{post.timestamp}</p>
                </div>
              </div>
              <p>{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="rounded-lg mt-4" />
              )}
              <div className="flex justify-between mt-4">
                <div className="flex items-center">
                  <i className="bx bx-heart text-red-500 mr-2" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <i className="bx bx-message-square-dots text-gray-500 mr-2" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center mt-6">
        <button className="text-blue-500 hover:underline">
          See More Activity
        </button>
      </footer>
    </div>
  );
};

export default Profile;
