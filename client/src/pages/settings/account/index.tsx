import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { Camera, Disc } from "lucide-react";
import TextInput from "../../../components/form/inputs";
import PrimaryButton from "../../../components/primaryButton";
import { FormEvent } from "react";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    setSubmitting,
    submitForm,
  } = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      username: user?.username || "",
      bio: user?.bio || "",
      location: "",
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  console.log(values);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    submitForm().finally(() => setSubmitting(false));
  };

  return (
    <section className="min-h-screen px-4 sm:px-20 py-10">
      <Helmet>
        <title>Toucan - Account Settings</title>
        <meta
          name="description"
          content="Manage your Toucan account settings"
        />
      </Helmet>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Profile Information
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Update your personal information and user details
          </p>
        </div>

        {/* Profile Picture */}
        <div className="bg-white dark:bg-stone-700 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Profile Picture
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover bg-stone-200 dark:bg-stone-800"
              />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <p className="text-stone-700 dark:text-stone-300 mb-3">
                Upload a new user picture. Recommended size: 400x400px
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">
                  Upload New
                </button>
                <button className="px-4 py-2 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-900 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white dark:bg-stone-700 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-6">
            Basic Information
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <TextInput
              label="First Name"
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              handleChange={handleChange}
              value={values.first_name}
              error={errors.first_name}
              touched={touched.first_name}
            />

            <TextInput
              label="Last Name"
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              handleChange={handleChange}
              value={values.last_name}
              error={errors.last_name}
              touched={touched.last_name}
            />

            <TextInput
              label="username"
              type="text"
              name="username"
              placeholder="Enter Username"
              handleChange={handleChange}
              value={values.username}
              error={errors.username}
              touched={touched.username}
            />

            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter Email"
              handleChange={handleChange}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />

            <TextInput
              label="Bio"
              type="textarea"
              name="bio"
              placeholder="Enter Bio"
              handleChange={handleChange}
              value={values.bio}
              error={errors.bio}
              touched={touched.bio}
            />

            <TextInput
              label="location"
              type="text"
              name="location"
              placeholder="Enter Location"
              handleChange={handleChange}
              value={values.location}
              error={errors.location}
              touched={touched.location}
            />
            <PrimaryButton
              className="flex items-center gap-3 w-fit px-10"
              disabled={isSubmitting}
            >
              <Disc />
              Update Information
            </PrimaryButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Account;
