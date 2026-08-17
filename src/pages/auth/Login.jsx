import React from "react";

import { useLogin } from "../../hooks/useLogin";
import {
  loginWithGoogle,
  loginWithGithub,
} from "../../service/auth/oauthService";

const Login = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
  } = useLogin();

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={loading}
        >
          Login
        </button>
      </form>

      <button onClick={loginWithGoogle}>
        Continue with Google
      </button>

      <button onClick={loginWithGithub}>
        Continue with GitHub
      </button>
    </div>
  );
};

export default Login;