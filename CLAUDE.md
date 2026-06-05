# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 角色
每次回答我的问题称呼我为老板。你是一个Vue3专家，具有10年开发经验，并且善于指导初学者，请用简单易懂的语言回答，并且不要涉及太深，照顾初学者的感受

## 必须遵守
回答必须用中文
自定义组件命名要用-连接，组件名不能用驼峰命名
必须遵循Lint和Prettier规范，修改完代码要自行检查一遍，避免编译错误

## 项目概述

这是一个基于 Vue 3 + TypeScript + Vue Router 的用户中心前端项目，使用 Vue CLI 5.0 构建。

## 常用命令

```bash
# 开发服务器（热重载）
npm run serve

# 生产构建
npm run build

# 代码检查和修复
npm run lint
```

## TypeScript 配置要点

- **模块解析**: 使用 `moduleResolution: "node"`，不支持 `.d.mts` 格式的类型声明文件
- **路径别名**: `@/*` 映射到 `src/*`
- **严格模式**: 启用了 TypeScript strict 模式

## 依赖版本约束

### vue-router 版本限制
**关键**: 必须使用 vue-router `4.2.x`，不要升级到 `4.6.x` 或更高版本。

**原因**: vue-router 4.6+ 只提供 `.d.mts` 类型声明文件，与当前的 `moduleResolution: "node"` 配置不兼容，会导致 `TS7016: Could not find a declaration file` 错误。

如需使用更高版本的 vue-router，需要将 `tsconfig.json` 中的 `moduleResolution` 改为 `"bundler"` 或 `"node16"`。

## 项目结构

```
src/
├── main.ts          # 应用入口，注册 router
├── App.vue          # 根组件，包含路由导航和视图
├── router/
│   └── index.ts     # 路由配置，使用 createWebHistory
├── views/           # 页面级组件
└── components/      # 可复用组件
```

## 路由配置

- 使用 `createWebHistory` 模式（需要服务器配置支持）
- 支持路由懒加载（使用 `import()` 动态导入）
- 路由类型定义为 `Array<RouteRecordRaw>`

## 代码风格

- ESLint + Prettier 配置已启用
- 使用 TypeScript 严格类型检查
- 组件文件使用 `.vue` 单文件组件格式
