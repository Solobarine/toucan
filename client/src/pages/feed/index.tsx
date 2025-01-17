import { useState } from "react";
import Card from "../../components/posts/card";
import Create from "../../components/posts/create";
import { Helmet } from "react-helmet";

const Feed = () => {
  const [isCreatePost, setIsCreatePost] = useState(false);
  return (
    <section className="p-3 sm:px-20">
      <Helmet>
        <title>Toucan - Posts Feed</title>
        <meta name="description" content="Posts Feed" />
      </Helmet>
      <div className="p-3 rounded-lg bg-white dark:bg-stone-700 border dark:border-stone-600 shadow-md">
        <span className="flex items-center gap-3">
          <img
            src=""
            alt=""
            className="w-10 h-10 rounded-full bg-light dark:bg-dark"
          />
          <button
            className="text-sm p-2 w-full max-w-40 rounded-full border"
            onClick={() => setIsCreatePost(true)}
          >
            Create a Post
          </button>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-4">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <Card key={index} />
        ))}
      </div>
      {isCreatePost && <Create closeModal={() => setIsCreatePost(false)} />}
    </section>
  );
};

export default Feed;
