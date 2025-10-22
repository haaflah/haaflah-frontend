import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "../services/api";
import Logo from "../components/Logo/Logo";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
      toast.success("Password reset successful!");
      setTimeout(() => navigate("/sign-in"), 3000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { met: newPassword.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(newPassword), text: "One uppercase letter" },
    { met: /[a-z]/.test(newPassword), text: "One lowercase letter" },
    { met: /[0-9]/.test(newPassword), text: "One number" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Section - Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="mb-8">
            <Logo />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {success ? "Password Changed!" : "Create New Password"}
            </h1>
            <p className="text-gray-600">
              {success
                ? "Your password has been successfully reset"
                : "Enter your new password below"}
            </p>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Success!</h3>
                  <p className="text-sm text-green-700">
                    Your password has been reset. You can now sign in with your new password.
                  </p>
                </div>
              </div>

              <Link to="/sign-in">
                <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl">
                  Continue to Sign In
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Input */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              {newPassword && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</p>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={req.met ? "text-green-700" : "text-gray-600"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || newPassword !== confirmPassword}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Resetting Password...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>

              {/* Back to Sign In Link */}
              <p className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/sign-in" className="text-blue-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          )}

          <p className="text-center text-xs text-gray-400 mt-8">
            © 2025 Haaflah. All Rights Reserved
          </p>
        </div>

        {/* Right Section - Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center text-center p-12">
          <div className="mb-8">
            <Logo />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {success ? "You're All Set!" : "Secure Your Account"}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {success
              ? "Your account is now secure with your new password"
              : "Create a strong password to protect your Haaflah account"}
          </p>
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md">
            <h3 className="font-semibold text-gray-800 mb-4">Password Best Practices</h3>
            <ul className="text-left space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Use a mix of letters, numbers, and symbols</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Avoid common words or personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Make it at least 8 characters long</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Don't reuse passwords from other accounts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
