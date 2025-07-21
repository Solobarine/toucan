import { Calendar, Camera, MapPin } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Photo Skeleton */}
        <div className="relative">
          <div className="h-48 md:h-64 bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 rounded-b-xl animate-pulse">
            <div className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg">
              <Camera className="w-5 h-5 text-neutral-400" />
            </div>
          </div>

          {/* Profile Picture Skeleton */}
          <div className="absolute -bottom-16 left-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white dark:bg-neutral-800 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
              </div>
              <div className="absolute bottom-2 right-2 p-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-pulse">
                <Camera className="w-4 h-4 text-neutral-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Skeleton */}
        <div className="pt-20 pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="h-8 w-64 mb-2 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              <div className="h-5 w-32 mb-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center space-x-6 mt-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="text-center">
                    <div className="h-6 w-8 mb-1 mx-auto bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6 md:mt-0">
              <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Skeleton */}
        <div className="border-b border-neutral-200 dark:border-neutral-700">
          <nav className="flex space-x-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="py-4 px-1">
                <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>
            ))}
          </nav>
        </div>

        {/* Content Skeleton */}
        <div className="py-6 space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-48 w-full bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
