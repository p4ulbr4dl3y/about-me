import { DiagramContainer } from './DiagramContainer'
import { DiagramFlow } from './DiagramFlow'
import { FlowNode } from './FlowNode'
import { FlowArrow, BranchConnector, BranchLines, BranchLabel } from './SvgConnectors'
import { LoopbackBadge } from './LoopbackBadge'

export function CellsistantDiagram() {
  return (
    <DiagramContainer defaultText="Наведите курсор на элементы схемы или кликните по ним, чтобы увидеть подробное описание каждого этапа работы ИИ-агента в цикле ReAct.">
      <div className="diagram-tabs">
        <button className="tab-btn active">Схема: Цикл ИИ-агента (Agent Loop)</button>
      </div>

      <div className="diagram-viewport">
        <DiagramFlow diagramId="diagram-cellsistant-container">
          <FlowNode nodeId="cellsistant-input" title="Входной запрос пользователя" desc="Инструкция на естественном языке" type="input" badge="Запрос" badgeType="input" />
          <FlowArrow />
          <FlowNode nodeId="cellsistant-context" title="Формирование контекста" desc="Сбор состояния ноутбуков и файлов" />
          <FlowArrow />
          <FlowNode nodeId="cellsistant-llm" title="Подача истории сообщений в LLM" desc="Отправка промпта и контекста модели" />
          <FlowArrow />

          <div className="flow-branch-container">
            <FlowNode nodeId="cellsistant-decision" title="Модель выбрала инструмент?" desc="" type="condition" badge="Решение" badgeType="decision" />
            <BranchConnector />
            <BranchLines
              left={
                <>
                  <BranchLabel color="var(--accent)" bgColor="rgba(56, 189, 248, 0.08)" borderColor="rgba(56, 189, 248, 0.2)">Да (Tool Call)</BranchLabel>
                  <FlowArrow />
                  <FlowNode nodeId="cellsistant-parse" title="Парсинг параметров" desc="Извлечение аргументов вызова" />
                  <FlowArrow />
                  <FlowNode nodeId="cellsistant-execute" title="Выполнение инструмента" desc="Запуск кода в Jupyter / Окружении" />
                  <FlowArrow />
                  <FlowNode nodeId="cellsistant-observe" title="Получение Observation" desc="Чтение вывода ячейки или ошибок" />
                  <FlowArrow />
                  <FlowNode nodeId="cellsistant-history" title="Добавление в историю" desc="Запись логов выполнения в контекст" />
                  <LoopbackBadge label="Цикл ReAct: возврат к LLM" highlightNodeId="cellsistant-llm" />
                </>
              }
              right={
                <>
                  <BranchLabel color="#10b981" bgColor="rgba(16, 185, 129, 0.08)" borderColor="rgba(16, 185, 129, 0.2)">Нет (Финал)</BranchLabel>
                  <FlowArrow />
                  <FlowNode nodeId="cellsistant-response" title="Формирование ответа" desc="Вывод итогового решения юзеру" />
                  <FlowArrow />
                  <FlowNode nodeId="cellsistant-end" title="Завершение эпизода" desc="Ожидание нового запроса" type="output" badge="Выход" badgeType="output" />
                </>
              }
            />
          </div>
        </DiagramFlow>
      </div>
    </DiagramContainer>
  )
}
