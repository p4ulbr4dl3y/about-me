import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface DiagramContextValue {
  activeNodeId: string | null
  handleNodeHover: (nodeId: string) => void
  handleNodeLeave: () => void
  handleDiagramLeave: () => void
}

const DiagramContext = createContext<DiagramContextValue | null>(null)

export function useDiagram() {
  const ctx = useContext(DiagramContext)
  if (!ctx) throw new Error('useDiagram must be used within DiagramProvider')
  return ctx
}

export function DiagramProvider({ children }: { children: ReactNode }) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)

  const handleNodeHover = useCallback((nodeId: string) => {
    setActiveNodeId(nodeId)
  }, [])

  const handleNodeLeave = useCallback(() => {
    setActiveNodeId(null)
  }, [])

  const handleDiagramLeave = useCallback(() => {
    setActiveNodeId(null)
  }, [])

  return (
    <DiagramContext.Provider
      value={{
        activeNodeId,
        handleNodeHover,
        handleNodeLeave,
        handleDiagramLeave,
      }}
    >
      {children}
    </DiagramContext.Provider>
  )
}
