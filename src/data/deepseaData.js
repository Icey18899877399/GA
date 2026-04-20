/* src/data/deepseaData.js
   来源：ITU 2026 海底光缆韧性峰会、ICPC、TeleGeography 2024、ESA */

export const cableData = [
  { id: 'atlantic', continents: ['北美', '欧洲'], dataVolume: '~40%', cables: 120, note: '全球金融数据主干' },
  { id: 'pacific', continents: ['亚太', '北美'], dataVolume: '~32%', cables: 80, note: '云计算与 AI 数据枢纽' },
  { id: 'indian', continents: ['亚太', '非洲', '欧洲'], dataVolume: '~18%', cables: 50, note: '红海 / 亚丁湾关键咽喉' },
  { id: 'intra-asia', continents: ['东亚', '东南亚'], dataVolume: '~10%', cables: 90, note: '区域内高密度互联' },
]

export const threatFactors = [
  { factor: '人为破坏（锚拖/渔捞）', value: 80 },
  { factor: '地缘政治风险', value: 85 },
  { factor: '深海采矿冲突', value: 72 },
  { factor: '自然灾害（地震/海底滑坡）', value: 68 },
  { factor: '数据安全/窃听', value: 88 },
]

export const copywriting = {
  title: '深海安全：隐形动脉的战略博弈',
  intro:
    '全球约 570 条活跃海底光缆、总长 150 万公里，承载了 95–99% 的洲际数据流量——这些"玻璃纤维"是现代文明最脆弱也最核心的战略动脉。2024 年红海光缆遭破坏，导致欧亚间 25% 数据流量中断。',
  triggers: [
    {
      depth: 200,
      title: '资源主权边界',
      content:
        '200 米以下进入深海。2024 年全球海底光缆市场规模达 300 亿美元，Google、Meta、Amazon、Microsoft 四家公司控制了全球约一半的海底带宽。深海油气与矿产资源争夺正重塑国家安全边界。',
    },
    {
      depth: 3000,
      title: '数据化生命线',
      content:
        '570+ 条光缆连接 1,700 多个登陆点。2024–2025 年间，波罗的海、红海、亚太相继发生高调光缆切断事件。每年约 150–200 次光缆故障，其中 80% 由人为活动造成。',
    },
    {
      depth: 6000,
      title: '深渊战略前沿',
      content:
        '马里亚纳海沟深达 10,935 米。中国"奋斗者"号 2020 年坐底万米。无人潜航器（UUV）与深海空间站的部署，开启了静默的深蓝博弈。国际海底管理局（ISA）正制定深海采矿规则，168 国签署 UNCLOS。',
    },
  ],
}

/* 补充统计 */
export const deepseaStats = {
  activeCables: 570,           // 约 570 条活跃光缆 (2025 初)
  totalLengthKm: 1500000,     // ~150 万公里
  dataTrafficShare: '95–99%', // 洲际数据占比
  landingPoints: 1700,         // 登陆站
  annualFaults: '150–200',    // 每年故障次数
  humanCausedPercent: 80,      // 人为原因占比
  marketValueBillion: 30,      // 市场规模 (亿美元)
  bigTechBandwidthShare: 50,   // 四大科技公司占全球带宽 %
}
