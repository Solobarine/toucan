import Comment from "../../comments";
import Create from "../../comments/create";

const Card = () => {
  return (
    <div className="border dark:border-stone-600 rounded-xl shadow-md bg-white dark:bg-dark p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src="" alt="" className="bg-gray-400 rounded-full w-10 h-10" />
          <span>
            <p>Solly March</p>
            <p className="text-sm">2 hours ago</p>
          </span>
        </div>
        <button>
          <i className="bx bx-dots-vertical-rounded" />
        </button>
      </div>
      <div className="py-2">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. In velit
          libero itaque voluptatum quam hic facere neque nisi error
          reprehenderit? Eius neque maxime a provident enim quo rem dignissimos
          placeat?
        </p>
        <img
          src=""
          alt=""
          className="min-h-52 bg-light dark:bg-stone-700 mt-2 rounded-lg"
        />
      </div>
      <span className="flex items-center justify-between">
        <p>
          <span>
            <i className="bx bx-happy" />
            <i className="bx bxs-heart-circle" />
            <i className="bx bx-meteor" />
          </span>
          235
        </p>
        <p>9 comments &bull; 3 reposts</p>
      </span>
      <div className="flex items-center justify-between py-2">
        <button className="flex items-center gap-1">
          <i className="bx bx-like" />
          Like
        </button>
        <button className="flex items-center gap-1">
          <i className="bx bx-message-square-dots" />
          Comment
        </button>
        <button className="flex items-center gap-1">
          <i className="bx bx-share" />
          Share
        </button>
      </div>
      <hr />
      <Create />
      <div className="grid gap-3">
        {[1, 2, 3, 4].map((_, index) => (
          <Comment key={index} />
        ))}
      </div>
    </div>
  );
};

export default Card;
