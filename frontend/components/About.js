'use client';
import useReveal from './useReveal';

export default function About({ personal, certifications, languages }) {
  const ref = useReveal();
  return (
    <section id="about" ref={ref} className="reveal">
      <h2 className="section-title">About Me</h2>
      <div className="section-line" />

      <div className="bento-card" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* subtle inner orb */}
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          background: 'var(--orb2)', filter: 'blur(80px)',
          borderRadius: '50%', top: '-80px', right: '-60px',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div className="about-grid" style={{ position: 'relative', zIndex: 1 }}>
          <p className="about-text">{personal.summary}</p>

          <div className="about-info">
            <div className="about-info-item"><span>📍</span><span>{personal.location}</span></div>
            <div className="about-info-item"><span>📧</span><span>{personal.email}</span></div>
            <div className="about-info-item"><span>📞</span><span>{personal.phone}</span></div>
            <div className="about-info-item"><span>🌐</span><span>{languages.join(', ')}</span></div>

            <div style={{ marginTop: '0.8rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Certifications
              </div>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '4px' }}>• {c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
