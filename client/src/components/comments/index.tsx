import { useState } from "react";
import NewComment from "./new";
import { Comment as CommentInterface } from "../../types/comment";
import { capitalizeText } from "../../utils";
import { formatDistanceToNow } from "date-fns";

const Comment = ({
  comment,
  showActions,
}: {
  comment: CommentInterface;
  showActions: boolean;
}) => {
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
            <button>Like</button>
            {showActions && (
              <>
                <p>|</p>
                <button onClick={() => setReplyState(true)}>Reply</button>
              </>
            )}
          </span>
        </div>
        {replyState && showActions && (
          <NewComment
            comment_id={comment.id}
            post_id={comment.content_id as number}
          />
        )}
        <div className="mt-4 scale-90">
          {comment.replies.map((reply, index) => (
            <Comment key={index} comment={reply} showActions={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
