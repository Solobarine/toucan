import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Repeat2, User } from "lucide-react";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";
import { AppDispatch, RootState } from "../../../features/store";
import { getRepost, updateRepost } from "../../../features/thunks/posts";

const UpdateRepost = () => {
  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const [comment, setComment] = useState("");

  const {
    repost: { status, data },
  } = useSelector((state: RootState) => state.posts);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    submitForm().then(() => setSubmitting(false));
  };

  const handleClose = () => {
    if (!isSubmitting) {
    }
  };

  useEffect(() => {
    dispatch(getRepost(id!));
  }, []);

  useEffect(() => {
    if (status == "idle" && data) {
      setComment(data.body!);
      setValues(() => ({ body: data.body! }));
    }
  }, [data, status]);

  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .min(2, "Minimum of 2 Characters")
      .max(280, "Maximum of 280 Characters")
      .required("Body is Required"),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    submitForm,
    setValues,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateRepost({ id: id!, data: values }));
    },
  });

  return (
    <div className="flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-stone-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-600">
          <div className="flex items-center space-x-2">
            <Repeat2 className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Repost
            </h2>
          </div>
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
                  value={values.body}
                  name="body"
                  onChange={handleChange}
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
                {errors.body && touched.body && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {errors.body}
                  </p>
                )}
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
                  {data?.original_post.user && (
                    <span className="text-white font-semibold text-sm">
                      {data?.original_post.user.first_name
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white text-sm">
                    {data?.original_post.user.first_name +
                      " " +
                      data?.original_post.user.last_name}
                  </h4>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    {/**formatDistanceToNow(
                      data?.original_post.inserted_at as string,
                      {
                        addSuffix: true,
                      }
                    )**/}
                  </p>
                </div>
              </div>

              {/* Original Post Content */}
              <div className="mb-3">
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  {data?.original_post.body}
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
                  {data?.original_post.likes_count}
                </div>
                <p>
                  {data?.original_post.comments_count}{" "}
                  {data?.original_post.comments_count !== 1
                    ? "comments"
                    : "comment"}{" "}
                  • {data?.original_post.reposts_count}{" "}
                  {data?.original_post.reposts_count !== 1
                    ? "reposts"
                    : "repost"}
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
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Repeat2 className="w-4 h-4" />
                  <span>Update Repost</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRepost;
