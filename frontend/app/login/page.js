"use client";

import React from "react";
import InscriptionForm from "@/components/pages/login/InscriptionForm";
import ConnexionForm from "@/components/pages/login/ConnexionForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Fonction appelée lors de l'inscription
  const handleRegister = async (registerData) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      if (res.status === 201) {
        alert("Inscription réussie !");
      } else if (res.status === 409) {
        alert("L'utilisateur existe déjà !");
      } else {
        alert("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    }
  };

  // Fonction appelée lors de la connexion
  const handleLogin = async (loginData) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (res.status === 200) {
        const data = await res.json();
        // Stocker le token dans localStorage
        localStorage.setItem("token", data.token);
        alert("Connexion réussie !");
        router.push("/");
      } else {
        alert("Identifiants invalides");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="formsWrapper">
        <InscriptionForm onRegister={handleRegister} />
        <ConnexionForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
