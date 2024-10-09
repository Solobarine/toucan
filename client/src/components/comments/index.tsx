import { useState } from "react";
import NewComment from "./new";

const Comment = () => {
  const [replyState, setReplyState] = useState(false);
  return (
    <div className="flex items-start gap-3">
      <img src="#" alt="" className="w-8 h-8 rounded-full bg-light" />
      <div>
        <div>
          <span className="flex items-center justify-between">
            <p>Arthur Morgan</p>
            <span className="flex items-center gap-3">
              <p>1d</p>
              <button>
                <i className="bx bx-dots-horizontal-rounded" />
              </button>
            </span>
          </span>
          <p className="my-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
            nisi eaque quae animi inventore eligendi dolor iusto magni minima?
            Ullam.
          </p>
          <span className="flex items-center gap-2 text-sm mb-3">
            <button>Like</button>|
            <button onClick={() => setReplyState(true)}>Reply</button>
          </span>
        </div>
        {replyState && <NewComment />}
      </div>
    </div>
  );
};

export default Comment;
