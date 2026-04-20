export const palette = {
  background: '#050712',
  surface: '#0B1222',
  accent: '#38B6FF',
  accentSoft: '#6AE2FF',
  deep: '#0A2B4A',
  warning: '#FF8B2D',
  textPrimary: '#E8EBF3',
  textSecondary: '#A9B2C8',
}

export const sections = [
  {
    id: 'space',
    title: '太空碎片与轨道拥挤度',
    subtitle: '从地球轨道到太阳系边界，空间域安全成为当代威胁新高点。',
    description:
      '太空碎片密度、轨道拥堵与卫星安全共同构成新型领域安全的第一层防线。我们用三维地球模型展示碎片云、拥堵热区与近地轨道通道。',
    metrics: [
      { label: '轨道碎片', value: 42100, unit: '件' },
      { label: '高风险轨道', value: 12, unit: '条' },
      { label: '交叉碰撞概率', value: 7.4, unit: '%' },
    ],
  },
  {
    id: 'deepsea',
    title: '深海资源与安全通道',
    subtitle: '深海资源勘探与通道控制正在成为国家级战略资产。',
    description:
      '深海安全可视化呈现资源梯度、海底通道与防护网络，帮助理解海洋领域的控制权分布和防御态势。',
    metrics: [
      { label: '关键通道', value: 8, unit: '条' },
      { label: '资源梯度', value: 4.2, unit: '级' },
      { label: '海底观测', value: 92, unit: '%' },
    ],
  },
  {
    id: 'polar',
    title: '极地消融与环境预警',
    subtitle: '极地冰盖消融已成为全球性安全指标，直接关联基础设施与能源链稳定。',
    description:
      '我们用动态热力对比与时间序列展示极地消融趋势、冰川退缩速度与极地通路风险升高。',
    metrics: [
      { label: '冰盖退缩', value: 16, unit: '%' },
      { label: '预警区域', value: 23, unit: '个' },
      { label: '极地巡检覆盖', value: 68, unit: '%' },
    ],
  },
  {
    id: 'bio',
    title: '生物安全防护网拓扑',
    subtitle: '生物安全已从实验室扩展到生态与城市节点，形成跨域防护网络。',
    description:
      '节点拓扑图展示感染传播链、关键防护点与应急隔离层级，体现生物空间的攻防态势。',
    metrics: [
      { label: '关键节点', value: 17, unit: '个' },
      { label: '隔离层级', value: 5, unit: '级' },
      { label: '响应速度', value: 92, unit: '%' },
    ],
  },
]
