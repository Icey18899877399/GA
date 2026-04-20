export const polarCopy = {
  title: '极地消融：寒冷边疆的升温博弈',
  intro:
    '极地不仅是全球气候的调节器，更是资源与战略的新高地。随着冰层退却，被封存的航道与能源正成为全球关注的焦点，安全红线正在这片洁白之地重新划定。',
  viewpoints: [
    {
      title: '冰盖危局',
      content:
        '北极海冰以每十年 13% 的速度萎缩。这不是简单的融化，而是全球生态系统连通性的断裂。',
    },
    {
      title: '“冰上丝绸之路”',
      content:
        '极地航道的开启将缩短全球贸易航程，但也带来了领海主权与过境安全的复杂考验。',
    },
    {
      title: '极地资源主权',
      content:
        '埋藏在冰层下的油气资源与稀土，正让南北极从“科研净土”变成“大国博弈”的前沿。',
    },
  ],
  radarMetrics: [
    { name: '军事存在', value: 82 },
    { name: '资源开发', value: 74 },
    { name: '气候影响', value: 88 },
    { name: '主权争端', value: 76 },
    { name: '科研能力', value: 92 },
  ],
  temperatureSeries: [
    { year: 1979, anomaly: -0.32 },
    { year: 1985, anomaly: -0.18 },
    { year: 1990, anomaly: -0.06 },
    { year: 1995, anomaly: 0.02 },
    { year: 2000, anomaly: 0.12 },
    { year: 2005, anomaly: 0.24 },
    { year: 2010, anomaly: 0.31 },
    { year: 2015, anomaly: 0.45 },
    { year: 2020, anomaly: 0.58 },
    { year: 2026, anomaly: 0.74 },
  ],
  routes: [
    {
      id: 'nsr',
      name: '北极东北航道',
      distance: '航程缩短 30%',
      region: '巴伦支海 → 楚科奇海峡',
      color: '#00FFC3',
      path: 'M 30 36 C 90 18 150 28 180 66',
      label: [78, 30],
    },
    {
      id: 'nwp',
      name: '西北航道',
      distance: '航程缩短 22%',
      region: '北冰洋 → 白令海峡',
      color: '#7CDBFF',
      path: 'M 38 84 C 90 94 148 86 182 128',
      label: [82, 126],
    },
  ],
}

export const polarIceStats = {
  startYear: 1979,
  endYear: 2026,
  startCoverage: 100,
  endCoverage: 42,
}
