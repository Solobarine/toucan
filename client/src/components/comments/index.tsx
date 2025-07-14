import React, { useState } from "react";
import { Heart, MessageCircle, MoreHorizontal, Reply } from "lucide-react";
import NewComment from "./new";
import { Comment as CommentInterface } from "../../types/comment";
import { capitalizeText } from "../../utils";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment }: { comment: CommentInterface }) => {
  const [replyState, setReplyState] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">
            {comment.user.first_name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                {capitalizeText(comment.user.first_name)}{" "}
                {capitalizeText(comment.user.last_name)}
              </h4>
              <span className="text-stone-500 dark:text-stone-400 text-xs">
                {formatDistanceToNow(comment.inserted_at)} ago
              </span>
            </div>
            <button className="p-1 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Comment Text */}
          <p className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed mb-3">
            {comment.text}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs transition-colors duration-200 ${
                  isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-stone-600 dark:text-stone-400 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span>Like</span>
              </button>

              <div className="w-px h-4 bg-stone-300 dark:bg-stone-600" />

              <button
                onClick={() => setReplyState(!replyState)}
                className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </div>

            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-xs text-stone-500 dark:text-stone-400 hover:text-blue-500 hover:underline transition-all duration-200"
            >
              {showReplies ? "Hide Replies" : "Load Replies"}
            </button>
          </div>

          {/* Reply Form */}
          {replyState && (
            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
              <NewComment
                comment_id={comment.id}
                post_id={comment.content_id as number}
              />
            </div>
          )}

          {/* Replies Section */}
          {showReplies && (
            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
              <div className="space-y-3">
                {/* Placeholder for replies - you can map through actual replies here */}
                <div className="text-stone-500 dark:text-stone-400 text-sm italic">
                  No replies yet
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
