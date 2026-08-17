import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  sendOtp,
  verifyOtp,
} from "../../service/authService";

import { useAuth } from "../../context/AuthContext";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    isAuthenticated,
  } = useAuth();

  const email = location.state?.email;
  const username = location.state?.username;

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const inputRefs = useRef([]);

  // =====================================================
  // AUTH PAGE PROTECTION
  // =====================================================

  useEffect(() => {
    // Already logged in
    if (isAuthenticated) {
      navigate("/dashboard", {
        replace: true,
      });

      return;
    }

    // Direct access without registration flow
    if (!email || !username) {
      navigate("/register", {
        replace: true,
      });
    }
  }, [
    email,
    username,
    isAuthenticated,
    navigate,
  ]);

  // =====================================================
  // OTP COUNTDOWN
  // =====================================================

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // =====================================================
  // OTP INPUT
  // =====================================================

  const handleChange = (value, index) => {
    const digit = value
      .replace(/\D/g, "")
      .slice(-1);

    const updatedOtp = [...otp];

    updatedOtp[index] = digit;

    setOtp(updatedOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =====================================================
  // BACKSPACE
  // =====================================================

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =====================================================
  // PASTE OTP
  // =====================================================

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const updatedOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pastedData
      .split("")
      .forEach((digit, index) => {
        updatedOtp[index] = digit;
      });

    setOtp(updatedOtp);

    const nextIndex = Math.min(
      pastedData.length,
      5
    );

    inputRefs.current[nextIndex]?.focus();
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerify = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    if (!email || !username) {
      setError(
        "Registration session expired. Please register again."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await verifyOtp(
        email,
        otpValue
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "OTP verification failed"
        );
      }

      // Backend returns:
      // accessToken
      // refreshToken
      // role

      const authResult = login(
        response.data,
        username
      );

      if (!authResult?.success) {
        throw new Error(
          "Unable to create authentication session."
        );
      }

      const role = response.data.role;

      // =================================================
      // ROLE BASED REDIRECT
      // =================================================

      if (role === "ADMIN") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else if (role === "EMPLOYEE") {
        navigate("/employee/dashboard", {
          replace: true,
        });
      } else {
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResend = async () => {
    if (
      countdown > 0 ||
      resending ||
      !email
    ) {
      return;
    }

    setResending(true);
    setError("");
    setMessage("");

    try {
      const response = await sendOtp(email);

      setMessage(
        response?.message ||
          "OTP sent successfully."
      );

      setCountdown(30);

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      inputRefs.current[0]?.focus();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="px-4 min-h-screen justify-center bg-slate-950 flex items-center">

      <div className="p-8 w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="text-center">

          <div className="mb-5 mx-auto h-16 w-16 justify-center rounded-full bg-blue-100 flex items-center">

            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V7a4.5 4.5 0 00-9 0v3.5M6 10.5h12a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0118 20.5H6A1.5 1.5 0 014.5 19v-7A1.5 1.5 0 016 10.5z"
              />
            </svg>

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Verify OTP
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            We've sent a 6-digit verification code to
          </p>

          <p className="mt-1 break-all font-semibold text-blue-600">
            {email}
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm text-green-600">
            {message}
          </div>
        )}

        {/* OTP */}
        <form
          onSubmit={handleVerify}
          className="mt-8"
        >

          <div className="flex justify-center gap-3">

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] =
                    element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                onPaste={handlePaste}
                className="h-14 w-12 rounded-lg border border-slate-300 text-center text-2xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                aria-label={`OTP digit ${
                  index + 1
                }`}
              />
            ))}

          </div>

          <button
            type="submit"
            disabled={
              loading ||
              otp.join("").length !== 6
            }
            className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

        {/* Resend */}
        <div className="mt-6 text-center">

          <p className="text-sm text-slate-500">
            Didn't receive the code?
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={
              countdown > 0 ||
              resending
            }
            className="mt-2 text-sm font-semibold text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
          >
            {resending
              ? "Sending..."
              : countdown > 0
              ? `Resend OTP in ${countdown}s`
              : "Resend OTP"}
          </button>

        </div>

        {/* Back */}
        <button
          type="button"
          onClick={() =>
            navigate("/register", {
              replace: true,
            })
          }
          className="mt-6 w-full text-sm text-slate-500 hover:text-blue-600"
        >
          ← Back to registration
        </button>

      </div>

    </div>
  );
};

export default OtpVerification;