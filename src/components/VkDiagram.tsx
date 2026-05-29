import { DiagramContainer } from './DiagramContainer'
import { TabDiagram } from './TabDiagram'
import { DiagramFlow } from './DiagramFlow'
import { FlowNode } from './FlowNode'
import { FlowArrow, MergeConnector4 } from './SvgConnectors'

function IndexingPipeline() {
  return (
    <DiagramFlow diagramId="diagram-vk-indexing">
      <FlowNode nodeId="vk-messages" title="Входные сообщения" desc="Сырые чаты и медиафайлы из VK Workspace" type="input" />
      <FlowArrow />
      <FlowNode nodeId="vk-anchors" title="render_v20: семантические якоря" desc="Обогащение метаданными и связями" />
      <FlowArrow />
      <FlowNode nodeId="vk-chunking" title="Чанкирование: 512/128" desc="Разбиение скользящим окном" />
      <FlowArrow />
      <FlowNode nodeId="vk-qdrant-index" title="Qdrant: плотные и BM25 векторы" desc="Гибридное векторирование в БД" type="output" />
    </DiagramFlow>
  )
}

function SearchingPipeline() {
  return (
    <DiagramFlow diagramId="diagram-vk-searching">
      <FlowNode nodeId="vk-query" title="Вопрос пользователя" desc="Текстовый запрос сотрудника в поиске" type="input" />
      <FlowArrow />

      <div className="vk-parallel-grid">
        <FlowNode
          nodeId="vk-search-dense"
          title="Dense Search"
          desc="Оригинальный запрос"
          style={{ width: '100%', padding: '0.6rem 0.4rem' }}
          className="compact-node"
        />
        <FlowNode
          nodeId="vk-search-hyde"
          title="HyDE Dense"
          desc="Гипотетический ответ"
          style={{ width: '100%', padding: '0.6rem 0.4rem' }}
          className="compact-node"
        />
        <FlowNode
          nodeId="vk-search-sparse-main"
          title="Sparse Main"
          desc="Запрос + автор"
          style={{ width: '100%', padding: '0.6rem 0.4rem' }}
          className="compact-node"
        />
        <FlowNode
          nodeId="vk-search-sparse-opt"
          title="Sparse Opt"
          desc="Поиск по тексту"
          style={{ width: '100%', padding: '0.6rem 0.4rem' }}
          className="compact-node"
        />
      </div>

      <MergeConnector4 />

      <FlowNode nodeId="vk-rrf-fusion" title="RRF Fusion в Qdrant" desc="Объединение рангов четырех потоков" />
      <FlowArrow />
      <FlowNode nodeId="vk-top80" title="Топ-80 кандидатов" desc="Первичный срез выдачи" />
      <FlowArrow />
      <FlowNode nodeId="vk-reranker" title="Реранкер Llama-Nemotron" desc="Высокоточное ранжирование, топ-35" />
      <FlowArrow />
      <FlowNode nodeId="vk-boosting" title="Heuristic Boosting" desc="Взвешивание сущностей, дат и авторов" />
      <FlowArrow />
      <FlowNode nodeId="vk-sharpener" title="Post-processing: NDCG Sharpener" desc="Повышение точности и диверсификации" />
      <FlowArrow />
      <FlowNode nodeId="vk-final-top50" title="Финальная выдача: топ-50 ID" desc="Итоговый список релевантных сообщений" type="output" />
    </DiagramFlow>
  )
}

export function VkDiagram() {
  return (
    <DiagramContainer>
      <TabDiagram
        tabs={[
          { id: 'vk-indexing-pipeline', label: 'Схема 1: Индексация данных', content: <IndexingPipeline /> },
          { id: 'vk-searching-pipeline', label: 'Схема 2: Пайплайн поиска V23', content: <SearchingPipeline /> },
        ]}
      />
    </DiagramContainer>
  )
}
