const PostCardSkeleton = () => (
  <div className="bg-white dark:bg-stone-700 rounded-xl max-w-xl w-full mx-auto shadow-lg transition-all duration-300 hover:shadow-xl animate-pulse">
    <div className="p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/40 dark:bg-stone-700/40" />
          </div>

          {/* Name & time */}
          <div className="space-y-1">
            <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-600 rounded" />
            <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-600 rounded" />
          </div>
        </div>

        {/* Menu icon placeholder */}
        <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-600 rounded" />
      </div>

      {/* Body text */}
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-600 rounded" />
        <div className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-600 rounded" />
        <div className="h-4 w-9/12 bg-neutral-200 dark:bg-neutral-600 rounded" />
      </div>

      {/* Image placeholder */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <div className="w-full h-60 bg-neutral-200 dark:bg-neutral-600 rounded-lg" />
      </div>

      {/* Meta (likes/comments) */}
      <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-600 rounded" />
        <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-600 rounded" />
      </div>
    </div>

    {/* Action buttons */}
    <div className="flex items-center justify-between pb-4 px-4">
      <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-600 rounded-lg" />
      <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-600 rounded-lg" />
      <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-600 rounded-lg" />
    </div>
  </div>
);

const PostsLoader = () => {
  return (
    <div className="grid gap-4">
      {[1, 2, 3, 4].map((val) => (
        <PostCardSkeleton key={val} />
      ))}
    </div>
  );
};

export default PostsLoader;
