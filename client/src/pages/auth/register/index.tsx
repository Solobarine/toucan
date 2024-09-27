import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet";
import TextInput from "../../../components/form/inputs";
import { RegisterSchema } from "../../../schemas/auth";

const Register = () => {
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
      password: "",
      tos: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2">
      <Helmet>
        <title>Toucan - Register</title>
        <meta name="description" content="Create an Account" />
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
          <h1 className="text-3xl font-semibold">Create An Account</h1>
          <p>
            Already have an account?{"  "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 mt-10">
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
              name="password"
              placeholder="Password"
              value={values.password}
              handleChange={handleChange}
              error={errors.password}
              touched={touched.password}
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
              {isSubmitting ? "Creating an Account..." : "Create an Account"}
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
