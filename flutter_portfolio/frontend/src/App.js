import React, { useState, useEffect, useRef } from 'react';
import './App.css';

/* ── useReveal: scroll-triggered fade-in ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('visible'); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Nav ── */
const NAV = ['hero', 'experience', 'projects', 'skills', 'education', 'contact'];
function Nav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const obs = NAV.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold: 0.4 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  const scroll = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="nav">
      <span className="nav-brand">SM</span>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {NAV.map(id => (
          <li key={id}>
            <button className={`nav-link${active === id ? ' active' : ''}`} onClick={() => scroll(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

/* ── Hero / Bento ── */
function Hero({ data }) {
  const p = data.personal;
  const stats = data.stats;
  const allSkills = data.skills.flatMap(s => s.items);
  const feat = data.projects[0];
  const expColors = ['#7c3aed', '#0ea5e9', '#10b981', '#f59e0b'];

  return (
    <section id="hero" className="hero-section">
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div className="bento">

        {/* Bio */}
        <div className="glass card-bio reveal-card">
          <div className="avatar">SM</div>
          <div className="name">{p.name}</div>
          <div className="role">{p.title}</div>
          <div className="bio-line">{p.summary}</div>
          <div className="pill-wrap" style={{ marginTop: 12 }}>
            {['iOS', 'Android', 'Web', 'Desktop'].map(pl => (
              <span key={pl} className="pill pill-purple">{pl}</span>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="glass card-status reveal-card">
          <div className="section-label">Status</div>
          <div><span className="status-dot" /><span className="status-label">Open to work</span></div>
          <div className="status-text">{p.availability} · Remote</div>
          <div className="loc">📍 {p.location}</div>
          <div style={{ marginTop: 16 }}>
            {[['Flutter', '95%', '#7c3aed'], ['Dart', '90%', '#0ea5e9']].map(([lbl, w, c]) => (
              <div key={lbl} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{lbl}</div>
                <div className="bar-wrap">
                  <div className="bar-fill" style={{ width: w, background: c }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="glass card-stack reveal-card">
          <div className="section-label">Stack</div>
          <div className="pill-wrap">
            {allSkills.slice(0, 12).map((s, i) => (
              <span key={s} className={`pill ${['pill-purple', 'pill-teal', 'pill-blue', 'pill-white'][i % 4]}`}>{s}</span>
            ))}
          </div>
        </div>

        {/* Featured Project */}
        <div className="glass card-project reveal-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="section-label" style={{ marginBottom: 0 }}>Featured project</div>
            <span className="featured-badge">live</span>
          </div>
          <div className="proj-title">{feat.title}</div>
          <div className="proj-desc">{feat.description}</div>
          <div className="pill-wrap">
            {feat.tags.slice(0, 4).map(t => <span key={t} className="pill pill-teal">{t}</span>)}
          </div>
        </div>

        {/* Experience summary */}
        <div className="glass card-exp reveal-card">
          <div className="section-label">Experience</div>
          <div className="exp-row">
            {data.experience.map((job, i) => (
              <div key={job.id} className="exp-item">
                <div className="exp-dot" style={{ background: expColors[i % expColors.length] }} />
                <div style={{ minWidth: 130 }}>
                  <div className="exp-title">{job.role}</div>
                  <div className="exp-sub">{job.startDate} – {job.endDate || 'Present'} · {job.company}</div>
                </div>
                <div className="exp-bar-wrap">
                  <div className="exp-bar" style={{ width: `${90 - i * 20}%`, background: `${expColors[i % expColors.length]}99` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="glass card-contact reveal-card">
          <div className="section-label">Let's connect</div>
          <div className="contact-avail">Open to<br />new roles</div>
          <div className="contact-sub">Flutter · Mobile · Remote</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href={`mailto:${p.email}`} className="cta-btn">get in touch</a>
            <a href="/api/resume/download" className="cta-btn cta-btn-outline" download>
              ↓ download resume
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="glass card-stats reveal-card">
          <div className="section-label" style={{ marginBottom: 12 }}>By the numbers</div>
          <div className="stat-row">
            {[
              [stats.yearsExperience, 'years exp'],
              [stats.yearsFlutter, 'years flutter'],
              [stats.enterpriseApps, 'enterprise apps'],
              [stats.platforms, 'platforms'],
            ].map(([num, lbl]) => (
              <div key={lbl} className="stat-box">
                <div className="stat-num">{num}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Experience Section ── */
function Experience({ jobs }) {
  const ref = useReveal();
  const colors = ['#7c3aed', '#0ea5e9', '#10b981', '#f59e0b'];
  return (
    <section id="experience" className="page-section">
      <div className="section-inner reveal" ref={ref}>
        <h2 className="page-section-title">Experience</h2>
        <div className="timeline">
          {jobs.map((job, i) => (
            <div key={job.id} className="tl-item">
              <div className="tl-dot" style={{ background: colors[i % colors.length] }} />
              <div className="glass tl-card">
                <div className="tl-header">
                  <div>
                    <div className="tl-company">{job.company}</div>
                    <div className="tl-role">{job.role}</div>
                  </div>
                  <div className="tl-meta">{job.startDate} – {job.endDate || 'Present'}<br />{job.location}</div>
                </div>
                <ul className="tl-bullets">
                  {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="pill-wrap" style={{ marginTop: 10 }}>
                  {job.tags.map(t => <span key={t} className="pill pill-white">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects Section ── */
function Projects({ projects }) {
  const ref = useReveal();
  return (
    <section id="projects" className="page-section alt-bg">
      <div className="section-inner reveal" ref={ref}>
        <h2 className="page-section-title">Projects</h2>
        <div className="project-grid">
          {projects.map((p, i) => {
            const pillClass = ['pill-purple', 'pill-teal', 'pill-blue', 'pill-white'][i % 4];
            return (
              <div key={p.id} className="glass proj-card">
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.description}</div>
                <div className="pill-wrap">
                  {p.tags.map(t => <span key={t} className={`pill ${pillClass}`}>{t}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Skills Section ── */
function Skills({ skills }) {
  const ref = useReveal();
  const pillClasses = ['pill-purple', 'pill-teal', 'pill-blue', 'pill-white', 'pill-purple'];
  return (
    <section id="skills" className="page-section">
      <div className="section-inner reveal" ref={ref}>
        <h2 className="page-section-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div key={cat.category} className="glass skills-card">
              <div className="section-label">{cat.category}</div>
              <div className="pill-wrap">
                {cat.items.map(item => (
                  <span key={item} className={`pill ${pillClasses[i % pillClasses.length]}`}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Education Section ── */
function Education({ education }) {
  const ref = useReveal();
  return (
    <section id="education" className="page-section alt-bg">
      <div className="section-inner reveal" ref={ref}>
        <h2 className="page-section-title">Education</h2>
        <div className="edu-grid">
          {education.map(e => (
            <div key={e.id} className="glass edu-card">
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-field">{e.field}</div>
              <div className="edu-inst">{e.institution}</div>
              <div className="edu-years">📅 {e.endDate} &nbsp;📍 {e.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact Section ── */
function Contact({ personal }) {
  const ref = useReveal();
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const set = (k, v) => { setFields(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined })); };

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Required';
    if (!fields.email.trim()) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Invalid email';
    if (!fields.message.trim()) errs.message = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
    setFields({ name: '', email: '', message: '' });
  }

  return (
    <section id="contact" className="page-section">
      <div className="section-inner reveal" ref={ref}>
        <h2 className="page-section-title">Contact</h2>
        <div className="contact-grid">
          <div className="glass contact-info">
            <div className="section-label">Get in touch</div>
            <div className="contact-avail" style={{ fontSize: 22, marginBottom: 8 }}>Let's build<br />something great</div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div className="section-label">Email</div>
                <a href={`mailto:${personal.email}`} className="contact-link">{personal.email}</a>
              </div>
              <div>
                <div className="section-label">Phone</div>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{personal.phone}</span>
              </div>
              <div>
                <div className="section-label">LinkedIn</div>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ wordBreak: 'break-all' }}>
                  {personal.linkedin}
                </a>
              </div>
            </div>
          </div>
          <div className="glass contact-form-card">
            {success && <div className="form-success">Message sent! I'll get back to you soon. 🚀</div>}
            <form onSubmit={submit} noValidate>
              {[['name', 'text', 'Your name', 'Name'], ['email', 'email', 'your@email.com', 'Email']].map(([name, type, ph, lbl]) => (
                <div key={name} className="form-group">
                  <label className="form-label">{lbl}</label>
                  <input className="form-input" type={type} value={fields[name]}
                    onChange={e => set(name, e.target.value)} placeholder={ph} />
                  {errors[name] && <span className="form-error">{errors[name]}</span>}
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" value={fields.message}
                  onChange={e => set('message', e.target.value)} placeholder="Your message…" />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>
              <button type="submit" className="cta-btn" style={{ border: 'none', cursor: 'pointer' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── App ── */
export default function App() {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState(() => {
    try { const s = localStorage.getItem('theme'); return s === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    fetch('/api/resume')
      .then(r => r.json())
      .then(setData)
      .catch(() => {
        // fallback: load from public folder
        fetch('/resume.json').then(r => r.json()).then(setData).catch(console.error);
      });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  if (!data) return <div className="loading">Loading…</div>;

  return (
    <div className={`app theme-${theme}`}>
      <Nav theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero data={data} />
        <Experience jobs={data.experience} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Education education={data.education} />
        <Contact personal={data.personal} />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Suchandra Mondal </p>
      </footer>
    </div>
  );
}
