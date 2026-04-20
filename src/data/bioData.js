/* src/data/bioData.js
   来源：WHO, UN Environment Programme, 《生物安全法》, 国家卫健委 */

export const bioCopy = {
  title: '隐形防线：生命命门的守护与突围',
  intro:
    '病毒没有国界，基因编码不仅是生命的蓝图，也可能成为安全的漏洞。2020 年《生物安全法》将生物安全纳入国家安全体系。在微观世界的较量中，生物安全已成为"隐形战场"。',
  layers: [
    {
      title: '传染病威胁',
      content:
        'WHO 报告新发传染病以每年至少一种的速度出现，20 余年间新增 40+ 种。SARS 波及 32 国、新冠累计确诊超 7.7 亿例。2019 年 WHO 与世界银行联合报告警告：高致命性呼吸道病原体大流行威胁切实存在。',
    },
    {
      title: '全球防线',
      content:
        '全球现有约 59 座 BSL-4 实验室。2004 年《病原微生物实验室生物安全管理条例》实施（2016、2018 两次修订）。生物安全实验室实行分类分级管理，统一国家标准。',
    },
    {
      title: '基因主权',
      content:
        '2020 年 10 月 17 日《生物安全法》通过，涵盖七大领域：传染病防控、生物技术安全、实验室管理、遗传资源保护、外来物种入侵、微生物耐药、生物恐怖防御。联合国警告：到 2050 年耐药性疾病每年或致 1,000 万人死亡。',
    },
    {
      title: '生态入侵',
      content:
        '我国确认的外来入侵物种超 660 种，年经济损失超 1,200 亿元。2019 年 IUCN 全球 100 种最具威胁外来入侵物种中入侵中国 50 余种。改革开放以来 71 种被列入《中国外来入侵物种名单》。',
    },
  ],
  dnaMarkers: [
    { id: 'R1', index: 4, label: '合成生物学风险', description: 'CRISPR-Cas9 等基因编辑技术的双重用途风险——可用于治疗遗传病，也可能被滥用于制造生物武器。' },
    { id: 'R2', index: 10, label: '实验室安全漏洞', description: '全球 59 座 BSL-4 实验室中，部分设施的安全审计合规率不足 70%。《病原微生物实验室生物安全管理条例》要求分类分级管理。' },
    { id: 'R3', index: 16, label: '跨境基因流动', description: '人类遗传资源的跨境非法交易风险上升。《生物安全法》要求对外提供遗传资源须符合伦理原则，不得危害国家安全。' },
    { id: 'R4', index: 21, label: '耐药性危机', description: '联合国报告：到 2050 年耐药性疾病每年或致 1,000 万人死亡；到 2030 年可能使 2,400 万人陷入极端贫困。' },
  ],
  geneStream: ['A', 'T', 'C', 'G', 'G', 'A', 'C', 'T', 'T', 'G', 'A', 'C', 'G', 'T', 'A', 'C'],
  radarMetrics: [
    { name: '跨境传播速率', value: 86 },
    { name: '实验室安全', value: 71 },
    { name: '外来物种入侵', value: 68 },
    { name: '生物多样性流失', value: 58 },
    { name: '耐药性威胁', value: 79 },
  ],
  globalNodes: [
    { id: 'USAMRIID', name: '美国陆军传染病研究所', x: 18, y: 30, status: '监测中' },
    { id: 'Porton', name: '英国波顿唐实验室', x: 40, y: 20, status: '数据联动' },
    { id: 'WIV', name: '中国武汉病毒研究所', x: 62, y: 35, status: '高等级防护' },
    { id: 'CSIRO', name: '澳大利亚 CSIRO', x: 70, y: 62, status: '生态监测' },
    { id: 'Pasteur', name: '法国巴斯德研究所', x: 42, y: 26, status: '疫苗研发' },
    { id: 'NICD', name: '南非国家传染病中心', x: 48, y: 58, status: '流行病学预警' },
  ],
  globalLinks: [
    ['USAMRIID', 'Porton'],
    ['Porton', 'Pasteur'],
    ['Pasteur', 'WIV'],
    ['WIV', 'CSIRO'],
    ['CSIRO', 'NICD'],
    ['NICD', 'Porton'],
  ],
}
