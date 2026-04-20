---
noteId: "aefed9c0367f11f1af3e97816781694a"
tags: []

---

# 新型领域安全 · 交互科普单页应用

> New Domain Security — 太空、深海、极地、生物四大核心板块的卷轴叙事科普 SPA

---

## 项目简介

这是一个以**深色科技风**为视觉基调的 React 单页应用（SPA），围绕**四大新型安全领域**展开深度科普：

| 板块 | 路由 | 主题色 | 核心交互 |
|------|------|--------|----------|
| 太空安全 | `/space` | 深空黑 `#000205` + 青蓝 `#00F3FF` | 3D 地球场景、轨道碎片可视化、凯斯勒效应叙事 |
| 深海安全 | `/deepsea` | 海面蓝→深渊黑渐变 `#0077BE→#00050A` | 深度计、海雪粒子、海底光缆 3D 模型、声呐脉冲动画 |
| 极地安全 | `/polar` | 极夜黑 `#00050A` + 冰川青 | 冰块 UI、极地投影地图、温度趋势图表、雷达面板 |
| 生物安全 | `/bio` | 暗绿 `#001A15` + 荧光绿 `#00ff41` | DNA 双螺旋 3D 模型、全球生物监测地图、风险雷达、显微镜背景 |

---

## 技术栈

- **框架**：React 18 + React Router v6（客户端路由）
- **构建工具**：Vite 5
- **样式**：Tailwind CSS 3.4 + PostCSS + 自定义 CSS 动画
- **3D 渲染**：Three.js + @react-three/fiber + @react-three/drei
- **图表**：Recharts + ECharts（echarts-for-react）+ D3.js
- **动画**：Framer Motion（入场动画）+ GSAP + ScrollTrigger（滚动驱动动画）

---

## 目录结构

```
project-root/
├── index.html                  # 入口 HTML
├── package.json                # 依赖与脚本
├── vite.config.js              # Vite 配置（端口 4173）
├── tailwind.config.js          # Tailwind 主题扩展（自定义色板、阴影）
├── postcss.config.js           # PostCSS 插件链
│
├── src/
│   ├── main.jsx                # 应用入口：挂载 React + BrowserRouter
│   ├── App.jsx                 # 路由表定义（5 条路由）
│   │
│   ├── styles/
│   │   └── index.css           # 全局样式、Tailwind 指令、自定义动画关键帧
│   │
│   ├── pages/
│   │   ├── Home.jsx            # 主页 — 四大板块导航卡片 + 打字机效果
│   │   ├── SpacePage.jsx       # 太空安全专题页
│   │   ├── DeepseaPage.jsx     # 深海安全专题页
│   │   ├── PolarPage.jsx       # 极地安全专题页
│   │   └── BioPage.jsx         # 生物安全专题页
│   │
│   ├── components/             # 各页面专属组件（3D 场景、图表、粒子效果等）
│   │   ├── PageCommon.jsx      # 公用组件（SectionHeader, TypewriterText）
│   │   ├── EarthScene.jsx      # 太空 - 3D 地球
│   │   ├── SpaceCharts.jsx     # 太空 - 统计图表
│   │   ├── DepthMeter.jsx      # 深海 - 深度计侧边条
│   │   ├── MarineSnow.jsx      # 深海 - 海雪粒子背景
│   │   ├── SubseaCableModel.jsx# 深海 - 海底光缆 3D
│   │   ├── DeepseaDepthLadder.jsx
│   │   ├── DeepseaThreatRadar.jsx
│   │   ├── PolarIceBlockUI.jsx # 极地 - 冰块交互
│   │   ├── PolarProjectionMap.jsx
│   │   ├── PolarCharts.jsx     # 极地 - 雷达图 + 温度趋势
│   │   ├── BioMicroscopeBackground.jsx
│   │   ├── BioDNAModel.jsx     # 生物 - DNA 3D 模型
│   │   ├── GeneStream.jsx      # 生物 - 基因流粒子
│   │   ├── BioRiskRadar.jsx
│   │   └── GlobalBiosurveillanceMap.jsx
│   │
│   └── data/                   # 静态数据与文案
│       ├── content.js          # 四大板块元数据（sections 数组）
│       ├── spaceData.js        # 太空 - 轨道层级数据
│       ├── deepseaData.js      # 深海 - 深度触发器文案
│       ├── polarData.js        # 极地 - 观点与文案
│       └── bioData.js          # 生物 - DNA 标记与文案
│
└── dist/                       # 构建产物
    ├── index.html
    └── assets/
        ├── index-EnZzPUWe.js
        └── index-YMurHOZD.css
```

---

## 页面布局详解

### 主页 `Home.jsx`

整体为**居中单列布局**，最大宽度 `max-w-6xl`，垂直方向 flex 居中。

1. **顶部英雄区**：一个大圆角卡片（`rounded-[40px]`），半透明深色背景 + 毛玻璃模糊（`backdrop-blur-xl`），内含标题和打字机动画简介。
2. **导航网格**：`lg:grid-cols-2` 的 2×2 卡片网格，每张卡片对应一个专题页，hover 时上移 + 边框高亮。整页背景叠加了径向渐变（`bg-radial-grid`）。

### 太空安全 `SpacePage.jsx`

最大宽度 `max-w-7xl`，纵向 `space-y-20` 间距。

1. **标题区**：左文字 + 右「返回主页」按钮，响应式 flex 布局。
2. **主体双栏**：`xl:grid-cols-[1.05fr_0.95fr]`
   - **左栏**：信息卡片 + 三段叙事（远景→中景→近景），每段独立圆角卡片。
   - **右栏**：`EarthScene` 3D 地球组件（react-three-fiber）。
3. **图表区**：`SpaceCharts` 全宽图表。
4. **轨道信息卡**：`lg:grid-cols-3` 三列网格，LEO/MEO/GEO 轨道数据卡。

### 深海安全 `DeepseaPage.jsx`

最具特色的**滚动驱动动画**页面。

1. **背景色渐变**：通过 GSAP ScrollTrigger 在滚动时动态修改背景 `linear-gradient`，从海面蓝 `#0077BE` 过渡到深渊黑 `#00050A`。
2. **浮动元素**：`MarineSnow`（海雪粒子）+ `DepthMeter`（侧边深度计）全程悬浮。
3. **主体双栏**：`xl:grid-cols-[1.05fr_0.95fr]`
   - **左栏**：信息卡片 + 海底光缆 3D 模型（`SubseaCableModel`），鼠标悬停显示航线信息。
   - **右栏**：多个深度层级文章卡片，滚动到视口时高亮 + 声呐脉冲环动画。
4. **底部双栏**：`xl:grid-cols-[1fr_1fr]`，深度阶梯图 + 威胁雷达图。

### 极地安全 `PolarPage.jsx`

1. **背景**：双层径向渐变叠加（顶部青绿 + 底部微白），营造极光氛围。
2. **引言区**：全宽圆角卡片，展示极地安全总览。
3. **主体双栏**：`xl:grid-cols-[1.25fr_0.9fr]`（左宽右窄）
   - **左栏**：Framer Motion 驱动的观点卡片列表，依次入场。
   - **右栏**：`PolarIceBlockUI` 冰块交互组件。
4. **地图区**：`PolarProjectionMap` 全宽极地投影地图。
5. **底部双栏**：`xl:grid-cols-[1fr_1fr]`，雷达面板 + 温度趋势折线图。

### 生物安全 `BioPage.jsx`

视觉上最独特——**暗绿 + 荧光绿**模拟生物实验室/显微镜视觉。

1. **背景层**：`BioMicroscopeBackground`（显微镜纹理）+ `GeneStream`（基因流粒子）+ 径向渐变叠加。
2. **内容层级卡片**：Framer Motion 入场 + 自定义 `scanner-card` CSS 动画（扫描线从上到下扫过卡片），文字带 `flicker` 闪烁效果。
3. **主体双栏**：`xl:grid-cols-[1.1fr_0.9fr]`
   - **左栏**：DNA 双螺旋 3D 模型（`BioDNAModel`），点击标记点显示风险说明。GSAP 驱动的聚焦模糊→清晰过渡。
   - **右栏**：全球生物监测地图 + 风险雷达图。

---

## 设计系统

### 色板

| Token | 色值 | 用途 |
|-------|------|------|
| `ink` | `#050712` | 全局背景基色 |
| `cosmic` | `#0B1222` | 卡片背景 |
| `aurora` | `#00F3FF` | 高亮强调色 |
| `alert` | `#FF4B2B` | 警告/风险色 |
| `cyan` | `#6AE2FF` | 辅助强调色 |

每个专题页在此基础上有自己的色系覆盖（深海蓝、极地冰青、生物荧绿）。

### 动画关键帧

- **sonar-pulse**：声呐环扩散 + 淡出，用于深海和全局高亮。
- **scanner-entry**：扫描线从上向下划过卡片，模拟安全扫描。
- **flicker**：文字轻微闪烁，模拟屏幕刷新感。

### 圆角体系

所有卡片采用大圆角设计（`rounded-[28px]` 到 `rounded-[40px]`），搭配毛玻璃效果（`backdrop-blur-xl`）和辉光阴影（`shadow-glow`），形成统一的科技未来感。

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:4173）
npm run dev

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

---

## 路由一览

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 主页导航 |
| `/space` | SpacePage | 太空安全专题 |
| `/deepsea` | DeepseaPage | 深海安全专题 |
| `/polar` | PolarPage | 极地安全专题 |
| `/bio` | BioPage | 生物安全专题 |
| `*` | Home | 未匹配路由回退主页 |

---

## 依赖说明

| 类别 | 库 | 用途 |
|------|----|------|
| 核心 | React 18, React DOM, React Router v6 | UI 框架与路由 |
| 3D | Three.js, @react-three/fiber, @react-three/drei | 地球、DNA、光缆等 3D 场景 |
| 图表 | Recharts, ECharts, D3.js | 统计可视化（折线图、雷达图等） |
| 动画 | Framer Motion, GSAP + ScrollTrigger | 入场动画与滚动驱动动画 |
| 构建 | Vite 5, Tailwind CSS 3.4, PostCSS | 开发构建与样式工具链 |