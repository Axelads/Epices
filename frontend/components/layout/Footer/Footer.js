// components/layout/Footer/Footer.js
"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="logoDescription">
          <Image
            src="/images/logo/logo_epices500.webp"
            alt="Logo d&apos;Épices"
            width={150}
            height={150}
            priority
          />
          <p>
            Découvrez l&apos;univers des épices d&apos;Alain Grégoire. Qualité, passion et saveurs du monde entier.
          </p>
        </div>
        <div className="footerCategories">
          <div className="category">
            <h3>Contact</h3>
            <p>Email: contact@epices.com</p>
            <p>Téléphone: 01 23 45 67 89</p>
          </div>
          <div className="category">
            <h3>Où nous trouver</h3>
            <p>Mardi : Sur le marché de Gareoult</p>
            <p>Mercredi : Sur le marché de Trets-en-Provence</p>
            <p>Samedi : Sur le marché d&apos;Aubagne</p>
            <p>Horaires : 9h - 17h à Saint Maximin</p>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.718801420834!2d5.826830315502536!3d43.52555397912395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c4d4d0f7d1a93d%3A0x96f14bd5e8d31f5e!2sSaint-Maximin%20la%20Sainte-Baume%2083470!5e0!3m2!1sfr!2sfr!4v1680000000000"
                width="300"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Saint Maximin"
              ></iframe>
            </div>
          </div>
          <div className="category">
            <h3>Possibilit&eacute; de paiement</h3>
            <p>Nous acceptons Visa, MasterCard et PayPal</p>
            <Image
              src="/images/logo/paypal-logo-1.png"
              alt="Modes de paiement"
              width={200}
              height={50}
              priority
            />
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>
          &copy; {new Date().getFullYear()} Mon e-commerce d&apos;épices, propuls&eacute; par Axel Gr&eacute;goire.
        </p>
      </div>
    </footer>
  );
}
