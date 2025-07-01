import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Mail, Send, CheckCircle, Clock } from "lucide-react";
import TextInput from "../../../components/form/inputs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-blue-50 to-purple-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex items-center justify-center p-4">
      <Helmet>
        <title>Toucan - Reset Password</title>
        <meta name="description" content="Reset your Toucan account password" />
      </Helmet>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-stone-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Toucan"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Toucan
                </h1>
              </div>
            </div>

            {!isSubmitted ? (
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Forgot password?
                </h2>
                <p className="text-stone-600 dark:text-stone-400">
                  No worries, we'll send you reset instructions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Check your email
                </h2>
                <p className="text-stone-600 dark:text-stone-400">
                  We sent a password reset link to{" "}
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {email}
                  </span>
                </p>
              </div>
            )}
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {error}
                  </p>
                </div>
              )}

              <TextInput
                type="email"
                name="email"
                label="Email address"
                placeholder="Enter your email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                error={error && !email ? "Email is required" : undefined}
                touched={!!error}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Reset password</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-1">
                      Didn't receive the email?
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Check your spam folder, or click below to resend.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleResend}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-300 font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-stone-400/30 border-t-stone-400 rounded-full animate-spin" />
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>Resend email</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Back to login */}
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
