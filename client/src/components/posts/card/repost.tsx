import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Ellipsis, Heart, MessageCircle, Share, Repeat2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Repost } from "../../../types/post";
import { capitalizeText } from "../../../utils";
import { AppDispatch } from "../../../features/store";
import {
  incrementLikeCount,
  decrementLikeCount,
} from "../../../features/slices/posts";
import { likeContent, unlikeContent } from "../../../features/thunks/likes";
import SmallAvatar from "../../avatar/small";
import RepostOptions from "../repostOptions";
import MediaDisplay from "../mediaDisplay";

const RepostCard = ({ repost }: { repost: Repost }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);

  const goToOriginalPost = () => {
    navigate(`/posts/${repost.original_post.id}`);
  };

  const handleLike = () => {
    if (repost.original_post.is_liked_by_user) {
      dispatch(unlikeContent(repost.original_post_id as number)).finally(() =>
        dispatch(
          decrementLikeCount({
            post_id: repost.original_post.id as number,
            context: "posts",
          }),
        ),
      );
    } else {
      const data = {
        content_id: repost.original_post_id as number,
        content_type: "post",
      };
      dispatch(likeContent(data)).finally(() =>
        dispatch(
          incrementLikeCount({
            post_id: repost.original_post.id as number,
            context: "posts",
          }),
        ),
      );
    }
  };

  return (
    <>
      <div className="relative bg-white dark:bg-stone-700 rounded-xl max-w-xl w-full mx-auto shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="p-4">
          {/* Repost Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                {repost.user.avatar ? (
                  <img
                    src={repost.user.avatar}
                    alt={
                      capitalizeText(repost.user?.first_name) +
                      " " +
                      capitalizeText(repost.user?.last_name)
                    }
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  repost.user && (
                    <span className="text-white font-semibold text-lg">
                      {repost.user?.first_name.charAt(0).toUpperCase()}
                    </span>
                  )
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Repeat2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    Reposted
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  {repost.user?.first_name + " " + repost.user?.last_name}
                </h3>
                {repost.inserted_at && (
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    {formatDistanceToNow(repost.inserted_at, {
                      addSuffix: true,
                    })}
                  </p>
                )}
              </div>
            </div>
            <button
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              onClick={() => setShowMore(true)}
            >
              <Ellipsis className="w-5 h-5" />
            </button>
          </div>

          {/* Repost Comment (if any) */}
          {repost.body && (
            <div className="mb-4">
              <p className="text-neutral-900 dark:text-white leading-relaxed">
                {repost.body}
              </p>
            </div>
          )}

          {/* Original Post */}
          <div className="border border-neutral-200 dark:border-neutral-600 rounded-lg p-4 mb-4 bg-neutral-50 dark:bg-stone-800">
            <div className="flex items-center space-x-3 mb-3">
              <SmallAvatar
                avatar={repost.original_post.user.avatar}
                first_name={repost.original_post.user.first_name}
                last_name={repost.original_post.user.last_name}
              />
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white text-sm">
                  {repost.original_post.user.first_name +
                    " " +
                    repost.original_post.user?.last_name}
                </h4>
                {repost.original_post.inserted_at && (
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    {formatDistanceToNow(repost.original_post.inserted_at, {
                      addSuffix: true,
                    })}
                  </p>
                )}
              </div>
            </div>
            <div className="cursor-pointer" onClick={goToOriginalPost}>
              <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm">
                {repost.original_post.body}
              </p>
            </div>
            <MediaDisplay media={repost.original_post.media} />
          </div>

          {/* Engagement Stats */}
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
              {repost.original_post.likes_count}
            </div>
            <p>
              {repost.original_post.comments_count}{" "}
              {repost.original_post.comments_count !== 1
                ? "comments"
                : "comment"}{" "}
              • {repost.original_post.reposts_count}{" "}
              {repost.original_post.reposts_count !== 1 ? "reposts" : "repost"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pb-4 px-4">
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              repost.original_post.is_liked_by_user
                ? "text-red-500"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            }`}
            onClick={handleLike}
          >
            {repost.original_post.is_liked_by_user ? (
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
            onClick={goToOriginalPost}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-not-allowed"
            disabled
          >
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
        {showMore && (
          <RepostOptions
            repostId={repost.id}
            repostOwner={repost.user}
            closeModal={() => setShowMore(false)}
          />
        )}
      </div>
    </>
  );
};

export default RepostCard;
