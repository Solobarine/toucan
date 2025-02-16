import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet";
import TextInput from "../../../components/form/inputs";
import { RegisterSchema } from "../../../schemas/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { registerUser } from "../../../features/thunks/auth";

const Register = () => {
  const {
    isLoggedIn,
    register: { error, errors: registerErrors },
  } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const {
    values,
    errors,
    setValues,
    touched,
    isSubmitting,
    setSubmitting,
    submitForm,
  } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password_hash: "",
      tos: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(registerUser(values)).finally(() => {
        setSubmitting(false);
      });
    },
  });
  console.log(isSubmitting);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  return isLoggedIn ? (
    <Navigate to="/feed" />
  ) : (
    <section className="grid grid-cols-1 sm:grid-cols-2">
      <Helmet>
        <title>Toucan - Register</title>
        <meta name="description" content="Create an Account" />
        <link rel="canonical" href="" />
      </Helmet>
      <div></div>
      <div className="bg-light dark:bg-stone-900 px-2 py-10 rounded-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="max-w-lg mx-auto"
        >
          <h1 className="text-3xl font-semibold">Create An Account</h1>
          <p className="mb-10">
            Already have an account?{"  "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
          {error && (
            <p className="text-red-500 font-semibold text-sm my-2">{error}</p>
          )}
          {registerErrors && (
            <div className="mb-5">
              {Object.keys(registerErrors).map((key, index) => (
                <div key={index} className="text-red-500">
                  <p>{key.toUpperCase()} :</p>
                  {registerErrors[key].map((value, i) => (
                    <small key={i} className="ml-3">
                      {value}
                    </small>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
            <TextInput
              name="first_name"
              placeholder="First Name"
              value={values.first_name}
              handleChange={handleChange}
              error={errors.first_name}
              touched={touched.first_name}
            />
            <TextInput
              name="last_name"
              placeholder="Last Name"
              value={values.last_name}
              handleChange={handleChange}
              error={errors.last_name}
              touched={touched.last_name}
            />
            <TextInput
              type="email"
              className="md:col-span-2"
              name="email"
              placeholder="Email"
              value={values.email}
              handleChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />
            <TextInput
              type="password"
              className="md:col-span-2"
              name="password_hash"
              placeholder="Password"
              value={values.password_hash}
              handleChange={handleChange}
              error={errors.password_hash}
              touched={touched.password_hash}
            />
            <div className="grid gap-2 sm:col-span-2">
              <span className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  name="tos"
                  id="tos"
                  checked={values.tos}
                  onChange={() =>
                    setValues((values) => ({
                      ...values,
                      tos: !values.tos,
                    }))
                  }
                />
                <p className="text-sm">Accept the Terms</p>
              </span>
              {touched.tos && errors.tos && (
                <p className="text-sm text-red-500 font-semibold">
                  {errors.tos}
                </p>
              )}
            </div>
            <button className="px-5 py-2 text-sm rounded-md text-white bg-primary w-fit ">
              {isSubmitting ? "Creating..." : "Create an Account"}
            </button>
          </div>
        </form>

        <div className="py-6 grid gap-4 max-w-lg mx-auto">
          <span className=" flex items-center gap-4">
            <span className="p-[0.2px] grow bg-primary block" />
            <p>Or Login with</p>
            <span className="p-[0.2px] grow bg-primary block" />
          </span>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button className="py-2 px-10 flex items-center gap-2 rounded-xl border border-gray-400 dark:border-gray-200">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                className="w-6"
              />
              Google
            </button>
            <button className="py-2 px-10 flex items-center gap-2 rounded-xl border border-gray-400 dark:border-gray-200">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                className="w-6"
              />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
