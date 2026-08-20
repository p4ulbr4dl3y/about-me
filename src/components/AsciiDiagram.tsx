import { useState, useEffect } from 'react'
import { resolveAsset } from '../utils/resolveAsset'

interface AsciiDiagramProps {
  file: string
  title: string
}

export function AsciiDiagram({ file, title }: AsciiDiagramProps) {
  const [content, setContent] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(resolveAsset(`/assets/diagrams/${file}`), { signal: controller.signal })
      .then(res => res.text())
      .then(text => {
        setContent(text)
        setLoaded(true)
      })
      .catch(err => {
        if (controller.signal.aborted) return
        setContent('Ошибка загрузки диаграммы')
        setLoaded(true)
        console.error('AsciiDiagram fetch failed:', err)
      })
    return () => controller.abort()
  }, [file])

  return (
    <div className="ascii-diagram">
      <button
        type="button"
        className="ascii-diagram-toggle"
        onClick={() => setVisible(v => !v)}
        aria-expanded={visible}
      >
        <span className="diagram-title">{title}</span>
        <span className="diagram-toggle-state">{visible ? 'hide' : 'show'}</span>
      </button>
      {visible && loaded && (
        <div className="ascii-diagram-content">
          <pre>{content}</pre>
        </div>
      )}
    </div>
  )
}
