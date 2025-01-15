import { useFormik } from "formik";
import TextInput from "../../form/inputs";
import PrimaryButton from "../../primaryButton";
import LargeAvatar from "../../avatar/large";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";

const Create = ({ closeModal }: { closeModal: () => void }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const { values, errors, touched, handleChange, submitForm } = useFormik({
    initialValues: {
      title: "",
      content: "",
      images: [],
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <div
      className="overlay absolute bg-dark/20 inset-0 flex flex-col place-content-center"
      onClick={(e: any) => {
        console.log(e.target);
        if (e.target.classList.contains("overlay")) {
          closeModal();
        }
      }}
    >
      <form
        onSubmit={submitForm}
        className="w-full max-w-xl mx-auto bg-light dark:bg-stone-700 py-2 px-4 grid gap-3 rounded-2xl shadow-lg"
      >
        <div className="relative flex items-start justify-between">
          <div className="flex items-start gap-2">
            <LargeAvatar className="w-12 h-12" />
            <div>
              <p className="text-lg">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm">@aubery</p>
            </div>
          </div>
          <button
            className="text-4xl text-red-600 hover:opacity-80 focus:opacity-80"
            onClick={closeModal}
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
          name="content"
          type="textarea"
          placeholder="What happened today?"
          handleChange={handleChange}
          error={errors.content}
          touched={touched.content}
          value={values.content}
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
          <PrimaryButton type="submit">Create Post</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default Create;
