
import { useState, useEffect } from "react";
import "./Navbar.css";
import { Menu, X, Phone } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Brands", "#brands"],
  ["Products", "#products"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a
          className="brand-logo"
          href="#home"
          onClick={handleNavClick}
        >
          <img
            className="shop-logo"
            src="/Brands/logo2.png"
            alt="Mushad Hardware and Construction Store Logo"
          />

          <span className="brand-text">
            <strong>MUSHAD</strong>
            <small>CONSTRUCTION &amp; HARDWARE</small>
          </span>
        </a>

        <nav
          className={
            menuOpen ? "nav-links nav-links-open" : "nav-links"
          }
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={handleNavClick}
            >
              {label}
            </a>
          ))}

          <a
            className="nav-mobile-call"
            href="tel:+919162512232"
            onClick={handleNavClick}
          >
            <Phone size={16} />
            Call Store
          </a>
        </nav>

        <a className="nav-call" href="tel:+919162512232">
          <Phone size={17} />
          <span>+91 91625 12232</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}
