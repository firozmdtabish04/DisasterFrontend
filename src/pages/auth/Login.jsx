import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
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

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(form);

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
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 min-h-screen justify-center bg-slate-950 flex items-center">
      <div className="p-8 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Welcome Back
        </h1>

        <p className="mb-6 text-sm text-slate-500">
          Sign in to continue
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 text-sm font-medium block">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="px-4 py-3 w-full rounded-lg border border-slate-300 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 text-sm font-medium block">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="px-4 py-3 w-full rounded-lg border border-slate-300 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="py-3 w-full rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;