'use client';
import { useState, useEffect } from 'react';

const links = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

export default function Nav({ theme, toggleTheme }) {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      for (const id of links.map(l => l.toLowerCase())) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= 80 && bottom > 0) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="nav">
      <span className="nav-logo">SK</span>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className={active === l.toLowerCase() ? 'active' : ''}
              onClick={e => { e.preventDefault(); handleNav(l.toLowerCase()); }}
            >{l}</a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
