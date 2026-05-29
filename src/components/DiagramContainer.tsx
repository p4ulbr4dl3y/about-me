import { type ReactNode } from 'react'
import { DiagramProvider } from './DiagramContext'

interface DiagramContainerProps {
  children: ReactNode
}

export function DiagramContainer({ children }: DiagramContainerProps) {
  return (
    <DiagramProvider>
      <div className="project-diagrams-side">
        {children}
      </div>
    </DiagramProvider>
  )
}
