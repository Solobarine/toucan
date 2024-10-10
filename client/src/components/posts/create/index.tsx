import { useFormik } from "formik";
import TextInput from "../../form/inputs";
import PrimaryButton from "../../primaryButton";

const Create = ({ closeModal }: { closeModal: () => void }) => {
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
        className="w-full max-w-xl mx-auto bg-light dark:bg-stone-700 p-4 sm:p-8 grid gap-3 rounded-2xl shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Create a Post</h1>
          <button
            className="text-2xl text-red-600 hover:opacity-80 focus:opacity-80"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <TextInput
          name="title"
          type="text"
          placeholder="Enter Post Title"
          handleChange={handleChange}
          error={errors.title}
          touched={touched.title}
          value={values.title}
        />
        <TextInput
          name="content"
          type="textarea"
          placeholder="Write...."
          handleChange={handleChange}
          error={errors.content}
          touched={touched.content}
          value={values.content}
        />
        <PrimaryButton type="submit">Create Post</PrimaryButton>
      </form>
    </div>
  );
};

export default Create;
