import React, { useState, useEffect } from "react";
import API from "../api";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading"); // "loading" | "auth" | "unauth"

  useEffect(() => {
    API.post("/")
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("username", res.data.user);
          setStatus("auth");
        } else {
          setStatus("unauth");
        }
      })
      .catch(() => {
        setStatus("unauth");
      });
  }, []);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#387ed1",
        }}
      >
        <p>Verifying session...</p>
      </div>
    );
  }

  if (status === "unauth") {
    const frontendUrl = (
      process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"
    ).replace(/\/+$/, "");
    window.location.href = `${frontendUrl}/#/signin`;
    return null;
  }

  return children;
};

export default ProtectedRoute;
