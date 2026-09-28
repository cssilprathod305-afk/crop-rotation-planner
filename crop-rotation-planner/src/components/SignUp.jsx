import { useState } from "react";
import { supabase } from "../lib/supabase";

function SignUp({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Account created successfully. You can now sign in.");

    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          🌱
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Start planning and managing your crops today.
        </p>

        {message && (
          <div className="auth-success">
            {message}
          </div>
        )}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="auth-primary-button"
          >
            Create Account →
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?
          <button onClick={() => setPage("signin")}>
            Sign In
          </button>
        </p>

        <button
          className="back-home"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default SignUp;