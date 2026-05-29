import { type ReactNode } from 'react'
import { DiagramProvider } from './DiagramContext'
import { DiagramInfoPanel } from './DiagramInfoPanel'

interface DiagramContainerProps {
  children: ReactNode
  defaultText?: string
}

export function DiagramContainer({ children, defaultText }: DiagramContainerProps) {
  return (
    <DiagramProvider defaultText={defaultText}>
      <div className="project-diagrams-side">
        {children}
        <DiagramInfoPanel />
      </div>
    </DiagramProvider>
  )
}
