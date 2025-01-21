import { useState } from "react";
import NewComment from "./new";
import { Comment as CommentInterface } from "../../types/comment";
import { capitalizeText } from "../../utils";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment }: { comment: CommentInterface }) => {
  const [replyState, setReplyState] = useState(false);
  return (
    <div className="flex items-start gap-3">
      <img src="#" alt="" className="w-8 h-8 rounded-full bg-light" />
      <div className="grow">
        <div>
          <span className="flex items-center justify-between">
            <p>
              {capitalizeText(comment.user.first_name)}{" "}
              {capitalizeText(comment.user.last_name)}
            </p>
            <span className="flex items-center gap-3">
              <p>{formatDistanceToNow(comment.inserted_at)}</p>
              <button>
                <i className="bx bx-dots-horizontal-rounded" />
              </button>
            </span>
          </span>
          <p className="my-2">{comment.text}</p>
          <span className="flex items-center gap-2 text-sm mb-3">
            <button>Like</button>|
            <button onClick={() => setReplyState(true)}>Reply</button>
          </span>
        </div>
        {replyState && <NewComment comment_id={comment.id} />}
      </div>
    </div>
  );
};

export default Comment;
