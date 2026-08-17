import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  sendOtp,
  verifyOtp,
} from "../../service/authService";
import { useAuth } from "../../context/AuthContext";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is missing.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await verifyOtp(email, otp);

      if (!response.success) {
        throw new Error(response.message);
      }

      login(response.data);

      const role = response.data.role;

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setResending(true);
    setError("");
    setMessage("");

    try {
      const response = await sendOtp(email);

      setMessage(response.message || "OTP sent successfully");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to resend OTP"
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="px-4 min-h-screen justify-center bg-slate-950 flex items-center">
      <div className="p-8 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Verify OTP
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter the OTP sent to
        </p>

        <p className="mb-6 font-semibold text-blue-600">
          {email}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-sm text-green-600">
            {message}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter 6-digit OTP"
            className="px-4 py-4 w-full rounded-lg border border-slate-300 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="mt-5 py-3 w-full rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={resending}
          className="mt-5 w-full text-sm font-semibold text-blue-600 hover:underline"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;