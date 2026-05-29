import { DiagramContainer } from './DiagramContainer'
import { TabDiagram } from './TabDiagram'
import { DiagramFlow } from './DiagramFlow'
import { FlowNode } from './FlowNode'
import { FlowArrow, BranchConnector, BranchLines, BranchLabel } from './SvgConnectors'

function RgbPipeline() {
  return (
    <DiagramFlow diagramId="diagram-rgb-container">
      <FlowNode nodeId="input-rgb" title="Входное изображение" desc="RGB-кадр с камеры высокого разрешения" type="input" badge="Вход RGB" badgeType="input" />
      <FlowArrow />
      <FlowNode nodeId="yolo-detect" title="Детекция судов YOLO" desc="Локализация судов и построение рамок" />
      <FlowArrow />
      <FlowNode nodeId="crop-fragments" title="Извлечение фрагментов" desc="Вырезание судов для детального анализа" />
      <FlowArrow />
      <FlowNode nodeId="effnet-binary" title="Бинарная классификация EfficientNet" desc="Определение времени суток (День / Ночь)" />
      <FlowArrow />

      <div className="flow-branch-container">
        <FlowNode nodeId="mode-switch" title="Режим работы" desc="" type="condition" badge="Решение" badgeType="decision" />
        <BranchConnector />
        <BranchLines
          left={
            <>
              <BranchLabel>Дневной</BranchLabel>
              <FlowArrow />
              <FlowNode nodeId="yolo-day" title="Дневные фигуры YOLO" desc="Детекция знаков (шары, конусы и др.)" />
            </>
          }
          right={
            <>
              <BranchLabel color="#10b981" bgColor="rgba(16, 185, 129, 0.08)" borderColor="rgba(16, 185, 129, 0.2)">Ночной</BranchLabel>
              <FlowArrow />
              <FlowNode nodeId="yolo-night" title="Огни YOLO" desc="Детекция навигационных огней" />
            </>
          }
        />
      </div>

      <FlowArrow />
      <FlowNode nodeId="colreg-hierarchy" title="Применение иерархии" desc="Логический вывод класса судна по МППСС" />
      <FlowArrow />
      <FlowNode nodeId="final-output" title="Результат" desc="Типы судов и уверенность предсказания" type="output" badge="Результат" badgeType="output" />
    </DiagramFlow>
  )
}

function MultimodalPipeline() {
  return (
    <DiagramFlow diagramId="diagram-multimodal-container">
      <div className="dual-input-row">
        <FlowNode nodeId="input-ir" title="ИК-изображение" desc="Кадр с тепловизионной камеры" type="input" badge="Вход ИК" badgeType="input" />
        <FlowNode nodeId="input-visible" title="Видимое изображение" desc="Кадр с RGB-камеры" type="input" badge="Вход RGB" badgeType="input" />
      </div>
      <div className="dual-arrow-row">
        <FlowArrow />
        <div className="flow-arrow empty-arrow" />
      </div>
      <div className="dual-input-row">
        <FlowNode nodeId="yolo-ir-detect" title="Детекция ИК YOLO" desc="Поиск судов по тепловому излучению" />
        <div className="flow-arrow empty-arrow" />
      </div>
      <div className="dual-arrow-row">
        <FlowArrow />
        <div className="flow-arrow empty-arrow" />
      </div>
      <div className="dual-input-row">
        <FlowNode nodeId="bbox-coords" title="Координаты рамок" desc="Границы объектов из ИК-канала" />
        <div className="flow-arrow empty-arrow" />
      </div>

      <div className="merge-connector-2">
        <svg className="merge-connector-svg" viewBox="0 0 100 24" preserveAspectRatio="none">
          <path d="M25 0 v12 H75 v-12 M50 12 v12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </div>

      <FlowNode nodeId="fusion-extract" title="Извлечение по координатам" desc="Кроп RGB-изображения по ИК-рамкам" />
      <FlowArrow />
      <FlowNode nodeId="yolo-lights-fusion" title="Классификация огней YOLO" desc="Детекция огней на совмещенных фрагментах" />
      <FlowArrow />
      <FlowNode nodeId="fusion-output" title="Формирование результата" desc="Навигационный статус по МППСС" type="output" badge="Результат" badgeType="output" />
    </DiagramFlow>
  )
}

export function ColregDiagram() {
  return (
    <DiagramContainer>
      <TabDiagram
        tabs={[
          { id: 'pipeline-rgb', label: 'Схема 1: Одноканальный (RGB)', content: <RgbPipeline /> },
          { id: 'pipeline-multimodal', label: 'Схема 2: Мультимодальный (ИК+RGB)', content: <MultimodalPipeline /> },
        ]}
      />
    </DiagramContainer>
  )
}
