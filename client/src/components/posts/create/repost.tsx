import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { X, Repeat2, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../../types/post";
import { AppDispatch } from "../../../features/store";
import { repostPost } from "../../../features/thunks/posts";

interface CreateRepostModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPost: Post;
}

const CreateRepostModal: React.FC<CreateRepostModalProps> = ({
  isOpen,
  onClose,
  originalPost,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const repostData = {
        original_post_id: originalPost.id as number,
        body: comment.trim() || null,
      };

      await dispatch(repostPost(repostData));
      setComment("");
      onClose();
    } catch (error) {
      console.error("Failed to create repost:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setComment("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-stone-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-600">
          <div className="flex items-center space-x-2">
            <Repeat2 className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Repost
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-600 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Comment Section */}
          <div className="mb-4">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment to your repost (optional)"
                  className="w-full p-3 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-stone-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  rows={3}
                  maxLength={280}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-neutral-400">
                    {comment.length}/280 characters
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Original Post Preview */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Repeat2 className="w-4 h-4 text-neutral-400" />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Reposting
              </span>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-600 rounded-lg p-4 bg-neutral-50 dark:bg-stone-800">
              {/* Original Post Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {originalPost.user && (
                    <span className="text-white font-semibold text-sm">
                      {originalPost.user.first_name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white text-sm">
                    {originalPost.user.first_name +
                      " " +
                      originalPost.user.last_name}
                  </h4>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    {formatDistanceToNow(originalPost.inserted_at, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              {/* Original Post Content */}
              <div className="mb-3">
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  {originalPost.body}
                </p>
              </div>

              {/* Original Post Stats */}
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
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
                      className="h-4 w-4 text-red-500"
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
                      className="h-4 w-4 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                  </span>
                  {originalPost.likes_count}
                </div>
                <p>
                  {originalPost.comments_count}{" "}
                  {originalPost.comments_count !== 1 ? "comments" : "comment"} •{" "}
                  {originalPost.reposts_count}{" "}
                  {originalPost.reposts_count !== 1 ? "reposts" : "repost"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Reposting...</span>
                </>
              ) : (
                <>
                  <Repeat2 className="w-4 h-4" />
                  <span>Repost</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRepostModal;
