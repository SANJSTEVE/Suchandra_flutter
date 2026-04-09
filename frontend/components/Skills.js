'use client';
import useReveal from './useReveal';

export default function Skills({ skills }) {
  const ref = useReveal();
  return (
    <section id="skills" ref={ref} className="reveal">
      <h2 className="section-title">Skills</h2>
      <div className="section-line" />
      <div className="skills-grid">
        {skills.map(group => (
          <div key={group.category} className="skill-card">
            <div className="skill-category">{group.category}</div>
            <div className="skill-tags">
              {group.items.map(item => <span key={item} className="skill-tag">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
