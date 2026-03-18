import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import "./auth.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (password.trim().length < 8) {
      setMessage({ text: "Password must be at least 8 characters long", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/signup", {
        email: email.trim(),
        password,
        username: username.trim(),
      });

      if (res.data.success) {
        setMessage({ text: "Account created! Redirecting to login...", type: "success" });
        setTimeout(() => navigate("/signin"), 1200);
      } else {
        setMessage({ text: res.data.message || "Signup failed", type: "error" });
      }
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          `Signup failed: ${err.message}. Backend URL: ${API.defaults.baseURL}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT — Brand Panel */}
      <div className="auth-brand">
        <div className="auth-brand-illustration">📈</div>
        <div className="auth-brand-logo">
          Zerodha <span>Clone</span>
        </div>
        <p className="auth-brand-tagline">
          India's most trusted stock broker. Start your investment journey today.
        </p>
        <div className="auth-brand-stats">
          <div className="auth-stat">
            <strong>1Cr+</strong>
            <span>Clients</span>
          </div>
          <div className="auth-stat">
            <strong>₹0</strong>
            <span>Delivery Fee</span>
          </div>
          <div className="auth-stat">
            <strong>15%</strong>
            <span>Market Share</span>
          </div>
        </div>
      </div>

      {/* RIGHT — Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join millions of investors on Zerodha</p>

          <form onSubmit={handleSignUp}>
            <div className="auth-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-icon">✉️</span>
            </div>

            <div className="auth-input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
                required
              />
              <span className="input-icon">👤</span>
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
              <span
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {message.text && (
              <div className={`auth-message ${message.type}`}>
                {message.text}
              </div>
            )}

            <button className="auth-btn" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?{" "}
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
