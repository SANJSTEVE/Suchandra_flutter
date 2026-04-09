'use client';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Bento from '../components/Bento';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function Home() {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [error, setError] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme');
    const preferred = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/resume`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (error) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem' }}>
      <p style={{ color: 'var(--text2)' }}>Could not load portfolio data.</p>
      <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>Loading...</div>
    </div>
  );

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero personal={data.personal} />
        <Bento data={data} />
        <About personal={data.personal} certifications={data.certifications} languages={data.languages} />
        <Experience jobs={data.experience} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Education education={data.education} />
        <Contact personal={data.personal} />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} SANJAYKUMAR S 
      </footer>
    </>
  );
}
