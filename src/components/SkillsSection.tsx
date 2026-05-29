import type { Skill } from '../data/skills'
import { skillsRow1, skillsRow2, skillsRow3 } from '../data/skills'

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skill-card">
      <img src={skill.icon} alt={skill.name} className={skill.invertDark ? 'invert-dark' : ''} />
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
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {skills.map((skill) => (
            <SkillCard key={`${skill.name}-dup`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title">Кое-что из того, с чем я работал</h2>
      <div className="marquee-container">
        <MarqueeRow skills={skillsRow1} direction="left" />
        <MarqueeRow skills={skillsRow2} direction="right" />
        <MarqueeRow skills={skillsRow3} direction="left" />
      </div>
    </section>
  )
}
