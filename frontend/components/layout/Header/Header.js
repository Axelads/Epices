// components/layout/Header/Header.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ServiceModal from "./ServiceModal";
import AccountMenu from "./AccountMenu"; 

export default function Header() {
  const router = useRouter();
  const [showService, setShowService] = useState(false);

  const handleServiceClick = () => setShowService(true);
  const handleCloseService = () => setShowService(false);

  return (
    <header className="header">
      <div className="topBar">
        <div className="logoContainer">
          <Logo />
        </div>
        <div className="searchContainer">
          <SearchBar />
        </div>
        <div className="buttonsContainer">
          <AccountMenu />
          <button onClick={handleServiceClick}>Service</button>
        </div>
      </div>
      <nav className="navBar">
        <Link href="/epices">Epices</Link>
        <Link href="/poivres">Poivres</Link>
        <Link href="/herbes">Herbes&amp;Aromates</Link>
        <Link href="/sel">Sel</Link>
        <Link href="/graines">Graines</Link>
        <Link href="/festif">Festif/Alcool</Link>
        <Link href="/accessoires">Accessoires</Link>
        <Link href="/about">A Propos</Link>
        <Link href="/actualite">Blog/Actualités</Link>
      </nav>
      {showService && <ServiceModal onClose={handleCloseService} />}
    </header>
  );
}
