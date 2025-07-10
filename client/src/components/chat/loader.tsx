const ChatLoading = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {/* Skeleton bubbles */}
      <div className="flex flex-col space-y-3 w-full px-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className={`flex ${
              idx % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="h-9 sm:w-40 rounded-lg bg-neutral-100 dark:bg-neutral-700 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Spinner + caption */}
      <div className="mt-8 flex items-center space-x-3 text-neutral-500 dark:text-neutral-400">
        <span className="inline-block h-6 w-6 border-4 border-current border-r-transparent rounded-full animate-spin" />
        <span className="text-xl">Loading chats…</span>
      </div>
    </div>
  );
};

export default ChatLoading;
