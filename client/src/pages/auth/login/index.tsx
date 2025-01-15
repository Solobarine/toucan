import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet";
import TextInput from "../../../components/form/inputs";
import { LoginSchema } from "../../../schemas/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { loginUser } from "../../../features/thunks/auth";

const Login = () => {
  const {
    login: { error },
    isLoggedIn,
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
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
    },
  });

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
        <title>Toucan - Login</title>
        <meta name="description" content="Login to your Account" />
        <link rel="canonical" href="" />
      </Helmet>
      <div></div>
      <div className="px-2 py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitting(true);
            submitForm().finally(() => setSubmitting(false));
          }}
          className="max-w-lg mx-auto"
        >
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="mb-10">
            Don't have an Account?{"  "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
          {error && (
            <p className="text-red-500 font-semibold text-sm my-2">{error}</p>
          )}
          <div className="flex flex-col gap-3">
            <TextInput
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              handleChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              handleChange={handleChange}
              error={errors.password}
              touched={touched.password}
            />
            <div className="sm:col-span-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline block w-fit ml-auto"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="px-5 py-2 text-sm rounded-md text-white bg-primary w-fit ">
              {isSubmitting ? "Please Wait..." : "Login"}
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
                loading="lazy"
              />
              Google
            </button>
            <button className="py-2 px-10 flex items-center gap-2 rounded-xl border border-gray-400 dark:border-gray-200">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                className="w-6"
                loading="lazy"
              />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
