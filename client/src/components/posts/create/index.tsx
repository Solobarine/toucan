import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  MapPin,
  Smile,
  Video,
  X,
  Upload,
  Play,
  Trash2,
  Camera,
  FileText,
  Globe,
  Users,
  Lock,
} from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { dropIn } from "../../../utils/variants";
import { PostSchema } from "../../../schemas/post";
import { createPost } from "../../../features/thunks/posts";
import SmallAvatar from "../../avatar/small";
import TextInput from "../../form/inputs";

interface MediaFile {
  id: string;
  file: File;
  type: "image" | "video" | "document";
  preview: string;
}

const privacyOptions = [
  { value: "public", label: "Public", icon: Globe, color: "text-blue-500" },
  { value: "friends", label: "Friends", icon: Users, color: "text-green-500" },
  { value: "private", label: "Only me", icon: Lock, color: "text-neutral-500" },
];

const Create = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  console.log(mediaFiles);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleChange,
    submitForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: PostSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("post[title]", values.title);
      formData.append("post[body]", values.body);
      for (let i = 0; i < Math.min(mediaFiles.length, 5); i++) {
        formData.append("post[media][]", mediaFiles[i].file);
      }
      dispatch(createPost(formData))
        .then(() => closeModal())
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const handleFileUpload = useCallback(
    (files: FileList | null, type: "image" | "video" | "document") => {
      if (!files) return;

      const MAX_IMAGE_SIZE_MB = 2;
      const MAX_VIDEO_SIZE_MB = 20;
      const MAX_DOC_SIZE_MB = 5;

      Array.from(files).forEach((file) => {
        // Validate MIME type
        if (type === "image" && !file.type.startsWith("image/")) {
          alert(`${file.name} is not a valid image`);
          return;
        }
        if (type === "video" && !file.type.startsWith("video/")) {
          alert(`${file.name} is not a valid video`);
          return;
        }
        if (type === "document" && file.type !== "application/pdf") {
          alert(`${file.name} is not a valid PDF document`);
          return;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (type === "image" && fileSizeMB > MAX_IMAGE_SIZE_MB) {
          alert(
            `${file.name} is too large. Max size is ${MAX_IMAGE_SIZE_MB} MB`,
          );
          return;
        }
        if (type === "video" && fileSizeMB > MAX_VIDEO_SIZE_MB) {
          alert(
            `${file.name} is too large. Max size is ${MAX_VIDEO_SIZE_MB} MB`,
          );
          return;
        }
        if (type === "document" && fileSizeMB > MAX_DOC_SIZE_MB) {
          alert(`${file.name} is too large. Max size is ${MAX_DOC_SIZE_MB} MB`);
          return;
        }

        const id = Math.random().toString(36).slice(0, 4);
        const preview = URL.createObjectURL(file);

        setMediaFiles((prev) => [
          ...prev,
          { id, file, type, preview: preview as string },
        ]);
      });
    },
    [],
  );

  const removeMedia = useCallback((id: string) => {
    setMediaFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      const videoFiles = Array.from(files).filter((f) =>
        f.type.startsWith("video/"),
      );

      if (imageFiles.length > 0) {
        const dt = new DataTransfer();
        imageFiles.forEach((f) => dt.items.add(f));
        handleFileUpload(dt.files, "image");
      }

      if (videoFiles.length > 0) {
        const dt = new DataTransfer();
        videoFiles.forEach((f) => dt.items.add(f));
        handleFileUpload(dt.files, "video");
      }
    },
    [handleFileUpload],
  );

  const emojis = [
    "😊",
    "😂",
    "❤️",
    "👍",
    "🎉",
    "🔥",
    "💯",
    "✨",
    "🚀",
    "💪",
    "🌟",
    "🎯",
  ];

  const addEmoji = (emoji: string) => {
    setFieldValue("body", values.body + emoji);
    setShowEmojiPicker(false);
  };

  const characterCount = values.body.length;
  const maxChars = 280;
  const isNearLimit = characterCount > maxChars * 0.8;
  const isOverLimit = characterCount > maxChars;

  return (
    <motion.div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <motion.h2
            className="text-xl font-bold text-neutral-900 dark:text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Create Post
          </motion.h2>
          <motion.button
            onClick={closeModal}
            className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="p-6 relative"
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsDragging(false);
              }
            }}
          >
            {/* User Info */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <SmallAvatar
                  avatar={user?.avatar as string}
                  first_name={user?.first_name || "User"}
                  last_name={user?.last_name || "Name"}
                />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <div className="relative">
                    <select
                      value={privacy}
                      onChange={(e) => setPrivacy(e.target.value)}
                      className="text-sm text-neutral-500 dark:text-neutral-400 bg-transparent border-none outline-none cursor-pointer pr-6 appearance-none"
                    >
                      {privacyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {privacyOptions.find((opt) => opt.value === privacy) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`p-1 rounded-full ${privacyOptions.find((opt) => opt.value === privacy)?.color}`}
                  >
                    {(() => {
                      const Icon = privacyOptions.find(
                        (opt) => opt.value === privacy,
                      )?.icon;
                      return Icon ? <Icon className="w-4 h-4" /> : null;
                    })()}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Title Input */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <TextInput
                name="title"
                type="text"
                placeholder="Add a catchy title..."
                handleChange={handleChange}
                error={errors.title}
                touched={touched.title}
                value={values.title}
                className="border-0 bg-neutral-50 dark:bg-neutral-800 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
            </motion.div>

            {/* Body Input */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <TextInput
                name="body"
                type="textarea"
                placeholder="What's on your mind?"
                handleChange={handleChange}
                error={errors.body}
                touched={touched.body}
                value={values.body}
                className="border-0 bg-neutral-50 dark:bg-neutral-800 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-200 min-h-[120px] resize-none"
              />

              {/* Character Counter */}
              <motion.div
                className="flex justify-end mt-2"
                animate={{
                  color: isOverLimit
                    ? "#ef4444"
                    : isNearLimit
                      ? "#f59e0b"
                      : "#6b7280",
                }}
              >
                <span
                  className={`text-sm font-medium ${isOverLimit ? "text-red-500" : isNearLimit ? "text-amber-500" : "text-neutral-500"}`}
                >
                  {characterCount}/{maxChars}
                </span>
              </motion.div>
            </motion.div>

            {/* Media Preview */}
            <AnimatePresence>
              {mediaFiles.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    {mediaFiles.map((media, index) => (
                      <motion.div
                        key={media.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700"
                      >
                        {media.type === "image" ? (
                          <img
                            src={media.preview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-32 object-cover"
                          />
                        ) : media.type === "document" ? (
                          <object
                            data={media.preview}
                            type="application/pdf"
                            width="100%"
                            height="400px"
                          >
                            <p>
                              PDF preview not available.{" "}
                              <a href={media.preview}>Download</a>
                            </p>
                          </object>
                        ) : (
                          <div className="relative w-full h-32 bg-neutral-900 flex items-center justify-center">
                            <video
                              src={media.preview}
                              className="w-full h-full object-cover"
                              muted
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="w-8 h-8 text-white opacity-80" />
                            </div>
                          </div>
                        )}

                        <motion.button
                          type="button"
                          onClick={() => removeMedia(media.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drag and Drop Overlay */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-purple-500/20 border-2 border-dashed border-purple-500 rounded-xl flex items-center justify-center z-10"
                >
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                    <p className="text-purple-600 font-semibold">
                      Drop your files here
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Media Options */}
            <motion.div
              className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Add to your post
              </span>

              <div className="flex items-center space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files, "image")}
                  className="hidden"
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files, "video")}
                  className="hidden"
                />
                <input
                  ref={documentInputRef}
                  type="file"
                  name="documents"
                  accept=".pdf"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files, "document")}
                  className="hidden"
                />

                <motion.button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Video className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => documentInputRef.current?.click()}
                  className="p-2 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FileText className="w-5 h-5" />
                </motion.button>

                <div className="relative">
                  <motion.button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Smile className="w-5 h-5" />
                  </motion.button>

                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-20"
                      >
                        <div className="grid grid-cols-6 gap-2 w-52">
                          {emojis.map((emoji, index) => (
                            <motion.button
                              key={emoji}
                              type="button"
                              onClick={() => addEmoji(emoji)}
                              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded text-lg transition-colors duration-200"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="button"
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MapPin className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || isOverLimit}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-neutral-300 disabled:to-neutral-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="flex items-center justify-center space-x-2"
                animate={
                  isSubmitting ? { opacity: [1, 0.5, 1] } : { opacity: 1 }
                }
                transition={
                  isSubmitting ? { repeat: Infinity, duration: 1 } : {}
                }
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    <span>Share Post</span>
                  </>
                )}
              </motion.div>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Create;
