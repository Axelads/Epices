"use client";

import React, { useState } from "react";

export default function InscriptionForm({ onRegister }) {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // Adresse décomposée
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  const handleTitleSelection = (selectedTitle) => {
    setTitle(selectedTitle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // On assemble l'adresse en objet ou chaîne, selon votre backend
    const registerData = {
      title,
      firstName,
      lastName,
      address: {
        street,
        building,
        postalCode,
        city,
        country,
      },
      email,
      phoneNumber,
      dateOfBirth,
      password,
    };
    onRegister(registerData);
  };

  return (
    <form onSubmit={handleSubmit} className="inscriptionForm">
      <h2>Inscription</h2>
      <div className="titleToggle">
        <button type="button" onClick={() => handleTitleSelection("monsieur")}>
          Monsieur
        </button>
        <button type="button" onClick={() => handleTitleSelection("madame")}>
          Madame
        </button>
        {title && <span>Vous avez sélectionné: {title}</span>}
      </div>
      <div>
        <label>Prénom :</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <fieldset>
        <legend>Adresse</legend>
        <div>
          <label>Chemin / Rue :</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lotissement / Bâtiment :</label>
          <input
            type="text"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
           
          />
        </div>
        <div>
          <label>Code Postal :</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ville :</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pays :</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
      </fieldset>
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
        <label>Téléphone :</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date de naissance :</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
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
      <button type="submit">S&apos;inscrire</button>
    </form>
  );
}
