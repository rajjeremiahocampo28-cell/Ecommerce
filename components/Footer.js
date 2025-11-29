import React from "react";
import "../components/Footer.js";

const Footer = () => {
  return (
    <footer className="footer">
      <h6 className="footer-title"><strong>PRESTIGE CHRONOS</strong></h6>
      <p className="footer-text tagline">
        Luxury Timepieces for the Modern Generation
      </p>
      <p className="footer-text contact">
        Email: contact@prestigechronos.com | Phone: +63 900 123 4567
      </p>
      <p className="footer-text socials">Facebook | Instagram | TikTok | X</p>
      <p className="footer-text copyright">
        © 2025 Prestige Chronos. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;