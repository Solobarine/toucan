import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import { type ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { Github, Chrome, ArrowRight, Shield, Users, Zap } from "lucide-react";
import TextInput from "../../../components/form/inputs";
import { RegisterSchema } from "../../../schemas/auth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../features/store";
import { registerUser } from "../../../features/thunks/auth";

const Register = () => {
  const {
    isLoggedIn,
    register: { error, errors: registerErrors },
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
      first_name: "",
      last_name: "",
      email: "",
      password_hash: "",
      tos: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      setSubmitting(true);
      dispatch(registerUser(values)).finally(() => {
        setIsLoading(false);
        setSubmitting(false);
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
    console.log(`Register with ${provider}`);
    // Implement social registration logic
  };

  if (isLoggedIn) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-purple-50 to-blue-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex items-center justify-center p-4">
      <Helmet>
        <title>Toucan - Join the Community</title>
        <meta
          name="description"
          content="Create your Toucan account and join the community"
        />
      </Helmet>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=32&width=32"
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
                Join millions of people
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  sharing their stories
                </span>
              </h2>
              <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
                Create your account and start connecting with friends, sharing
                moments, and discovering amazing content.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    Connect Instantly
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Find and connect with friends in seconds
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    Lightning Fast
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Real-time updates and instant messaging
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    Secure & Private
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Your privacy is our top priority
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-stone-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-700 p-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=24&width=24"
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
                    Create account
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Sign in
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

                {registerErrors && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 space-y-2">
                    {Object.keys(registerErrors).map((key, index) => (
                      <div key={index}>
                        <p className="text-red-600 dark:text-red-400 font-medium text-sm uppercase">
                          {key}:
                        </p>
                        {registerErrors[key].map((value, i) => (
                          <p
                            key={i}
                            className="text-red-600 dark:text-red-400 text-sm ml-3"
                          >
                            • {value}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      name="first_name"
                      label="First name"
                      placeholder="Enter first name"
                      value={values.first_name}
                      handleChange={handleChange}
                      error={errors.first_name}
                      touched={touched.first_name}
                    />
                    <TextInput
                      name="last_name"
                      label="Last name"
                      placeholder="Enter last name"
                      value={values.last_name}
                      handleChange={handleChange}
                      error={errors.last_name}
                      touched={touched.last_name}
                    />
                  </div>

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
                    name="password_hash"
                    label="Password"
                    placeholder="Create a strong password"
                    value={values.password_hash}
                    handleChange={handleChange}
                    error={errors.password_hash}
                    touched={touched.password_hash}
                  />

                  <div className="space-y-2">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="tos"
                        checked={values.tos}
                        onChange={() =>
                          setValues((values) => ({
                            ...values,
                            tos: !values.tos,
                          }))
                        }
                        className="w-4 h-4 mt-1 text-blue-600 bg-stone-100 border-stone-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-stone-800 focus:ring-2 dark:bg-stone-700 dark:border-stone-600"
                      />
                      <span className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {touched.tos && errors.tos && (
                      <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                        {errors.tos}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting || isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Create account</span>
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
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSocialLogin("google")}
                    className="flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-600 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Chrome className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      Google
                    </span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin("github")}
                    className="flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-600 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Github className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      GitHub
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
