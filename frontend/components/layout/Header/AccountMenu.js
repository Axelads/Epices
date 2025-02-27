// components/layout/AccountMenu.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

export default function AccountMenu() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Décoder le JWT pour obtenir les infos utilisateur
        const userData = jwtDecode(token);
        setUser(userData);
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
      }
    }
  }, []);

  // Ferme le menu lorsqu'on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  if (!user) {
    return (
      <button onClick={() => router.push("/login")} className="accountButton">
        <FontAwesomeIcon icon={faUser} /> Connexion
      </button>
    );
  }

  return (
    <div className="accountMenu" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="accountButton"
        style={{
          background: "#ccc",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
      {menuOpen && (
        <div className="dropdownMenu" style={{
          position: "absolute",
          right: 0,
          marginTop: "0.5rem",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          zIndex: 100,
        }}>
          <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
            <li>
              <button
                onClick={() => router.push(`/${user.firstName}-${user.lastName}`)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0.5rem",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                Mon compte
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/panier")}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0.5rem",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                Panier
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0.5rem",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  color: "red"
                }}
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
