import React from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "./Icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Description */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <LogoIcon size="20px" style={{ color: "#000" }} />
              </div>
              <span>CariMakan</span>
            </Link>
            <p className="footer-desc">
              <strong>Sola (Sofi dan Bila)</strong> adalah penyedia platform kuliner premium CariMakan yang berkomitmen untuk menghadirkan kelezatan lokal terbaik langsung ke pintu rumah Anda. Kami mengutamakan kecepatan pengantaran, kualitas rasa, dan kebersihan hidangan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Navigasi</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/favorite" className="footer-link">Favorit</Link>
              <Link to="/cart" className="footer-link">Keranjang Belanja</Link>
            </div>
          </div>

          {/* Address & Contact */}
          <div>
            <h4 className="footer-title">Kontak & Alamat</h4>
            <div className="footer-links" style={{ gap: "16px" }}>
              <div className="footer-contact-item">
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>Alamat Resto:</span>
                <span>Bandar Lampung</span>
              </div>
              <div className="footer-contact-item">
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>Email Hubungi:</span>
                <span>sola@sola.co.id</span>
              </div>
              <div className="footer-contact-item">
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>WhatsApp:</span>
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Sola (Sofi dan Bila). Hak Cipta Dilindungi.</span>
          <span>Powered by CariMakan Premium Food Engine</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
