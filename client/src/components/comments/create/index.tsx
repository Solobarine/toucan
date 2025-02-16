import EmojiPicker from "emoji-picker-react";
import { useFormik } from "formik";
import { useState } from "react";
import { createComment } from "../../../features/thunks/comments";
import { AppDispatch } from "../../../features/store";
import { useDispatch } from "react-redux";

const Create = ({ content_id }: { content_id: number }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showEmojiPicker, toggleShowEmojiPicker] = useState(false);
  const {
    values,
    setValues,
    handleChange,
    isSubmitting,
    setSubmitting,
    submitForm,
  } = useFormik({
    initialValues: {
      content_id,
      text: "",
    },
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(createComment({ comment: values }))
        .then(() => {
          setValues((values) => ({ ...values, text: "" }));
        })
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <div className="relative flex items-center justify-between gap-4 py-2">
      <span className="grow flex items-center gap-3">
        <img src="" alt="" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          name="text"
          onChange={handleChange}
          className="text-sm bg-transparent border rounded-full py-1 px-2 w-full"
          placeholder="Write a comment"
          value={values.text}
        />
      </span>
      <span className="flex items-center gap-2">
        <button className="w-7 h-7 grid place-items-center rounded-full shadow-md border">
          <i className="bx bx-link" />
        </button>
        <button
          className="w-7 h-7 grid place-items-center rounded-full shadow-md border"
          onClick={() => toggleShowEmojiPicker(!showEmojiPicker)}
        >
          <i className="bx bx-smile" />
        </button>
        <button
          type="button"
          className={`w-9 h-9 grid place-items-center rounded-full shadow-md border border-primary text-primary text-2xl ${
            isSubmitting && "bg-gray-400 opacity-60"
          }`}
          onClick={submitForm}
        >
          <i className="bx bx-send" />
        </button>
      </span>
      {showEmojiPicker && (
        <div>
          <button
            className="text-2xl text-red-600 font-semibold absolute bottom-1 right-1"
            onClick={() => toggleShowEmojiPicker(false)}
          >
            &times;
          </button>
          <EmojiPicker
            style={{
              width: "150px !important",
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              zIndex: 2,
              scale: "0.6 !important",
            }}
            onEmojiClick={(val) => {
              console.log(val);
              setValues((values) => ({
                ...values,
                comment: values.text + val.emoji,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Create;
