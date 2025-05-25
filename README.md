# Stutuer Blog

一个基于 [Fumadocs](https://fumadocs.dev) 构建的现代化技术博客，专注于后端技术的深度探索和实践分享.

## ✨ 特性

- 🚀 **现代化框架**: 基于 Next.js 15 和 React 19 构建
- 📝 **MDX 支持**: 使用 Fumadocs MDX 进行内容管理
- 🎨 **精美主题**: 支持明暗主题切换
- 🔍 **全文搜索**: 内置强大的搜索功能
- 📱 **响应式设计**: 完美适配各种设备
- ⚡ **性能优化**: 基于 Next.js 的服务端渲染和静态生成
- 🎯 **代码高亮**: 使用 Shiki 提供精美的代码高亮
- 📊 **分析工具**: 集成 Vercel Analytics 和 Speed Insights
- 🗺️ **站点地图**: 自动生成 sitemap

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/)
- **UI 库**: [React 19](https://react.dev/)
- **文档框架**: [Fumadocs](https://fumadocs.dev/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **内容管理**: [Fumadocs MDX](https://fumadocs.dev/docs/mdx)
- **代码高亮**: [Shiki](https://shiki.style/)
- **数学公式**: [KaTeX](https://katex.org/)
- **图标**: [Tabler Icons](https://tabler.io/icons) & [Lucide React](https://lucide.dev/)
- **主题**: [Next Themes](https://github.com/pacocoursey/next-themes)
- **代码质量**: [Biome](https://biomejs.dev/)
- **包管理**: [Bun](https://bun.sh/)

## 🚀 快速开始

### 环境要求

- Node.js 18+ 或 Bun
- Git

### 安装

1. 克隆仓库
```bash
git clone https://github.com/Fairy-nn/stutuer-blog.git
cd stutuer-blog
```

2. 安装依赖
```bash
# 使用 bun (推荐)
bun install

# 或使用 npm
npm install
```

3. 启动开发服务器
```bash
# 使用 bun
bun dev

# 或使用 npm
npm run dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建部署

```bash
# 构建生产版本
bun run build

# 启动生产服务器
bun start
```

## 📝 内容管理

### 添加新文章

1. 在 `content/` 目录下创建新的 `.mdx` 文件
2. 添加 frontmatter 元数据：

```yaml
---
title: 文章标题
description: 文章描述
date: 2024-03-01
tags: ["redis", "技术"]
categories: ["后端"]
keywords: ["redis", "缓存", "数据库"]
---
```

3. 编写文章内容
4. 运行 `bun dev` 预览效果

### 配置说明

- `source.config.ts`: Fumadocs 配置文件
- `next.config.mjs`: Next.js 配置
- `content/`: 文章内容目录
- `src/`: 应用源代码

## 🎨 自定义

### 主题配置

项目支持明暗主题切换，可以在 `src/app/layout.tsx` 中自定义主题配置。

### 样式定制

使用 Tailwind CSS 进行样式定制，配置文件位于 `postcss.config.js`。

## 🔗 相关链接

本项目已被 Fumadocs 官方收录进 [Showcase](https://fumadocs.dev/showcase)。

- [在线访问](https://www.stutuer.tech)
- [Fumadocs 官网](https://fumadocs.dev)
- [Next.js 文档](https://nextjs.org/docs)

## 🙏 致谢

- 感谢 [Fumadocs](https://fumadocs.dev) 提供优秀的文档框架
- 感谢 [Next.js](https://nextjs.org) 团队的出色工作
- 感谢所有开源贡献者

---

如果这个项目对你有帮助，请给它一个 ⭐️！