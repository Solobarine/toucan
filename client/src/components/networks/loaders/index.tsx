export const QuickStatsLoader = () => {
  const list = [1, 2, 3, 4];
  return (
    <div className="space-y-4 animate-pulse">
      {list.map((i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="bg-neutral-1 dark:bg-neutral-600 py-2 px-5 rounded-md"></span>
          <span className="font-bold dark:bg-neutral-600 bg-neutral-100 py-2 px-4 rounded-md"></span>
        </div>
      ))}
    </div>
  );
};

export const UserSuggestionLoader = ({ count = 2 }: { count?: number }) => {
  const arr = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="space-y-4 animate-pulse">
      {arr.map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full object-cover bg-neutral-100 dark:bg-neutral-600" />
          <div className="flex-1 min-w-0">
            <div className="bg-neutral-100 dark:bg-neutral-600 rounded-md py-1 w-20" />
            <div className="bg-neutral-100 dark:bg-neutral-600 rounded-md py-1 w-10 mt-2" />
          </div>
          <div className="px-10 py-3 rounded-full bg-neutral-100 dark:bg-neutral-600" />
        </div>
      ))}
    </div>
  );
};

export const NetworkCardLoader = ({ count = 2 }: { count?: number }) => {
  const arr = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="space-y-4">
      {arr.map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200 animate-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700" />
              <span className="absolute inset-0 rounded-full bg-stone-300 dark:bg-stone-600 animate-ping opacity-60" />
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-28 rounded bg-stone-200 dark:bg-stone-700" />
                <div className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-700" />
              </div>

              <div className="h-3 w-32 rounded bg-stone-200 dark:bg-stone-700" />

              <div className="h-3 w-full max-w-sm rounded bg-stone-200 dark:bg-stone-700" />
              <div className="h-3 w-full max-w-xs rounded bg-stone-200 dark:bg-stone-700" />

              <div className="flex items-center gap-4">
                <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-700" />
                <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-700" />
                <div className="h-3 w-28 rounded bg-stone-200 dark:bg-stone-700" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-10 w-28 rounded-lg bg-stone-200 dark:bg-stone-700" />
                <div className="h-10 w-10 rounded-lg bg-stone-200 dark:bg-stone-700" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
