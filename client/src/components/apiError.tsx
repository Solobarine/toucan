"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Wifi,
  Server,
  Shield,
  Clock,
  RefreshCw,
  Home,
  Bug,
  HelpCircle,
} from "lucide-react";

interface ApiErrorPageProps {
  statusCode: number;
  onRetry?: () => void;
  onGoHome?: () => void;
  onContactSupport?: () => void;
  showRetry?: boolean;
  showHome?: boolean;
  showSupport?: boolean;
  className?: string;
}

export default function ApiErrorPage({
  statusCode,
  onRetry,
  onGoHome,
  onContactSupport,
  showRetry = false,
  showHome = false,
  showSupport = false,
  className = "",
}: ApiErrorPageProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  const getErrorType = () => {
    if (!statusCode) return "network";
    if (statusCode >= 500) return "server";
    if (statusCode === 401 || statusCode === 403) return "auth";
    if (statusCode === 404) return "notfound";
    if (statusCode === 429) return "ratelimit";
    if (statusCode >= 400) return "client";
    return "unknown";
  };

  const getErrorConfig = () => {
    const type = getErrorType();

    const configs = {
      network: {
        icon: Wifi,
        title: "Connection Problem",
        message:
          "Unable to connect to our servers. Please check your internet connection and try again.",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        suggestions: [
          "Check your internet connection",
          "Try refreshing the page",
          "Disable VPN if you're using one",
        ],
      },
      server: {
        icon: Server,
        title: "Server Error",
        message:
          "Our servers are experiencing issues. We're working to fix this as quickly as possible.",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/20",
        suggestions: [
          "Try again in a few minutes",
          "Check our status page for updates",
          "Contact support if the problem persists",
        ],
      },
      auth: {
        icon: Shield,
        title: "Authentication Required",
        message: "You need to sign in again to access this content.",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-100 dark:bg-amber-900/20",
        suggestions: [
          "Sign in to your account",
          "Check if your session has expired",
          "Clear your browser cache and cookies",
        ],
      },
      notfound: {
        icon: AlertTriangle,
        title: "Content Not Found",
        message:
          "The content you're looking for doesn't exist or has been moved.",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/20",
        suggestions: [
          "Check the URL for typos",
          "Go back to the previous page",
          "Search for what you're looking for",
        ],
      },
      ratelimit: {
        icon: Clock,
        title: "Too Many Requests",
        message:
          "You've made too many requests. Please wait a moment before trying again.",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/20",
        suggestions: [
          "Wait a few minutes before trying again",
          "Reduce the frequency of your requests",
          "Contact support for rate limit increases",
        ],
      },
      client: {
        icon: AlertTriangle,
        title: "Request Error",
        message:
          "There was a problem with your request. Please check your input and try again.",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
        suggestions: [
          "Check your input for errors",
          "Make sure all required fields are filled",
          "Try refreshing the page",
        ],
      },
      unknown: {
        icon: Bug,
        title: "Unexpected Error",
        message:
          "Something unexpected happened. We're looking into this issue.",
        color: "text-gray-600 dark:text-gray-400",
        bgColor: "bg-gray-100 dark:bg-gray-900/20",
        suggestions: [
          "Try refreshing the page",
          "Clear your browser cache",
          "Contact support with error details",
        ],
      },
    };

    return configs[type];
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  return (
    <div
      className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-lg bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center border-b border-neutral-200 dark:border-neutral-700">
          <div
            className={`mx-auto w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mb-4`}
          >
            <IconComponent className={`w-8 h-8 ${config.color}`} />
          </div>

          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            {config.title}
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {config.message}
          </p>

          {statusCode && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm text-neutral-700 dark:text-neutral-300">
              <span className="text-neutral-500">• {statusCode}</span>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="font-medium text-neutral-900 dark:text-white mb-3">
            What you can try:
          </h3>
          <ul className="space-y-2">
            {config.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
              >
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3">
          {showRetry && (
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`}
              />
              {isRetrying ? "Retrying..." : "Try Again"}
            </button>
          )}

          <div className="flex gap-3">
            {showHome && (
              <button
                onClick={onGoHome}
                className="flex-1 py-2 px-4 border border-neutral-300 dark:border-neutral-600 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            )}

            {showSupport && (
              <button
                onClick={onContactSupport}
                className="flex-1 py-2 px-4 border border-neutral-300 dark:border-neutral-600 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Get Help
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
