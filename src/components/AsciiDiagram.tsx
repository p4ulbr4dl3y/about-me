import { useState, useEffect } from 'react'

interface AsciiDiagramProps {
  file: string
  title: string
}

export function AsciiDiagram({ file, title }: AsciiDiagramProps) {
  const [content, setContent] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(`/assets/diagrams/${file}`)
      .then(res => res.text())
      .then(text => {
        setContent(text)
        setLoaded(true)
      })
      .catch(() => {
        setContent('Ошибка загрузки диаграммы')
        setLoaded(true)
      })
  }, [file])

  return (
    <div className="ascii-diagram">
      <button
        className="ascii-diagram-prompt"
        onClick={() => setVisible(v => !v)}
      >
        <span className="prompt-symbol">$</span> cat {title}
        <span className="prompt-cursor" />
      </button>
      {visible && loaded && (
        <div className="ascii-diagram-content">
          <pre>{content}</pre>
        </div>
      )}
    </div>
  )
}
