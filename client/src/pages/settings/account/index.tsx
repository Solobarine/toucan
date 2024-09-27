import { useFormik } from "formik";
import TextInput from "../../../components/form/inputs";
import PrimaryButton from "../../../components/primaryButton";

const Account = () => {
  const {
    values,
    errors,
    touched,
    submitForm,
    handleChange,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      first_name: "Arthur",
      last_name: "Morgan",
      email: "arthur@gmail.com",
    },
    onSubmit: (values) => {
      setSubmitting(true);
      console.log(values);
    },
  });
  return (
    <section>
      <div className="px-2 pt-16 pb-4 bg-white dark:bg-stone-700">
        <img
          src="#"
          alt=""
          className="w-16 h-16 rounded-full bg-white dark:bg-gray-800"
        />
        <p className="text-3xl font-semibold">Arthur Morgan</p>
        <p className="text-sm">arthur@gmail.com</p>
      </div>
      <div className="grid gap-24 p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="md:basis-56">
            <p className="font-semibold">Personal Info</p>
            <p className="text-sm">Update your Information</p>
          </div>
          <div className="grow">
            <form className="grid gap-4 max-w-lg p-6 border border-white dark:border-gray-100 rounded-3xl">
              <div>
                <label htmlFor="first_name">First Name</label>
                <TextInput
                  name="first_name"
                  value={values.first_name}
                  handleChange={handleChange}
                  placeholder="Enter First Name"
                  error={errors.first_name}
                  touched={touched.first_name}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <TextInput
                  name="last_name"
                  value={values.last_name}
                  handleChange={handleChange}
                  placeholder="Enter Last Name"
                  error={errors.last_name}
                  touched={touched.last_name}
                />
              </div>
              <PrimaryButton className="py-2 w-fit" onClick={submitForm}>
                {isSubmitting ? "Updating..." : "Update Information"}
              </PrimaryButton>
            </form>
          </div>
        </div>
        <div>
          <div className="text-red-600">
            <p className="font-semibold">Delete Account</p>
            <p className="text-sm">Delete Your Account and Clear All Data</p>
          </div>
          <PrimaryButton className="py-2 bg-red-500 mt-6" onClick={() => {}}>
            Delete Account
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Account;
