import { useFormik } from "formik";
import TextInput from "../../form/inputs";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { capitalizeText } from "../../../utils";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { values, errors, handleChange, touched, submitForm } = useFormik({
    initialValues: {
      first_name: capitalizeText(user?.first_name) ?? "",
      last_name: capitalizeText(user?.last_name) ?? "",
      username: user?.username ?? "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="border-b pb-4 mb-5">
      <h2 className="text-lg font-semibold">Update Account Details</h2>
      <form onSubmit={submitForm} className="mt-4 space-y-4">
        <TextInput
          name="first_name"
          type="text"
          placeholder="Enter First Name"
          error={errors.first_name}
          touched={touched.first_name}
          handleChange={handleChange}
          value={values.first_name}
        />
        <TextInput
          name="last_name"
          type="text"
          placeholder="Enter Last Name"
          error={errors.last_name}
          touched={touched.last_name}
          handleChange={handleChange}
          value={values.last_name}
        />
        <TextInput
          name="username"
          type="text"
          placeholder="Enter Username"
          error={errors.username}
          touched={touched.username}
          handleChange={handleChange}
          value={values.username}
        />
        <button
          type="submit"
          className="bg-primary hover:opacity-95 text-white py-2 rounded-lg mt-4 w-full"
        >
          Update Account Details
        </button>
      </form>
    </div>
  );
};

export default Account;
