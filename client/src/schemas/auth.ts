import * as Yup from "yup";
export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum of 2 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("First Name is Required"),
  last_name: Yup.string()
    .min(2, "Minimum of 2 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("Last Name is Required"),
  email: Yup.string()
    .email("Enter a valid Email")
    .required("Email is Required"),
  password_hash: Yup.string()
    .min(8, "Minimum of 8 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("Password is Required"),
  tos: Yup.boolean()
    .is([true], "Accept Terms and Conditions")
    .required("Please Check the box"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid Email")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Minimum of 8 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("Password is Required"),
});

export const UpdatePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .min(8, "Minimum of 8 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("Current Password is Required"),
  new_password: Yup.string()
    .min(8, "Minimum of 8 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("Password is Required"),
  confirm_password: Yup.string()
    .equals([Yup.ref("new_password")], "Passwords do not match")
    .notRequired(),
});

export const UpdateProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum of 2 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("First Name is Required"),
  last_name: Yup.string()
    .min(2, "Minimum of 2 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("Last Name is Required"),
  username: Yup.string()
    .min(2, "Minimum of 2 Characters")
    .max(20, "Maximum of 20 Characters")
    .required("Username is Required"),
  bio: Yup.string()
    .min(10, "Minimum of 10 Characters")
    .max(500, "Maximum of 500 Characters")
    .notRequired(),
});
