import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { nodeData } from '../data/nodeData'

interface DiagramContextValue {
  activeNodeId: string | null
  infoTitle: string
  infoText: string
  handleNodeHover: (nodeId: string) => void
  handleNodeLeave: () => void
  handleDiagramLeave: () => void
  defaultTitle: string
  defaultText: string
}

const DiagramContext = createContext<DiagramContextValue | null>(null)

export function useDiagram() {
  const ctx = useContext(DiagramContext)
  if (!ctx) throw new Error('useDiagram must be used within DiagramProvider')
  return ctx
}

interface DiagramProviderProps {
  children: ReactNode
  defaultText?: string
}

export function DiagramProvider({ children, defaultText }: DiagramProviderProps) {
  const defaultTitle = 'Интерактивная схема'
  const defaultTextValue =
    defaultText ??
    'Наведите курсор на элементы схемы или кликните по ним, чтобы увидеть подробное описание каждого этапа работы пайплайна нейросетей.'

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const [infoTitle, setInfoTitle] = useState(defaultTitle)
  const [infoText, setInfoText] = useState(defaultTextValue)

  const handleNodeHover = useCallback(
    (nodeId: string) => {
      setActiveNodeId(nodeId)
      const data = nodeData[nodeId]
      if (data) {
        setInfoTitle(data.title)
        setInfoText(data.desc)
      }
    },
    [],
  )

  const handleNodeLeave = useCallback(() => {
    // Don't reset immediately - keep last hovered node info
  }, [])

  const handleDiagramLeave = useCallback(() => {
    setActiveNodeId(null)
    setInfoTitle(defaultTitle)
    setInfoText(defaultTextValue)
  }, [defaultTitle, defaultTextValue])

  return (
    <DiagramContext.Provider
      value={{
        activeNodeId,
        infoTitle,
        infoText,
        handleNodeHover,
        handleNodeLeave,
        handleDiagramLeave,
        defaultTitle,
        defaultText: defaultTextValue,
      }}
    >
      {children}
    </DiagramContext.Provider>
  )
}
