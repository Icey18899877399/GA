/* src/data/content.js
   顶刊风格色板（NPG 色系）+ 四大板块元数据 */

export const palette = {
  background: '#FAFAF8',
  surface: '#FFFFFF',
  ink: '#1A1A1A',
  muted: '#6B6B68',
  subtle: '#8A8A87',
  border: '#E5E4E0',
  space: '#3C5488',
  deepsea: '#4DBBD5',
  polar: '#00A087',
  bio: '#E64B35',
  accent: '#F39B7F',
}

export const sections = [
  {
    id: 'space',
    title: '太空碎片与轨道拥挤度',
    subtitle: '从地球轨道到太阳系边界，空间域安全成为当代威胁新高点。',
    description:
      '截至 2024 年底，全球编目在轨物体达 40,230 个（ESA 2025 报告）。其中活跃卫星约 9,300 颗，碎片密度在 LEO 550km 附近已与活跃卫星同量级。ESA MASTER-8 模型估计 >10cm 物体 54,000 个，1–10cm 碎片 120 万个，>1mm 碎片 1.4 亿个。',
    metrics: [
      { label: '编目在轨物体', value: 40230, unit: '个' },
      { label: '活跃卫星', value: 9300, unit: '颗' },
      { label: '历史碎裂事件', value: 656, unit: '次' },
    ],
  },
  {
    id: 'deepsea',
    title: '深海资源与安全通道',
    subtitle: '海底光缆承载全球 95–99% 洲际数据——这是现代文明最隐蔽的战略动脉。',
    description:
      '全球约 570 条活跃海底光缆，总长 150 万公里，连接 1,700+ 登陆站。2024 年红海光缆遭破坏致欧亚 25% 数据流量中断。每年约 150–200 次光缆故障，80% 由人为活动造成。',
    metrics: [
      { label: '活跃光缆', value: 570, unit: '条' },
      { label: '总长度', value: 150, unit: '万公里' },
      { label: '年均故障', value: 175, unit: '次' },
    ],
  },
  {
    id: 'polar',
    title: '极地消融与环境预警',
    subtitle: '2025 年北极冬季海冰最大面积创 47 年卫星记录最低值。',
    description:
      '北极 9 月海冰面积以每十年 12.4% 的速度退缩。2025 年冬季最大面积仅 1,433 万 km²，比 1981–2010 均值少 131 万 km²。格陵兰冰盖 2025 年净损失约 1,290 亿吨。2024–2025 年北极表面气温为 1900 年以来最高。',
    metrics: [
      { label: '每十年退缩率', value: 12.4, unit: '%' },
      { label: '每年减少面积', value: 77000, unit: 'km²' },
      { label: '格陵兰年冰损', value: 129, unit: '十亿吨' },
    ],
  },
  {
    id: 'bio',
    title: '生物安全防护网拓扑',
    subtitle: '从实验室到生态、从基因到城市，生物安全已成为国家安全隐形战场。',
    description:
      '2020 年《生物安全法》将生物安全纳入国家安全体系。全球约 59 座 BSL-4 实验室。我国确认外来入侵物种超 660 种，年损失超 1,200 亿元。联合国警告：到 2050 年耐药性疾病或致年死亡 1,000 万人。',
    metrics: [
      { label: 'BSL-4 实验室', value: 59, unit: '座' },
      { label: '外来入侵物种', value: 660, unit: '种+' },
      { label: '入侵年损失', value: 1200, unit: '亿元' },
    ],
  },
]
