export interface Award {
  id: string
  year: string
  rank: string
  badgeType: 'gold' | 'silver' | 'honors' | 'finalist'
  title: string
  subtitle: string
  certificateSrc: string
  certificateAlt: string
  relatedProjectId?: string
}

export const awards: Award[] = [
  {
    id: 'samsung-hackathon-allrussian-2026',
    year: '2026',
    rank: '1-е место',
    badgeType: 'gold',
    title: 'Всероссийский хакатон Samsung (VK Tech)',
    subtitle: 'Диплом победителя · Кейс VK Tech (Интеллектуальный поиск в VK Workspace)',
    certificateSrc: '/assets/certificates/samsung-hackathon-2026.webp',
    certificateAlt: 'Диплом победителя Всероссийского хакатона ИТ Академии 2026',
    relatedProjectId: 'vk-workspace-search',
  },
  {
    id: 'samsung-hackathon-saftu-2026',
    year: '2026',
    rank: '1-е место',
    badgeType: 'gold',
    title: 'Хакатон Samsung (площадка САФУ)',
    subtitle: 'Кейс VK Tech · Команда «азаза» (капитан)',
    certificateSrc: '/assets/certificates/samsung-hackathon-saftu-2026.webp',
    certificateAlt: 'Диплом за I место, команда «азаза» (капитан Суровцев Егор), площадка САФУ',
    relatedProjectId: 'vk-workspace-search',
  },
  {
    id: 'samsung-bigdata-honors-2026',
    year: '2026',
    rank: 'с отличием',
    badgeType: 'honors',
    title: 'ИТ Академия Samsung: Большие данные',
    subtitle: 'Сертификат с отличием · 136 ак. часов · Выпускной проект (RecSys Lambda)',
    certificateSrc: '/assets/certificates/samsung-bigdata-honors-2026.webp',
    certificateAlt: 'Сертификат с отличием трека «Большие данные» ИТ Академии Samsung 2026',
    relatedProjectId: 'recommender-system',
  },
  {
    id: 'mpit-hackathon-2025',
    year: '2025',
    rank: '2-е место',
    badgeType: 'silver',
    title: 'Конкурс «Моя профессия — ИТ»',
    subtitle: 'Региональный этап · Архангельская область · Трек «специалисты» · Команда «азаза»',
    certificateSrc: '/assets/certificates/mpit-2nd-place-2025.webp',
    certificateAlt: 'Диплом за 2 место в региональном этапе конкурса «Моя профессия — ИТ» 2025',
  },
  {
    id: 'arctic-accelerator-finalist-2025',
    year: '2025',
    rank: 'финалист',
    badgeType: 'finalist',
    title: 'Акселератор «Российская Арктика»',
    subtitle: 'Конкурс стартап-проектов · Проектно-образовательный интенсив',
    certificateSrc: '/assets/certificates/arctic-accelerator-finalist-2025.webp',
    certificateAlt: 'Диплом финалиста конкурса стартап-проектов акселерационной программы «Российская Арктика» 2025',
  },
]
