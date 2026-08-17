import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { authService } from "../../service/auth/authService";
import { useAuth } from "../../context/AuthContext";

export default function OtpVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await authService.sendOtp(email);

      if (res.success) {
        toast.success(
          res.message || "OTP sent to your email!"
        );

        setStep(2);
      } else {
        toast.error(
          res.message || "Failed to send OTP"
        );
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOtp(email, otp);

      if (res.success) {
        toast.success(
          res.message || "OTP verified successfully!"
        );

        navigate("/dashboard");
      } else {
        toast.error(
          res.message || "Invalid OTP"
        );
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen justify-center bg-gray-900 text-white flex items-center">
      <div className="p-8 w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 shadow-2xl">

        <h2 className="mb-6 text-center text-2xl font-bold text-blue-500">
          {step === 1
            ? "Request OTP"
            : "Verify OTP"}
        </h2>

        {step === 1 ? (
          <form
            onSubmit={handleSendOtp}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 text-sm text-gray-400 block">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="px-4 py-2 w-full rounded border border-gray-600 bg-gray-700 text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-3 w-full rounded bg-blue-600 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Send OTP"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleVerifyOtp}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 text-sm text-gray-400 block">
                Enter OTP Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="000000"
                className="px-4 py-2 w-full rounded border border-gray-600 bg-gray-700 text-center text-xl text-white tracking-[0.5em] outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-3 w-full rounded bg-green-600 font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
              }}
              className="w-full text-sm text-gray-400 hover:text-white hover:underline"
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}