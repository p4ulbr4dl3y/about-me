export interface Award {
  id: string
  year: string
  rank: string
  title: string
  certificateSrc: string
  certificateAlt: string
}

export const awards: Award[] = [
  {
    id: 'samsung-hackathon-allrussian-2026',
    year: '2026',
    rank: '1-е место',
    title: 'Всероссийский хакатон Samsung (VK Tech)',
    certificateSrc: '/assets/certificates/samsung-hackathon-2026.webp',
    certificateAlt: 'Диплом победителя Всероссийского хакатона ИТ Академии 2026',
  },
  {
    id: 'samsung-hackathon-saftu-2026',
    year: '2026',
    rank: '1-е место',
    title: 'Хакатон Samsung (площадка САФУ)',
    certificateSrc: '/assets/certificates/samsung-hackathon-saftu-2026.webp',
    certificateAlt: 'Диплом за I место, команда «азаза» (капитан Суровцев Егор), площадка САФУ',
  },
  {
    id: 'samsung-bigdata-honors-2026',
    year: '2026',
    rank: 'с отличием',
    title: 'ИТ Академия Samsung: Большие данные',
    certificateSrc: '/assets/certificates/samsung-bigdata-honors-2026.webp',
    certificateAlt: 'Сертификат с отличием трека «Большие данные» ИТ Академии Samsung 2026',
  },
  {
    id: 'mpit-hackathon-2025',
    year: '2025',
    rank: '2-е место',
    title: 'Конкурс «Моя профессия — ИТ»',
    certificateSrc: '/assets/certificates/mpit-2nd-place-2025.webp',
    certificateAlt: 'Диплом за 2 место в региональном этапе конкурса «Моя профессия — ИТ» 2025',
  },
  {
    id: 'arctic-accelerator-finalist-2025',
    year: '2025',
    rank: 'финалист',
    title: 'Акселератор «Российская Арктика»',
    certificateSrc: '/assets/certificates/arctic-accelerator-finalist-2025.webp',
    certificateAlt: 'Диплом финалиста конкурса стартап-проектов акселерационной программы «Российская Арктика» 2025',
  },
]
