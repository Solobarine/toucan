import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import { type ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { Eye, Github, Chrome, ArrowRight, Sparkles } from "lucide-react";
import TextInput from "../../../components/form/inputs";
import { LoginSchema } from "../../../schemas/auth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../features/store";
import { loginUser } from "../../../features/thunks/auth";
import OAuth from "../../../components/oauth";

const Login = () => {
  const {
    login: { error },
    isLoggedIn,
  } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      dispatch(loginUser(values)).finally(() => {
        setIsLoading(false);
      });
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  if (isLoggedIn) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-blue-50 to-purple-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex items-center justify-center p-4">
      <Helmet>
        <title>Toucan - Welcome Back</title>
        <meta name="description" content="Sign in to your Toucan account" />
      </Helmet>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <img
                  src="/favicon-32x32.png"
                  alt="Toucan"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Toucan
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Social Network
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
                Welcome back to your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  social world
                </span>
              </h2>
              <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
                Connect with friends, share your thoughts, and discover amazing
                content from people around the world.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200 dark:border-stone-700">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  Smart Feed
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  Personalized content just for you
                </p>
              </div>
              <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200 dark:border-stone-700">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  Privacy First
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  Your data, your control
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-stone-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-700 p-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <img
                    src="/favicon-32x32.png"
                    alt="Toucan"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Toucan
                  </h1>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    Welcome back
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    submitForm().finally(() => setSubmitting(false));
                  }}
                  className="space-y-6"
                >
                  <TextInput
                    type="email"
                    name="email"
                    label="Email address"
                    placeholder="Enter your email"
                    value={values.email}
                    handleChange={handleChange}
                    error={errors.email}
                    touched={touched.email}
                  />

                  <TextInput
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={values.password}
                    handleChange={handleChange}
                    error={errors.password}
                    touched={touched.password}
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-stone-100 border-stone-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-stone-800 focus:ring-2 dark:bg-stone-700 dark:border-stone-600"
                      />
                      <span className="text-sm text-stone-600 dark:text-stone-400">
                        Remember me
                      </span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting || isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200 dark:border-stone-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                      Or continue with
                    </span>
                  </div>
                </div>
                <OAuth />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
