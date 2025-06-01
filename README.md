# 个人作品集网站 (Vite + Vue 3 + Element Plus)

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-^5.0-blue.svg)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-^2.5-blue.svg)](https://element-plus.org/)
[![Pinia](https://img.shields.io/badge/Pinia-^2.1-yellow.svg)](https://pinia.vuejs.org/)

这是一个基于 **Vite 5**、**Vue 3** 和 **Element Plus** UI 组件库构建的现代化个人作品展示网站。旨在突出个人技能、展示项目经验，并提供一个积极向上、内容充实的在线个人名片。

## ✨ 项目特色

* **现代化技术栈**: Vue 3 (Composition API, `<script setup>`), Vite, Pinia, Vue Router 4。
* **优雅的 UI**: 全面采用 Element Plus 组件库，确保美观大方的界面和良好的用户体验。
* **响应式设计**: 优先适配 PC 端，并对移动端进行了基础优化，确保在不同设备上均有良好表现。
* **组件化开发**: 采用高度可复用的组件化架构，易于维护、扩展和测试。
* **状态管理**: 集成 Pinia 进行全局状态管理，实现清晰、类型安全且高效的数据流（例如用户认证）。
* **路由导航**: 使用 Vue Router 实现流畅的单页应用 (SPA) 体验，包含路由守卫等。
* **代码规范**: 集成 ESLint 和 Prettier，结合 `.editorconfig`，强制代码质量和风格一致性。
* **内容积极向上**: 致力于展示健康、充实、积极的个人风采和专业能力。

## 🛠️ 技术栈

* **构建工具**: [Vite](https://vitejs.dev/)
* **前端框架**: [Vue 3](https://vuejs.org/)
* **UI 组件库**: [Element Plus](https://element-plus.org/)
* **路由**: [Vue Router 4](https://router.vuejs.org/)
* **状态管理**: [Pinia](https://pinia.vuejs.org/)
* **HTTP 请求**: [Axios](https://axios-http.com/)
* **图标库**: [@element-plus/icons-vue](https://element-plus.org/zh-CN/component/icon.html) (集成 Element Plus 图标)
* **代码规范**: ESLint, Prettier

## 🚀 快速开始

**环境要求**:

* Node.js: `^18.0` 或 `^20.0`
* pnpm (推荐) / npm / yarn

**安装依赖**:

```bash
# 推荐使用 pnpm
pnpm install

# 或者使用 npm
# npm install

# 或者使用 yarn
# yarn install
```

**运行开发环境**:

```bash
pnpm dev
```

**构建生产版本**:

```bash
pnpm build
```

**预览生产版本**:

```bash
pnpm preview
```

## 📄 项目结构

```
.
├── public/               # 公共静态资源
├── src/                  # 源代码目录
│   ├── api/              # API 请求模块
│   ├── assets/           # 静态资源 (CSS, images)
│   ├── components/       # 公共组件
│   ├── layouts/          # 布局组件
│   ├── router/           # 路由配置
│   ├── store/            # Pinia 状态管理
│   ├── styles/           # 全局样式
│   ├── utils/            # 工具函数
│   ├── views/            # 页面视图组件
│   ├── App.vue           # 根组件
│   └── main.js           # 应用入口文件
├── .editorconfig         # 编辑器配置
├── .eslintrc.cjs         # ESLint 配置
├── .gitignore            # Git 忽略文件
├── index.html            # HTML 入口文件
├── package.json          # 项目依赖与脚本
├── pnpm-lock.yaml        # pnpm 锁定文件
├── postcss.config.js     # PostCSS 配置
├── README.md             # 项目说明文档
└── vite.config.js        # Vite 配置文件
```