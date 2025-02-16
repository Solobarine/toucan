import SmallAvatar from "../../avatar/small";
import PrimaryButton from "../../primaryButton";
import { useFormik } from "formik";
import { CommentSchema } from "../../../schemas/comment";
import { AppDispatch } from "../../../features/store";
import { useDispatch } from "react-redux";
import { createReply } from "../../../features/thunks/comments";

const NewComment = ({
  comment_id,
  post_id,
}: {
  comment_id: number | undefined;
  post_id: number | undefined;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { values, errors, touched, handleChange, submitForm } = useFormik({
    initialValues: {
      post_id,
      content_id: comment_id,
      text: "",
    },
    validationSchema: CommentSchema,
    onSubmit: (values) => dispatch(createReply({ comment: values })),
  });

  return (
    <div className="flex items-start gap-2">
      <SmallAvatar />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className={`border ${
          values.text ? "rounded-3xl p-2" : "rounded-full p-1"
        } w-full`}
      >
        <textarea
          className={`text-sm bg-transparent outline-none py-1 px-0.5 w-full mt-1 ${
            values.text ? "min-h-12" : "h-5"
          }`}
          value={values.text}
          onChange={handleChange}
        />
        {values.text && (
          <PrimaryButton
            onClick={() => console.log(values.text)}
            className="block ml-auto"
          >
            Reply
          </PrimaryButton>
        )}
        {errors.text && touched.text && (
          <p className="text-red-600 text-sm">{errors.text}</p>
        )}
      </form>
    </div>
  );
};

export default NewComment;
