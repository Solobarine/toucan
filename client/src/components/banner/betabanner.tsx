import { AlertCircle } from "lucide-react";

const BetaBanner = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 flex items-start gap-3 rounded-md shadow-sm mt-4 mb-6">
      <AlertCircle className="w-5 h-5 mt-0.5" />
      <div>
        <p className="text-sm font-medium">This is a beta preview.</p>
        <p className="text-sm">
          The content on this page is sample data used for testing purposes.
          Official press assets and announcements will be added soon.
        </p>
      </div>
    </div>
  );
};

export default BetaBanner;
