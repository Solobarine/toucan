import { formatDistanceToNow } from "date-fns";
import { Post } from "../../../types/post";
import { capitalizeText } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../features/store";
import { useDispatch } from "react-redux";
import { cachePost } from "../../../features/slices/posts";

const Card = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-stone-700 rounded-xl max-w-xl w-full mx-auto shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/placeholder.svg"
              alt=""
              className="w-12 h-12 rounded-full object-cover bg-gray-200 dark:bg-gray-700"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {capitalizeText(post.user.first_name)}{" "}
                {capitalizeText(post.user.last_name)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(post.inserted_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-200 mb-2">{post.body}</p>
          <img
            src="/placeholder.svg"
            alt=""
            className="w-full h-64 object-cover bg-gray-100 dark:bg-stone-800 rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
            </span>
            {post.likes_count}
          </div>
          <p>
            {post.comments_count}{" "}
            {post.comments_count !== 1 ? "comments" : "comment"} &bull;{" "}
            {post.reposts_count}{" "}
            {post.reposts_count !== 1 ? "reposts" : "repost"}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between py-2 px-4 border-t border-stone-200 dark:border-stone-800">
        <button
          className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-full transition-colors ${
            post.is_liked_by_user
              ? "text-blue-500"
              : "text-gray-500 dark:text-light"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          {post.is_liked_by_user ? "Unlike" : "Like"}
        </button>
        <button
          className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors"
          onClick={() => {
            dispatch(cachePost(post));
            navigate(`/posts/${post.id}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          Comment
        </button>
        <button className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Repost
        </button>
        <button className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default Card;
