/* src/data/spaceData.js
   数据来源：ESA Space Environment Report 2025, NASA ODPO, USSPACECOM
   截至 2024 年底 / 2025 年初 */

export const orbitalGrowthData = [
  { year: 1957, value: 1 },
  { year: 1965, value: 200 },
  { year: 1975, value: 3500 },
  { year: 1985, value: 6800 },
  { year: 1995, value: 8500 },
  { year: 2000, value: 9200 },
  { year: 2007, value: 12000, event: '中国 FY-1C 反卫星试验' },
  { year: 2009, value: 16000, event: '宇宙 2251 与铱星 33 碰撞' },
  { year: 2015, value: 17800 },
  { year: 2019, value: 20000, event: '印度 ASAT 试验' },
  { year: 2021, value: 27000, event: '俄罗斯 ASAT 摧毁宇宙 1408' },
  { year: 2023, value: 35000 },
  { year: 2024, value: 40230, event: 'ESA 报告 40,230 编目对象' },
]

export const orbitalAssetData = [
  { name: '通信卫星', value: 45, itemStyle: { color: '#3C5488' } },
  { name: '遥感/气象', value: 20, itemStyle: { color: '#4DBBD5' } },
  { name: '导航', value: 12, itemStyle: { color: '#00A087' } },
  { name: '军事监测', value: 13, itemStyle: { color: '#E64B35' } },
  { name: '科研/其他', value: 10, itemStyle: { color: '#8491B4' } },
]

export const orbitLayerInfo = [
  {
    name: '低地轨道（LEO）',
    altitude: '200 – 2,000 km',
    mission: '遥感、通信星座（Starlink等）、空间站',
    risk: 9,
    color: '#3C5488',
    detail: '集中了约 80% 的在轨物体，碎片密度最高。ESA 模型显示 550km 附近碎片数量已与活跃卫星同数量级。',
  },
  {
    name: '中地轨道（MEO）',
    altitude: '2,000 – 20,000 km',
    mission: '导航（GPS、北斗、伽利略）、通信中继',
    risk: 6,
    color: '#E64B35',
    detail: '碎片密度相对较低，但报废卫星处置率不足 50%，构成长期潜在风险。',
  },
  {
    name: '地球静止轨道（GEO）',
    altitude: '35,786 km',
    mission: '广播、气象监测、战略预警',
    risk: 8,
    color: '#8491B4',
    detail: '轨道资源极度稀缺，轨位间距仅 0.1°。2024 年多起碎裂事件产生 3,000+ 新编目碎片。',
  },
]

/* 补充统计 */
export const spaceStats = {
  trackedObjects: 40230,       // ESA 2025 report, 截至 2024 年底
  objectsAbove10cm: 54000,     // MASTER-8 模型，含未编目
  debris1to10cm: 1200000,      // 120 万
  debrisAbove1mm: 140000000,   // 1.4 亿
  totalMassTons: 13579,        // 在轨物体总质量 (吨)
  fragmentationEvents: 656,    // 历史累计碎裂事件
  reentries2024: 2031,         // 2024 年再入大气层数
  activeSatellites: 9300,      // 约 9,300 颗活跃卫星
  collisionAvoidance: '每周数百次', // ESA CARA 数据
}
