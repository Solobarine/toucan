import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../../types/post";
import { AppDispatch } from "../../../features/store";
import {
  incrementLikeCount,
  decrementLikeCount,
} from "../../../features/slices/posts";
import { likeContent, unlikeContent } from "../../../features/thunks/likes";
import CreateRepostModal from "../create/repost";
import LargeAvatar from "../../avatar/large";
import Options from "../options";

const Card = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const goToPost = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleLike = () => {
    if (post.is_liked_by_user) {
      dispatch(unlikeContent(post.id as number)).finally(() =>
        dispatch(
          decrementLikeCount({ post_id: post.id as number, context: "posts" })
        )
      );
    } else {
      const data = { content_id: post.id as number, content_type: "post" };
      dispatch(likeContent(data)).finally(() =>
        dispatch(
          incrementLikeCount({ post_id: post.id as number, context: "posts" })
        )
      );
    }
  };

  return (
    <>
      <div className="relative bg-white dark:bg-stone-700 rounded-xl max-w-xl w-full mx-auto shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <LargeAvatar
                avatar={post.user.avatar}
                first_name={post.user.first_name}
                last_name={post.user.last_name}
              />
              <div>
                <Link
                  to={`/u/${post.user_id}`}
                  className="font-semibold text-neutral-900 dark:text-white"
                >
                  {post.user.first_name + " " + post.user.last_name}
                </Link>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  {formatDistanceToNow(post.inserted_at, { addSuffix: true })}
                </p>
              </div>
            </div>
            <button
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              <Ellipsis className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-4">
            <div className="mb-4">
              <p className="text-neutral-900 dark:text-white leading-relaxed">
                {post.body}
              </p>
            </div>
            {post.body && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Post content"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
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
        <div className="flex items-center justify-between pb-4 px-4">
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              post.is_liked_by_user
                ? "text-red-500"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            }`}
            onClick={handleLike}
          >
            {post.is_liked_by_user ? (
              <>
                <Heart
                  fill="full"
                  stroke="full"
                  className="w-5 h-5 stroke-red-500 fill-red-500"
                />
                <span className="text-sm font-medium">Unlike</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">Like</span>
              </>
            )}
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={goToPost}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
        {isMoreOpen && (
          <Options
            postId={post.id!}
            postOwner={post.user}
            closeModal={() => setIsMoreOpen(false)}
          />
        )}
      </div>
      <CreateRepostModal
        originalPost={post}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Card;
