import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Image, MapPin, Smile, Video } from "lucide-react";

import TextInput from "../../../components/form/inputs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { dropIn } from "../../../utils/variants";
import { PostSchema } from "../../../schemas/post";
import { getPost, updatePost } from "../../../features/thunks/posts";
import SmallAvatar from "../../../components/avatar/small";
import LoadingPage from "../../../components/loading";

const UpdatePost = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { post } = useSelector((state: RootState) => state.posts);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleChange,
    setValues,
    submitForm,
  } = useFormik({
    initialValues: {
      title: post.data?.title || "",
      body: post.data?.body || "",
    },
    validationSchema: PostSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(updatePost({ id: parseInt(id!), data: values })).finally(() => {
        setSubmitting(false);
      });
    },
  });

  useEffect(() => {
    dispatch(getPost(parseInt(id!)));
  }, [dispatch, id]);

  // Populate form when post is loaded
  useEffect(() => {
    if (post.status === "idle" && post.data) {
      setValues({
        title: post.data.title || "",
        body: post.data.body || "",
      });
    }
  }, [post, setValues]);

  if (post.status == "pending") return <LoadingPage />;

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white dark:bg-stone-800 rounded-xl shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
            Update Post
          </h2>
        </div>

        {/* Content */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="p-4"
        >
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <SmallAvatar
              avatar={user!.avatar}
              first_name={user!.first_name}
              last_name={user!.last_name}
            />
            <div>
              <p className="font-medium text-stone-900 dark:text-white">You</p>
              <select className="text-sm text-stone-500 dark:text-stone-400 bg-transparent border-none outline-none">
                <option>Public</option>
                <option>Friends</option>
                <option>Only me</option>
              </select>
            </div>
          </div>
          <TextInput
            name="title"
            type="text"
            placeholder="Add a Title (Optional)"
            handleChange={handleChange}
            error={errors.title}
            touched={touched.title}
            value={values.title}
          />
          <div>
            <TextInput
              name="body"
              type="textarea"
              placeholder="What happened today?"
              handleChange={handleChange}
              error={errors.body}
              touched={touched.body}
              value={values.body}
              className="mt-4"
            />
            <div className="mt-1 text-right text-sm text-stone-500">
              {values.body.length}/280
            </div>
          </div>
          {/* Media Options */}
          <div className="flex items-center justify-between mt-4 p-3 bg-stone-50 dark:bg-stone-700 rounded-lg">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Add to your post
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Video className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdatePost;
