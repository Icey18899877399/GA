/* src/data/polarData.js
   来源：NSIDC, NOAA Arctic Report Card 2025, ESA CryoSat */

export const polarCopy = {
  title: '极地消融：寒冷边疆的升温博弈',
  intro:
    '2025 年 3 月 22 日，北极冬季海冰最大面积创下 47 年卫星记录最低值——1,433 万平方公里。2024–2025 年北极表面气温为 1900 年以来最高。极地不仅是全球气候的调节器，更是资源与战略的新高地。',
  viewpoints: [
    {
      title: '冰盖危局',
      content:
        '北极 9 月海冰面积以每十年 12.4% 的速度退缩。2007–2025 连续 19 年为卫星记录最低 19 年。2025 年冬季最大面积仅 1,433 万 km²，比 1981–2010 均值少 131 万 km²。',
    },
    {
      title: '"冰上丝绸之路"',
      content:
        '2024 年夏季加拿大群岛西北航道南线冰情达卫星记录最低。通航窗口扩大推动航运增长，但也带来领海主权与过境安全的复杂考验。',
    },
    {
      title: '极地资源主权',
      content:
        '北极蕴含全球约 13% 未发现石油和 30% 未发现天然气。格陵兰冰盖 2025 年净损失约 1,290 亿吨冰。大西洋化（Atlantification）已深入北冰洋中心，削弱海水分层结构。',
    },
    {
      title: '生态连锁反应',
      content:
        '2025 年北极 8/9 区域浮游生物生产力高于 2003–2022 均值。底层变暖与海冰减少正驱动物种北移，重塑渔业格局与原住民生计。永久冻土融化释放铁与重金属，导致"河流锈蚀"现象。',
    },
  ],
  radarMetrics: [
    { name: '军事存在', value: 82 },
    { name: '资源开发', value: 78 },
    { name: '气候影响', value: 94 },
    { name: '主权争端', value: 76 },
    { name: '科研能力', value: 88 },
  ],
  temperatureSeries: [
    { year: 1979, anomaly: -0.32 },
    { year: 1985, anomaly: -0.18 },
    { year: 1990, anomaly: -0.08 },
    { year: 1995, anomaly: 0.04 },
    { year: 2000, anomaly: 0.16 },
    { year: 2005, anomaly: 0.28 },
    { year: 2010, anomaly: 0.38 },
    { year: 2015, anomaly: 0.52 },
    { year: 2020, anomaly: 0.68 },
    { year: 2024, anomaly: 0.82 },
    { year: 2025, anomaly: 0.91 },
  ],
  routes: [
    {
      id: 'nsr',
      name: '北极东北航道 (NSR)',
      distance: '上海→鹿特丹：经 NSR 约 14 天 vs 苏伊士 24 天',
      region: '巴伦支海 → 楚科奇海峡',
      color: '#00A087',
      path: 'M 30 36 C 90 18 150 28 180 66',
      label: [78, 30],
    },
    {
      id: 'nwp',
      name: '西北航道 (NWP)',
      distance: '西雅图→鹿特丹：经 NWP 约 16 天 vs 巴拿马 22 天',
      region: '加拿大群岛 → 白令海峡',
      color: '#4DBBD5',
      path: 'M 38 84 C 90 94 148 86 182 128',
      label: [82, 126],
    },
  ],
}

export const polarIceStats = {
  startYear: 1979,
  endYear: 2025,
  startCoverage: 100,
  endCoverage: 38,  // 2025 年 9 月海冰最低值约为 1979 年的 38%
  maxExtent2025: 14.33,      // 百万 km²，记录最低
  minExtent2024: 4.28,       // 百万 km²，第 7 低
  minExtent2025: 4.60,       // 百万 km²，第 10 低
  trendPerDecade: -12.4,     // % per decade (9月)
  annualLossKm2: 77000,      // 每年减少约 77,000 km²
  greenlandIceLoss2025: 129, // 十亿吨
}
