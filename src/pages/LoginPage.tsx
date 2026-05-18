import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth, DEMO_CREDENTIALS } from "@/contexts/AuthContext";
import { DEMO_IMAGES } from "@/mock/demoImages";
import "@/styles/variables.css";
import "@/styles/admin.css";

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError("Identifiants incorrects. Utilisez admin / admin.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel login-panel--visual">
        <img
          src={DEMO_IMAGES.branding.banner}
          alt=""
          className="login-panel-bg"
        />
        <div className="login-panel-overlay">
          <h1>Huiles Moteurs Tunisie</h1>
          <p>Espace administration — démo</p>
        </div>
      </div>

      <div className="login-panel login-panel--form">
        <div className="login-card">
          <img
            src={DEMO_IMAGES.branding.logo}
            alt="Logo"
            className="login-logo"
          />
          <h2>Connexion</h2>
          <p className="login-hint">
            Démo : <code>{DEMO_CREDENTIALS.username}</code> /{" "}
            <code>{DEMO_CREDENTIALS.password}</code>
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="form-label" htmlFor="username">
              Identifiant
            </label>
            <input
              id="username"
              className="form-input"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />

            <label className="form-label" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              className="form-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="btn btn-primary login-submit">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
