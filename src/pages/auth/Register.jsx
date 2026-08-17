import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  sendOtp,
} from "../../service/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await registerUser(form);

      if (!response.success) {
        throw new Error(response.message);
      }

      await sendOtp(form.email);

      navigate("/verify-otp", {
        state: {
          email: form.email,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 min-h-screen justify-center bg-slate-950 flex items-center">
      <div className="p-8 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-6 text-sm text-slate-500">
          Register to get started
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="px-4 py-3 w-full rounded-lg border"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-3 w-full rounded-lg border"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-4 py-3 w-full rounded-lg border"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="py-3 w-full rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;