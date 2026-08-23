import type { SkillGroup } from '../data/skills'

export function TechList({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="tech-groups">
      {groups.map((group) => (
        <div className="tech-group" key={group.label}>
          <h4>{group.label}</h4>
          <ul>
            {group.items.map(({ name, icon: Icon }) => (
              <li key={name}>
                <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
