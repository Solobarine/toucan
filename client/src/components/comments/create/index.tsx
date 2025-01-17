import EmojiPicker from "emoji-picker-react";
import { useFormik } from "formik";
import { useState } from "react";

const Create = () => {
  const [showEmojiPicker, toggleShowEmojiPicker] = useState(false);
  const { values, setValues, handleChange, submitForm } = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => console.log(values),
  });
  return (
    <div className="relative flex items-center justify-between gap-4 py-2">
      <span className="grow flex items-center gap-3">
        <img src="" alt="" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          name="comment"
          onChange={handleChange}
          className="text-sm bg-transparent border rounded-full py-1 px-2 w-full"
          placeholder="Write a comment"
          value={values.comment}
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
          className="w-9 h-9 grid place-items-center rounded-full shadow-md border border-primary text-primary text-2xl"
          onClick={submitForm}
        >
          <i className="bx bx-send" />
        </button>
      </span>
      {false && (
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
                comment: values.comment + val.emoji,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Create;
