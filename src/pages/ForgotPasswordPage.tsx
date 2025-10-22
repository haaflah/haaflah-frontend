import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { forgotPassword } from "../services/api";
import Logo from "../components/Logo/Logo";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!sent || !cooldownEnd) return;

    const tick = () => {
      const diff = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));
      setRemainingSeconds(diff);
    };

    tick();
    const id = window.setInterval(() => {
      tick();
    }, 1000);

    return () => window.clearInterval(id);
  }, [sent, cooldownEnd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      setCooldownEnd(Date.now() + 5 * 60 * 1000);
      setRemainingSeconds(5 * 60);
      toast.success("Reset link sent to your email!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

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
              {sent ? "Check Your Email" : "Reset Password"}
            </h1>
            <p className="text-gray-600">
              {sent 
                ? "We've sent you instructions to reset your password" 
                : "Enter your email to receive a password reset link"}
            </p>
          </div>

          {sent ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Email Sent Successfully</h3>
                  <p className="text-sm text-green-700">
                    Check your inbox at <span className="font-semibold">{email}</span> for instructions to reset your password.
                  </p>
                </div>
              </div>

              <Link to="/sign-in">
                <button 
                  type="button"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Sign In
                </button>
              </Link>

              {remainingSeconds > 0 ? (
                <p className="text-center text-sm text-gray-600">
                  Didn't receive the email? Try again in{" "}
                  <span className="font-semibold">{formatTime(remainingSeconds)}</span>
                </p>
              ) : (
                <p className="text-center text-sm text-gray-600">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => setSent(false)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Try again
                  </button>
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              {/* Back to Sign In Link */}
              <Link 
                to="/sign-in" 
                className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
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
            Secure Your Account
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We'll help you regain access to your Haaflah account quickly and securely
          </p>
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md">
            <h3 className="font-semibold text-gray-800 mb-4">What happens next?</h3>
            <ul className="text-left space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Receive a secure reset link via email</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Click the link to create a new password</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Sign in with your new credentials</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
