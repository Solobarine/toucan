import React, { useState } from "react";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/slices/settings";

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

type User = {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  theme: "light" | "dark";
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
  const [user, _] = useState<User>({
    name: "Solly",
    username: "@solly_explorer",
    bio: "Adventurer | Photographer | Nature Enthusiast",
    avatar: "https://via.placeholder.com/150",
    followers: 1200,
    following: 500,
    theme: "light",
  });

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-24 h-24 rounded-full border-4 border-primary"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="opacity-75">{user.username}</p>
            <p className="opacity-90 mt-2">{user.bio}</p>
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
          <button className="p-2 ml-4 rounded-full hover:bg-gray-200">
            <i className="bx bx-cog text-2xl" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4 text-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">{user.followers}</h2>
          <p className="opacity-85">Followers</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.following}</h2>
          <p className="opacity-85">Following</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{posts.length}</h2>
          <p className="opacity-85">Posts</p>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-dark rounded-lg shadow-md p-4">
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
