'use client';
import useReveal from './useReveal';

function formatDate(d) {
  if (!d) return 'Present';
  const [y, m] = d.split('-');
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Education({ education }) {
  const ref = useReveal();
  return (
    <section id="education" ref={ref} className="reveal">
      <h2 className="section-title">Education</h2>
      <div className="section-line" />
      <div className="edu-grid">
        {education.map(e => (
          <div key={e.id} className="edu-card">
            <div>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-institution">{e.institution}</div>
            </div>
            <span className="edu-date">{formatDate(e.startDate)} – {formatDate(e.endDate)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
