import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";
import { LogoIcon, HomeIcon, HeartIcon, CartIcon, NoteIcon } from "./Icons";

function Navbar() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorite();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try { setUser(JSON.parse(userStr)); } catch (e) {}
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <LogoIcon size="22px" style={{ color: "#fff" }} />
            </div>
            <span className="navbar-logo-text">CariMakan</span>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-nav">
            <Link
              to="/"
              id="nav-home"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              <HomeIcon /> Home
            </Link>
            <Link
              to="/favorite"
              id="nav-favorite"
              className={`nav-link ${isActive("/favorite") ? "active" : ""}`}
              style={{ position: "relative" }}
            >
              <HeartIcon filled={totalFavorites > 0} /> Favorit
              {totalFavorites > 0 && (
                <span className="nav-link-badge">{totalFavorites}</span>
              )}
            </Link>
            <Link
              to="/track"
              id="nav-track"
              className={`nav-link ${isActive("/track") ? "active" : ""}`}
            >
              <NoteIcon size="18px" /> Lacak
            </Link>
            <Link
              to="/cart"
              id="nav-cart"
              className={`nav-link ${isActive("/cart") ? "active" : ""}`}
              style={{ position: "relative" }}
            >
              <CartIcon /> Keranjang
              {totalItems > 0 && (
                <span className="nav-link-badge">{totalItems}</span>
              )}
            </Link>
            
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin" : "/"}
                className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                style={{ marginLeft: "12px", borderLeft: "1px solid var(--border)", paddingLeft: "24px" }}
              >
                {user.role === "admin" ? "Dashboard" : user.name}
              </Link>
            ) : (
              <Link
                to="/login"
                className={`nav-link ${isActive("/login") ? "active" : ""}`}
                style={{ marginLeft: "12px", borderLeft: "1px solid var(--border)", paddingLeft: "24px" }}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-mobile-toggle"
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              background: "var(--bg-elevated)",
              borderTop: "1px solid var(--border)",
              padding: "12px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              animation: "fadeInUp 0.3s ease",
            }}
          >
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              <HomeIcon /> Home
            </Link>
            <Link
              to="/favorite"
              className={`nav-link ${isActive("/favorite") ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <HeartIcon filled={totalFavorites > 0} /> Favorit
              {totalFavorites > 0 && ` (${totalFavorites})`}
            </Link>
            <Link
              to="/track"
              className={`nav-link ${isActive("/track") ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <NoteIcon size="18px" /> Lacak Pesanan
            </Link>
            <Link
              to="/cart"
              className={`nav-link ${isActive("/cart") ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <CartIcon /> Keranjang
              {totalItems > 0 && ` (${totalItems})`}
            </Link>
            
            <div style={{ height: "1px", background: "var(--border)", margin: "8px 0" }}></div>
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin" : "/"}
                className={`nav-link ${isActive("/admin") ? "active" : ""}`}
              >
                {user.role === "admin" ? "Dashboard Admin" : `Halo, ${user.name}`}
              </Link>
            ) : (
              <Link
                to="/login"
                className={`nav-link ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;