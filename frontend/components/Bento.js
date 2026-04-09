'use client';
import useReveal from './useReveal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

function formatDate(d) {
  if (!d) return 'Now';
  const [y, m] = d.split('-');
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Calculate bar width % based on duration
function barWidth(start, end) {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const max = 24; // months max scale
  const months = Math.min((e - s) / (1000 * 60 * 60 * 24 * 30), max);
  return Math.round((months / max) * 100);
}

export default function Bento({ data }) {
  const ref = useReveal();
  const { personal, skills, experience, projects } = data;
  const featuredProject = projects[0];
  const topSkills = skills.slice(0, 3);
  const topJobs = experience.slice(0, 3);

  return (
    <div className="bento-wrapper reveal" ref={ref}>
      {/* Orb lights */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="bento-grid">

        {/* ── Bio card ── */}
        <div className="bento-card bento-bio">
          <div className="bento-bio-name">Hi, I'm <span>{personal.name}</span></div>
          <div className="bento-bio-title">{personal.title}</div>
          <p className="bento-bio-liner">
            Building production-ready AI systems, multi-agent workflows, and scalable GenAI solutions — from idea to deployment.
          </p>
        </div>

        {/* ── Availability card ── */}
        <div className="bento-card bento-avail" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="avail-badge">
              <span className="avail-dot" />
              Available
            </div>
            <div className="avail-label">Open to Opportunities</div>
            <div className="avail-sub">Full-time · Remote · Chennai</div>
          </div>
          <a href={`${BACKEND_URL}/api/resume/download`} className="btn btn-primary" style={{ textAlign: 'center', marginTop: '1rem' }} target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </div>

        {/* ── Skills card ── */}
        <div className="bento-card bento-skills">
          <div className="bento-skills-title">Tech Stack</div>
          <div className="bento-skill-groups">
            {topSkills.map(group => (
              <div key={group.category} className="bento-skill-row">
                <span className="bento-skill-cat">{group.category.split(' ')[0]}</span>
                <div className="bento-skill-tags">
                  {group.items.map(item => (
                    <span key={item} className="bento-skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Experience bar card ── */}
        <div className="bento-card bento-exp">
          <div className="bento-exp-title">Experience</div>
          <div className="exp-timeline">
            {topJobs.map(job => (
              <div key={job.id} className="exp-bar-item">
                <div className="exp-bar-header">
                  <span className="exp-bar-role">{job.role.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="exp-bar-date">{formatDate(job.startDate)} – {formatDate(job.endDate)}</span>
                </div>
                <div className="exp-bar-company">{job.company}</div>
                <div className="exp-bar-track">
                  <div className="exp-bar-fill" style={{ width: `${barWidth(job.startDate, job.endDate)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured project card ── */}
        <div className="bento-card bento-proj">
          <div className="bento-proj-header">
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Featured Project</div>
              <div className="bento-proj-title">{featuredProject.title}</div>
            </div>
            <a href="#projects" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>View All →</a>
          </div>
          <p className="bento-proj-desc">{featuredProject.longDesc || featuredProject.description}</p>
          <div className="bento-proj-tags">
            {featuredProject.tags.map(t => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
