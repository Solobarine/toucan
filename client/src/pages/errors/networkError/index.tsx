import { AlertTriangle } from "lucide-react";

const NetworkError = ({ message }: { message?: string }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 w-10/12 mx-auto mt-10 rounded-md p-6 flex items-center space-x-4">
      <AlertTriangle className="text-red-600 dark:text-red-400" size={28} />
      <p className="text-red-800 dark:text-red-300 text-base">
        {message || "An unexpected network error occurred. Please try again."}
      </p>
    </div>
  );
};

export default NetworkError;
