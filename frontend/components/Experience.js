'use client';
import useReveal from './useReveal';

function formatDate(d) {
  if (!d) return 'Present';
  const [y, m] = d.split('-');
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience({ jobs }) {
  const ref = useReveal();
  return (
    <section id="experience" ref={ref} className="reveal">
      <h2 className="section-title">Experience</h2>
      <div className="section-line" />
      <div className="timeline">
        {jobs.map(job => (
          <div key={job.id} className="timeline-item">
            <div className="timeline-header">
              <div>
                <div className="timeline-role">{job.role}</div>
                <div className="timeline-company">{job.company} · {job.location}</div>
              </div>
              <span className="timeline-date">{formatDate(job.startDate)} – {formatDate(job.endDate)}</span>
            </div>
            <ul className="timeline-bullets">
              {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <div className="timeline-tags">
              {job.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
