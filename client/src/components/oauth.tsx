import { Chrome, Github } from "lucide-react";
import {
  API_URL,
  GITHUB_CLIENT_ID,
  GITHUB_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_URL,
} from "../constants";

const OAuth = () => {
  type Provider = "google" | "github";

  const handleSocialLogin = (provider: Provider) => {
    if (provider == "github") {
      const clientId = GITHUB_CLIENT_ID;
      const redirectUri = `${API_URL}/api/oauth/github`;
      const scope = "user read:user";
      const url = `${GITHUB_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      return (window.location.href = url);
    } else if (provider == "google") {
      const clientId = GOOGLE_CLIENT_ID;
      const redirectUri = `${API_URL}/api/oauth/google`;
      const scope = "email profile";
      const url = `${GOOGLE_URL}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;
      return (window.location.href = url);
    } else {
      return;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-600 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <Chrome className="w-5 h-5 text-stone-600 dark:text-stone-400" />
        <span className="font-medium text-stone-700 dark:text-stone-300">
          Google
        </span>
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-600 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <Github className="w-5 h-5 text-stone-600 dark:text-stone-400" />
        <span className="font-medium text-stone-700 dark:text-stone-300">
          GitHub
        </span>
      </button>
    </div>
  );
};

export default OAuth;
