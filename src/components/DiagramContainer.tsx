import { type ReactNode } from 'react'
import { DiagramProvider } from './DiagramContext'

interface DiagramContainerProps {
  children: ReactNode
  defaultText?: string
}

export function DiagramContainer({ children, defaultText }: DiagramContainerProps) {
  return (
    <DiagramProvider defaultText={defaultText}>
      <div className="project-diagrams-side">
        {children}
      </div>
    </DiagramProvider>
  )
}
