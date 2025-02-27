"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConnexionForm({ onLogin }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <form onSubmit={handleSubmit} className="connexionForm">
      <h2>Connexion</h2>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
      <button type="button" className="googleButton" onClick={handleGoogleLogin}>
        Connexion via Google
      </button>
    </form>
  );
}
