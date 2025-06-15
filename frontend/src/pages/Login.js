import React, { useState } from "react";
import { Link } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");
  if (!username.trim() || !password.trim()) {
    setMessage("Username dan password tidak boleh kosong.");
    return;
  }
  setLoading(true);
  try {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }), 
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) {
      setMessage("Login sukses!");
      console.log("Response data:", data);
    } else {
 
      const errorMessage = data && data.detail ? data.detail : res.statusText;
      setMessage("Login gagal: " + errorMessage);
    }
  } catch (err) {
    setMessage("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      maxWidth: "400px",
      margin: "3rem auto",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "'Inter', sans-serif",
      background: "rgba(255, 255, 255, 0.9)"
    }}>
      <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#6366f1",
            color: "white",
            fontWeight: "600",
            fontSize: "1.1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#4f46e5")}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#6366f1")}
          aria-busy={loading}
          aria-disabled={loading}
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.toLowerCase().includes("gagal") || message.toLowerCase().includes("error")
              ? "#dc2626"
              : "#16a34a",
            textAlign: "center",
            fontWeight: "600",
          }}
          role="alert"
          aria-live="polite"
        >
          {message}
        </p>
        
      )}
      <p style={{ marginTop: '10px' }}>
        Belum punya akun?{' '}
        <Link to="/">Daftar di sini</Link>
      </p>
    </div>
  );
};

export default Login;

