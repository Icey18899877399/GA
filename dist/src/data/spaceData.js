export const orbitalGrowthData = [
  { year: 1957, value: 1 },
  { year: 1965, value: 4 },
  { year: 1978, value: 18 },
  { year: 1986, value: 52 },
  { year: 1998, value: 140 },
  { year: 2007, value: 430 },
  { year: 2009, value: 680, event: '伊尔库特碰撞' },
  { year: 2015, value: 950 },
  { year: 2021, value: 1250, event: '凯斯勒临界事件' },
  { year: 2026, value: 1700 },
]

export const orbitalAssetData = [
  { name: '通信卫星', value: 41 },
  { name: '遥感/气象', value: 22 },
  { name: '军事监测', value: 18 },
  { name: '科研与导航', value: 19 },
]

export const orbitLayerInfo = [
  {
    name: '低地轨道（LEO）',
    altitude: '200-2,000 km',
    mission: '遥感、通信、地球观测',
    risk: 9,
    color: '#00F3FF',
  },
  {
    name: '中地轨道（MEO）',
    altitude: '2,000-20,000 km',
    mission: '导航、通信中继',
    risk: 7,
    color: '#FF4B2B',
  },
  {
    name: '地球静止轨道（GEO）',
    altitude: '35,786 km',
    mission: '广播与气象覆盖',
    risk: 8,
    color: '#7F56FF',
  },
]
