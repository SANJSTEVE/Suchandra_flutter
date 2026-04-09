'use client';
import { useState } from 'react';
import useReveal from './useReveal';

function sanitize(str) {
  return str.replace(/[<>"'&]/g, c => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' }[c]));
}

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Name is required';
  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
  if (!message.trim()) errors.message = 'Message is required';
  else if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
}

export default function Contact({ personal }) {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    // mailto fallback — no backend needed
    const body = encodeURIComponent(`Name: ${sanitize(form.name)}\n\n${sanitize(form.message)}`);
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${body}`;
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className="reveal">
      <h2 className="section-title">Contact</h2>
      <div className="section-line" />
      <div className="contact-grid">
        <div className="contact-links">
          <a href={`mailto:${personal.email}`} className="contact-link" rel="noopener noreferrer">
            <span className="contact-link-icon">📧</span>{personal.email}
          </a>
          <a href={`tel:${personal.phone}`} className="contact-link">
            <span className="contact-link-icon">📞</span>{personal.phone}
          </a>
          {personal.linkedin && (
            <a href={personal.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
              <span className="contact-link-icon">💼</span>LinkedIn
            </a>
          )}
          <div style={{ marginTop: '0.5rem', color: 'var(--text2)', fontSize: '0.88rem' }}>
            📍 {personal.location}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input className="form-input" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          {errors.name && <span className="form-error">{errors.name}</span>}
          <input className="form-input" type="email" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          {errors.email && <span className="form-error">{errors.email}</span>}
          <input className="form-input" placeholder="Subject (optional)" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          <textarea className="form-input" rows={4} placeholder="Your Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          {errors.message && <span className="form-error">{errors.message}</span>}
          {success && <div className="form-success">✅ Opening your email client...</div>}
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  );
}
