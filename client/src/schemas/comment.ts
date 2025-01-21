import * as Yup from "yup";

export const CommentSchema = Yup.object().shape({
  content_id: Yup.number().required("ID is required"),
  text: Yup.string()
    .min(2, "Minimum of 2 characters")
    .max(500, "Maximum of 500 characters")
    .required("Text is required"),
});
