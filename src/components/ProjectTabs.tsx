import { useState, type ReactNode } from 'react'

interface ProjectTabsProps {
  info: ReactNode
  diagram: ReactNode
}

export function ProjectTabs({ info, diagram }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'diagram'>('info')

  return (
    <>
      <div className="project-tabs">
        <button
          className={`project-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          О проекте
        </button>
        <button
          className={`project-tab-btn ${activeTab === 'diagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagram')}
        >
          Схема
        </button>
      </div>
      <div className="project-tab-panel">
        {activeTab === 'info' ? info : diagram}
      </div>
    </>
  )
}
