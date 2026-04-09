'use client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function Hero({ personal }) {
  return (
    <section className="hero" id="hero">
      
      <h1>Hi, I'm <span style={{ textTransform: 'uppercase' }}>{personal.name}</span></h1>
      <p className="hero-tagline">{personal.tagline}</p>
      <div className="hero-btns">
        <a href="#contact" className="btn btn-primary">Contact Me</a>
        <a href={`${BACKEND_URL}/api/resume/download`} className="btn btn-outline" target="_blank" rel="noopener noreferrer">Download Resume</a>
      </div>
    </section>
  );
}
