import { useRef } from 'react'
import { useDiagram } from './DiagramContext'

interface FlowNodeProps {
  nodeId: string
  title: string
  desc: string
  type?: 'input' | 'condition' | 'output' | 'default'
  badge?: string
  badgeType?: 'input' | 'decision' | 'output'
  className?: string
  style?: React.CSSProperties
}

export function FlowNode({
  nodeId,
  title,
  desc,
  type = 'default',
  badge,
  badgeType,
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

  const badgeClass =
    badgeType === 'input'
      ? 'input-badge'
      : badgeType === 'decision'
        ? 'decision-badge'
        : badgeType === 'output'
          ? 'output-badge'
          : ''

  const isActive = activeNodeId === nodeId

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
      {badge && <div className={`node-badge ${badgeClass}`}>{badge}</div>}
      <div className="node-title">{title}</div>
      <div className="node-desc">{desc}</div>
    </div>
  )
}
