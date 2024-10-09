import { useState } from "react";
import SmallAvatar from "../../avatar/small";
import PrimaryButton from "../../primaryButton";

const NewComment = () => {
  const [reply, setReply] = useState("");

  return (
    <div className="flex items-start gap-2">
      <SmallAvatar />
      <form
        className={`border ${
          reply ? "rounded-3xl p-2" : "rounded-full p-1"
        } w-full`}
      >
        <textarea
          className={`text-sm bg-transparent outline-none py-1 px-0.5 w-full mt-1 ${
            reply ? "min-h-12" : "h-5"
          }`}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        {reply && (
          <PrimaryButton
            onClick={() => console.log(reply)}
            className="block ml-auto"
          >
            Reply
          </PrimaryButton>
        )}
      </form>
    </div>
  );
};

export default NewComment;
