import { useFormik } from "formik";
import { FormEvent, useState } from "react";

const UpdateEmail = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    values: { currentEmail, newEmail, confirmNewEmail },
    errors,
    touched,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      currentEmail: "arthur@gmail.com",
      newEmail: "",
      confirmNewEmail: "",
    },
    onSubmit: (values) => console.log(values),
  });

  const handleChangeEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (newEmail !== confirmNewEmail) {
      setError("New email and confirmation do not match.");
      return;
    }

    if (!newEmail || !confirmNewEmail) {
      setError("Both email fields are required.");
      return;
    }

    // Simulating an API call to change email
    // Replace this with actual API logic
    setMessage("Email changed successfully!");
    setError(""); // Clear any previous errors

    // Clear fields after successful change
    resetForm();
  };

  return (
    <div className="border-b pb-4 mb-5">
      <h2 className="text-lg font-semibold">Update Email</h2>
      <form onSubmit={handleChangeEmail} className="mt-4 space-y-4">
        <div className="grid gap-2">
          <input
            type="email"
            value={currentEmail}
            onChange={handleChange}
            className={`border rounded-md ${
              touched.currentEmail && errors.currentEmail
                ? "border-red-500"
                : ""
            } p-2 h-9 dark:bg-gray-700 focus:outline-primary ${
              touched.currentEmail && !errors.currentEmail
                ? "border-green-500"
                : ""
            }`}
            placeholder="Enter your current email"
            required
          />
          {touched.currentEmail && errors.currentEmail && (
            <p className="text-sm text-red-500 font-semibold">
              {errors.currentEmail}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={handleChange}
            className={`border rounded-md ${
              touched.newEmail && errors.newEmail ? "border-red-500" : ""
            } p-2 h-9 dark:bg-gray-700 focus:outline-primary ${
              touched.newEmail && !errors.newEmail ? "border-green-500" : ""
            }`}
            placeholder="Enter your new email"
            required
          />
          {touched.newEmail && errors.newEmail && (
            <p className="text-sm text-red-500 font-semibold">
              {errors.newEmail}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <input
            type="email"
            value={confirmNewEmail}
            onChange={handleChange}
            className={`border rounded-md ${
              touched.confirmNewEmail && errors.confirmNewEmail
                ? "border-red-500"
                : ""
            } p-2 h-9 dark:bg-gray-700 focus:outline-primary ${
              touched.confirmNewEmail && !errors.confirmNewEmail
                ? "border-green-500"
                : ""
            }`}
            placeholder="Confirm your new email"
            required
          />
          {touched.confirmNewEmail && errors.confirmNewEmail && (
            <p className="text-sm text-red-500 font-semibold">
              {errors.confirmNewEmail}
            </p>
          )}
        </div>

        {/* Error message display */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white py-2 rounded-lg mt-4 w-full"
        >
          Change Email
        </button>
      </form>
    </div>
  );
};

export default UpdateEmail;
