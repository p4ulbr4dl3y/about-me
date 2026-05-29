export function FlowArrow() {
  return <div className="flow-arrow" />
}

export function BranchConnector() {
  return (
    <div className="branch-connector">
      <svg className="branch-connector-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path
          d="M50 0 v10 H25 v10 M50 10 H75 v10"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function MergeConnector2() {
  return (
    <div className="merge-connector-2">
      <svg className="merge-connector-svg" viewBox="0 0 100 24" preserveAspectRatio="none">
        <path
          d="M25 0 v12 H75 v-12 M50 12 v12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function MergeConnector4() {
  return (
    <div className="merge-connector-4">
      <svg className="merge-connector-svg" viewBox="0 0 100 24" preserveAspectRatio="none">
        <path
          d="M12.5 0 v8 H87.5 v-8 M37.5 0 v8 M62.5 0 v8 M50 8 v16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function BranchLines({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="branch-lines">
      <div className="branch-left">{left}</div>
      <div className="branch-right">{right}</div>
    </div>
  )
}

export function BranchLabel({ children, color, bgColor, borderColor }: {
  children: React.ReactNode
  color?: string
  bgColor?: string
  borderColor?: string
}) {
  return (
    <span
      className="branch-label"
      style={{
        color,
        backgroundColor: bgColor,
        borderColor,
      }}
    >
      {children}
    </span>
  )
}

export function DualInputRow({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="dual-input-row">
      {left}
      {right}
    </div>
  )
}

export function DualArrowRow() {
  return (
    <div className="dual-arrow-row">
      <FlowArrow />
      <div className="flow-arrow empty-arrow" />
    </div>
  )
}
