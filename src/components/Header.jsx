import React, { useState } from 'react';
import { navLinks } from '../data/siteData.js';

function Header({ activeSection, setActiveSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (target) => {
    const section = document.getElementById(target);
    if (!section) return;
    setActiveSection(target);
    setMenuOpen(false);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => scrollToSection('home')}>
        <span className="brand-mark" aria-hidden="true">🎨</span>
        <span>
          <strong>Ojas by Tejas</strong>
          <small>Unleash the Artist in You <span aria-hidden="true">♡</span></small>
        </span>
      </button>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        ☰
      </button>

      <nav className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Main navigation">
        {navLinks.map((link) => (
          <button
            type="button"
            key={link.target}
            className={activeSection === link.target ? 'nav-link active' : 'nav-link'}
            onClick={() => scrollToSection(link.target)}
          >
            {link.label}
          </button>
        ))}
        <button className="nav-demo-btn" type="button" onClick={() => scrollToSection('demo')}>
          Book Your Demo Class <span aria-hidden="true">🖌️</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
