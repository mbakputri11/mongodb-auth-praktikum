
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!username.trim() || !email.trim() || !password.trim()) {
      setMessage("Semua field harus diisi.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok) {
        setMessage("Register berhasil! Silakan login.");
        // Bersihkan form jika perlu
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        const errMsg = data && data.detail ? data.detail : res.statusText;
        setMessage("Register gagal: " + errMsg);
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formBoxStyle}>
      <h2 style={headingStyle}>Register</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
          autoComplete="new-password"
        />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Memproses..." : "Register"}
        </button>
      </form>
      {message && <p style={messageStyle(message)} role="alert">{message}</p>}
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Sudah punya akun?{" "}
        <button
          onClick={onSwitchToLogin}
          style={{ color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: "600" }}
          type="button"
        >
        
        </button>
        <Link to="/login">Login disini</Link>
      </p>
    </div>
  );
};

const Auth = () => {
  return (
    <div style={{ padding: "2rem", minHeight: "100vh", background: "#f9fafb", fontFamily: "'Inter', sans-serif" }}>
      <Register />
    </div>
  );
};

// Reusable style objects
const formBoxStyle = {
  maxWidth: "400px",
  margin: "3rem auto",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  background: "white",
};

const headingStyle = {
  marginBottom: "1.5rem",
  textAlign: "center",
  color: "#111827",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const inputStyle = {
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#6366f1",
  color: "white",
  fontWeight: "600",
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const messageStyle = (message) => ({
  marginTop: "1rem",
  color: message.toLowerCase().includes("gagal") || message.toLowerCase().includes("error") ? "#dc2626" : "#16a34a",
  textAlign: "center",
  fontWeight: "600",
});

export default Auth;
