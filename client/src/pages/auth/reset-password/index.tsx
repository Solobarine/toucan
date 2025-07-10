import type React from "react";

import { useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, CheckCircle, Shield, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // If no token, redirect to forgot password
  if (!token) {
    return <Navigate to="/forgot-password" />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50 to-blue-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex items-center justify-center p-4">
      <Helmet>
        <title>Toucan - Reset Password</title>
        <meta
          name="description"
          content="Create a new password for your Toucan account"
        />
      </Helmet>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-stone-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            {!isSuccess ? (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Set new password
                </h2>
                <p className="text-stone-600 dark:text-stone-400">
                  Your new password must be different from previous used
                  passwords.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Password reset
                </h2>
                <p className="text-stone-600 dark:text-stone-400">
                  Your password has been successfully reset. You can now sign in
                  with your new password.
                </p>
              </div>
            )}
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {errors.general}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-3 bg-white dark:bg-stone-800 border-2 rounded-xl transition-all duration-200 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-0 pl-12 pr-12 ${
                      errors.password
                        ? "border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 bg-red-50 dark:bg-red-900/10"
                        : "border-stone-200 dark:border-stone-700 focus:border-blue-400 dark:focus:border-blue-500 focus:bg-blue-50 dark:focus:bg-blue-900/10"
                    }`}
                  />
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                            i < passwordStrength
                              ? strengthColors[passwordStrength - 1]
                              : "bg-stone-200 dark:bg-stone-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        passwordStrength < 3
                          ? "text-red-600 dark:text-red-400"
                          : passwordStrength < 4
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      Password strength:{" "}
                      {strengthLabels[passwordStrength - 1] || "Very Weak"}
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 bg-white dark:bg-stone-800 border-2 rounded-xl transition-all duration-200 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-0 pl-12 pr-12 ${
                      errors.confirmPassword
                        ? "border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 bg-red-50 dark:bg-red-900/10"
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "border-emerald-300 dark:border-emerald-600 focus:border-emerald-500 dark:focus:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10"
                        : "border-stone-200 dark:border-stone-700 focus:border-blue-400 dark:focus:border-blue-500 focus:bg-blue-50 dark:focus:bg-blue-900/10"
                    }`}
                  />
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Reset password</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Continue to login</span>
              </Link>
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

export default ResetPassword;
