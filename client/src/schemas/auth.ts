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
  password: Yup.string()
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
