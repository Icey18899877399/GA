export const bioCopy = {
  title: '隐形防线：生命命门的守护与突围',
  intro:
    '病毒没有国界，基因编码不仅是生命的蓝图，也可能成为安全的漏洞。在微观世界的较量中，生物安全已成为国家安全中最具挑战性的“隐形战场”。',
  layers: [
    {
      title: '隐形威胁',
      content:
        '病毒没有国界。在微观世界的较量中，跨境突发传染病与合成生物学风险正成为人类文明最隐形的威胁。',
    },
    {
      title: '全球防线',
      content:
        '从 P4 实验室的严密封控到全球生物监测网的实时联动，每一串基因编码的扫描都是对生命命门的守护。',
    },
    {
      title: '基因主权',
      content:
        '数字时代，生物遗传资源是核心战略资产。保护基因库，就是保护物种的未来。',
    },
  ],
  dnaMarkers: [
    { id: 'R1', index: 6, label: '突变风险点', description: '该片段显示高致病性基因变异，需实时监测。' },
    { id: 'R2', index: 12, label: '实验室异常', description: '该节点对应生物实验数据异常采样，可能存在泄漏风险。' },
    { id: 'R3', index: 18, label: '治理盲区', description: '该区域代表跨境基因流动的薄弱防线。' },
  ],
  geneStream: ['A', 'T', 'C', 'G', 'G', 'A', 'C', 'T', 'T', 'G', 'A', 'C'],
  radarMetrics: [
    { name: '跨境速率', value: 82 },
    { name: '实验室安全', value: 71 },
    { name: '外来物种', value: 65 },
    { name: '多样性流失', value: 54 },
  ],
  globalNodes: [
    { id: 'LS1', name: '北美 P4 中心', x: 18, y: 28, status: '监测中' },
    { id: 'LS2', name: '欧洲疫情实验室', x: 45, y: 22, status: '数据联动' },
    { id: 'LS3', name: '亚洲生物安全站', x: 66, y: 38, status: '风险预警' },
    { id: 'LS4', name: '南半球研究站', x: 58, y: 64, status: '流光节点' },
  ],
  globalLinks: [
    ['LS1', 'LS2'],
    ['LS2', 'LS3'],
    ['LS3', 'LS4'],
  ],
}
