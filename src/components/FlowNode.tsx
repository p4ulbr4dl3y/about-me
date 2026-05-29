import { useRef } from 'react'
import { useDiagram } from './DiagramContext'
import { nodeData } from '../data/nodeData'

interface FlowNodeProps {
  nodeId: string
  title: string
  desc: string
  type?: 'input' | 'condition' | 'output' | 'default'
  className?: string
  style?: React.CSSProperties
}

export function FlowNode({
  nodeId,
  title,
  desc,
  type = 'default',
  className = '',
  style,
}: FlowNodeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { activeNodeId, handleNodeHover, handleNodeLeave } = useDiagram()

  const typeClass =
    type === 'input'
      ? 'input-node'
      : type === 'condition'
        ? 'condition-node'
        : type === 'output'
          ? 'output-node'
          : ''

  const isActive = activeNodeId === nodeId
  const fullData = nodeData[nodeId]

  return (
    <div
      ref={ref}
      className={`flow-node ${typeClass} ${isActive ? 'active' : ''} ${className}`}
      data-node-id={nodeId}
      style={style}
      onMouseEnter={() => handleNodeHover(nodeId)}
      onClick={() => handleNodeHover(nodeId)}
      onMouseLeave={handleNodeLeave}
    >
      <div className="node-title">{title}</div>
      <div className="node-desc">{desc}</div>
      {isActive && fullData && (
        <div className="node-expanded">
          <p>{fullData.desc}</p>
        </div>
      )}
    </div>
  )
}
