export interface ProjectImage {
  src: string
  alt: string
  fullWidth?: boolean
}

export interface ProjectDiagram {
  file: string
  title: string
}

export interface Project {
  id: string
  terminalTitle?: string
  title: string
  tags?: string[]
  description: string[]
  /** Отдельный абзац с HTML-разметкой (опционально) */
  descriptionHtml?: string
  diagrams?: ProjectDiagram[]
  images?: ProjectImage[]
}

export const projects: Project[] = [
  {
    id: 'colreg-vision-node',
    terminalTitle: 'colreg-vision-node — bash',
    title: 'colreg-vision-node',
    tags: ['cv', 'yolo', 'efficientnet', 'sensor-fusion', 'mqtt'],
    description: [
      'Конвейер видеоаналитики для распознавания судов по международным правилам МППСС-72. Находит суда на кадрах с бортовых камер и определяет их статус: моторное, парусное, на лове рыбы или потеряло управление. Днем смотрит на знаки и форму судна, ночью — на навигационные огни.',
      'Внутри цепочка моделей. Сначала YOLO находит силуэт судна на обычной и тепловизионной картинке, потом EfficientNet отсекает моторные от парусных, а отдельные детекторы ищут спецсигналы. Если найдены рыболовные или аварийные огни — этот статус становится главным.',
      'Ночью картинка собирается с двух сенсоров: тепловизор видит борт в темноте, а обычная камера считывает цвета огней. Сам сервис работает по MQTT в связке с радаром: радар засекает цель, камера наводится на борт, а сетка определяет, кто идет навстречу.',
    ],
    diagrams: [
      { file: 'full-pipeline.txt', title: 'full_pipeline.txt' },
      { file: 'infrared-fusion.txt', title: 'infrared_fusion.txt' },
    ],
    images: [
      { src: '/assets/colreg/original_result_no_expansion.jpg', alt: 'Детекция в ИК спектре' },
      { src: '/assets/colreg/photo_result_nuc_at_2.5.jpg', alt: 'Детекция в RGB спектре' },
    ],
  },
  {
    id: 'johnston',
    terminalTitle: 'johnston — bash',
    title: 'johnston',
    tags: ['ai-agents', 'mcp', 'tui', 'cli', 'devtools'],
    description: [
      'Johnston — терминальный harness на Python для разработки с LLM. Легковесный TUI-инструмент, заточенный под реальные задачи кодинга.',
      'Работает нативно на Linux, macOS и Windows без WSL. Команды выполняются прямо в системном shell, а для изоляции есть опциональная кроссплатформенная песочница. Поддерживает любые модели без привязки к вендорам.',
      'Вся система спроектирована под жесткую экономию токенов: логика работы минимизирует число ходов LLM, отсекает холостые вызовы и не раздувает контекст. Внутри оркестрация субагентов, протокол MCP, скиллы и автоматические Git-чекпоинты для быстрого отката правок.',
    ],
    images: [
      { src: '/assets/johnston/demo1.png', alt: 'Johnston — оркестрация субагентов и выполнение плана', fullWidth: true },
      { src: '/assets/johnston/demo2.png', alt: 'Johnston — встроенный просмотр диффов изменений', fullWidth: true },
    ],
  },
  {
    id: 'autoboxer',
    terminalTitle: 'autoboxer — bash',
    title: 'autoboxer',
    tags: ['cv', 'vlm', 'auto-labeling', 'dataset-tools'],
    description: [
      'Локальный инструмент для авторазметки датасетов под детекцию. Вместо ручной обводки каждого объекта использует открытую VLM LocateAnything-3B: задаешь текстовый промпт, и модель сама находит нужные объекты и расставляет боксы.',
      'Пайплайн простой: загружается папка с картинками, настраиваются классы, запускается пакетная обработка. Для контроля сделал редактор на канвасе — можно быстро прокликать результаты, поправить съехавшие рамки или доразметить пропущенное.',
      'Все крутится локально, данные не уходят в облако. Готовый датасет сразу экспортируется в форматы YOLO и COCO.',
    ],
    images: [
      { src: '/assets/autoboxer/demo1.png', alt: 'Autoboxer — пакетная разметка датасета', fullWidth: true },
      { src: '/assets/autoboxer/demo2.png', alt: 'Autoboxer — интерактивный канвас-редактор', fullWidth: true },
    ],
  },
  {
    id: 'recommender-system',
    terminalTitle: 'recommender-system — bash',
    title: 'recommender-system',
    tags: ['big-data', 'recsys', 'spark', 'kafka', 'cassandra', 'fastapi'],
    description: [
      'Дипломный проект трека «Большие данные» в IT-Академии Samsung, защищен с отличием. Рекомендательный движок для e-commerce на Lambda-архитектуре: горячие события крутятся в потоке, тяжелая аналитика — в батчах.',
      'Потоковый слой на Spark Structured Streaming ловит клики и каждые 10 минут обновляет топ популярных товаров в Cassandra. Батч-слой раз в 6 часов пересчитывает персональные рекомендации на ALS, похожие товары по Жаккару и контентную фильтрацию через TF-IDF с LSH. Наружу рекомендации отдает сервис на FastAPI с кэшем в Redis.',
      'Весь стек поднят в Docker: кластер Spark, HDFS, Kafka, Cassandra, MariaDB и мониторинг в Grafana. Запуск периодических джоб завязан на APScheduler.',
    ],
    diagrams: [
      { file: 'recsys-speed-layer.txt', title: 'speed_layer.txt' },
      { file: 'recsys-batch-bi.txt', title: 'batch_bi.txt' },
      { file: 'recsys-batch-recsys.txt', title: 'batch_recsys.txt' },
    ],
  },
  {
    id: 'text2circuit',
    terminalTitle: 'text2circuit — bash',
    title: 'text2circuit',
    tags: ['llm', 'mcp', 'distillation', 'circuit-design'],
    description: [
      'ИИ-ассистент, который превращает текстовое ТЗ в готовую электрическую схему. Вместо ручной возни в САПР модель сама подбирает компоненты, рассчитывает номиналы и строит чертеж.',
      'Архитектура делится на две части. Первая — MCP-сервер, который отвечает за компоновку деталей и отрисовку соединений. Вторая — компактная Gemma 4 E4B: я дообучил её дистилляцией на траекториях рассуждений Minimax M3. Так малая модель научилась пошаговому планированию и точным вызовам функций сервера.',
      'Для работы сделал веб-интерфейс: общаешься с ассистентом в чате и сразу видишь готовую схему на экране.',
    ],
    images: [
      { src: '/assets/text2circuit/demo.gif', alt: 'Интерактивный ИИ-ассистент для проектирования электрических схем', fullWidth: true },
    ],
  },
  {
    id: 'lego-minifig-classifier',
    terminalTitle: 'lego-minifig-classifier — bash',
    title: 'lego-minifig-classifier',
    tags: ['cv', 'segmentation', 'vector-search', 'faiss', 'siglip'],
    description: [
      'Сервис для поиска и распознавания фигурок LEGO по фото. По одной фотографии находит точную модель и серию фигурки среди тысяч вариантов в каталоге.',
      'Пайплайн в три этапа. Сначала LocateAnything детектирует фигурки в кадре. Затем вырезаем выбранный объект из фона через SAM или BiRefNet, чтобы убрать визуальный шум окружения. Очищенный кроп отдаем в SigLIP2 для генерации эмбеддинга, а FAISS находит ближайшее совпадение по векторной базе эталонов.',
    ],
    diagrams: [
      { file: 'lego-minifig-pipeline.txt', title: 'pipeline.txt' },
    ],
    images: [
      { src: '/assets/lego-minifig/demo.jpg', alt: 'Интерфейс системы идентификации LEGO-минифигур' },
    ],
  },
  {
    id: 'cellsistant',
    terminalTitle: 'cellsistant — bash',
    title: 'cellsistant',
    tags: ['ai-agents', 'jupyterlab', 'multimodal', 'tools'],
    description: [
      'Плагин для JupyterLab с автономным агентом прямо в интерфейсе. Работает по циклу ReAct: агент получает задачу, сам пишет код в ячейках, запускает их, ловит ошибки в выводе и правит код до победного.',
      'Для работы с окружением реализовал 19 инструментов: создание и запуск ячеек, доступ к терминалу, чтение и запись файлов. Мультимодальный модуль позволяет агенту смотреть на построенные matplotlib-графики и делать выводы по картинке.',
    ],
    diagrams: [
      { file: 'cellsistant-react-loop.txt', title: 'react_loop.txt' },
    ],
    images: [
      { src: '/assets/cellsistant/demo.gif', alt: 'Cellsistant - демонстрация работы агента', fullWidth: true },
    ],
  },
  {
    id: 'chart-expert',
    terminalTitle: 'chart-expert — bash',
    title: 'chart-expert',
    tags: ['vlm', 'lora', 'unsloth', 'gguf', 'quantization'],
    description: [
      'Локальная модель для чтения графиков на базе Qwen3-VL-2B. Внешние API постоянно отваливались по таймаутам и лимитам, поэтому перешел на свою автономную сетку.',
      'Собрал синтетический датасет из тысячи графиков и дообучил модель по LoRA через Unsloth. Сетка научилась определять тип визуализации, снимать точные цифры с осей и легенды и делать выводы по картинке.',
      'Веса квантовал в GGUF q4_k_m: модель весит меньше двух гигабайт и быстро инферится на обычном процессоре без видеокарты.',
    ],
    images: [
      { src: '/assets/chart-expert/demo.png', alt: 'Chart Expert - пример анализа графика' },
    ],
  },
  {
    id: 'datascience-expert',
    terminalTitle: 'datascience-expert — bash',
    title: 'datascience-expert',
    tags: ['llm', 'fine-tuning', 'lora', 'unsloth', 'data-science'],
    description: [
      'Компактная русскоязычная модель-ассистент по Data Science на базе Qwen2.5-Coder-1.5B. Заточена под прикладной стек: pandas, numpy, визуализацию, классический ML и нейросети.',
      'Для обучения сделал пайплайн генерации синтетики ds-factory: агенты написали 2500 диалогов по пяти темам, а весь код прогонялся через линтер Ruff. Модель дообучил по LoRA через Unsloth.',
      'Веса квантовал в GGUF q4_k_m. Модель весит меньше гигабайта, отвечает без задержек и легко запускается на обычном ноутбуке без GPU.',
    ],
    diagrams: [
      { file: 'ds-factory-structure.txt', title: 'data_generation.txt' },
    ],
    images: [
      { src: '/assets/datascience-expert/demo.gif', alt: 'DataScience Expert - демонстрация работы модели', fullWidth: true },
    ],
  },
  {
    id: 'vk-workspace-search',
    terminalTitle: 'vk-workspace-search — bash',
    title: 'vk-workspace-search',
    tags: ['nlp', 'hybrid-search', 'reranking', 'vector-search', 'retrieval'],
    description: [
      'Победитель Всероссийского финала хакатона IT-Академии Samsung 2026. Разработал систему семантического поиска по корпоративным чатам VK Workspace, подняв целевую метрику с 0.46 до 0.602.',
      'При индексации сообщения нарезаются скользящим окном с перекрытием, чтобы не терять контекст длинных тредов, и связываются с авторами и датами. Для поиска используется гибридная схема: плотные нейросетевые эмбеддинги вместе с разреженным поиском по ключевым словам.',
      'Выдача объединяет четыре независимых потока через Reciprocal Rank Fusion. Итоговый список кандидатов переупорядочивает кросс-энкодер Llama Nemotron Reranker 1B с эвристическим бустингом по датам и участникам диалога.',
    ],
    diagrams: [
      { file: 'vk-search-indexing.txt', title: 'indexing.txt' },
      { file: 'vk-search-retrieval.txt', title: 'retrieval.txt' },
    ],
  },
  {
    id: 'ais-anomaly-detection',
    terminalTitle: 'ais-anomaly-detection — bash',
    title: 'ais-anomaly-detection',
    tags: ['anomaly-detection', 'trajectories', 'maritime', 'deep-learning'],
    description: [
      'Финалист акселератора «Российская Арктика» 2025. Система детекции аномалий в движении судов при намеренном отключении передатчиков АИС.',
      'В основе лежит двунаправленный прогноз траектории. Модель обучается только на нормальных исторических маршрутах. Прямая сеть прогнозирует путь вперед от точки потери сигнала, а обратная восстанавливает траекторию назад во времени от точки выхода на связь. Если маневров не было, пути сходятся.',
      'Расхождение между прогнозами сразу вскрывает аномалию: незапланированную остановку, дрейф или резкую смену курса внутри слепой зоны.',
    ],
    diagrams: [
      { file: 'ais-anomaly-architecture.txt', title: 'architecture.txt' },
    ],
    images: [
      { src: '/assets/ais-anomaly/demo.png', alt: 'AIS Anomaly Detection - результаты анализа' },
    ],
  },
  {
    id: 'colreg-expert-system',
    terminalTitle: 'colreg-expert-system — bash',
    title: 'colreg-expert-system',
    tags: ['expert-systems', 'rule-engine', 'maritime', 'reasoning'],
    description: [
      'Экспертная система для безопасного расхождения судов в море по регламенту МППСС-72. Анализирует навигационную обстановку и рассчитывает маневр: определяет статус судов, безопасный курс уклонения, запретные сектора и звуковые сигналы.',
      'В основе лежит движок прямой цепочки рассуждений. Числовые параметры сближения и пеленги переводятся в логические факты, после чего движок применяет правила базы знаний до фикс-поинта. Система учитывает встречные курсы, обгон, опасные пересечения, приоритеты типов судов и ограниченную видимость.',
      'В отличие от нейросетей, здесь нет черного ящика: конфликты правил разруливаются строгими приоритетами, а каждая рекомендация полностью трассируется со ссылками на конкретные пункты правил.',
    ],
    diagrams: [
      { file: 'colreg-expert-architecture.txt', title: 'architecture.txt' },
    ],
    images: [
      { src: '/assets/colreg-expert/demo.png', alt: 'Colreg Expert System — интерфейс экспертной системы' },
    ],
  },
  {
    id: 'doc2json',
    terminalTitle: 'doc2json — bash',
    title: 'doc2json',
    tags: ['ocr', 'document-ai', 'vlm', 'map-reduce'],
    description: [
      'Система извлечения структурированных данных из сканов и многостраничных документов. Обычный OCR выдает сплошной неструктурированный текст, а этот пайплайн сразу парсит паспорта, договоры и счета в строгий JSON по схеме пользователя.',
      'Обработка построена по принципу Map-Reduce. На этапе Map страницы параллельно сканирует мультимодальная сетка Chandra-OCR-2, дообученная на корпусе российских документов. На этапе Reduce алгоритм рекурсивно склеивает поля и таблицы со всех страниц в единую валидную схему.',
      'Для работы сделал веб-интерфейс: в no-code конструкторе собираешь схему нужных полей, загружаешь файл и на лету получаешь заполненную структуру.',
    ],
    images: [
      { src: '/assets/doc2json/demo.gif', alt: 'Интерфейс системы извлечения структурированных данных doc2json', fullWidth: true },
    ],
  },
]
