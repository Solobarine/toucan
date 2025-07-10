const NotificationLoading = () => (
  <div className="p-6 border-b border-stone-200 dark:border-stone-700 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0" />

      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <div className="h-4 w-32 bg-stone-200 dark:bg-stone-700 rounded" />
            <div className="h-3 w-16 bg-stone-200 dark:bg-stone-700 rounded" />
          </div>
          <div className="h-3 w-10 bg-stone-200 dark:bg-stone-700 rounded" />
        </div>

        <div className="h-4 w-full bg-stone-200 dark:bg-stone-700 rounded" />
        <div className="h-4 w-5/6 bg-stone-200 dark:bg-stone-700 rounded" />

        <div className="h-16 w-full bg-stone-200 dark:bg-stone-700 rounded-lg" />

        <div className="flex gap-2">
          <div className="h-8 w-24 bg-stone-200 dark:bg-stone-700 rounded-md" />
          <div className="h-8 w-24 bg-stone-200 dark:bg-stone-700 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export default NotificationLoading;
