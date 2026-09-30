import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Download } from 'lucide-react';

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize theme from localStorage or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const navLinks = [
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Portafolio', href: '#portafolio' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo / Brand */}
        <a href="#" className="logo-link">
          <div className="logo-text">
            <span className="logo-name">Fernando Moreno Wilches</span>
            <span className="logo-sub">Ing. de Software • Full-Stack</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <a
            href="/CV_Fernando_Moreno_Wilches.pdf"
            download="CV_Fernando_Moreno_Wilches.pdf"
            className="btn btn-secondary"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            title="Descargar Curriculum Vitae en PDF"
          >
            <Download size={15} /> Descargar CV
          </a>

          <a
            href="#contacto"
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Contratar <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="mobile-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="mobile-nav-link"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/CV_Fernando_Moreno_Wilches.pdf"
            download="CV_Fernando_Moreno_Wilches.pdf"
            onClick={() => setIsMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'center', marginTop: '0.5rem' }}
          >
            <Download size={16} /> Descargar CV (PDF)
          </a>
          <a
            href="#contacto"
            onClick={() => setIsMenuOpen(false)}
            className="btn btn-primary"
            style={{ justifyContent: 'center', marginTop: '0.5rem' }}
          >
            Contratar <ArrowUpRight size={18} />
          </a>
        </div>
      )}
    </header>
  );
};
