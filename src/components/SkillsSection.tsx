import type { Skill } from '../data/skills'
import { skillsRow1, skillsRow2, skillsRow3 } from '../data/skills'
import { resolveAsset } from '../utils/resolveAsset'

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skill-card">
      <img src={resolveAsset(skill.icon)} alt={skill.name} />
      <span>{skill.name}</span>
    </div>
  )
}

function MarqueeRow({ skills, direction }: { skills: Skill[]; direction: 'left' | 'right' }) {
  return (
    <div className="marquee-row">
      <div className={`marquee-track track-${direction}`}>
        <div className="marquee-content">
          {skills.map((skill) => (
            <SkillCard key={skill.icon} skill={skill} />
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {skills.map((skill) => (
            <SkillCard key={`${skill.icon}-dup`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title">ls skills/</h2>
      <div className="skills-terminal">
        <div className="terminal-bar">
          <span className="terminal-dot red" aria-hidden="true"></span>
          <span className="terminal-dot yellow" aria-hidden="true"></span>
          <span className="terminal-dot green" aria-hidden="true"></span>
          <span className="terminal-bar-text">skills — tree</span>
        </div>
        <div className="marquee-container">
          <MarqueeRow skills={skillsRow1} direction="left" />
          <MarqueeRow skills={skillsRow2} direction="right" />
          <MarqueeRow skills={skillsRow3} direction="left" />
        </div>
      </div>
    </section>
  )
}
