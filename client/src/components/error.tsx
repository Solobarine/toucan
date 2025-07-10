import { OctagonX } from "lucide-react";

const ErrorComponent = ({ msg = "Something Went Wrong" }: { msg?: string }) => {
  return (
    <div className="bg-white dark:bg-neutral-700 mx-5 rounded-lg grid place-content-center gap-5 py-10">
      <OctagonX className="w-36 h-36 text-red-500 mx-auto" />
      <p className="text-center text-xl font-semibold">{msg}</p>
    </div>
  );
};

export default ErrorComponent;
