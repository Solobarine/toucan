import { useDispatch, useSelector } from "react-redux";
import Comment from "../../../components/comments";
import Create from "../../../components/comments/create";
import { AppDispatch, RootState } from "../../../features/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPost } from "../../../features/thunks/posts";
import { capitalizeText } from "../../../utils";
import { formatDistanceToNow } from "date-fns";

const Post = () => {
  const { id } = useParams();
  const { data } = useSelector((state: RootState) => state.posts.post);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id as string));
  }, [dispatch, id]);

  return (
    <section className="bg-white dark:bg-stone-700 p-6 rounded-xl max-w-2xl mx-auto my-8 shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            alt=""
            className="w-12 h-12 rounded-full object-cover bg-gray-300 dark:bg-gray-600"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {capitalizeText(data?.user.first_name)}{" "}
              {capitalizeText(data?.user.last_name)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(
                (data?.inserted_at as string) ?? Date.now(),
                { addSuffix: true }
              )}
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
      <div className="py-4">
        <p className="text-gray-800 dark:text-gray-200 mb-4">{data?.body}</p>
        <img
          src="/placeholder.svg"
          alt=""
          className="w-full h-64 object-cover bg-gray-200 dark:bg-stone-800 rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
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
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
            </svg>
          </span>
          {data?.likes_count}
        </div>
        <p>
          {data?.comments_count}{" "}
          {data?.comments_count !== 1 ? "comments" : "comment"} &bull;{" "}
          {data?.reposts_count}{" "}
          {data?.reposts_count !== 1 ? "reposts" : "repost"}
        </p>
      </div>
      <div className="flex items-center justify-between py-3 border-y border-gray-200 dark:border-stone-900">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            data?.is_liked_by_user
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
          {data?.is_liked_by_user ? "Unlike" : "Like"}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors">
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
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors">
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
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors">
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
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Comments
          </h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Most Recent
          </button>
        </div>
        <Create content_id={data?.id as number} />
        <div className="space-y-4 mt-6">
          {data?.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Post;
