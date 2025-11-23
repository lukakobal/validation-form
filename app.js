import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const emailValid = email.trim() !== "" && email.includes("@");
  const passwordValid = password.length >= 6;
  const formValid = emailValid && passwordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    setLoading(true);
    setMessage(null);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.85) resolve();
          else reject(new Error("Network error. Poskusi ponovno."));
        }, 1100);
      });

      setMessage({ type: "success", text: "Uspešno prijavljen ✅" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Napaka pri prijavi ❌",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>React Day 20 — Login Form</h1>

      <form className="card" onSubmit={handleSubmit}>
        <label className="label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="email@example.com"
          />
        </label>

        {!emailValid && email.length > 0 && (
          <div className="error">Email mora vsebovati @</div>
        )}

        <label className="label">
          Geslo
          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="vsaj 6 znakov"
            />
            <button
              type="button"
              className="ghost"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Skrij" : "Pokaži"}
            </button>
          </div>
        </label>

        {!passwordValid && password.length > 0 && (
          <div className="error">Geslo mora biti vsaj 6 znakov</div>
        )}

        <button
          className="primary"
          type="submit"
          disabled={!formValid || loading}
        >
          {loading ? "Prijavljam..." : "Prijava"}
        </button>
        {message && (
          <div className={message.type === "error" ? "error" : "success"}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
