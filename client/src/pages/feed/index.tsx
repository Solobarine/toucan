import Card from "../../components/posts/card";

const Feed = () => {
  return (
    <section className="p-3 sm:px-20">
      <div className="p-3 rounded-lg bg-white dark:bg-stone-700 border dark:border-stone-600 shadow-md">
        <span className="flex items-center gap-3">
          <img
            src=""
            alt=""
            className="w-10 h-10 rounded-full bg-light dark:bg-stone-700"
          />
          <button className="text-sm p-2 w-full max-w-40 rounded-full border">
            Create a Post
          </button>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-4">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </section>
  );
};

export default Feed;
