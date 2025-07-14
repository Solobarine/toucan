import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Link, Smile, Send, X, Loader2 } from "lucide-react";
import { createComment } from "../../../features/thunks/comments";
import { AppDispatch } from "../../../features/store";

interface CreateProps {
  content_id: number;
}

const Create: React.FC<CreateProps> = ({ content_id }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const {
    values,
    setValues,
    handleChange,
    isSubmitting,
    setSubmitting,
    submitForm,
  } = useFormik({
    initialValues: {
      content_id: content_id,
      text: "",
    },
    onSubmit: (values) => {
      setSubmitting(true);

      dispatch(
        createComment({ comment: { ...values, content_id: content_id } })
      )
        .then(() => {
          setValues((prev) => ({ ...prev, text: "" }));
          setShowEmojiPicker(false);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const handleEmojiClick = (emojiData: any) => {
    setValues((prev) => ({
      ...prev,
      text: prev.text + emojiData.emoji,
    }));
  };

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

  console.log(values);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-start gap-4">
        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">U</span>
        </div>

        {/* Input and Actions */}
        <div className="flex-1 space-y-3">
          {/* Text Input */}
          <div className="relative">
            <input
              type="text"
              name="text"
              value={values.text}
              onChange={handleChange}
              onKeyUp={handleKeyPress}
              placeholder="Write a comment..."
              className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Link Button */}
              <button
                type="button"
                title="Add link"
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-blue-500 transition-all duration-200"
              >
                <Link className="w-4 h-4" />
              </button>

              {/* Emoji Button */}
              <div className="relative">
                <button
                  type="button"
                  title="Add emoji"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    showEmojiPicker
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-yellow-500"
                  }`}
                >
                  <Smile className="w-4 h-4" />
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 z-50">
                    <div className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                      {/* Close Button */}
                      <button
                        onClick={() => setShowEmojiPicker(false)}
                        className="absolute top-2 right-2 z-10 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme={
                          document.documentElement.classList.contains("dark")
                            ? Theme.DARK
                            : Theme.LIGHT
                        }
                        width={300}
                        height={400}
                        searchDisabled={false}
                        skinTonesDisabled={false}
                        previewConfig={{
                          showPreview: false,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={submitForm}
              disabled={!values.text.trim() || isSubmitting}
              title={isSubmitting ? "Sending..." : "Send comment"}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                !values.text.trim() || isSubmitting
                  ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay to close emoji picker when clicking outside */}
      {showEmojiPicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  );
};

export default Create;
