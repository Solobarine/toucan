import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const Create = () => {
  const [showEmojiPicker, toggleShowEmojiPicker] = useState(false);
  return (
    <div className="relative flex items-center justify-between gap-4 py-2">
      <span className="grow flex items-center gap-3">
        <img src="" alt="" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          className="text-sm bg-transparent border rounded-full py-1 px-2 w-full"
          placeholder="Write a comment"
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
        <button className="w-9 h-9 grid place-items-center rounded-full shadow-md border border-primary text-primary text-2xl">
          <i className="bx bx-send" />
        </button>
      </span>
      {showEmojiPicker && (
        <EmojiPicker
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            scale: "0.6 !important",
          }}
          onEmojiClick={(val) => console.log(val)}
        />
      )}
    </div>
  );
};

export default Create;
