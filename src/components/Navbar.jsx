import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Badge } from "primereact/badge";
import { Ripple } from "primereact/ripple";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "../style/Navbar.css";
import LogoBlanco from "../assets/Logo_blanco.png";
import LogoColor  from "../assets/Logo_color.png";

const NAV_LINKS = [
  { label: "Inicio",      to: "/" },
  { label: "Colección",   to: "/coleccion" },
  { label: "Novedades",   to: "/novedades" },
  { label: "Ofertas",     to: "/ofertas" },
  { label: "Nosotros",    to: "/nosotros" },
  { label: "Contacto",    to: "/contacto" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [cartCount,   setCartCount]   = useState(0);   // Conéctalo a tu estado real
  const [searchOpen,  setSearchOpen]  = useState(false);
  const searchRef = useRef(null);

  /* ── Detectar scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Cerrar buscador al hacer click fuera ── */
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  const navClass = `navbar${scrolled ? " navbar--scrolled" : ""}`;

  return (
    <>
      <header className={navClass}>

        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo">
          <img
            src={scrolled ? LogoColor : LogoBlanco}
            alt="Logo tienda"
            className="navbar__logo-img"
          />
        </Link>

        {/* ── Links centrales (desktop) ── */}
        <nav className="navbar__links p-ripple-parent">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="navbar__link p-ripple">
              {link.label}
              <span className="navbar__link-bar" />
              <Ripple />
            </Link>
          ))}
        </nav>

        {/* ── Acciones derecha ── */}
        <div className="navbar__actions">

          {/* Buscador */}
          <div className={`navbar__search-wrap${searchOpen ? " navbar__search-wrap--open" : ""}`} ref={searchRef}>
            <button
              className="navbar__icon-btn"
              onClick={() => setSearchOpen(v => !v)}
              aria-label="Buscar"
            >
              <i className="pi pi-search" />
            </button>
            <div className="navbar__search-box">
              <input
                type="text"
                placeholder="Buscar zapatos..."
                className="navbar__search-input"
                autoFocus={searchOpen}
              />
            </div>
          </div>

          {/* Wishlist */}
          <Link to="/favoritos" className="navbar__icon-btn" aria-label="Favoritos">
            <i className="pi pi-heart" />
          </Link>

          {/* Carrito con badge */}
          <Link to="/carrito" className="navbar__icon-btn navbar__cart" aria-label="Carrito">
            <i className="pi pi-shopping-bag p-overlay-badge">
              {cartCount > 0 && (
                <Badge value={cartCount} severity="danger" />
              )}
            </i>
          </Link>

          {/* Mi cuenta */}
          <Link to="/cuenta" className="navbar__icon-btn" aria-label="Mi cuenta">
            <i className="pi pi-user" />
          </Link>

          {/* Hamburguesa (mobile) */}
          <Button
            icon="pi pi-bars"
            className="navbar__hamburger p-button-text p-button-plain"
            onClick={() => setMenuOpen(true)}
            aria-label="Menú"
          />
        </div>
      </header>

      {/* ── Sidebar mobile ── */}
      <Sidebar
        visible={menuOpen}
        onHide={() => setMenuOpen(false)}
        position="right"
        className="navbar__sidebar"
        header={
          <img src={LogoColor} alt="Logo" style={{ height: "36px" }} />
        }
      >
        <nav className="navbar__sidebar-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__sidebar-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__sidebar-footer">
          <Link to="/favoritos" className="navbar__sidebar-action" onClick={() => setMenuOpen(false)}>
            <i className="pi pi-heart" /> Favoritos
          </Link>
          <Link to="/carrito" className="navbar__sidebar-action" onClick={() => setMenuOpen(false)}>
            <i className="pi pi-shopping-bag" /> Carrito
            {cartCount > 0 && <Badge value={cartCount} severity="danger" />}
          </Link>
          <Link to="/cuenta" className="navbar__sidebar-action" onClick={() => setMenuOpen(false)}>
            <i className="pi pi-user" /> Mi cuenta
          </Link>
        </div>
      </Sidebar>
    </>
  );
}