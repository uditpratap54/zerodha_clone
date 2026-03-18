import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";
import "./auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await API.post("/login", { email, password });

      if (res.data.success) {
        setMessage({ text: "Login successful! Opening dashboard...", type: "success" });
        setTimeout(() => {
          const dashboardUrl = (
            process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001"
          ).replace(/\/+$/, "");
          window.location.href = `${dashboardUrl}/#/`;
        }, 800);
      } else {
        setMessage({ text: res.data.message || "Invalid credentials", type: "error" });
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Sign In failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT — Brand Panel */}
      <div className="auth-brand">
        <div className="auth-brand-illustration">💹</div>
        <div className="auth-brand-logo">
          Zerodha <span>Clone</span>
        </div>
        <p className="auth-brand-tagline">
          Trade smarter. Invest better. Build wealth with India's #1 broker.
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
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to access your portfolio</p>

          <form onSubmit={handleSignIn}>
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
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link to="/signup">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
