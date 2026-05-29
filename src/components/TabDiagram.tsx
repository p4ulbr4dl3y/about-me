import { useState, type ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabDiagramProps {
  tabs: Tab[]
}

export function TabDiagram({ tabs }: TabDiagramProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '')

  return (
    <>
      <div className="diagram-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="diagram-viewport">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content ${activeTab === tab.id ? 'active' : ''}`}
            id={tab.id}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </>
  )
}
