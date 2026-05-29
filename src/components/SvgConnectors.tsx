export function FlowArrow() {
  return <div className="flow-arrow" />
}

export function BranchConnector() {
  return (
    <div className="branch-connector">
      <svg className="branch-connector-svg" viewBox="0 0 200 24" preserveAspectRatio="none">
        <defs>
          <marker id="arrow-down" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto">
            <path d="M0 0 L4 8 L8 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {/* center down */}
        <path d="M100 0 V10" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* left from center */}
        <path d="M100 10 H50" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* left down with arrow */}
        <path d="M50 10 V24" fill="none" stroke="currentColor" strokeWidth="2" marker-end="url(#arrow-down)" />
        {/* right from center */}
        <path d="M100 10 H150" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* right down with arrow */}
        <path d="M150 10 V24" fill="none" stroke="currentColor" strokeWidth="2" marker-end="url(#arrow-down)" />
      </svg>
    </div>
  )
}

export function MergeConnector2() {
  return (
    <div className="merge-connector-2">
      <svg className="merge-connector-svg" viewBox="0 0 200 28" preserveAspectRatio="none">
        <defs>
          <marker id="arrow-down-merge2" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto">
            <path d="M0 0 L4 8 L8 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {/* left up */}
        <path d="M50 0 V12" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* right up */}
        <path d="M150 0 V12" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* horizontal merge */}
        <path d="M50 12 H150" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* center down with arrow */}
        <path d="M100 12 V28" fill="none" stroke="currentColor" strokeWidth="2" marker-end="url(#arrow-down-merge2)" />
      </svg>
    </div>
  )
}

export function MergeConnector4() {
  return (
    <div className="merge-connector-4">
      <svg className="merge-connector-svg" viewBox="0 0 200 28" preserveAspectRatio="none">
        <defs>
          <marker id="arrow-down-merge4" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto">
            <path d="M0 0 L4 8 L8 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {/* four inputs from top */}
        <path d="M40 0 V10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M80 0 V10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M120 0 V10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M160 0 V10" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* horizontal bar */}
        <path d="M40 10 H160" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* center down with arrow */}
        <path d="M100 10 V28" fill="none" stroke="currentColor" strokeWidth="2" marker-end="url(#arrow-down-merge4)" />
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
