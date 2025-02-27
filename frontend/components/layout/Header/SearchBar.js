"use client";

import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de recherche ou redirection vers /search?query=...
    console.log("Recherche pour :", query);
  };

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}
