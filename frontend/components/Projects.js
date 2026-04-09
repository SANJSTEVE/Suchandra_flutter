'use client';
import { useState } from 'react';
import useReveal from './useReveal';

export default function Projects({ projects }) {
  const ref = useReveal();
  const [activeTag, setActiveTag] = useState('All');
  const [modal, setModal] = useState(null);

  const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];
  const visible = activeTag === 'All' ? projects : projects.filter(p => p.tags.includes(activeTag));

  return (
    <section id="projects" ref={ref} className="reveal">
      <h2 className="section-title">Projects</h2>
      <div className="section-line" />

      <div className="filter-bar">
        {allTags.map(t => (
          <button key={t} className={`filter-btn${activeTag === t ? ' active' : ''}`} onClick={() => setActiveTag(t)}>{t}</button>
        ))}
      </div>

      <div className="projects-grid">
        {visible.map(p => (
          <div key={p.id} className="project-card" onClick={() => setModal(p)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setModal(p)}>
            <div className="project-title">{p.title}</div>
            <p className="project-desc">{p.description}</p>
            <div className="timeline-tags">
              {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className={`modal-overlay${modal ? '' : ' hidden'}`} onClick={() => setModal(null)}>
        {modal && (
          <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <h3>{modal.title}</h3>
            <p>{modal.longDesc || modal.description}</p>
            <div className="timeline-tags" style={{ marginBottom: '1.2rem' }}>
              {modal.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
            </div>
            <div className="modal-links">
              {modal.repoUrl && <a href={modal.repoUrl} className="btn btn-outline" target="_blank" rel="noopener noreferrer">GitHub</a>}
              {modal.liveUrl && <a href={modal.liveUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>}
              {!modal.repoUrl && !modal.liveUrl && <span style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>Links coming soon</span>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
