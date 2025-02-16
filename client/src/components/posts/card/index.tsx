import { formatDistanceToNow } from "date-fns";
import { Post } from "../../../types/post";
import { capitalizeText } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../features/store";
import { useDispatch } from "react-redux";
import { cachePost } from "../../../features/slices/posts";

const Card = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="border dark:border-stone-600 rounded-xl max-w-xl w-full mx-auto shadow-md bg-white dark:bg-stone-700 p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src="" alt="" className="bg-gray-400 rounded-full w-10 h-10" />
          <span>
            <p>
              {capitalizeText(post.user.first_name)}{" "}
              {capitalizeText(post.user.last_name)}
            </p>
            <p className="text-sm">{formatDistanceToNow(post.inserted_at)}</p>
          </span>
        </div>
        <button>
          <i className="bx bx-dots-vertical-rounded" />
        </button>
      </div>
      <div className="py-2">
        <p>{post.body}</p>
        <img
          src=""
          alt=""
          className="min-h-52 bg-light dark:bg-dark mt-2 rounded-lg"
        />
      </div>
      <span className="flex items-center justify-between">
        <p>
          <span>
            <i className="bx bx-happy" />
            <i className="bx bxs-heart-circle" />
            <i className="bx bx-meteor" />
          </span>
          {post.likes_count}
        </p>
        <p>
          {post.comments_count}{" "}
          {post.comments_count !== 1 ? "comments" : "comment"} &bull;{" "}
          {post.reposts_count} {post.reposts_count !== 1 ? "reposts" : "repost"}
        </p>
      </span>
      <div className="flex items-center justify-between py-2">
        {post.is_liked_by_user ? (
          <button className="flex items-center gap-1">
            <i className="bx bx-like" />
            Unlike
          </button>
        ) : (
          <button className="flex items-center gap-1">
            <i className="bx bx-like" />
            Like
          </button>
        )}
        <button
          className="flex items-center gap-1"
          onClick={() => {
            dispatch(cachePost(post));
            navigate(`/posts/${post.id}`);
          }}
        >
          <i className="bx bx-message-square-dots" />
          Comment
        </button>
        <button className="flex items-center gap-1">
          <i className="bx bx-circle" />
          Repost
        </button>
        <button className="flex items-center gap-1">
          <i className="bx bx-share" />
          Share
        </button>
      </div>
    </div>
  );
};

export default Card;
