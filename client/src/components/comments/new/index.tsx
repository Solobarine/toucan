import React, { useState } from "react";
import { Send, Loader2, X } from "lucide-react";
import { useFormik } from "formik";
import { CommentSchema } from "../../../schemas/comment";
import { AppDispatch, RootState } from "../../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { createReply } from "../../../features/thunks/comments";
import SmallAvatar from "../../avatar/small";

const NewComment = ({ comment_id }: { comment_id: number | undefined }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const { values, errors, touched, handleChange, submitForm, resetForm } =
    useFormik({
      initialValues: {
        content_id: comment_id as number,
        text: "",
      },
      validationSchema: CommentSchema,
      onSubmit: async (values) => {
        setIsSubmitting(true);
        try {
          await dispatch(createReply({ comment: values }));
          resetForm();
        } catch (error) {
          console.error("Failed to create reply:", error);
        } finally {
          setIsSubmitting(false);
        }
      },
    });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      values.text.trim() &&
      !isSubmitting
    ) {
      e.preventDefault();
      submitForm();
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-700 rounded-xl p-4 border border-stone-200 dark:border-stone-600">
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <SmallAvatar
          avatar={user!.avatar}
          first_name={user!.first_name}
          last_name={user!.last_name}
          size="xs"
          type="repost"
        />

        {/* Reply Form */}
        <div className="flex-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="space-y-3"
          >
            {/* Text Input */}
            <div className="relative">
              <textarea
                name="text"
                value={values.text}
                onChange={handleChange}
                onKeyUp={handleKeyPress}
                placeholder="Write a reply..."
                rows={values.text ? 3 : 1}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            {/* Error Message */}
            {errors.text && touched.text && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <X className="w-4 h-4" />
                <span>{errors.text}</span>
              </div>
            )}

            {/* Action Buttons */}
            {values.text.trim() && (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="px-3 py-1.5 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-lg transition-colors duration-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!values.text.trim() || isSubmitting}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    !values.text.trim() || isSubmitting
                      ? "bg-stone-300 dark:bg-stone-600 text-stone-500 dark:text-stone-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Replying...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Reply</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
