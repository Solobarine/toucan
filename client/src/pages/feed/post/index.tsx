import { useDispatch, useSelector } from "react-redux";
import Comment from "../../../components/comments";
import Create from "../../../components/comments/create";
import { AppDispatch, RootState } from "../../../features/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost } from "../../../features/thunks/posts";
import { getComments as handleGetComments } from "../../../features/thunks/comments";
import { capitalizeText } from "../../../utils";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircleMore, Repeat } from "lucide-react";
import CreateRepostModal from "../../../components/posts/create/repost";
import { likeContent, unlikeContent } from "../../../features/thunks/likes";
import {
  decrementLikeCount,
  incrementLikeCount,
} from "../../../features/slices/posts";
import LargeAvatar from "../../../components/avatar/large";

const Post = () => {
  const { id } = useParams();
  const [showRepost, toggleShowRepost] = useState(false);

  const {
    post: { data, comments },
    getComments,
  } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  console.log(comments);
  useEffect(() => {
    Promise.all([
      dispatch(getPost(id as string)),
      dispatch(handleGetComments({ id: parseInt(id!), content_type: "post" })),
    ]);
  }, [dispatch, id]);

  const handleLike = () => {
    if (data!.is_liked_by_user) {
      dispatch(unlikeContent(data!.id as number)).finally(() =>
        dispatch(
          decrementLikeCount({ post_id: data!.id as number, context: "post" })
        )
      );
    } else {
      const body = { content_id: data!.id as number, content_type: "post" };
      dispatch(likeContent(body)).finally(() =>
        dispatch(
          incrementLikeCount({ post_id: data!.id as number, context: "post" })
        )
      );
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-stone-700 p-6 rounded-xl max-w-2xl mx-auto my-8 shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <LargeAvatar
              avatar={user!.avatar}
              first_name={user!.first_name}
              last_name={user!.last_name}
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
            className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-full transition-colors ${
              data?.is_liked_by_user
                ? "text-red-500"
                : "text-gray-500 dark:text-light"
            }`}
            onClick={handleLike}
          >
            <Heart />
            {data?.is_liked_by_user ? "Unlike" : "Like"}
          </button>
          <button className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors">
            <MessageCircleMore />
            Comment
          </button>
          <button
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-full text-gray-500 dark:text-light transition-colors"
            onClick={() => toggleShowRepost(true)}
          >
            <Repeat /> Repost
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
          {getComments.status === "pending" ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-4 mt-6">
              {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </section>
      <CreateRepostModal
        originalPost={data!}
        isOpen={showRepost}
        onClose={() => toggleShowRepost(false)}
      />
    </>
  );
};

export default Post;
