import { useEffect, useState } from "react";
import Card from "../../components/posts/card";
import Create from "../../components/posts/create";
import { Helmet } from "react-helmet";
import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFeed } from "../../features/thunks/posts";
import { AnimatePresence } from "framer-motion";
import NetworkError from "../errors/networkError";

const Feed = () => {
  const [isCreatePost, setIsCreatePost] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const {
    posts: { data, error },
  } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(getPostsFeed());
  }, []);

  if (error) return <NetworkError message="Something went wrong" />;
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
        {data.map((post, index) => (
          <Card key={index} post={post} />
        ))}
      </div>
      <AnimatePresence>
        {isCreatePost && <Create closeModal={() => setIsCreatePost(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default Feed;
