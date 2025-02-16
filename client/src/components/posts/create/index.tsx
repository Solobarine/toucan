import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Camera, Image, Video, X } from "lucide-react";

import TextInput from "../../form/inputs";
import PrimaryButton from "../../primaryButton";
import LargeAvatar from "../../avatar/large";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { dropIn } from "../../../utils/variants";
import { PostSchema } from "../../../schemas/post";
import { createPost } from "../../../features/thunks/posts";

const Create = ({ closeModal }: { closeModal: () => void }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleChange,
    submitForm,
  } = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: PostSchema,
    onSubmit: (values) => {
      console.log(values);
      setSubmitting(true);
      dispatch(createPost({ post: values })).finally(() => {
        setSubmitting(false);
        closeModal();
      });
    },
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-xl bg-white dark:bg-stone-800 rounded-lg shadow-xl overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="space-y-4"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <LargeAvatar className="w-12 h-12" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{user?.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition ease-in-out duration-150"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <TextInput
              name="title"
              type="text"
              placeholder="Add a Title (Optional)"
              handleChange={handleChange}
              error={errors.title}
              touched={touched.title}
              value={values.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-primary focus:border-primary"
              />
              <div className="mt-1 text-right text-sm text-gray-500">
                {values.body.length}/280
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 dark:bg-stone-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {[Camera, Image, Video].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="text-primary hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition ease-in-out duration-150"
                  aria-label={`Add ${Icon.name}`}
                >
                  <Icon className="h-6 w-6" />
                </button>
              ))}
            </div>
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Create;
