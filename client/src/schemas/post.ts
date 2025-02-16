import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Minimum of 5 characters")
    .max(100, "Maximum of 100 characters")
    .notRequired(),
  body: Yup.string()
    .min(5, "Minimum of 5 characters")
    .max(1000, "Maximum of 1000 characters")
    .required("Body is required"),
});
