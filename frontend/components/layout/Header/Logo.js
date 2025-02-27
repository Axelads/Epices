// components/layout/Logo.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo_epices_long200.webp" // Remplacez par le chemin de votre logo
        alt="Mon Logo"
        width={200}
        height={70}
        priority
      />
    </Link>
  );
}
