"use client";

import React from "react";

export default function ServiceModal({ onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <h2>Service client</h2>
        <ul>
          <li>alain.gregoire@gmail.com</li>
          <li>Tel : 06 06 06 06 06</li>
          <li>Atelier : Lun-Ven / 7h30 - 16h</li>
        </ul>
        <h3>Livraison</h3>
        <p>
          Livraison gratuite à partir de 49€ de produit. Acheminement rapide et suivi.
        </p>
        <h3>Paiement</h3>
        <p>
          Paiement sécurisé par carte bancaire, Paypal.
        </p>
        <h3>Politique de retour</h3>
        <p>
          Les retours sont gratuits pendant une durée de 14 jours suivant la réception du colis.
        </p>
      </div>
    </div>
  );
}
