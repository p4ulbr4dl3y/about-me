import { useDiagram } from './DiagramContext'

export function DiagramInfoPanel() {
  const { infoTitle, infoText } = useDiagram()

  return (
    <div className="diagram-info-panel">
      <div className="panel-header">
        <span className="info-icon">i</span>
        <h5>{infoTitle}</h5>
      </div>
      <p>{infoText}</p>
    </div>
  )
}
