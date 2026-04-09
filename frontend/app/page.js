'use client';
import { useEffect, useState } from 'react';
import resumeData from '../data/resume.json';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Bento from '../components/Bento';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';

export default function Home() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme');
    const preferred = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero personal={resumeData.personal} />
        <Bento data={resumeData} />
        <About personal={resumeData.personal} certifications={resumeData.certifications} languages={resumeData.languages} />
        <Experience jobs={resumeData.experience} />
        <Skills skills={resumeData.skills} />
        <Projects projects={resumeData.projects} />
        <Education education={resumeData.education} />
        <Contact personal={resumeData.personal} />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} SANJAYKUMAR S
      </footer>
    </>
  );
}
