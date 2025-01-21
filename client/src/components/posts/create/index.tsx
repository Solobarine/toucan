import { useFormik } from "formik";
import { motion } from "framer-motion";
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
      setSubmitting(true);
      dispatch(createPost({ post: values })).finally(() =>
        setSubmitting(false)
      );
    },
  });

  return (
    <motion.div
      className="overlay absolute bg-dark/20 inset-0 flex flex-col place-content-center"
      onClick={(e: any) => {
        if (e.target.classList.contains("overlay")) {
          closeModal();
        }
      }}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="w-full max-w-xl mx-auto bg-light dark:bg-stone-700 py-2 px-4 grid gap-3 rounded-2xl shadow-lg"
      >
        <div className="relative flex items-start justify-between">
          <div className="flex items-start gap-2">
            <LargeAvatar className="w-12 h-12" />
            <div>
              <p className="text-lg">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm">@{user?.email}</p>
            </div>
          </div>
          <button
            className="text-4xl text-red-600 hover:opacity-80 focus:opacity-80"
            onClick={closeModal}
            type="button"
          >
            &times;
          </button>
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
        <TextInput
          name="body"
          type="textarea"
          placeholder="What happened today?"
          handleChange={handleChange}
          error={errors.body}
          touched={touched.body}
          value={values.body}
        />
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-2xl">
            <button className="border-none text-primary">
              <i className="bx bxs-camera" />
            </button>

            <button className="border-none text-primary">
              <i className="bx bxs-image-alt" />
            </button>
            <button className="border-none text-primary">
              <i className="bx bxs-video-recording" />
            </button>
          </div>
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            className={`${isSubmitting && "bg-gray-600 opacity-60"}`}
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </PrimaryButton>
        </div>
      </form>
    </motion.div>
  );
};

export default Create;
