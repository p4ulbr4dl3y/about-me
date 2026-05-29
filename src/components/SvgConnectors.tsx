export function FlowArrow() {
  return <div className="flow-arrow" />
}

export function BranchConnector() {
  return <div className="flow-arrow" />
}

export function MergeConnector2() {
  return (
    <div className="merge-connector-2">
      <div className="merge-split">
        <div className="merge-arm">
          <div className="merge-arm-line" />
        </div>
        <div className="merge-arm">
          <div className="merge-arm-line" />
        </div>
      </div>
      <div className="merge-bar" />
      <div className="merge-line-down" />
      <div className="merge-arrow" />
    </div>
  )
}

export function MergeConnector4() {
  return (
    <div className="merge-connector-4">
      <div className="merge-split merge-split-4">
        <div className="merge-arm">
          <div className="merge-arm-line" />
        </div>
        <div className="merge-arm">
          <div className="merge-arm-line" />
        </div>
        <div className="merge-arm">
          <div className="merge-arm-line" />
        </div>
        <div className="merge-arm">
          <div className="merge-arm-line" />
        </div>
      </div>
      <div className="merge-bar" />
      <div className="merge-line-down" />
      <div className="merge-arrow" />
    </div>
  )
}

export function BranchLines({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="branch-lines-wrapper">
      <div className="branch-horizontal-bar" />
      <div className="branch-lines">
        <div className="branch-left">{left}</div>
        <div className="branch-right">{right}</div>
      </div>
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
