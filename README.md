# AI金融内控智能运营平台

> AI驱动的金融机构风险与内部控制智能运营平台（一期MVP演示版）

## 平台简介

本平台面向银行、保险、证券、支付、金融科技等金融机构，为内控/内审人员提供AI驱动的内部控制管理工具。平台融合了**管理平台 + 风险运营平台 + AI智能助手**三层能力，帮助企业实现从"事后检查型内控"向"事前预防与智能运营型内控"的转变。

## 功能模块

| 模块 | 功能 | 状态 |
|------|------|------|
| 📊 **管理驾驶舱** | 内控健康度仪表盘、风险趋势、关键指标监控 | ✅ |
| 🏗️ **内控体系管理** | 流程目录树、风险目录、RCM矩阵可视化编辑 | ✅ |
| 📄 **制度文档管理** | 文档上传、版本管理、在线预览、AI解析模拟 | ✅ |
| 🤖 **AI智能工作台** | 7大Agent多轮对话、流式输出、知识库RAG检索 | ✅ |
| ⚠️ **风险识别评估** | 风险清单、评估问卷、5×5评估矩阵、风险热力图 | ✅ |
| ✅ **控制有效性评价** | 评价计划、测试底稿、AI辅助、报告生成 | ✅ |
| 🔧 **缺陷整改管理** | 缺陷登记、看板拖拽流转、闭环验证 | ✅ |
| 📚 **企业知识库** | 向量检索模拟、文档索引、相似度排序 | ✅ |
| 📝 **审计日志** | 全操作留痕、高级筛选、不可篡改 | ✅ |
| 👥 **系统管理** | 用户/角色/权限管理、RBAC权限体系 | ✅ |

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript 5 |
| 构建工具 | Vite 5 |
| UI组件库 | Ant Design 5 |
| 状态管理 | Zustand + React Query |
| 图表可视化 | ECharts |
| 数据Mock | MSW (Mock Service Worker) v2 |
| 本地存储 | IndexedDB (Dexie.js) |
| 拖拽交互 | @dnd-kit |
| 路由 | React Router v6 (HashRouter) |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

开发服务器默认运行在 http://localhost:3000

## 演示账号

| 用户名 | 密码 | 角色 | 权限 |
|--------|------|------|------|
| admin | admin123 | 内控管理负责人 | 全部功能 |
| auditor | audit123 | 内控专业人员 | 除用户管理外的全部功能 |
| manager | manager123 | 业务部门控制责任人 | 查看 + 协作 |

## 项目结构

```
src/
├── assets/          # 静态资源与样式
├── components/      # 通用组件
├── config/          # 路由/菜单/主题配置
├── hooks/           # 自定义Hooks
├── layouts/         # 布局组件
├── mocks/           # MSW Mock数据与处理器
│   ├── data/        # 种子数据
│   └── handlers/    # API请求处理器
├── pages/           # 页面组件
│   ├── login/       # 登录
│   ├── dashboard/   # 管理驾驶舱
│   ├── internal-control/  # 内控体系管理
│   ├── documents/   # 制度文档管理
│   ├── copilot/     # AI智能工作台
│   ├── risk/        # 风险识别评估
│   ├── evaluation/  # 控制有效性评价
│   ├── defects/     # 缺陷整改管理
│   ├── knowledge/   # 企业知识库
│   ├── audit/       # 审计日志
│   └── system/      # 系统管理
├── services/        # API服务层
├── stores/          # Zustand状态管理
├── types/           # TypeScript类型定义
└── utils/           # 工具函数
```

## 在线演示

访问地址：https://[username].github.io/ai-finance-control-platform/

## 需求文档

完整需求规格说明书（10,375行）见项目 docs 目录。

## License

MIT
