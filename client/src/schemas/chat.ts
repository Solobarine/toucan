import * as Yup from "yup";

export const ChatSchema = Yup.object().shape({
  receiver_id: Yup.number().required("Receiver ID is required"),
  message: Yup.string()
    .min(1, "Minimum of 1 character")
    .max(1000, "Maximum of 1000 characters")
    .required("Enter your message"),
});
