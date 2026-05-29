import { type ReactNode } from 'react'
import { useDiagram } from './DiagramContext'

interface DiagramFlowProps {
  children: ReactNode
  diagramId: string
}

export function DiagramFlow({ children, diagramId }: DiagramFlowProps) {
  const { handleDiagramLeave, activeNodeId } = useDiagram()

  return (
    <div
      className={`interactive-diagram ${activeNodeId ? 'has-active-flow' : ''}`}
      id={diagramId}
      onMouseLeave={handleDiagramLeave}
    >
      <div className="diagram-flow">{children}</div>
    </div>
  )
}
