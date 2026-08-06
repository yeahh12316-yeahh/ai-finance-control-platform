# AI金融内控智能运营平台 — 需求规格说明书（完整版）

> **文档版本**：V2.0（合并完整版）
> **产品定位**：AI 驱动的金融机构风险与内部控制智能运营平台
> **商业模式**：企业私有化部署 + 项目制交付
> **目标行业**：银行、保险、证券、支付、金融科技、小贷、互联网金融
> **编制日期**：2026年8月6日

---

## 目录

### 第一部分：产品需求规格

1. [第一章：战略定位与产品概述](#第一章战略定位与产品概述)
2. [第二章：用户需求分析](#第二章用户需求分析)
3. [第三章：平台总体架构设计](#第三章平台总体架构设计)
4. [第四章：功能模块详细设计](#第四章功能模块详细设计)
5. [第五章：AI Agent 能力设计](#第五章ai-agent-能力设计)
6. [第六章：核心业务流程](#第六章核心业务流程)
7. [第七章：技术实现要求](#第七章技术实现要求)
8. [第八章：MVP 实施路线图](#第八章mvp-实施路线图)

### 第二部分：API接口规格与页面交互设计

9. [第九章：API接口规格](#第九章api接口规格)
10. [第十章：页面级交互设计](#第十章页面级交互设计)

### 第三部分：AI Agent Prompt工程与非功能性需求

11. [第十一章：AI Agent Prompt工程设计](#第十一章ai-agent-prompt工程设计)
12. [第十二章：非功能性需求](#第十二章非功能性需求)
13. [第十三章：验收标准](#第十三章验收标准)

### 第四部分：数据模型设计

14. [第十四章：数据模型设计](#第十四章数据模型设计)

### 附录

15. [附录A：关键术语表](#附录a关键术语表)

---

# 第一部分：产品需求规格

## 第一章：战略定位与产品概述

### 1.1 产品愿景

构建 **"AI 驱动的企业风险与内部控制智能运营平台"**，帮助金融机构实现从 **"事后检查型内控"** 向 **"事前预防与智能运营型内控"** 的范式转变。

### 1.2 产品定位

本平台采用 **B+C 融合定位**（管理平台 + 风险运营平台），同时保留大模型对话入口模块：

| 层级 | 定位 | 说明 |
|------|------|------|
| **第一层：AI 交互入口层** | AI Control Copilot | 内控人员通过自然语言对话获取公司内控或行业标准问题的答案 |
| **第二层：内控管理能力层** | Internal Control Management | 平台核心，包含内控体系管理、风险识别、控制设计、有效性评价、缺陷整改 |
| **第三层：风险智能运营层** | Risk Intelligence Operation | 持续监测、流程智能优化、风险预测，形成竞争壁垒 |

### 1.3 核心设计原则

| 原则 | 说明 |
|------|------|
| **AI 增强，而非替代** | 全流程保留人工判断窗口（Human-in-the-loop） |
| **方法论内置** | 内置 COSO、三道防线、ISO 31000 等业界标准框架 |
| **企业知识私有化** | 企业知识库本地化部署，数据不出企业内网 |
| **全流程留痕** | 所有 AI 建议、人工决策、修改记录全程可追溯 |

### 1.4 目标客户

| 梯队 | 客户类型 | 典型画像 |
|------|----------|----------|
| **第一梯队** | 银行、保险、证券 | 监管要求高、内控体系完善、预算充足 |
| **第二梯队** | 支付机构、金融科技、小贷、互联网金融 | 业务创新快、内控体系在建、需要轻量化方案 |

### 1.5 核心用户角色

| 角色 | 核心职责 | 使用深度 |
|------|----------|----------|
| **内控管理负责人** | 企业整体内控体系规划、风险视图监控、向管理层汇报 | 驾驶舱 + 报告 |
| **内控专业人员**（核心用户） | 制度管理、风险识别、RCM 建设、控制测试、缺陷整改 | 全部模块 |
| **业务部门控制责任人** | 了解本部门业务风险、配合内控工作 | 自助查询 + 协作 |

---


## 第二章：用户需求分析

### 2.1 六大核心痛点与 AI 赋能方案

#### 痛点 1：企业不知道自己的风险在哪里

- **现状**：多为"事后发现型风险管理"，缺乏整体风险视图
- **AI 赋能**：**AI 风险雷达** — 自动分析企业制度、流程文档、审计报告、监管处罚案例，输出企业风险地图与风险热力图

#### 痛点 2：内控评价高度依赖专家经验，无法规模化

- **现状**：内控评价耗时长、大量低价值重复劳动（如抽样测试、底稿填写）
- **AI 赋能**：**AI 控制测试 Agent** — 自动识别关键控制点、生成测试方案、执行测试程序并形成测试工作底稿

#### 痛点 3：制度很多，但无法真正落地执行

- **现状**：制度≠控制，员工不知如何执行，制度与执行脱节
- **AI 赋能**：**制度智能解析 Agent** — 将自然语言制度自动转化为结构化的控制规则，形成"AI 控制库"，实现制度-控制-执行的自动映射

#### 痛点 4：审计发现问题，但无法推动整改闭环

- **现状**：问题重复发生，缺乏根因分析，整改流于形式
- **AI 赋能**：**AI 整改管理 Agent** — 历史问题库分析、根因推断、防复发建议生成、整改效果跟踪

#### 痛点 5：企业缺少持续监督能力

- **现状**：一年一次内控评价，但风险每天都在发生
- **AI 赋能**：**持续控制监测（CCM）** — 对接业务系统数据，实时监控异常交易、异常审批、权限越权等行为

#### 痛点 6：内控人员专业能力参差不齐

- **现状**：不同人员对同一问题的判断标准不统一
- **AI 赋能**：**AI 内控专家助手** — 结合外部知识库（COSO、监管法规）和企业内部知识库，提供即时的专业问答和指导

### 2.2 内控人员完整工作流程地图

| 序号 | 工作场景 | 对应 AI 模块 | AI 自动化程度 |
|------|----------|-------------|-------------|
| 1 | 监管要求及内部制度管理 | 监管与制度智能解析中心 | AI 自动解析 + 人工确认 |
| 2 | 业务流程风险评估 | 业务流程风险智能评估中心 | AI 辅助分析 + 人工确认 |
| 3 | 风险控制矩阵建设（RCM） | 智能控制设计与管理中心 | AI 建议 + 人工决策 |
| 4 | 控制执行监督 | 控制执行监测中心 | AI 自动监测 + 人工处置 |
| 5 | 内控有效性评价 | 控制有效性智能评价中心 | AI 执行测试 + 人工复核 |
| 6 | 问题整改与闭环管理 | 内控缺陷智能管理中心 | AI 分析建议 + 人工审批 |
| 7 | 内控报告与管理决策支持 | 内控管理决策分析中心 | AI 自动生成 + 人工审定 |

### 2.3 三层决策模式（Human-in-the-loop）

```
┌─────────────────────────────────────────────┐
│  第三层：人工决策层                          │
│  • 风险等级最终确认                          │
│  • 缺陷认定与评级                            │
│  • 整改方案批准                              │
│  • 报告签署发布                              │
├─────────────────────────────────────────────┤
│  第二层：AI 辅助分析层（平台主体）             │
│  • AI 提供分析建议                            │
│  • AI 生成初步结论                            │
│  • 人工确认/修改/驳回                         │
├─────────────────────────────────────────────┤
│  第一层：AI 自动执行层                        │
│  • 文档自动解析与结构化                        │
│  • 规则明确的重复性任务                        │
│  • 数据自动采集与汇总                          │
│  • 报告模板自动填充                            │
└─────────────────────────────────────────────┘
```

---


## 第三章：平台总体架构设计

### 3.1 五层架构模型

```
┌──────────────────────────────────────────────────────┐
│  L1: 企业内控智能工作台 (AI Control Copilot)          │
│  ┌─────────┐ ┌──────────────┐ ┌──────────────────┐   │
│  │智能问答  │ │工作任务助手   │ │智能报告生成       │   │
│  └─────────┘ └──────────────┘ └──────────────────┘   │
├──────────────────────────────────────────────────────┤
│  L2: 业务应用层（8大功能模块）                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │内控体系   │ │风险识别   │ │控制设计   │ │控制执行   ││
│  │管理中心   │ │评估中心   │ │优化中心   │ │监测中心   ││
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤│
│  │控制有效性 │ │内控缺陷   │ │流程智能   │ │风险智能   ││
│  │评价中心   │ │整改中心   │ │优化中心   │ │驾驶舱     ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
├──────────────────────────────────────────────────────┤
│  L3: AI Agent 能力层（7个核心 Agent）                  │
│  ┌────────────┐ ┌──────────┐ ┌──────────┐           │
│  │监管制度解析 │ │风险识别   │ │控制设计   │           │
│  │Agent       │ │Agent     │ │Agent     │           │
│  ├────────────┤ ├──────────┤ ├──────────┤           │
│  │控制测试    │ │缺陷分析   │ │流程优化   │           │
│  │Agent       │ │Agent     │ │Agent     │           │
│  └────────────┘ └──────────┘ └──────────┘           │
│  ┌────────────┐                                     │
│  │风险监测    │                                     │
│  │Agent       │                                     │
│  └────────────┘                                     │
├──────────────────────────────────────────────────────┤
│  L4: AI 知识与推理层                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │企业知识库 │ │行业知识库 │ │方法论库   │ │推理引擎   ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
├──────────────────────────────────────────────────────┤
│  L5: 数据底座                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │文档数据   │ │管理数据   │ │业务数据   │ │系统日志   ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
└──────────────────────────────────────────────────────┘
```

### 3.2 架构设计说明

| 层级 | 名称 | 核心能力 | 技术关键点 |
|------|------|----------|-----------|
| L1 | 智能工作台 | 统一入口、智能问答、任务管理、报告生成 | LLM 对话引擎 + 企业内部知识库 RAG |
| L2 | 业务应用层 | 8 大内控业务模块 | 微服务架构，模块独立可插拔 |
| L3 | AI Agent 层 | 7 个专业 AI Agent | 每个 Agent 可独立调用 LLM + 领域知识库 |
| L4 | 知识推理层 | 知识管理、方法论引擎、推理能力 | 向量数据库 + 知识图谱 + Prompt 工程 |
| L5 | 数据底座 | 多源数据接入、数据治理、数据安全 | 数据脱敏、加密存储、权限管控 |

---


## 第四章：功能模块详细设计

### 模块一：内控体系智能管理中心

| 属性 | 内容 |
|------|------|
| **功能定位** | 企业内控体系的数字化建模与统一管理 |
| **核心功能** | 1. 组织架构与内控角色管理 2. 内控手册在线编辑与版本管理 3. 流程目录与风险目录维护 4. 内控矩阵（RCM）统一视图 5. 制度-流程-控制-风险关联图谱 |
| **AI 能力** | 制度自动解析、控制点智能推荐、体系完整性检查 |
| **输入** | 企业组织架构、制度文件、流程清单 |
| **输出** | 内控体系全景图、体系健康度评估 |

### 模块二：风险识别与评估中心

| 属性 | 内容 |
|------|------|
| **功能定位** | 企业级风险智能识别、评估与动态监控 |
| **核心功能** | 1. 风险目录管理（固有风险库）2. 风险问卷设计与发放 3. 风险评估矩阵（影响×可能性）4. 风险热力图 5. 关键风险指标（KRI）管理 |
| **AI 能力** | AI 风险雷达 — 自动扫描制度/流程/报告识别风险点，风险自动评级建议 |
| **输入** | 制度文件、流程文档、历史风险事件、行业风险库 |
| **输出** | 企业风险地图、风险热力图、风险评估报告 |

### 模块三：控制设计与优化中心

| 属性 | 内容 |
|------|------|
| **功能定位** | 基于风险的控制措施设计、管理与持续优化 |
| **核心功能** | 1. 控制措施库管理 2. 控制目标与控制活动匹配 3. RCM（风险控制矩阵）自动构建 4. 控制措施有效性评估 5. 控制措施优化建议 |
| **AI 能力** | 控制设计 Agent — 根据风险自动推荐控制措施，控制覆盖度分析 |
| **输入** | 风险评估结果、业务流程、行业最佳实践 |
| **输出** | RCM 矩阵、控制措施清单、控制覆盖度报告 |

### 模块四：控制执行与监测中心

| 属性 | 内容 |
|------|------|
| **功能定位** | 控制措施执行情况的持续监控与异常预警 |
| **核心功能** | 1. 控制执行计划管理 2. 控制执行证据采集 3. 异常行为实时监测 4. 预警规则配置 5. 预警处置工作流 |
| **AI 能力** | 风险监测 Agent — 实时分析业务数据发现异常模式，智能预警分级 |
| **输入** | 业务系统数据、控制规则、历史异常案例 |
| **输出** | 实时监测仪表盘、异常预警通知、监测报告 |

### 模块五：控制有效性评价中心

| 属性 | 内容 |
|------|------|
| **功能定位** | 内控评价全流程数字化管理，从计划到报告 |
| **核心功能** | 1. 评价计划制定 2. 测试方案自动生成 3. 测试底稿在线填报 4. 测试结果汇总与统计 5. 评价报告自动生成 |
| **AI 能力** | 控制测试 Agent — 自动生成测试方案、智能抽样、底稿自动填充、缺陷初步判断 |
| **输入** | RCM 矩阵、控制措施清单、评价范围 |
| **输出** | 测试方案、测试底稿、评价报告 |

### 模块六：内控缺陷整改中心

| 属性 | 内容 |
|------|------|
| **功能定位** | 缺陷发现、根因分析、整改跟踪的全闭环管理 |
| **核心功能** | 1. 缺陷登记与分类 2. 根因分析 3. 整改方案制定 4. 整改任务分配与跟踪 5. 整改效果验证 |
| **AI 能力** | 缺陷分析 Agent — 历史缺陷库对比分析、根因推断、防复发建议 |
| **输入** | 缺陷信息、历史缺陷库、控制措施 |
| **输出** | 根因分析报告、整改建议方案、整改跟踪看板 |

### 模块七：流程智能优化中心

| 属性 | 内容 |
|------|------|
| **功能定位** | 基于数据和 AI 的业务流程风险诊断与优化 |
| **核心功能** | 1. 流程建模与可视化 2. 流程风险点标注 3. 流程效率分析 4. 流程瓶颈识别 5. 优化方案对比 |
| **AI 能力** | 流程优化 Agent — 流程挖掘、风险点自动识别、优化建议生成 |
| **输入** | 业务流程模型、执行日志、风险事件 |
| **输出** | 流程风险诊断报告、优化建议方案 |

### 模块八：风险智能驾驶舱

| 属性 | 内容 |
|------|------|
| **功能定位** | 面向管理层的企业内控全景视图与决策支持 |
| **核心功能** | 1. 内控健康度仪表盘 2. 风险态势感知大屏 3. 关键指标趋势分析 4. 多维度数据下钻 5. 管理报告一键生成 |
| **AI 能力** | 智能报告生成、风险趋势预测、异常指标自动解读 |
| **输入** | 全平台数据汇总 |
| **输出** | 管理驾驶舱、定期内控报告、风险预警简报 |

---


## 第五章：AI Agent 能力设计

### 5.1 Agent 全景图

| Agent 名称 | 所属模块 | 核心能力 | 关键技术 |
|------------|---------|----------|----------|
| **监管制度解析 Agent** | 模块一/五 | 制度文档→结构化控制规则 | NLP 信息抽取 + 规则引擎 |
| **风险识别 Agent** | 模块二 | 多源文档→风险点识别 | 文本分类 + 实体识别 + 知识图谱 |
| **控制设计 Agent** | 模块三 | 风险→控制措施智能匹配 | 推荐算法 + 规则推理 |
| **控制测试 Agent** | 模块五 | 自动生成测试方案与底稿 | 模板生成 + 智能抽样 |
| **缺陷分析 Agent** | 模块六 | 根因推断与防复发建议 | 因果推理 + 相似案例检索 |
| **流程优化 Agent** | 模块七 | 流程挖掘与瓶颈识别 | 流程挖掘 + 模式识别 |
| **风险监测 Agent** | 模块四 | 实时业务数据异常检测 | 异常检测 + 规则引擎 |

### 5.2 Agent 通用设计规范

| 设计维度 | 规范要求 |
|----------|----------|
| **输入** | 接受结构化/非结构化数据，支持文档上传、API 对接、手动录入 |
| **处理** | 每个 Agent 独立部署，通过消息队列解耦，可独立升级 |
| **输出** | 所有 AI 产出带置信度标注、推理依据说明、人工确认入口 |
| **人机协同** | 根据任务类型分为：自动执行（绿色）、建议确认（黄色）、人工决策（红色）|
| **可追溯** | 每次 Agent 调用记录完整日志（输入/输出/模型版本/时间戳） |

---


## 第六章：核心业务流程

### 6.1 内控体系建设流程

```
制度文件上传 → AI制度解析Agent（自动）→ 控制规则提取（自动）
    → 内控人员确认/修订（人工）→ 控制库入库 → RCM矩阵构建
    → AI控制设计Agent推荐控制措施（辅助）→ 人工确认 → 内控体系发布
```

### 6.2 内控评价执行流程

```
评价计划制定 → AI测试方案生成（自动）→ 人工审核方案
    → AI抽样建议（辅助）→ 人工确认样本 → 测试执行
    → AI底稿自动填充（自动）→ 人工复核底稿 → AI缺陷初步判断（辅助）
    → 人工确认缺陷 → AI评价报告生成（自动）→ 人工审定 → 报告发布
```

### 6.3 缺陷整改闭环流程

```
缺陷发现登记 → AI根因分析（辅助）→ 人工确认根因
    → AI整改建议生成（辅助）→ 人工制定方案 → 任务分配
    → 整改执行跟踪 → 整改效果验证 → AI防复发检查（自动）
    → 人工审批关闭 → 知识库更新
```

### 6.4 持续监测预警流程

```
业务数据接入 → AI异常检测（自动）→ 预警分级（自动）
    → 低风险：自动记录 → 中风险：推送内控人员 → 高风险：即时告警+升级
    → 人工研判处置 → 处置结果反馈 → 模型优化迭代
```

---


## 第七章：技术实现要求

### 7.1 部署架构要求

| 要求项 | 规格 |
|--------|------|
| **部署模式** | 企业私有化部署（On-Premise），支持信创环境 |
| **容器化** | 支持 Docker + Kubernetes 编排 |
| **高可用** | 核心服务支持多副本部署，数据库主备切换 |
| **数据安全** | 数据不出企业内网，支持国密加密，全链路 TLS |

### 7.2 AI 能力技术要求

| 要求项 | 规格 |
|--------|------|
| **大模型** | 支持私有化部署的 LLM（如 Qwen、DeepSeek 等国产模型），也可对接企业已有模型 |
| **RAG 架构** | 企业知识库向量化 + 检索增强生成，支持多知识库隔离 |
| **Agent 框架** | 支持 LangChain / AutoGen 等框架，Agent 间可编排协作 |
| **模型微调** | 支持基于企业数据的领域微调（SFT/LoRA） |
| **推理服务** | 支持 GPU 推理（T4/A10/A100），也可 CPU 推理（轻量化场景） |

### 7.3 数据管理要求

| 要求项 | 规格 |
|--------|------|
| **多源接入** | 支持数据库对接（MySQL/PostgreSQL/Oracle）、API 对接、文件导入（PDF/Word/Excel） |
| **数据脱敏** | 支持敏感字段自动识别与脱敏处理 |
| **权限管控** | 基于 RBAC 的细粒度权限，支持数据行级权限 |
| **审计日志** | 全操作留痕，不可篡改，支持审计导出 |

### 7.4 技术栈建议

| 层级 | 推荐技术 |
|------|----------|
| **前端** | React/Vue3 + TypeScript，支持微前端架构 |
| **后端** | Java（Spring Cloud）/ Python（FastAPI），微服务架构 |
| **数据库** | PostgreSQL（业务数据）+ Milvus/Elasticsearch（向量检索） |
| **消息队列** | Kafka / RabbitMQ |
| **AI 推理** | vLLM / TGI / Ollama |
| **知识图谱** | Neo4j（可选，用于风险关联分析） |
| **监控运维** | Prometheus + Grafana + ELK |

---


## 第八章：MVP 实施路线图

### 8.1 分期规划

| 阶段 | 周期 | 目标 | 核心交付 |
|------|------|------|----------|
| **一期：基础平台** | 3-4 个月 | 平台框架 + 核心内控管理功能 | 智能工作台、内控体系管理中心、RCM 管理、知识库底座 |
| **二期：AI 赋能** | 3-4 个月 | AI Agent 上线，智能分析能力 | 制度解析 Agent、风险识别 Agent、控制测试 Agent、智能问答 |
| **三期：智能运营** | 3-4 个月 | 持续监测 + 智能运营 | 持续监测 Agent、流程优化 Agent、智能驾驶舱、预测分析 |

### 8.2 一期 MVP 功能清单（P0 必做）

| 序号 | 功能项 | 优先级 | 说明 |
|------|--------|--------|------|
| 1 | 用户认证与权限管理 | P0 | RBAC 权限体系，支持 SSO |
| 2 | 内控体系管理中心 | P0 | 流程目录、风险目录、RCM 矩阵管理 |
| 3 | 制度文档管理 | P0 | 制度上传、版本管理、在线预览 |
| 4 | AI 智能工作台（Copilot） | P0 | 大模型对话入口，连接内外知识库 |
| 5 | 风险识别与评估 | P0 | 风险问卷、评估矩阵、风险热力图 |
| 6 | 控制有效性评价 | P0 | 评价计划、测试底稿、报告生成 |
| 7 | 缺陷整改管理 | P0 | 缺陷登记、任务跟踪、闭环验证 |
| 8 | 企业知识库底座 | P0 | 文档向量化、知识检索、RAG 基础能力 |
| 9 | 管理驾驶舱 | P0 | 内控健康度仪表盘、关键指标展示 |
| 10 | 审计日志与留痕 | P0 | 全操作记录、不可篡改 |

### 8.3 二期 AI 增强功能（P1）

| 序号 | 功能项 | 优先级 | 说明 |
|------|--------|--------|------|
| 1 | 监管制度解析 Agent | P1 | 制度→结构化规则自动提取 |
| 2 | 风险识别 Agent | P1 | 多源文档风险自动识别 |
| 3 | 控制设计 Agent | P1 | 风险→控制措施智能推荐 |
| 4 | 控制测试 Agent | P1 | 测试方案自动生成、智能抽样 |
| 5 | 缺陷分析 Agent | P1 | 根因推断、防复发建议 |
| 6 | 智能报告生成 | P1 | 评价报告、管理报告自动生成 |

### 8.4 三期智能运营功能（P2）

| 序号 | 功能项 | 优先级 | 说明 |
|------|--------|--------|------|
| 1 | 持续控制监测（CCM） | P2 | 业务数据实时监控、异常预警 |
| 2 | 流程挖掘与优化 | P2 | 流程瓶颈识别、优化建议 |
| 3 | 风险预测分析 | P2 | 基于历史数据的风险趋势预测 |
| 4 | 智能驾驶舱增强 | P2 | 预测性指标、多维度下钻分析 |

---


---

# 第二部分：API接口规格与页面交互设计

## 第九章：API接口规格

> **版本**: v1.0  
> **协议**: HTTPS  
> **数据格式**: JSON  
> **字符编码**: UTF-8  

---

### 9.1 通用规范

#### 9.1.1 统一请求/响应格式

**统一响应结构**：

```json
{
  "code": 0,
  "message": "success",
  "data": {},
  "timestamp": 1691234567890,
  "requestId": "uuid-v4-string"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | Integer | 业务状态码，0 表示成功，非 0 表示失败 |
| message | String | 状态描述信息 |
| data | Object/Array/null | 响应数据体，成功时返回业务数据，失败时可为 null |
| timestamp | Long | 服务器响应时间戳（毫秒） |
| requestId | String | 请求唯一标识，用于链路追踪和问题排查 |

**分页请求参数**（Query 参数，适用于所有列表类接口）：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| pageNum | Integer | 否 | 1 | 页码，从 1 开始 |
| pageSize | Integer | 否 | 20 | 每页条数，最大 100 |
| sortField | String | 否 | updateTime | 排序字段 |
| sortOrder | String | 否 | desc | 排序方式：asc / desc |

**分页响应结构**：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "pageNum": 1,
    "pageSize": 20,
    "totalCount": 150,
    "totalPage": 8,
    "list": []
  },
  "timestamp": 1691234567890,
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### 9.1.2 统一错误码体系

错误码按模块分段，共 5 位数字：

| 区间 | 模块 | 说明 |
|------|------|------|
| 10000 - 19999 | 系统通用 | 认证、授权、参数校验、文件、服务异常 |
| 20000 - 29999 | 内控体系管理 | 组织架构、制度文档、流程目录 |
| 30000 - 39999 | 风险识别评估 | 风险分类、风险清单、评估问卷、KRI |
| 40000 - 49999 | 控制设计优化 | 控制措施库、RCM 矩阵、覆盖度分析 |
| 50000 - 59999 | 控制执行监测 | 执行计划、证据、预警、仪表盘 |
| 60000 - 69999 | 控制有效性评价 | 评价计划、测试方案、底稿、抽样 |
| 70000 - 79999 | 缺陷整改 | 缺陷、整改方案、任务、验证 |
| 80000 - 89999 | 流程优化 | 流程建模、风险标注、优化方案 |
| 90000 - 99999 | 驾驶舱 & AI Copilot | 驾驶舱、AI 对话、知识库 |

**系统通用错误码（10000-19999）**：

| 错误码 | HTTP 状态码 | 说明 |
|--------|------------|------|
| 0 | 200 | 成功 |
| 10001 | 400 | 请求参数校验失败 |
| 10002 | 401 | 未认证 / Token 过期 |
| 10003 | 403 | 无操作权限 |
| 10004 | 404 | 资源不存在 |
| 10005 | 409 | 数据冲突（如唯一键重复） |
| 10006 | 413 | 上传文件大小超限 |
| 10007 | 415 | 不支持的文件类型 |
| 10008 | 429 | 请求频率超限 |
| 10009 | 500 | 服务器内部错误 |
| 10010 | 503 | AI 服务暂不可用 |
| 10011 | 400 | 操作不被允许（业务规则限制） |
| 10012 | 404 | 数据已被删除 |
| 10013 | 400 | 并发操作冲突（版本号不一致） |
| 10014 | 503 | 服务降级中，请稍后重试 |

#### 9.1.3 认证方式

采用 **JWT (JSON Web Token)** 认证：

- 登录接口 `/api/v1/auth/login` 返回 `accessToken`（有效期 2 小时）和 `refreshToken`（有效期 7 天）
- 所有业务接口需在请求头携带：`Authorization: Bearer <accessToken>`
- Token 过期时返回 10002，前端自动使用 `refreshToken` 调用 `/api/v1/auth/refresh` 刷新
- 刷新失败则跳转登录页

#### 9.1.4 文件上传规范

- **上传接口**: `POST /api/v1/common/upload`
- **Content-Type**: `multipart/form-data`
- **单文件大小限制**: 文档类 ≤ 50MB，图片类 ≤ 10MB，视频类 ≤ 100MB
- **支持格式**: `.pdf, .doc, .docx, .xls, .xlsx, .png, .jpg, .jpeg, .mp4, .txt, .csv`
- **响应**: 返回文件 ID、原始文件名、访问 URL、文件大小、上传时间
- **存储**: 私有化部署时存储至本地文件系统或 MinIO，路径不可直接通过 URL 访问

#### 9.1.5 通用查询过滤参数

列表类接口通用过滤参数（Query）：

| 参数 | 类型 | 说明 |
|------|------|------|
| keyword | String | 全局模糊搜索关键词 |
| status | String/Integer | 状态筛选 |
| startDate | String | 开始日期（yyyy-MM-dd） |
| endDate | String | 结束日期（yyyy-MM-dd） |
| orgId | String | 组织 ID |
| createdBy | String | 创建人 ID |

---

### 9.2 各模块 API 接口

---

### 模块一：内控体系管理 API（/api/v1/ic-system）

##### 9.2.1 组织架构 CRUD

##### 2.2.1.1 获取组织树

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/organizations/tree`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| rootId | String | 否 | 根节点 ID，不传则返回完整树 |
| depth | Integer | 否 | 返回层级深度，默认全部 |
| includeDisabled | Boolean | 否 | 是否包含已禁用组织，默认 false |

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "org-root",
    "name": "XX银行总部",
    "orgCode": "ORG-001",
    "orgType": "HEAD_OFFICE",
    "level": 1,
    "managerName": "张三",
    "status": "ACTIVE",
    "children": [
      {
        "id": "org-dept-001",
        "name": "风险管理部",
        "orgCode": "ORG-001-01",
        "orgType": "DEPARTMENT",
        "level": 2,
        "managerName": "李四",
        "status": "ACTIVE",
        "children": []
      }
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:organization:view`
- **错误码**: 20001（组织不存在）

##### 2.2.1.2 创建组织

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/organizations`
- **请求参数** (Body):

```json
{
  "parentId": "org-root",
  "name": "合规管理部",
  "orgCode": "ORG-001-05",
  "orgType": "DEPARTMENT",
  "managerId": "user-uuid",
  "managerName": "王五",
  "description": "负责合规管理工作",
  "sortOrder": 5
}
```

- **响应结构**: 返回创建后的完整组织对象
- **权限要求**: `ic:organization:create`
- **错误码**: 20002（父组织不存在）、20003（组织编码重复）

##### 2.2.1.3 更新组织

- **方法**: `PUT`
- **路径**: `/api/v1/ic-system/organizations/{orgId}`
- **请求参数** (Path + Body):

| Path 参数 | 类型 | 必填 | 说明 |
|-----------|------|------|------|
| orgId | String | 是 | 组织 ID |

Body 同创建接口（除 parentId 不可修改）

- **响应结构**: 返回更新后的完整组织对象
- **权限要求**: `ic:organization:update`
- **错误码**: 20001（组织不存在）、10013（并发冲突）

##### 2.2.1.4 删除组织

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-system/organizations/{orgId}`
- **请求参数** (Path):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orgId | String | 是 | 组织 ID |
| forceDelete | Boolean | 否 | 强制删除（含子组织），默认 false |

- **响应结构**: `data: null`
- **权限要求**: `ic:organization:delete`
- **错误码**: 20004（存在子组织不允许删除）、20005（存在关联用户不允许删除）
- **业务说明**: 已关联用户或子组织的节点不可直接删除，需先解绑

##### 2.2.1.5 批量导入组织

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/organizations/import`
- **请求参数** (Body multipart/form-data):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | Excel 文件（.xlsx） |
| importMode | String | 否 | MERGE（合并）/ OVERWRITE（覆盖），默认 MERGE |

- **响应结构**: 返回导入结果（成功数、失败数、失败详情列表）
- **权限要求**: `ic:organization:import`

##### 2.2.1.6 获取组织详情

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/organizations/{orgId}`
- **请求参数** (Path): orgId
- **响应结构**: 返回组织完整信息（含关联用户列表、关联流程数、关联风险数）
- **权限要求**: `ic:organization:view`

---

##### 9.2.2 制度文档管理

##### 2.2.2.1 文档列表查询

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/regulations`
- **请求参数** (Query): 分页参数 + 通用过滤参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| regulationType | String | 否 | 制度类型：LAW/REGULATION/POLICY/PROCEDURE/STANDARD |
| publishOrg | String | 否 | 发布机构 |
| effectiveStatus | String | 否 | 生效状态：DRAFT/PUBLISHED/EXPIRED/ABOLISHED |
| publishDateStart | String | 否 | 发布日期起 |
| publishDateEnd | String | 否 | 发布日期止 |
| aiParsedStatus | String | 否 | AI 解析状态：PENDING/PROCESSING/COMPLETED/FAILED |

- **响应结构**: 分页列表，每项含文档 ID、名称、类型、版本号、发布机构、生效日期、AI 解析状态
- **权限要求**: `ic:regulation:view`

##### 2.2.2.2 上传文档并触发 AI 解析

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/regulations/upload`
- **请求参数** (Body multipart/form-data):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 文档文件 |
| regulationType | String | 是 | 制度类型 |
| publishOrg | String | 是 | 发布机构 |
| publishDate | String | 是 | 发布日期（yyyy-MM-dd） |
| effectiveDate | String | 是 | 生效日期 |
| tags | String[] | 否 | 标签列表 |
| autoParse | Boolean | 否 | 是否自动触发 AI 解析，默认 true |

- **响应结构**: 返回文档 ID + 解析任务 ID（异步）
- **权限要求**: `ic:regulation:upload`
- **错误码**: 20006（文件格式不支持）、20007（文件大小超限）

##### 2.2.2.3 查询 AI 解析结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/regulations/{docId}/parse-result`
- **请求参数** (Path): docId
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "docId": "doc-uuid",
    "parseStatus": "COMPLETED",
    "parseProgress": 100,
    "summary": "本制度规定了...",
    "keyPoints": [
      {"title": "适用范围", "content": "适用于全行所有部门..."},
      {"title": "职责分工", "content": "风险管理部负责..."}
    ],
    "extractedControls": [
      {
        "controlPoint": "双人复核",
        "controlType": "MANUAL",
        "frequency": "DAILY",
        "relatedProcess": "支付审批流程",
        "confidence": 0.92
      }
    ],
    "extractedRisks": [
      {
        "riskName": "操作失误风险",
        "riskCategory": "OPERATIONAL",
        "confidence": 0.85
      }
    ],
    "relatedRegulations": [
      {"docId": "doc-002", "docName": "商业银行内部控制指引", "relationType": "REFERENCE"}
    ],
    "parseTime": "2026-08-06T10:30:00Z",
    "errorMessage": null
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:regulation:view`
- **错误码**: 20008（解析任务不存在）、20009（解析进行中）

##### 2.2.2.4 文档版本管理 - 获取版本列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/regulations/{docId}/versions`
- **请求参数** (Path): docId
- **响应结构**: 版本列表，每项含版本号、变更说明、上传时间、上传人、文件大小
- **权限要求**: `ic:regulation:view`

##### 2.2.2.5 文档版本对比

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/regulations/{docId}/versions/compare`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| sourceVersionId | String | 是 | 源版本 ID |
| targetVersionId | String | 是 | 目标版本 ID |
| compareType | String | 否 | TEXT/AI_SUMMARY，默认 TEXT |

- **响应结构**: 返回差异列表（diff），含新增/删除/修改段落，AI 摘要模式下返回变更要点总结
- **权限要求**: `ic:regulation:view`

##### 2.2.2.6 删除文档

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-system/regulations/{docId}`
- **权限要求**: `ic:regulation:delete`
- **错误码**: 20010（文档已被流程引用，不可删除）

##### 2.2.2.7 文档下载

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/regulations/{docId}/download`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| versionId | String | 否 | 指定版本 ID，不传则下载最新版 |

- **响应**: 文件流（Content-Type: application/octet-stream）
- **权限要求**: `ic:regulation:view`

##### 2.2.2.8 手动触发重新解析

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/regulations/{docId}/reparse`
- **响应结构**: 返回新的解析任务 ID
- **权限要求**: `ic:regulation:update`

##### 2.2.2.9 更新文档元信息

- **方法**: `PUT`
- **路径**: `/api/v1/ic-system/regulations/{docId}`
- **请求参数** (Body): 可更新 regulationType, publishOrg, tags, description 等元信息（不可更新文件本身）
- **权限要求**: `ic:regulation:update`

##### 2.2.2.10 批量关联流程

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/regulations/{docId}/link-processes`
- **请求参数** (Body):

```json
{
  "processIds": ["process-001", "process-002"],
  "linkType": "DIRECT_REFERENCE"
}
```

- **权限要求**: `ic:regulation:update`

---

##### 9.2.3 流程目录管理

##### 2.2.3.1 获取流程树

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/processes/tree`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orgId | String | 否 | 按组织筛选 |
| processCategory | String | 否 | 流程分类：BUSINESS/SUPPORT/MANAGEMENT |

- **响应结构**: 树形结构，每节点含流程 ID、名称、编码、分类、风险等级、关联控制数
- **权限要求**: `ic:process:view`

##### 2.2.3.2 创建流程节点

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/processes`
- **请求参数** (Body):

```json
{
  "parentId": "process-parent",
  "name": "贷款审批流程",
  "processCode": "PROC-LOAN-001",
  "processCategory": "BUSINESS",
  "orgId": "org-dept-001",
  "ownerId": "user-uuid",
  "description": "负责贷款业务的审批流程",
  "riskLevel": "HIGH",
  "sortOrder": 1
}
```

- **响应结构**: 返回创建的流程节点对象
- **权限要求**: `ic:process:create`
- **错误码**: 20011（流程编码重复）

##### 2.2.3.3 更新流程节点

- **方法**: `PUT`
- **路径**: `/api/v1/ic-system/processes/{processId}`
- **权限要求**: `ic:process:update`

##### 2.2.3.4 删除流程节点

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-system/processes/{processId}`
- **权限要求**: `ic:process:delete`
- **错误码**: 20012（存在子流程）、20013（已关联风险或控制）

##### 2.2.3.5 批量导入流程

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/processes/import`
- **请求参数**: 上传 Excel 文件
- **权限要求**: `ic:process:import`

---

##### 9.2.4 流程节点管理

##### 2.2.4.1 获取流程节点详情

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/processes/{processId}/nodes`
- **请求参数** (Path + Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| processId | String | 是 | 流程 ID |

- **响应结构**: 节点列表，每节点含 ID、名称、序号、执行角色、输入/输出、风险点列表、控制点列表
- **权限要求**: `ic:process:view`

##### 2.2.4.2 创建流程节点

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/processes/{processId}/nodes`
- **请求参数** (Body):

```json
{
  "nodeName": "贷前调查",
  "nodeCode": "NODE-LOAN-001",
  "sequenceNumber": 1,
  "nodeType": "TASK",
  "executorRole": "LOAN_OFFICER",
  "inputDescription": "贷款申请材料",
  "outputDescription": "调查报告",
  "slaHours": 48,
  "isKeyNode": true
}
```

- **权限要求**: `ic:process:node:create`

##### 2.2.4.3 更新流程节点

- **方法**: `PUT`
- **路径**: `/api/v1/ic-system/processes/{processId}/nodes/{nodeId}`
- **权限要求**: `ic:process:node:update`

##### 2.2.4.4 删除流程节点

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-system/processes/{processId}/nodes/{nodeId}`
- **权限要求**: `ic:process:node:delete`

##### 2.2.4.5 调整节点顺序

- **方法**: `PUT`
- **路径**: `/api/v1/ic-system/processes/{processId}/nodes/reorder`
- **请求参数** (Body):

```json
{
  "nodeOrders": [
    {"nodeId": "node-001", "sequenceNumber": 1},
    {"nodeId": "node-002", "sequenceNumber": 2}
  ]
}
```

- **权限要求**: `ic:process:node:update`

---

##### 9.2.5 体系完整性检查

##### 2.2.5.1 触发完整性检查

- **方法**: `POST`
- **路径**: `/api/v1/ic-system/integrity-check`
- **请求参数** (Body):

```json
{
  "orgId": "org-root",
  "checkScope": "FULL",
  "checkItems": ["ORG_COVERAGE", "PROCESS_COVERAGE", "REGULATION_COVERAGE", "CONTROL_COVERAGE"]
}
```

- **响应结构**: 返回检查任务 ID（异步执行）
- **权限要求**: `ic:system:check`

##### 2.2.5.2 查询检查结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-system/integrity-check/{taskId}/result`
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task-uuid",
    "status": "COMPLETED",
    "overallScore": 85,
    "checkItems": [
      {
        "itemName": "组织覆盖度",
        "score": 90,
        "status": "PASS",
        "detail": "所有一级部门已纳入内控体系",
        "issues": []
      },
      {
        "itemName": "流程覆盖度",
        "score": 75,
        "status": "WARNING",
        "detail": "存在 3 个业务流程未关联控制措施",
        "issues": [
          {"processId": "proc-001", "processName": "资金调拨", "issue": "缺少关键控制点"},
          {"processId": "proc-002", "processName": "合同审批", "issue": "缺少风险识别记录"}
        ]
      }
    ],
    "checkTime": "2026-08-06T14:30:00Z"
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:system:check:view`

---

### 模块二：风险识别评估 API（/api/v1/ic-risk）

##### 9.2.6 风险分类管理

##### 2.2.6.1 获取风险分类树

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/categories/tree`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| includeRiskCount | Boolean | 否 | 是否包含各分类下的风险数量，默认 false |

- **响应结构**: 树形结构，节点含分类 ID、名称、编码、父级 ID、子分类列表
- **权限要求**: `ic:risk:category:view`

##### 2.2.6.2 创建风险分类

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/categories`
- **请求参数** (Body):

```json
{
  "parentId": "cat-root",
  "name": "信用风险",
  "categoryCode": "RISK-CAT-CREDIT",
  "description": "因交易对手未能履行合同义务而导致损失的风险",
  "sortOrder": 1
}
```

- **权限要求**: `ic:risk:category:create`
- **错误码**: 30001（分类编码重复）

##### 2.2.6.3 更新/删除风险分类

- **更新**: `PUT /api/v1/ic-risk/categories/{categoryId}`
- **删除**: `DELETE /api/v1/ic-risk/categories/{categoryId}`
- **错误码**: 30002（分类下存在风险不可删除）

---

##### 9.2.7 风险清单 CRUD

##### 2.2.7.1 风险列表查询

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/risks`
- **请求参数** (Query): 分页参数 + 通用过滤参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| categoryId | String | 否 | 风险分类 ID |
| riskLevel | String | 否 | 风险等级：HIGH/MEDIUM/LOW |
| riskStatus | String | 否 | 风险状态：ACTIVE/INACTIVE/MITIGATED |
| processId | String | 否 | 关联流程 ID |
| orgId | String | 否 | 关联组织 ID |
| identifiedBy | String | 否 | AI/MANUAL 识别来源 |

- **响应结构**: 分页列表，每项含风险 ID、名称、分类、等级、状态、关联流程、关联控制数、识别来源
- **权限要求**: `ic:risk:view`

##### 2.2.7.2 创建风险

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/risks`
- **请求参数** (Body):

```json
{
  "riskName": "贷款审批流程中的信用评估偏差",
  "categoryId": "cat-credit",
  "riskLevel": "HIGH",
  "riskType": "INHERENT",
  "description": "在贷款审批环节，由于信用评估模型偏差导致...",
  "triggerEvent": "信用评估模型参数更新",
  "impactDescription": "可能导致不良贷款率上升",
  "likelihood": "POSSIBLE",
  "impact": "MAJOR",
  "relatedProcessIds": ["process-loan-001"],
  "relatedOrgIds": ["org-dept-001"],
  "controlIds": ["ctrl-001", "ctrl-002"],
  "identifiedSource": "MANUAL",
  "identifiedBy": "user-uuid"
}
```

- **权限要求**: `ic:risk:create`
- **错误码**: 30003（风险名称重复）

##### 2.2.7.3 更新风险

- **方法**: `PUT`
- **路径**: `/api/v1/ic-risk/risks/{riskId}`
- **权限要求**: `ic:risk:update`

##### 2.2.7.4 删除风险

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-risk/risks/{riskId}`
- **权限要求**: `ic:risk:delete`
- **错误码**: 30004（风险已关联控制措施，需先解除关联）

##### 2.2.7.5 获取风险详情

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/risks/{riskId}`
- **请求参数** (Path): riskId
- **响应结构**: 风险完整信息 + 关联控制列表 + 关联流程列表 + 评估历史 + 整改历史
- **权限要求**: `ic:risk:view`

##### 2.2.7.6 批量更新风险等级

- **方法**: `PUT`
- **路径**: `/api/v1/ic-risk/risks/batch-level`
- **请求参数** (Body):

```json
{
  "riskIds": ["risk-001", "risk-002"],
  "riskLevel": "MEDIUM",
  "reason": "经评估后调整"
}
```

- **权限要求**: `ic:risk:update`

##### 2.2.7.7 关联/解除关联控制措施

- **方法**: `POST` / `DELETE`
- **路径**: `/api/v1/ic-risk/risks/{riskId}/controls`
- **权限要求**: `ic:risk:control:link`

##### 2.2.7.8 风险历史记录查询

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/risks/{riskId}/history`
- **响应结构**: 变更记录列表（时间、操作人、变更内容、变更前后对比）
- **权限要求**: `ic:risk:view`

---

##### 9.2.8 风险评估问卷管理

##### 2.2.8.1 问卷模板列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/questionnaires`
- **权限要求**: `ic:risk:questionnaire:view`

##### 2.2.8.2 创建问卷模板

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/questionnaires`
- **请求参数** (Body):

```json
{
  "title": "2026年度信用风险评估问卷",
  "description": "用于评估各部门信用风险管理水平",
  "targetOrgs": ["org-dept-001", "org-dept-002"],
  "targetProcesses": ["process-loan-001"],
  "questions": [
    {
      "questionText": "是否建立了完整的信用审批流程？",
      "questionType": "SINGLE_CHOICE",
      "options": ["是", "否", "部分建立"],
      "required": true,
      "weight": 5,
      "riskCategoryId": "cat-credit"
    }
  ],
  "startDate": "2026-08-01",
  "endDate": "2026-08-31"
}
```

- **权限要求**: `ic:risk:questionnaire:create`

##### 2.2.8.3 发布问卷

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/questionnaires/{questionnaireId}/publish`
- **权限要求**: `ic:risk:questionnaire:publish`
- **业务说明**: 发布后向目标组织的控制责任人发送通知

##### 2.2.8.4 提交问卷回答

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/questionnaires/{questionnaireId}/submit`
- **请求参数** (Body):

```json
{
  "answers": [
    {"questionId": "q-001", "answer": "是", "remark": "已建立三级审批制度"},
    {"questionId": "q-002", "answer": "否", "remark": "暂未覆盖新业务线"}
  ]
}
```

- **权限要求**: `ic:risk:questionnaire:submit`
- **错误码**: 30005（问卷已截止）

##### 2.2.8.5 查询问卷统计结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/questionnaires/{questionnaireId}/statistics`
- **响应结构**: 各问题回答分布、各组织完成率、风险得分汇总
- **权限要求**: `ic:risk:questionnaire:view`

---

##### 9.2.9 风险评估执行

##### 2.2.9.1 创建评估任务

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/assessments`
- **请求参数** (Body):

```json
{
  "assessmentName": "2026Q3 风险评估",
  "assessmentType": "QUARTERLY",
  "scope": {
    "orgIds": ["org-dept-001"],
    "processIds": ["process-loan-001"],
    "riskIds": []
  },
  "methodology": "SCORING_MATRIX",
  "assessors": ["user-001", "user-002"],
  "startDate": "2026-07-01",
  "endDate": "2026-09-30"
}
```

- **权限要求**: `ic:risk:assessment:create`

##### 2.2.9.2 提交评估结果

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/assessments/{assessmentId}/results`
- **请求参数** (Body):

```json
{
  "riskResults": [
    {
      "riskId": "risk-001",
      "inherentLikelihood": 4,
      "inherentImpact": 5,
      "residualLikelihood": 2,
      "residualImpact": 3,
      "assessmentComment": "已有控制措施有效降低了风险"
    }
  ]
}
```

- **权限要求**: `ic:risk:assessment:submit`

##### 2.2.9.3 获取评估结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/assessments/{assessmentId}/results`
- **响应结构**: 评估概览 + 各风险评估结果 + 风险矩阵坐标数据
- **权限要求**: `ic:risk:assessment:view`

---

##### 9.2.10 风险热力图数据

##### 2.2.10.1 获取热力图数据

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/heatmap`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dimension | String | 是 | 维度：ORG/PROCESS/RISK_CATEGORY |
| orgId | String | 否 | 按组织筛选 |
| riskType | String | 否 | INHERENT/RESIDUAL，默认 RESIDUAL |
| assessmentId | String | 否 | 指定评估批次 |

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "dimension": "PROCESS",
    "riskType": "RESIDUAL",
    "cells": [
      {
        "processId": "proc-001",
        "processName": "贷款审批",
        "riskCount": 12,
        "highRiskCount": 3,
        "avgLikelihood": 3.2,
        "avgImpact": 4.1,
        "heatLevel": "RED",
        "trend": "UP"
      }
    ],
    "summary": {
      "totalRisks": 156,
      "highRisks": 23,
      "mediumRisks": 67,
      "lowRisks": 66
    }
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:risk:heatmap:view`

##### 2.2.10.2 热力图下钻数据

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/heatmap/drill-down`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cellKey | String | 是 | 单元格标识（如 processId） |
| cellType | String | 是 | 单元格类型：PROCESS/ORG/CATEGORY |

- **响应结构**: 该维度下的具体风险列表（分页）
- **权限要求**: `ic:risk:heatmap:view`

---

##### 9.2.11 AI 风险识别

##### 2.2.11.1 触发 AI 风险识别

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/ai/identify`
- **请求参数** (Body):

```json
{
  "scope": {
    "processIds": ["proc-001"],
    "orgIds": ["org-dept-001"]
  },
  "sourceType": "REGULATION",
  "sourceIds": ["doc-001"],
  "identifyMode": "FULL"
}
```

- **响应结构**: 返回识别任务 ID
- **权限要求**: `ic:risk:ai:identify`
- **错误码**: 30006（AI 服务不可用）

##### 2.2.11.2 查询 AI 识别结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/ai/identify/{taskId}/result`
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task-uuid",
    "status": "COMPLETED",
    "identifiedRisks": [
      {
        "riskName": "审批权限集中度过高",
        "categoryId": "cat-operational",
        "riskLevel": "HIGH",
        "description": "AI 分析发现...",
        "sourceRegulation": {"docId": "doc-001", "paragraph": "第12条"},
        "confidence": 0.88,
        "suggestedControls": ["实施分级审批", "引入双签机制"],
        "relatedProcessId": "proc-001"
      }
    ],
    "totalIdentified": 15,
    "newRisks": 8,
    "existingRisks": 7,
    "identifyTime": "2026-08-06T10:00:00Z"
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:risk:ai:identify:view`
- **错误码**: 30007（识别任务不存在）

##### 2.2.11.3 确认/驳回 AI 识别结果

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/ai/identify/{taskId}/confirm`
- **请求参数** (Body):

```json
{
  "actions": [
    {"riskIndex": 0, "action": "ACCEPT", "riskLevel": "HIGH"},
    {"riskIndex": 1, "action": "REJECT", "reason": "与现有风险重复"},
    {"riskIndex": 2, "action": "ACCEPT_WITH_MODIFICATION", "modifiedName": "调整后名称", "riskLevel": "MEDIUM"}
  ]
}
```

- **权限要求**: `ic:risk:ai:identify:confirm`

---

##### 9.2.12 KRI 指标管理

##### 2.2.12.1 KRI 指标列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/kris`
- **请求参数** (Query): 分页参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| categoryId | String | 否 | 风险分类 |
| kriStatus | String | 否 | 指标状态：ACTIVE/INACTIVE |
| alertStatus | String | 否 | 预警状态：NORMAL/WARNING/CRITICAL |

- **权限要求**: `ic:risk:kri:view`

##### 2.2.12.2 创建 KRI 指标

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/kris`
- **请求参数** (Body):

```json
{
  "kriName": "不良贷款率",
  "kriCode": "KRI-NPL-001",
  "categoryId": "cat-credit",
  "dataType": "PERCENTAGE",
  "unit": "%",
  "targetValue": 2.0,
  "warningThreshold": 3.0,
  "criticalThreshold": 5.0,
  "dataSource": "SYSTEM",
  "sourceSystem": "CORE_BANKING",
  "fetchApi": "/api/external/npl-rate",
  "fetchFrequency": "MONTHLY",
  "responsibleDept": "org-dept-001",
  "responsiblePerson": "user-uuid"
}
```

- **权限要求**: `ic:risk:kri:create`

##### 2.2.12.3 录入 KRI 数据

- **方法**: `POST`
- **路径**: `/api/v1/ic-risk/kris/{kriId}/data`
- **请求参数** (Body):

```json
{
  "dataDate": "2026-07",
  "actualValue": 2.8,
  "dataSource": "MANUAL",
  "remark": "月末统计"
}
```

- **权限要求**: `ic:risk:kri:data:input`

##### 2.2.12.4 KRI 历史趋势数据

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/kris/{kriId}/trend`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | String | 是 | 开始日期 |
| endDate | String | 是 | 结束日期 |
| granularity | String | 否 | MONTHLY/QUARTERLY/YEARLY |

- **响应结构**: 时间序列数据点列表，含实际值、目标值、阈值线
- **权限要求**: `ic:risk:kri:view`

##### 2.2.12.5 KRI 预警查询

- **方法**: `GET`
- **路径**: `/api/v1/ic-risk/kris/alerts`
- **请求参数** (Query): 分页参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alertLevel | String | 否 | WARNING/CRITICAL |
| resolved | Boolean | 否 | 是否已处置 |

- **权限要求**: `ic:risk:kri:alert:view`

---

### 模块三：控制设计优化 API（/api/v1/ic-control）

##### 9.2.13 控制措施库 CRUD

##### 2.2.13.1 控制措施列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-control/controls`
- **请求参数** (Query): 分页参数 + 通用过滤参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| controlType | String | 否 | PREVENTIVE/DETECTIVE/CORRECTIVE |
| controlCategory | String | 否 | MANUAL/SYSTEM/SEMI_AUTO |
| controlStatus | String | 否 | ACTIVE/INACTIVE/DRAFT |
| riskLevel | String | 否 | 关联风险等级 |
| processId | String | 否 | 关联流程 |
| executionFrequency | String | 否 | DAILY/WEEKLY/MONTHLY/QUARTERLY/YEARLY/EVENT_DRIVEN |

- **权限要求**: `ic:control:view`

##### 2.2.13.2 创建控制措施

- **方法**: `POST`
- **路径**: `/api/v1/ic-control/controls`
- **请求参数** (Body):

```json
{
  "controlName": "双人复核机制",
  "controlCode": "CTRL-DUAL-001",
  "controlType": "DETECTIVE",
  "controlCategory": "MANUAL",
  "description": "所有超过50万的支付需经双人复核",
  "executionFrequency": "EVENT_DRIVEN",
  "executorRole": "PAYMENT_REVIEWER",
  "executionProcedure": "1. 经办人发起支付申请\n2. 复核人核对支付信息...",
  "evidenceRequired": true,
  "evidenceType": ["SCREENSHOT", "APPROVAL_FORM"],
  "relatedRiskIds": ["risk-001"],
  "relatedProcessIds": ["proc-001"],
  "isKeyControl": true,
  "effectivenessScore": null
}
```

- **权限要求**: `ic:control:create`
- **错误码**: 40001（控制编码重复）

##### 2.2.13.3 更新控制措施

- **方法**: `PUT`
- **路径**: `/api/v1/ic-control/controls/{controlId}`
- **权限要求**: `ic:control:update`

##### 2.2.13.4 删除控制措施

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-control/controls/{controlId}`
- **权限要求**: `ic:control:delete`
- **错误码**: 40002（控制措施已被引用不可删除）

##### 2.2.13.5 获取控制详情

- **方法**: `GET`
- **路径**: `/api/v1/ic-control/controls/{controlId}`
- **响应结构**: 控制完整信息 + 关联风险列表 + 关联流程列表 + 测试历史 + 执行记录
- **权限要求**: `ic:control:view`

##### 2.2.13.6 批量导入控制措施

- **方法**: `POST`
- **路径**: `/api/v1/ic-control/controls/import`
- **权限要求**: `ic:control:import`

##### 2.2.13.7 控制措施停用/启用

- **方法**: `PUT`
- **路径**: `/api/v1/ic-control/controls/{controlId}/toggle-status`
- **请求参数** (Body):

```json
{
  "status": "INACTIVE",
  "reason": "业务流程变更，该控制不再适用"
}
```

- **权限要求**: `ic:control:update`
- **业务说明**: 停用需填写原因，用于审计追溯

---

##### 9.2.14 RCM 矩阵管理

##### 2.2.14.1 获取 RCM 矩阵数据

- **方法**: `GET`
- **路径**: `/api/v1/ic-control/rcm-matrix`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orgId | String | 否 | 组织维度 |
| processId | String | 否 | 流程维度 |
| riskCategoryId | String | 否 | 风险分类维度 |
| viewType | String | 否 | MATRIX/LIST，默认 MATRIX |

- **响应结构** (MATRIX 模式):

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "rows": [
      {
        "riskId": "risk-001",
        "riskName": "信用评估偏差",
        "riskLevel": "HIGH",
        "processName": "贷款审批",
        "controls": [
          {
            "controlId": "ctrl-001",
            "controlName": "双人复核",
            "controlType": "DETECTIVE",
            "linked": true,
            "effectivenessScore": 85
          },
          {
            "controlId": "ctrl-002",
            "controlName": "信用评分模型",
            "controlType": "PREVENTIVE",
            "linked": false,
            "effectivenessScore": null
          }
        ]
      }
    ],
    "columns": [
      {"controlId": "ctrl-001", "controlName": "双人复核"},
      {"controlId": "ctrl-002", "controlName": "信用评分模型"}
    ],
    "coverageStats": {
      "totalRisks": 50,
      "coveredRisks": 42,
      "uncoveredRisks": 8,
      "coverageRate": 84.0,
      "totalControls": 35,
      "avgControlsPerRisk": 1.4
    }
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:control:rcm:view`

##### 2.2.14.2 编辑 RCM 关联关系

- **方法**: `POST`
- **路径**: `/api/v1/ic-control/rcm-matrix/links`
- **请求参数** (Body):

```json
{
  "links": [
    {"riskId": "risk-001", "controlId": "ctrl-001", "action": "LINK", "linkType": "DIRECT"},
    {"riskId": "risk-001", "controlId": "ctrl-002", "action": "UNLINK"}
  ]
}
```

- **权限要求**: `ic:control:rcm:edit`
- **错误码**: 40003（关联已存在）、40004（关联不存在）

##### 2.2.14.3 批量关联（基于 AI 推荐）

- **方法**: `POST`
- **路径**: `/api/v1/ic-control/rcm-matrix/links/batch-ai`
- **请求参数** (Body):

```json
{
  "scope": {"processIds": ["proc-001"]},
  "confidenceThreshold": 0.7,
  "autoApply": false
}
```

- **响应结构**: 返回 AI 推荐的关联列表（待确认）
- **权限要求**: `ic:control:rcm:edit`
- **错误码**: 40005（AI 服务不可用）

---

##### 9.2.15 控制覆盖度分析

##### 2.2.15.1 触发覆盖度分析

- **方法**: `POST`
- **路径**: `/api/v1/ic-control/coverage-analysis`
- **请求参数** (Body):

```json
{
  "scope": {
    "orgIds": [],
    "processIds": ["proc-001"],
    "riskCategoryIds": []
  },
  "analysisType": "FULL"
}
```

- **响应结构**: 返回分析任务 ID
- **权限要求**: `ic:control:coverage:analyze`

##### 2.2.15.2 查询覆盖度分析结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-control/coverage-analysis/{taskId}/result`
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task-uuid",
    "status": "COMPLETED",
    "overallCoverage": 84.5,
    "byRiskLevel": {
      "HIGH": {"total": 30, "covered": 28, "coverage": 93.3},
      "MEDIUM": {"total": 45, "covered": 38, "coverage": 84.4},
      "LOW": {"total": 25, "covered": 18, "coverage": 72.0}
    },
    "byProcess": [
      {"processId": "proc-001", "processName": "贷款审批", "coverage": 90, "gaps": []},
      {"processId": "proc-002", "processName": "资金调拨", "coverage": 65, "gaps": [
        {"riskId": "risk-010", "riskName": "调拨超时风险", "gapType": "NO_CONTROL"},
        {"riskId": "risk-011", "riskName": "重复支付风险", "gapType": "WEAK_CONTROL"}
      ]}
    ],
    "byControlType": {
      "PREVENTIVE": 45,
      "DETECTIVE": 35,
      "CORRECTIVE": 20
    },
    "recommendations": [
      {"riskId": "risk-010", "suggestedControl": "增加调拨超时监控告警", "controlType": "DETECTIVE"}
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:control:coverage:view`

---

##### 9.2.16 AI 控制设计推荐

##### 2.2.16.1 触发 AI 控制设计推荐

- **方法**: `POST`
- **路径**: `/api/v1/ic-control/ai/recommend`
- **请求参数** (Body):

```json
{
  "riskIds": ["risk-001", "risk-002"],
  "processId": "proc-001",
  "referenceRegulations": ["doc-001"],
  "designPreference": "BALANCED"
}
```

- **响应结构**: 返回推荐任务 ID
- **权限要求**: `ic:control:ai:recommend`
- **错误码**: 40006（AI 服务不可用）

##### 2.2.16.2 查询 AI 推荐结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-control/ai/recommend/{taskId}/result`
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task-uuid",
    "status": "COMPLETED",
    "recommendations": [
      {
        "targetRiskId": "risk-001",
        "controlName": "自动化信用评分校验",
        "controlType": "PREVENTIVE",
        "controlCategory": "SYSTEM",
        "description": "在贷款审批流程中增加自动化信用评分校验环节...",
        "executionFrequency": "EVENT_DRIVEN",
        "referenceBasis": "《商业银行内部控制指引》第25条",
        "confidence": 0.91,
        "expectedEffectiveness": 85,
        "implementationComplexity": "MEDIUM"
      }
    ],
    "totalRecommendations": 5
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:control:ai:recommend:view`

##### 2.2.16.3 一键采纳 AI 推荐

- **方法**: `POST`
- **路径**: `/api/v1/ic-control/ai/recommend/{taskId}/adopt`
- **请求参数** (Body):

```json
{
  "adoptItems": [
    {"recommendIndex": 0, "customName": null, "customCode": null}
  ]
}
```

- **响应结构**: 返回创建的控制措施 ID 列表
- **权限要求**: `ic:control:create`

---

### 模块四：控制执行监测 API（/api/v1/ic-monitor）

##### 9.2.17 控制执行计划管理

##### 2.2.17.1 执行计划列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-monitor/execution-plans`
- **请求参数** (Query): 分页参数 + 通用过滤参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planStatus | String | 否 | PENDING/IN_PROGRESS/COMPLETED/OVERDUE |
| executionPeriod | String | 否 | 执行周期：DAILY/WEEKLY/MONTHLY/QUARTERLY |
| assigneeId | String | 否 | 执行人 ID |
| overdueOnly | Boolean | 否 | 仅查询逾期，默认 false |

- **权限要求**: `ic:monitor:plan:view`

##### 2.2.17.2 创建执行计划

- **方法**: `POST`
- **路径**: `/api/v1/ic-monitor/execution-plans`
- **请求参数** (Body):

```json
{
  "planName": "2026年8月控制执行计划",
  "executionPeriod": "MONTHLY",
  "periodValue": "2026-08",
  "controlIds": ["ctrl-001", "ctrl-002", "ctrl-003"],
  "assigneeId": "user-uuid",
  "startDate": "2026-08-01",
  "endDate": "2026-08-31",
  "description": "本月度需完成的控制执行任务"
}
```

- **权限要求**: `ic:monitor:plan:create`

##### 2.2.17.3 获取执行任务详情

- **方法**: `GET`
- **路径**: `/api/v1/ic-monitor/execution-plans/{planId}`
- **响应结构**: 计划详情 + 关联控制列表 + 执行进度
- **权限要求**: `ic:monitor:plan:view`

##### 2.2.17.4 标记执行完成

- **方法**: `PUT`
- **路径**: `/api/v1/ic-monitor/execution-plans/{planId}/controls/{controlId}/complete`
- **请求参数** (Body):

```json
{
  "executionDate": "2026-08-06",
  "executionResult": "NORMAL",
  "executionRemark": "执行正常，无异常发现",
  "executorId": "user-uuid"
}
```

- **权限要求**: `ic:monitor:plan:execute`
- **错误码**: 50001（计划已过期不可执行）

---

##### 9.2.18 执行证据上传

##### 2.2.18.1 上传执行证据

- **方法**: `POST`
- **路径**: `/api/v1/ic-monitor/evidences`
- **请求参数** (Body multipart/form-data):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 证据文件 |
| planId | String | 是 | 执行计划 ID |
| controlId | String | 是 | 控制措施 ID |
| evidenceType | String | 是 | SCREENSHOT/APPROVAL_FORM/REPORT/OTHER |
| description | String | 否 | 证据说明 |

- **权限要求**: `ic:monitor:evidence:upload`
- **错误码**: 50002（证据文件格式不支持）、50003（已存在相同类型的证据）

##### 2.2.18.2 查询执行证据

- **方法**: `GET`
- **路径**: `/api/v1/ic-monitor/evidences`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | String | 是 | 执行计划 ID |
| controlId | String | 否 | 控制措施 ID |

- **权限要求**: `ic:monitor:evidence:view`

##### 2.2.18.3 删除证据

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-monitor/evidences/{evidenceId}`
- **权限要求**: `ic:monitor:evidence:delete`
- **错误码**: 50004（证据已被审核不可删除）

---

##### 9.2.19 预警规则配置

##### 2.2.19.1 预警规则列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-monitor/alert-rules`
- **权限要求**: `ic:monitor:alert:rule:view`

##### 2.2.19.2 创建预警规则

- **方法**: `POST`
- **路径**: `/api/v1/ic-monitor/alert-rules`
- **请求参数** (Body):

```json
{
  "ruleName": "关键控制连续2次未按时执行",
  "ruleType": "EXECUTION_DELAY",
  "targetType": "CONTROL",
  "targetIds": [],
  "conditions": {
    "keyControlOnly": true,
    "consecutiveMissCount": 2,
    "timeWindowDays": 30
  },
  "alertLevel": "CRITICAL",
  "alertChannels": ["IN_APP", "EMAIL", "SMS"],
  "notifyUsers": ["user-001", "user-002"],
  "isEnabled": true
}
```

- **权限要求**: `ic:monitor:alert:rule:create`

##### 2.2.19.3 启用/禁用预警规则

- **方法**: `PUT`
- **路径**: `/api/v1/ic-monitor/alert-rules/{ruleId}/toggle`
- **权限要求**: `ic:monitor:alert:rule:update`

---

##### 9.2.20 预警记录查询与处置

##### 2.2.20.1 预警记录列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-monitor/alerts`
- **请求参数** (Query): 分页参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alertLevel | String | 否 | WARNING/CRITICAL |
| alertStatus | String | 否 | UNHANDLED/HANDLING/RESOLVED/DISMISSED |
| alertType | String | 否 | 预警类型 |
| startDate/endDate | String | 否 | 时间范围 |

- **权限要求**: `ic:monitor:alert:view`

##### 2.2.20.2 预警处置

- **方法**: `PUT`
- **路径**: `/api/v1/ic-monitor/alerts/{alertId}/handle`
- **请求参数** (Body):

```json
{
  "action": "RESOLVED",
  "handleRemark": "已补执行控制措施",
  "handlerId": "user-uuid",
  "attachments": ["file-id-001"]
}
```

- **权限要求**: `ic:monitor:alert:handle`

##### 2.2.20.3 批量标记已读

- **方法**: `PUT`
- **路径**: `/api/v1/ic-monitor/alerts/batch-read`
- **请求参数** (Body):

```json
{
  "alertIds": ["alert-001", "alert-002"]
}
```

- **权限要求**: `ic:monitor:alert:view`

---

##### 9.2.21 监测仪表盘数据

##### 2.2.21.1 获取仪表盘概览

- **方法**: `GET`
- **路径**: `/api/v1/ic-monitor/dashboard/overview`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orgId | String | 否 | 组织筛选 |
| period | String | 否 | 统计周期：CURRENT_MONTH/CURRENT_QUARTER/CURRENT_YEAR |

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "executionStats": {
      "totalPlans": 45,
      "completedPlans": 38,
      "inProgressPlans": 5,
      "overduePlans": 2,
      "completionRate": 84.4
    },
    "controlStats": {
      "totalControls": 120,
      "executedControls": 105,
      "unexecutedControls": 15,
      "executionRate": 87.5
    },
    "alertStats": {
      "totalAlerts": 12,
      "unhandledAlerts": 3,
      "criticalAlerts": 1,
      "handlingRate": 75.0
    },
    "trendData": [
      {"period": "2026-01", "completionRate": 82, "alertCount": 8},
      {"period": "2026-02", "completionRate": 85, "alertCount": 6},
      {"period": "2026-03", "completionRate": 88, "alertCount": 5}
    ],
    "orgRankings": [
      {"orgId": "org-001", "orgName": "风险管理部", "executionRate": 95, "rank": 1},
      {"orgId": "org-002", "orgName": "信贷管理部", "executionRate": 88, "rank": 2}
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:monitor:dashboard:view`

##### 2.2.21.2 实时预警推送（WebSocket）

- **连接**: `ws://host/api/v1/ws/monitor-alerts?token=<jwt_token>`
- **消息格式**:

```json
{
  "type": "ALERT_NOTIFICATION",
  "data": {
    "alertId": "alert-new-001",
    "alertLevel": "CRITICAL",
    "alertTitle": "关键控制逾期未执行",
    "alertContent": "风险管理部的'双人复核'控制已逾期3天未执行",
    "createdAt": "2026-08-06T10:00:00Z"
  }
}
```

---

### 模块五：控制有效性评价 API（/api/v1/ic-evaluation）

##### 9.2.22 评价计划管理

##### 2.2.22.1 评价计划列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/plans`
- **请求参数** (Query): 分页参数 + 通用过滤参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planStatus | String | 否 | DRAFT/SUBMITTED/APPROVED/IN_PROGRESS/COMPLETED/CLOSED |
| evaluationType | String | 否 | ANNUAL/SEMI_ANNUAL/QUARTERLY/AD_HOC |
| evaluationYear | Integer | 否 | 评价年度 |

- **权限要求**: `ic:evaluation:plan:view`

##### 2.2.22.2 创建评价计划

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/plans`
- **请求参数** (Body):

```json
{
  "planName": "2026年度内部控制有效性评价",
  "evaluationType": "ANNUAL",
  "evaluationYear": 2026,
  "startDate": "2026-01-01",
  "endDate": "2026-12-31",
  "evaluationStage": "PLANNING",
  "responsiblePerson": "user-uuid",
  "teamMembers": ["user-001", "user-002", "user-003"],
  "description": "根据监管要求开展年度内控评价",
  "referenceRegulations": ["doc-001"]
}
```

- **权限要求**: `ic:evaluation:plan:create`

##### 2.2.22.3 提交审批

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/submit`
- **权限要求**: `ic:evaluation:plan:submit`
- **错误码**: 60001（计划状态不允许提交）

##### 2.2.22.4 审批通过/驳回

- **方法**: `PUT`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/approve`
- **请求参数** (Body):

```json
{
  "approvalResult": "APPROVED",
  "approvalComment": "评价范围合理，同意执行"
}
```

- **权限要求**: `ic:evaluation:plan:approve`

---

##### 9.2.23 评价范围管理

##### 2.2.23.1 设置评价范围

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/scope`
- **请求参数** (Body):

```json
{
  "orgScope": {
    "type": "INCLUDE",
    "orgIds": ["org-001", "org-002"]
  },
  "processScope": {
    "type": "INCLUDE",
    "processIds": ["proc-001", "proc-002"]
  },
  "controlScope": {
    "type": "FILTER",
    "includeKeyControls": true,
    "includeNonKeyControls": false
  },
  "samplingStrategy": "STRATIFIED",
  "coverageTarget": 80
}
```

- **权限要求**: `ic:evaluation:scope:edit`

##### 2.2.23.2 获取评价范围

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/scope`
- **响应结构**: 返回范围配置 + 覆盖统计
- **权限要求**: `ic:evaluation:scope:view`

---

##### 9.2.24 测试方案管理

##### 2.2.24.1 创建测试方案

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/test-plans`
- **请求参数** (Body):

```json
{
  "testPlanName": "贷款审批流程控制测试方案",
  "processId": "proc-001",
  "controlIds": ["ctrl-001", "ctrl-002"],
  "testMethods": ["INQUIRY", "OBSERVATION", "REPERFORMANCE"],
  "sampleSize": 30,
  "samplingMethod": "RANDOM",
  "testPeriod": {"startDate": "2026-01-01", "endDate": "2026-06-30"},
  "assignedTo": "user-001"
}
```

- **权限要求**: `ic:evaluation:testplan:create`

##### 2.2.24.2 触发 AI 生成测试方案

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/test-plans/ai-generate`
- **请求参数** (Body):

```json
{
  "processIds": ["proc-001"],
  "controlIds": ["ctrl-001"],
  "includeMethods": true,
  "includeSampling": true
}
```

- **响应结构**: 返回生成任务 ID
- **权限要求**: `ic:evaluation:testplan:ai:generate`
- **错误码**: 60002（AI 服务不可用）

##### 2.2.24.3 查询 AI 生成结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/test-plans/ai-generate/{taskId}/result`
- **权限要求**: `ic:evaluation:testplan:ai:generate:view`

---

##### 9.2.25 测试底稿管理

##### 2.2.25.1 创建/获取测试底稿

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/test-plans/{testPlanId}/worksheets`
- **响应结构**: 底稿列表，每项含底稿 ID、控制名称、测试状态、填写人、填写进度
- **权限要求**: `ic:evaluation:worksheet:view`

##### 2.2.25.2 填写测试底稿

- **方法**: `PUT`
- **路径**: `/api/v1/ic-evaluation/test-plans/{testPlanId}/worksheets/{worksheetId}`
- **请求参数** (Body):

```json
{
  "testSteps": [
    {
      "stepNumber": 1,
      "testProcedure": "检查2026年1-6月贷款审批记录",
      "sampleDescription": "随机抽取30笔贷款审批",
      "testResult": "PASS",
      "finding": "所有样本均执行了双人复核",
      "exceptionDescription": null,
      "attachments": ["file-id-001", "file-id-002"]
    }
  ],
  "overallConclusion": "控制有效",
  "effectivenessRating": "EFFECTIVE",
  "reviewerId": "user-002"
}
```

- **权限要求**: `ic:evaluation:worksheet:fill`

##### 2.2.25.3 AI 辅助填充底稿

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/test-plans/{testPlanId}/worksheets/{worksheetId}/ai-assist`
- **请求参数** (Body):

```json
{
  "assistType": "SUGGEST_PROCEDURE",
  "context": {"controlId": "ctrl-001", "controlDescription": "双人复核机制"}
}
```

- **响应结构**: 返回 AI 建议的测试步骤、抽样方法等
- **权限要求**: `ic:evaluation:worksheet:fill`

---

##### 9.2.26 抽样管理

##### 2.2.26.1 生成抽样方案

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/samples/generate`
- **请求参数** (Body):

```json
{
  "testPlanId": "testplan-001",
  "population": {
    "type": "TRANSACTION",
    "queryConditions": {"dateRange": {"start": "2026-01-01", "end": "2026-06-30"}, "amountMin": 500000}
  },
  "samplingMethod": "MONETARY_UNIT",
  "sampleSize": 30,
  "confidenceLevel": 95,
  "tolerableErrorRate": 5
}
```

- **响应结构**: 返回抽样结果（样本列表、抽样参数、代表性指标）
- **权限要求**: `ic:evaluation:sample:generate`

##### 2.2.26.2 查询抽样结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/samples/{sampleId}`
- **权限要求**: `ic:evaluation:sample:view`

---

##### 9.2.27 测试结果管理

##### 2.2.27.1 汇总测试结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/test-results/summary`
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "totalControls": 50,
    "testedControls": 48,
    "effectiveControls": 40,
    "ineffectiveControls": 5,
    "partialEffectiveControls": 3,
    "untestedControls": 2,
    "effectivenessRate": 83.3,
    "byOrg": [
      {"orgId": "org-001", "orgName": "风险管理部", "effectivenessRate": 90},
      {"orgId": "org-002", "orgName": "信贷管理部", "effectivenessRate": 78}
    ],
    "byProcess": [],
    "majorFindings": [
      {"controlId": "ctrl-005", "finding": "抽样发现3笔交易未执行复核", "severity": "HIGH"}
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:evaluation:result:view`

##### 2.2.27.2 导出测试结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/test-results/export`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| format | String | 是 | XLSX/PDF |

- **响应**: 文件流
- **权限要求**: `ic:evaluation:result:export`

---

##### 9.2.28 评价报告生成

##### 2.2.28.1 生成评价报告

- **方法**: `POST`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/report/generate`
- **请求参数** (Body):

```json
{
  "reportTemplate": "ANNUAL_EVALUATION",
  "includeSections": ["EXECUTIVE_SUMMARY", "SCOPE", "METHODOLOGY", "FINDINGS", "CONCLUSION", "RECOMMENDATIONS"],
  "generateType": "AI"
}
```

- **响应结构**: 返回报告生成任务 ID
- **权限要求**: `ic:evaluation:report:generate`
- **错误码**: 60003（报告生成失败）、60004（AI 服务不可用）

##### 2.2.28.2 查询/下载评价报告

- **方法**: `GET`
- **路径**: `/api/v1/ic-evaluation/plans/{planId}/report`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| format | String | 否 | DOCX/PDF，默认 PDF |
| download | Boolean | 否 | 是否直接下载，默认 false（返回预览） |

- **权限要求**: `ic:evaluation:report:view`

---

### 模块六：缺陷整改 API（/api/v1/ic-deficiency）

##### 9.2.29 缺陷登记与分类

##### 2.2.29.1 缺陷列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-deficiency/deficiencies`
- **请求参数** (Query): 分页参数 + 通用过滤参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| severity | String | 否 | CRITICAL/MAJOR/MINOR/OBSERVATION |
| deficiencyStatus | String | 否 | OPEN/ANALYZING/RECTIFYING/VERIFYING/CLOSED |
| source | String | 否 | EVALUATION/AUDIT/SELF_CHECK/EXTERNAL_AUDIT/REGULATORY |
| orgId | String | 否 | 所属组织 |
| overdueOnly | Boolean | 否 | 仅查询逾期 |

- **权限要求**: `ic:deficiency:view`

##### 2.2.29.2 登记缺陷

- **方法**: `POST`
- **路径**: `/api/v1/ic-deficiency/deficiencies`
- **请求参数** (Body):

```json
{
  "deficiencyTitle": "贷款审批流程缺少关键复核环节",
  "severity": "MAJOR",
  "source": "EVALUATION",
  "sourceRefId": "eval-plan-001",
  "discoveryDate": "2026-08-06",
  "orgId": "org-dept-001",
  "processId": "proc-001",
  "relatedControlId": "ctrl-005",
  "description": "在2026年度内控评价中发现...",
  "impactDescription": "可能导致贷款审批不合规",
  "attachments": ["file-id-001"]
}
```

- **权限要求**: `ic:deficiency:create`

##### 2.2.29.3 缺陷详情

- **方法**: `GET`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}`
- **响应结构**: 缺陷完整信息 + 分析结果 + 整改方案 + 整改历史
- **权限要求**: `ic:deficiency:view`

##### 2.2.29.4 缺陷状态流转

- **方法**: `PUT`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}/transition`
- **请求参数** (Body):

```json
{
  "targetStatus": "ANALYZING",
  "transitionComment": "已确认缺陷，进入根因分析阶段",
  "operatorId": "user-uuid"
}
```

- **权限要求**: `ic:deficiency:transition`
- **错误码**: 70001（不合法的状态流转）

---

##### 9.2.30 AI 根因分析

##### 2.2.30.1 触发 AI 根因分析

- **方法**: `POST`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}/ai/root-cause`
- **请求参数** (Body):

```json
{
  "analysisDepth": "DEEP",
  "includeProcessAnalysis": true,
  "includeControlAnalysis": true,
  "includeOrgAnalysis": true
}
```

- **响应结构**: 返回分析任务 ID
- **权限要求**: `ic:deficiency:ai:analyze`
- **错误码**: 70002（AI 服务不可用）

##### 2.2.30.2 查询分析结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}/ai/root-cause/{taskId}/result`
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task-uuid",
    "status": "COMPLETED",
    "rootCauses": [
      {
        "causeDescription": "人员培训不足导致对复核要求理解不到位",
        "causeCategory": "PEOPLE",
        "confidence": 0.85,
        "evidence": "近6个月培训记录显示...",
        "relatedFactors": ["培训覆盖率仅60%", "岗位SOP未更新"]
      },
      {
        "causeDescription": "系统缺少强制复核流程控制",
        "causeCategory": "SYSTEM",
        "confidence": 0.92,
        "evidence": "系统日志显示可通过跳过按钮绕过复核",
        "relatedFactors": ["系统权限设置不完善", "审批流程配置缺陷"]
      }
    ],
    "fishboneDiagram": {
      "categories": ["PEOPLE", "PROCESS", "SYSTEM", "ENVIRONMENT"],
      "items": []
    },
    "recommendedActions": [
      {"action": "加强岗位培训", "targetCause": "PEOPLE", "priority": "HIGH"},
      {"action": "系统强制复核流程改造", "targetCause": "SYSTEM", "priority": "CRITICAL"}
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:deficiency:ai:analyze:view`

---

##### 9.2.31 整改方案管理

##### 2.2.31.1 创建整改方案

- **方法**: `POST`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}/rectification-plans`
- **请求参数** (Body):

```json
{
  "planName": "贷款审批流程复核机制整改方案",
  "rectificationApproach": "SYSTEM_UPGRADE",
  "description": "通过系统改造增加强制复核节点...",
  "plannedStartDate": "2026-08-15",
  "plannedEndDate": "2026-09-30",
  "estimatedCost": 50000,
  "responsibleDept": "org-dept-001",
  "responsiblePerson": "user-uuid",
  "tasks": [
    {
      "taskName": "需求分析与方案设计",
      "assignee": "user-001",
      "plannedStartDate": "2026-08-15",
      "plannedEndDate": "2026-08-25",
      "priority": "HIGH"
    },
    {
      "taskName": "系统开发与测试",
      "assignee": "user-002",
      "plannedStartDate": "2026-08-26",
      "plannedEndDate": "2026-09-20",
      "priority": "HIGH"
    }
  ]
}
```

- **权限要求**: `ic:deficiency:rectify:plan:create`

##### 2.2.31.2 AI 生成整改方案建议

- **方法**: `POST`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}/rectification-plans/ai-suggest`
- **权限要求**: `ic:deficiency:rectify:plan:ai:suggest`

---

##### 9.2.32 整改任务分配与跟踪

##### 2.2.32.1 整改任务列表

- **方法**: `GET`
- **路径**: `/api/v1/ic-deficiency/rectification-tasks`
- **请求参数** (Query): 分页参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| taskStatus | String | 否 | PENDING/IN_PROGRESS/COMPLETED/OVERDUE |
| assigneeId | String | 否 | 负责人 ID |
| priority | String | 否 | HIGH/MEDIUM/LOW |
| overdueOnly | Boolean | 否 | 仅查询逾期 |

- **权限要求**: `ic:deficiency:rectify:task:view`

##### 2.2.32.2 更新任务进度

- **方法**: `PUT`
- **路径**: `/api/v1/ic-deficiency/rectification-tasks/{taskId}/progress`
- **请求参数** (Body):

```json
{
  "progressPercent": 60,
  "status": "IN_PROGRESS",
  "progressRemark": "已完成需求评审，进入开发阶段",
  "actualStartDate": "2026-08-15"
}
```

- **权限要求**: `ic:deficiency:rectify:task:update`

##### 2.2.32.3 完成任务

- **方法**: `PUT`
- **路径**: `/api/v1/ic-deficiency/rectification-tasks/{taskId}/complete`
- **请求参数** (Body):

```json
{
  "completionRemark": "系统改造已完成并上线",
  "actualEndDate": "2026-09-18",
  "attachments": ["file-id-001"]
}
```

- **权限要求**: `ic:deficiency:rectify:task:complete`

---

##### 9.2.33 整改验证管理

##### 2.2.33.1 创建验证任务

- **方法**: `POST`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}/verifications`
- **请求参数** (Body):

```json
{
  "verificationMethod": "REPERFORMANCE",
  "verifierId": "user-003",
  "verificationScope": "验证贷款审批流程中复核机制是否已生效",
  "sampleCount": 20,
  "plannedDate": "2026-09-25"
}
```

- **权限要求**: `ic:deficiency:verify:create`

##### 2.2.33.2 提交验证结果

- **方法**: `PUT`
- **路径**: `/api/v1/ic-deficiency/verifications/{verificationId}/submit`
- **请求参数** (Body):

```json
{
  "verificationResult": "PASS",
  "verificationConclusion": "抽查20笔贷款审批，均执行了强制复核，整改有效",
  "sampleDetails": [{"sampleId": "S001", "result": "PASS", "remark": "..."}],
  "attachments": ["file-id-001"]
}
```

- **权限要求**: `ic:deficiency:verify:submit`
- **错误码**: 70003（验证已超期）

##### 2.2.33.3 关闭缺陷

- **方法**: `POST`
- **路径**: `/api/v1/ic-deficiency/deficiencies/{deficiencyId}/close`
- **请求参数** (Body):

```json
{
  "closeReason": "整改已完成并通过验证",
  "closeApprover": "user-admin",
  "finalEffectivenessAssessment": "整改后的控制措施运行有效"
}
```

- **权限要求**: `ic:deficiency:close`
- **错误码**: 70004（存在未完成的整改任务不可关闭）

---

##### 9.2.34 整改看板数据

##### 2.2.34.1 获取看板数据

- **方法**: `GET`
- **路径**: `/api/v1/ic-deficiency/dashboard`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orgId | String | 否 | 组织筛选 |

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "overview": {
      "totalDeficiencies": 45,
      "openDeficiencies": 12,
      "rectifyingDeficiencies": 18,
      "closedDeficiencies": 15,
      "overdueDeficiencies": 5,
      "closureRate": 33.3,
      "avgRectificationDays": 45
    },
    "bySeverity": {
      "CRITICAL": {"total": 3, "open": 1, "rectifying": 2, "closed": 0},
      "MAJOR": {"total": 15, "open": 5, "rectifying": 7, "closed": 3},
      "MINOR": {"total": 27, "open": 6, "rectifying": 9, "closed": 12}
    },
    "byOrg": [
      {"orgId": "org-001", "orgName": "风险管理部", "total": 8, "open": 2, "overdue": 1}
    ],
    "trendData": [
      {"month": "2026-01", "newDeficiencies": 5, "closedDeficiencies": 3, "backlog": 2},
      {"month": "2026-02", "newDeficiencies": 3, "closedDeficiencies": 4, "backlog": 1}
    ],
    "overdueTasks": [
      {"taskId": "task-001", "taskName": "需求分析", "dueDate": "2026-08-01", "overdueDays": 5}
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:deficiency:dashboard:view`

---

### 模块七：流程优化 API（/api/v1/ic-process-opt）

##### 9.2.35 流程建模

##### 2.2.35.1 获取流程模型

- **方法**: `GET`
- **路径**: `/api/v1/ic-process-opt/models/{processId}`
- **响应结构**: 返回 BPMN 2.0 XML 格式的流程模型数据 + 节点列表 + 连线列表
- **权限要求**: `ic:process:opt:model:view`

##### 2.2.35.2 保存流程模型

- **方法**: `PUT`
- **路径**: `/api/v1/ic-process-opt/models/{processId}`
- **请求参数** (Body):

```json
{
  "bpmnXml": "<?xml version=\"1.0\"...",
  "nodes": [
    {
      "nodeId": "node-001",
      "nodeName": "贷款申请",
      "nodeType": "START_EVENT",
      "x": 100, "y": 200
    }
  ],
  "edges": [
    {"edgeId": "edge-001", "sourceNodeId": "node-001", "targetNodeId": "node-002"}
  ],
  "version": 3,
  "changeDescription": "新增合规审查节点"
}
```

- **权限要求**: `ic:process:opt:model:update`
- **错误码**: 80001（版本冲突，请刷新后重试）

##### 2.2.35.3 版本历史

- **方法**: `GET`
- **路径**: `/api/v1/ic-process-opt/models/{processId}/versions`
- **权限要求**: `ic:process:opt:model:view`

##### 2.2.35.4 版本回滚

- **方法**: `POST`
- **路径**: `/api/v1/ic-process-opt/models/{processId}/versions/{versionId}/rollback`
- **权限要求**: `ic:process:opt:model:update`

---

##### 9.2.36 流程风险点标注

##### 2.2.36.1 获取风险点标注

- **方法**: `GET`
- **路径**: `/api/v1/ic-process-opt/models/{processId}/risk-annotations`
- **响应结构**: 标注列表，每项含标注 ID、位置坐标、关联风险 ID、风险等级、标注说明
- **权限要求**: `ic:process:opt:annotation:view`

##### 2.2.36.2 添加风险点标注

- **方法**: `POST`
- **路径**: `/api/v1/ic-process-opt/models/{processId}/risk-annotations`
- **请求参数** (Body):

```json
{
  "nodeId": "node-003",
  "riskId": "risk-001",
  "annotationText": "该节点存在信用评估偏差风险",
  "position": {"x": 150, "y": 300}
}
```

- **权限要求**: `ic:process:opt:annotation:create`

##### 2.2.36.3 删除标注

- **方法**: `DELETE`
- **路径**: `/api/v1/ic-process-opt/models/{processId}/risk-annotations/{annotationId}`
- **权限要求**: `ic:process:opt:annotation:delete`

---

##### 9.2.37 AI 流程分析

##### 2.2.37.1 触发 AI 流程分析

- **方法**: `POST`
- **路径**: `/api/v1/ic-process-opt/ai/analyze`
- **请求参数** (Body):

```json
{
  "processId": "proc-001",
  "analysisTypes": ["BOTTLENECK", "RISK_GAP", "EFFICIENCY", "COMPLIANCE"],
  "includeHistoricalData": true
}
```

- **响应结构**: 返回分析任务 ID
- **权限要求**: `ic:process:opt:ai:analyze`
- **错误码**: 80002（AI 服务不可用）

##### 2.2.37.2 查询 AI 分析结果

- **方法**: `GET`
- **路径**: `/api/v1/ic-process-opt/ai/analyze/{taskId}/result`
- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task-uuid",
    "status": "COMPLETED",
    "bottleneckAnalysis": [
      {
        "nodeId": "node-005",
        "nodeName": "信贷审批",
        "avgProcessingTime": 72,
        "sla": 48,
        "bottleneckSeverity": "HIGH",
        "suggestion": "建议引入自动审批规则，对低风险申请实现秒批"
      }
    ],
    "riskGapAnalysis": [
      {
        "nodeId": "node-003",
        "nodeName": "贷前调查",
        "existingControls": ["客户信息核验"],
        "missingControls": ["反欺诈筛查", "黑名单比对"],
        "riskLevel": "HIGH"
      }
    ],
    "efficiencyAnalysis": {
      "overallScore": 65,
      "redundantNodes": ["node-007"],
      "automationOpportunities": ["node-002", "node-005"]
    },
    "complianceAnalysis": {
      "score": 80,
      "nonCompliantItems": [
        {"nodeId": "node-005", "regulation": "《商业银行法》第35条", "gap": "缺少书面审批记录要求"}
      ]
    }
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:process:opt:ai:analyze:view`

---

##### 9.2.38 优化方案管理

##### 2.2.38.1 创建优化方案

- **方法**: `POST`
- **路径**: `/api/v1/ic-process-opt/optimization-plans`
- **请求参数** (Body):

```json
{
  "planName": "贷款审批流程优化方案",
  "processId": "proc-001",
  "sourceType": "AI_ANALYSIS",
  "sourceRefId": "task-001",
  "optimizationItems": [
    {
      "itemType": "NODE_ADD",
      "nodeId": null,
      "description": "在贷前调查后增加反欺诈筛查节点",
      "expectedBenefit": "降低欺诈风险30%",
      "implementationEffort": "MEDIUM",
      "priority": "HIGH"
    }
  ],
  "expectedBenefits": "预计整体流程效率提升20%，风险覆盖度提升15%",
  "risksAndMitigations": "新增节点可能导致处理时间增加，需配置SLA监控",
  "approvers": ["user-001"]
}
```

- **权限要求**: `ic:process:opt:plan:create`

##### 2.2.38.2 优化方案审批流转

- **方法**: `PUT`
- **路径**: `/api/v1/ic-process-opt/optimization-plans/{planId}/approve`
- **权限要求**: `ic:process:opt:plan:approve`

##### 2.2.38.3 优化方案实施跟踪

- **方法**: `PUT`
- **路径**: `/api/v1/ic-process-opt/optimization-plans/{planId}/implementation`
- **请求参数** (Body):

```json
{
  "status": "IMPLEMENTING",
  "progressPercent": 50,
  "items": [
    {"itemId": "opt-item-001", "status": "COMPLETED", "actualEffort": "5人天"},
    {"itemId": "opt-item-002", "status": "IN_PROGRESS", "actualEffort": null}
  ]
}
```

- **权限要求**: `ic:process:opt:plan:implement`

---

### 模块八：驾驶舱 API（/api/v1/ic-dashboard）

##### 9.2.39 内控健康度指标

##### 2.2.39.1 获取健康度总览

- **方法**: `GET`
- **路径**: `/api/v1/ic-dashboard/health`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orgId | String | 否 | 组织筛选 |
| period | String | 否 | 统计周期 |

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "overallScore": 82.5,
    "scoreTrend": "UP",
    "scoreChange": 3.2,
    "dimensions": [
      {
        "dimensionName": "控制环境",
        "score": 85,
        "weight": 20,
        "trend": "STABLE",
        "subIndicators": [
          {"name": "制度覆盖率", "value": 95, "target": 100},
          {"name": "组织完整性", "value": 90, "target": 100}
        ]
      },
      {
        "dimensionName": "风险评估",
        "score": 78,
        "weight": 20,
        "trend": "UP",
        "subIndicators": [
          {"name": "风险识别覆盖率", "value": 85, "target": 90},
          {"name": "评估及时率", "value": 75, "target": 95}
        ]
      },
      {
        "dimensionName": "控制活动",
        "score": 83,
        "weight": 25,
        "trend": "UP",
        "subIndicators": [
          {"name": "控制执行率", "value": 88, "target": 95},
          {"name": "控制有效性", "value": 80, "target": 90}
        ]
      },
      {
        "dimensionName": "信息与沟通",
        "score": 90,
        "weight": 15,
        "trend": "STABLE"
      },
      {
        "dimensionName": "监督评价",
        "score": 76,
        "weight": 20,
        "trend": "DOWN",
        "subIndicators": [
          {"name": "评价覆盖率", "value": 70, "target": 85},
          {"name": "缺陷整改率", "value": 65, "target": 90}
        ]
      }
    ],
    "lastUpdateTime": "2026-08-06T08:00:00Z"
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:dashboard:health:view`

##### 2.2.39.2 健康度历史趋势

- **方法**: `GET`
- **路径**: `/api/v1/ic-dashboard/health/trend`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | String | 是 | 开始日期 |
| endDate | String | 是 | 结束日期 |
| granularity | String | 否 | MONTHLY/QUARTERLY |
| dimension | String | 否 | 指定维度，不传则返回综合评分 |

- **权限要求**: `ic:dashboard:health:view`

---

##### 9.2.40 风险态势数据

##### 2.2.40.1 风险态势概览

- **方法**: `GET`
- **路径**: `/api/v1/ic-dashboard/risk-landscape`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orgId | String | 否 | 组织筛选 |

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "riskDistribution": {
      "byLevel": {"HIGH": 23, "MEDIUM": 67, "LOW": 66},
      "byCategory": [
        {"categoryName": "信用风险", "count": 45, "highCount": 8},
        {"categoryName": "操作风险", "count": 38, "highCount": 6}
      ]
    },
    "riskChange": {
      "newRisksThisMonth": 5,
      "escalatedRisks": 3,
      "mitigatedRisks": 7,
      "netChange": -2
    },
    "kriStatus": {
      "total": 25,
      "normal": 18,
      "warning": 5,
      "critical": 2
    },
    "topRisks": [
      {"riskId": "risk-001", "riskName": "信用评估偏差", "riskLevel": "HIGH", "trend": "UP", "lastAssessmentScore": 85}
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:dashboard:risk:view`

---

##### 9.2.41 趋势分析数据

##### 2.2.41.1 获取趋势分析

- **方法**: `GET`
- **路径**: `/api/v1/ic-dashboard/trends`
- **请求参数** (Query):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| metrics | String[] | 是 | 指标列表：HEALTH_SCORE/RISK_COUNT/DEFICIENCY_COUNT/EXECUTION_RATE/EFFECTIVENESS_RATE |
| startDate | String | 是 | 开始日期 |
| endDate | String | 是 | 结束日期 |
| granularity | String | 否 | MONTHLY/QUARTERLY |
| orgId | String | 否 | 组织筛选 |

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "series": [
      {
        "metric": "HEALTH_SCORE",
        "metricName": "内控健康度",
        "unit": "分",
        "dataPoints": [
          {"period": "2026-01", "value": 78},
          {"period": "2026-02", "value": 80},
          {"period": "2026-03", "value": 79}
        ]
      },
      {
        "metric": "RISK_COUNT",
        "metricName": "风险总数",
        "unit": "个",
        "dataPoints": [
          {"period": "2026-01", "value": 150},
          {"period": "2026-02", "value": 148},
          {"period": "2026-03", "value": 152}
        ]
      }
    ]
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ic:dashboard:trend:view`

---

##### 9.2.42 报告生成

##### 2.2.42.1 触发报告生成

- **方法**: `POST`
- **路径**: `/api/v1/ic-dashboard/reports/generate`
- **请求参数** (Body):

```json
{
  "reportType": "MONTHLY_INTERNAL_CONTROL",
  "reportPeriod": "2026-07",
  "orgId": "org-root",
  "sections": ["HEALTH_OVERVIEW", "RISK_LANDSCAPE", "CONTROL_EXECUTION", "DEFICIENCY_SUMMARY", "KRI_MONITORING"],
  "format": "PDF",
  "generateBy": "AI"
}
```

- **响应结构**: 返回报告生成任务 ID
- **权限要求**: `ic:dashboard:report:generate`

##### 2.2.42.2 下载报告

- **方法**: `GET`
- **路径**: `/api/v1/ic-dashboard/reports/{reportId}/download`
- **响应**: 文件流
- **权限要求**: `ic:dashboard:report:view`

##### 2.2.42.3 报告历史

- **方法**: `GET`
- **路径**: `/api/v1/ic-dashboard/reports`
- **权限要求**: `ic:dashboard:report:view`

---

### 模块九：AI Copilot API（/api/v1/ai-copilot）

##### 9.2.43 对话会话管理

##### 2.2.43.1 创建会话

- **方法**: `POST`
- **路径**: `/api/v1/ai-copilot/conversations`
- **请求参数** (Body):

```json
{
  "title": "关于贷款审批流程风险咨询",
  "contextType": "RISK_ANALYSIS",
  "contextRefId": "risk-001",
  "systemPrompt": "你是一个内控专家，请基于COSO框架回答用户问题"
}
```

- **响应结构**: 返回会话 ID
- **权限要求**: `ai:copilot:conversation:create`

##### 2.2.43.2 获取会话列表

- **方法**: `GET`
- **路径**: `/api/v1/ai-copilot/conversations`
- **请求参数** (Query): 分页参数 +

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| contextType | String | 否 | 会话场景类型 |
| keyword | String | 否 | 搜索标题关键词 |

- **权限要求**: `ai:copilot:conversation:view`

##### 2.2.43.3 删除会话

- **方法**: `DELETE`
- **路径**: `/api/v1/ai-copilot/conversations/{conversationId}`
- **权限要求**: `ai:copilot:conversation:delete`

##### 2.2.43.4 重命名会话

- **方法**: `PUT`
- **路径**: `/api/v1/ai-copilot/conversations/{conversationId}`
- **请求参数** (Body):

```json
{
  "title": "新标题"
}
```

- **权限要求**: `ai:copilot:conversation:update`

---

##### 9.2.44 消息发送（流式 SSE）

##### 2.2.44.1 发送消息（流式响应）

- **方法**: `POST`
- **路径**: `/api/v1/ai-copilot/conversations/{conversationId}/messages`
- **请求参数** (Body):

```json
{
  "content": "请分析当前贷款审批流程中存在的主要风险点",
  "messageType": "TEXT",
  "attachments": [],
  "enableWebSearch": false,
  "enableKnowledgeBase": true,
  "knowledgeBaseIds": ["kb-regulations", "kb-processes"],
  "agentType": "RISK_IDENTIFY"
}
```

- **响应**: `Content-Type: text/event-stream` (SSE 流)

**SSE 事件类型**：

| 事件类型 | 说明 | 数据格式 |
|----------|------|----------|
| `message` | 文本增量 | `{"content": "根据COSO框架分析...", "messageId": "msg-001"}` |
| `citation` | 知识引用 | `{"sourceId": "doc-001", "sourceName": "内部控制指引", "paragraph": "第12条", "relevanceScore": 0.92}` |
| `action` | 建议操作 | `{"actionType": "CREATE_RISK", "actionLabel": "创建风险项", "payload": {"riskName": "..."}}` |
| `thinking` | 思考过程 | `{"content": "正在分析贷款审批流程..."}` |
| `error` | 错误 | `{"code": 90001, "message": "AI 服务超时"}` |
| `done` | 完成 | `{"messageId": "msg-001", "totalTokens": 1500, "citations": [...]}` |

- **权限要求**: `ai:copilot:message:send`
- **错误码**: 90001（AI 服务超时）、90002（知识库不可用）

##### 2.2.44.2 停止生成

- **方法**: `POST`
- **路径**: `/api/v1/ai-copilot/conversations/{conversationId}/messages/stop`
- **权限要求**: `ai:copilot:message:send`

---

##### 9.2.45 历史对话查询

##### 2.2.45.1 获取对话消息列表

- **方法**: `GET`
- **路径**: `/api/v1/ai-copilot/conversations/{conversationId}/messages`
- **请求参数** (Query): 分页参数
- **响应结构**: 消息列表，每项含消息 ID、角色（user/assistant）、内容、引用来源、时间戳、Token 用量
- **权限要求**: `ai:copilot:conversation:view`

##### 2.2.45.2 反馈消息

- **方法**: `POST`
- **路径**: `/api/v1/ai-copilot/messages/{messageId}/feedback`
- **请求参数** (Body):

```json
{
  "feedbackType": "THUMBS_UP",
  "comment": "回答准确",
  "rating": 5
}
```

- **权限要求**: `ai:copilot:message:feedback`

---

##### 9.2.46 知识库检索

##### 2.2.46.1 知识库搜索

- **方法**: `POST`
- **路径**: `/api/v1/ai-copilot/knowledge-base/search`
- **请求参数** (Body):

```json
{
  "query": "贷款审批流程中的关键控制点",
  "knowledgeBaseIds": ["kb-regulations", "kb-processes"],
  "topK": 5,
  "rerank": true,
  "filters": {
    "regulationType": "REGULATION",
    "publishDateStart": "2024-01-01"
  }
}
```

- **响应结构**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "results": [
      {
        "sourceId": "doc-001",
        "sourceName": "商业银行内部控制指引",
        "sourceType": "REGULATION",
        "chunkId": "chunk-001",
        "content": "商业银行应当建立健全贷款审批...",
        "relevanceScore": 0.95,
        "metadata": {
          "chapter": "第三章",
          "article": "第25条",
          "publishDate": "2024-06-01"
        }
      }
    ],
    "totalHits": 23,
    "searchTime": 0.35
  },
  "timestamp": 1691234567890,
  "requestId": "uuid-string"
}
```

- **权限要求**: `ai:copilot:kb:search`

##### 2.2.46.2 知识库管理 - 列表

- **方法**: `GET`
- **路径**: `/api/v1/ai-copilot/knowledge-base`
- **权限要求**: `ai:copilot:kb:manage`

##### 2.2.46.3 创建知识库

- **方法**: `POST`
- **路径**: `/api/v1/ai-copilot/knowledge-base`
- **请求参数** (Body):

```json
{
  "name": "监管制度知识库",
  "description": "收录银行业监管制度文件",
  "embeddingModel": "text-embedding-3-large",
  "chunkSize": 1000,
  "chunkOverlap": 200
}
```

- **权限要求**: `ai:copilot:kb:manage`

---

##### 9.2.47 文档上传解析

##### 2.2.47.1 上传文档到知识库

- **方法**: `POST`
- **路径**: `/api/v1/ai-copilot/knowledge-base/{kbId}/documents`
- **请求参数** (Body multipart/form-data):

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 文档文件 |
| documentName | String | 否 | 自定义文档名，默认使用文件名 |
| tags | String[] | 否 | 标签 |
| autoSplit | Boolean | 否 | 是否自动分段，默认 true |

- **响应结构**: 返回文档 ID + 解析任务 ID
- **权限要求**: `ai:copilot:kb:manage`
- **错误码**: 90003（文档解析失败）、90004（文档已存在）

##### 2.2.47.2 查询文档解析状态

- **方法**: `GET`
- **路径**: `/api/v1/ai-copilot/knowledge-base/{kbId}/documents/{docId}/status`
- **权限要求**: `ai:copilot:kb:manage`

---

### 模块级错误码汇总

| 模块 | 错误码区间 | 典型错误码 |
|------|-----------|-----------|
| 内控体系管理 | 20001-20099 | 20001 组织不存在, 20002 父组织不存在, 20003 编码重复, 20006 文件格式不支持, 20010 文档已被引用 |
| 风险识别评估 | 30001-30099 | 30001 分类编码重复, 30003 风险名称重复, 30005 问卷已截止, 30006 AI 服务不可用 |
| 控制设计优化 | 40001-40099 | 40001 控制编码重复, 40002 控制已被引用, 40003 关联已存在, 40005 AI 服务不可用 |
| 控制执行监测 | 50001-50099 | 50001 计划已过期, 50002 文件格式不支持, 50003 证据重复 |
| 控制有效性评价 | 60001-60099 | 60001 状态不允许提交, 60002 AI 服务不可用, 60003 报告生成失败 |
| 缺陷整改 | 70001-70099 | 70001 不合法状态流转, 70002 AI 服务不可用, 70003 验证已超期, 70004 整改未完成不可关闭 |
| 流程优化 | 80001-80099 | 80001 版本冲突, 80002 AI 服务不可用 |
| AI Copilot | 90001-90099 | 90001 AI 服务超时, 90002 知识库不可用, 90003 文档解析失败 |

---

## 第十章：页面级交互设计

### 10.1 整体布局设计

#### 10.1.1 布局结构

```
+------------------------------------------------------------------+
|  顶部导航栏 (56px)                                                |
|  [Logo] [平台名称]  [全局搜索]  [通知] [AI Copilot开关] [用户头像]  |
+----------+--------------------------------------------------------+
| 左侧菜单  |  右侧内容区                                            |
| (240px)  |  +--------------------------------------------------+ |
|          |  |  面包屑 + 页面标题                                 | |
|          |  |  +----------------------------------------------+ | |
| [工作台]  |  |  |                                              | | |
| 内控体系  |  |  |     页面主体内容区                             | | |
|  - 组织架构|  |  |                                              | | |
|  - 制度文档|  |  |                                              | | |
|  - 流程目录|  |  |                                              | | |
| 风险识别  |  |  |                                              | | |
|  - 风险目录|  |  |                                              | | |
|  - 评估问卷|  |  +----------------------------------------------+ | |
|  - KRI指标 |  +--------------------------------------------------+ | |
| ...       |                                                         |
+----------+---------------------------------------------------------+ |
                                                                       |
  [AI Copilot 侧边栏 (380px，可收起)]                                  |
  +---------------------------------------------------------------+   |
  | [收起>>]  AI 内控助手                                          |   |
  | +-------------------------------------------------------------+ |  |
  | |                                                             | |  |
  | |  对话区域                                                    | |  |
  | |                                                             | |  |
  | +-------------------------------------------------------------+ |  |
  | [输入框]                                              [发送]   |   |
  +---------------------------------------------------------------+   |
+----------------------------------------------------------------------+
```

#### 10.1.2 设计原则

- **响应式**: 支持 1366px - 2560px 分辨率
- **主题**: 浅色/深色双主题
- **菜单收起**: 左侧菜单可收起至 64px 图标模式
- **AI 侧边栏**: 默认收起，点击顶部导航栏开关展开，可拖拽调整宽度（320px-480px）
- **全局搜索**: 支持搜索流程、风险、控制、制度、缺陷（Ctrl+K 快捷键）
- **通知中心**: 实时展示预警、待办、审批提醒

---

### 10.2 核心页面描述

---

#### 10.2.1 工作台首页

**页面目的**: 为内控专业人员提供一站式工作入口，快速掌握全局态势和处理待办事项。

**路由**: `/dashboard/workbench`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  工作台                                              [日期/时间]   |
+------------------------------------------------------------------+
|  +-------------------+  +-------------------+  +----------------+ |
|  | 待办任务 (卡片)    |  | 我的评价计划       |  | 风险概览        | |
|  |                   |  |                   |  |                 | |
|  | ● 待执行控制: 5   |  | 2026年度评价       |  | 高风险: 23      | |
|  | ● 待处理预警: 3   |  | 进度 45%          |  | 中风险: 67      | |
|  | ● 待填写底稿: 2   |  | Q3专项评价         |  | 低风险: 66      | |
|  | ● 待整改验证: 4   |  | 进度 20%          |  | 新增风险: +5    | |
|  |                   |  |                   |  |                 | |
|  | [查看全部 ->]     |  | [查看全部 ->]     |  | [热力图 ->]    | |
|  +-------------------+  +-------------------+  +----------------+ |
|                                                                   |
|  +-------------------------------+  +---------------------------+  |
|  | 快捷入口                      |  | 最近访问                   |  |
|  | [制度上传] [风险登记]          |  | ● 贷款审批流程 RCM 矩阵   |  |
|  | [控制配置] [缺陷登记]          |  | ● 2026年度评价计划         |  |
|  | [评估问卷] [流程建模]          |  | ● 信用风险目录             |  |
|  +-------------------------------+  +---------------------------+  |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | 内控健康度趋势 (迷你图表)                                      | |
|  | 近6个月: 78 → 80 → 79 → 82 → 83 → 82.5                       | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | 组织排名 TOP 5                                                | |
|  | 1. 风险管理部 (95%)  2. 信贷管理部 (88%)  3. 运营管理部 (85%)  | |
|  +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互元素 | 行为 | 触发条件 |
|----------|------|----------|
| 待办任务卡片 | 点击跳转对应模块列表页（带筛选条件） | 点击数字或标题 |
| 快捷入口 | 打开对应创建弹窗或跳转页面 | 点击按钮 |
| 风险概览卡片 | 数字高亮显示，高风险红色闪烁 | 存在 CRITICAL 预警时 |
| 健康度迷你图 | Hover 显示每月详情 Tooltip | 鼠标悬停 |
| 组织排名 | 点击组织名跳转该组织详情 | 点击行 |
| 通知角标 | 顶部导航栏显示未读数量红点 | 有新通知时 |

**数据来源**:

| 数据项 | API 接口 | 刷新策略 |
|--------|----------|----------|
| 待办任务统计 | `GET /api/v1/common/todo-stats` | 页面加载 + 5 分钟轮询 |
| 我的评价计划 | `GET /api/v1/ic-evaluation/plans?assigneeId=me&status=IN_PROGRESS` | 页面加载 |
| 风险概览 | `GET /api/v1/ic-dashboard/risk-landscape` | 页面加载 |
| 健康度趋势 | `GET /api/v1/ic-dashboard/health/trend` | 页面加载 |
| 组织排名 | `GET /api/v1/ic-monitor/dashboard/overview` (orgRankings) | 页面加载 |

**状态变化**:
- 页面初始化 → Loading 骨架屏 → 数据加载完成 → 渲染
- 待办数字实时更新（WebSocket 推送）
- 预警闪烁：从 `/api/v1/ws/monitor-alerts` 接收实时推送
- 无数据时显示空状态占位图

---

#### 10.2.2 制度文档管理页

**页面目的**: 管理内控相关的监管制度、内部政策、操作规程等文档的全生命周期。

**路由**: `/ic-system/regulations`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  制度文档管理                                                     |
+------------------------------------------------------------------+
|  [筛选栏]                                                         |
|  [搜索框] [制度类型 ▼] [发布机构 ▼] [生效状态 ▼] [解析状态 ▼]     |
|  [发布日期: ___ 至 ___]                          [上传文档] [批量导入] |
+------------------------------------------------------------------+
|  +--------------------------------------------------------------+ |
|  | 文档名称            | 类型     | 版本 | 状态   | 解析 | 操作   | |
|  |---------------------|----------|------|--------|------|--------| |
|  | 商业银行内部控制指引  | 法规     | v2.1 | 已生效  | ✅   | [详情] | |
|  | 贷款管理办法         | 制度     | v3.0 | 已生效  | ✅   | [详情] | |
|  | 反洗钱操作规程       | 规程     | v1.2 | 已生效  | ⏳   | [详情] | |
|  | ...                 |          |      |        |      |        | |
|  +--------------------------------------------------------------+ |
|  共 156 条记录                     [< 1 2 3 ... 8 >]  20条/页     |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 点击"上传文档" | 弹出上传弹窗：选择文件 → 填写元信息 → 确认上传 → 自动触发 AI 解析 |
| 上传进度 | 弹窗显示进度条，解析中显示 ⏳ 状态，完成后刷新列表 |
| 点击"详情" | 打开文档详情抽屉（右侧滑出） |
| 文档详情抽屉 | 显示：基本信息 + 版本列表 + 解析结果 + 关联流程 |
| 版本对比 | 在版本列表中选择两个版本 → 点击"对比" → 显示 Diff 视图 |
| AI 解析结果 | 结构化展示：摘要、关键要点、提取的控制点、提取的风险、关联制度 |
| 重新解析 | 点击"重新解析"按钮，触发异步任务 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 文档列表 | `GET /api/v1/ic-system/regulations` |
| 上传文档 | `POST /api/v1/ic-system/regulations/upload` |
| 解析结果 | `GET /api/v1/ic-system/regulations/{docId}/parse-result` (轮询至 COMPLETED) |
| 版本列表 | `GET /api/v1/ic-system/regulations/{docId}/versions` |
| 版本对比 | `GET /api/v1/ic-system/regulations/{docId}/versions/compare` |

**状态变化**:
- 解析状态：PENDING(灰) → PROCESSING(蓝+进度%) → COMPLETED(绿✅) / FAILED(红❌)
- 上传弹窗状态：选择文件 → 上传中 → 解析中 → 完成
- 列表筛选联动：选择筛选条件 → 自动刷新列表

---

#### 10.2.3 风险目录管理页

**页面目的**: 以树形结构展示风险分类体系，支持风险的全生命周期管理和详情查看。

**路由**: `/ic-risk/directory`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  风险目录管理                                   [+ 新建风险] [AI识别] |
+------------------------------------------------------------------+
|  +-------------------+  +---------------------------------------+  |
|  | 风险分类树        |  | 风险详情区                             |  |
|  |                   |  |                                       |  |
|  | ▼ 信用风险 (45)   |  | 风险名称: 贷款审批中的信用评估偏差      |  |
|  |   ● 违约风险      |  | 风险等级: [高] 状态: [活跃]            |  |
|  |   ● 集中度风险    |  |                                       |  |
|  | ▼ 操作风险 (38)   |  | [基本信息] [关联控制] [评估历史] [整改]  |  |
|  |   ● 内部欺诈      |  | -------------------------------------  |  |
|  |   ● 外部欺诈      |  | 分类: 信用风险 > 违约风险               |  |
|  |   ● 系统故障      |  | 描述: 在贷款审批环节，由于...           |  |
|  | ▼ 市场风险 (25)   |  | 触发事件: 信用评估模型参数更新           |  |
|  | ▼ 流动性风险 (20)  |  | 影响程度: 重大                          |  |
|  | ▼ 合规风险 (18)   |  | 可能性: 可能                            |  |
|  | ▼ 战略风险 (10)   |  | 关联流程: 贷款审批流程 (3个节点)        |  |
|  |                   |  | 识别来源: AI识别 | 识别时间: 2026-07-15 |  |
|  |                   |  |                                       |  |
|  |                   |  | [编辑] [删除] [关联控制] [发起评估]     |  |
|  +-------------------+  +---------------------------------------+  |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 树节点展开/折叠 | 点击箭头图标，展开显示子分类或风险项 |
| 点击风险项 | 右侧展示风险详情（含关联控制、评估历史） |
| 搜索筛选 | 支持按风险名称、编码、等级筛选 |
| 新建风险 | 弹出创建表单，选择分类 → 填写信息 → 保存 |
| AI 识别 | 触发 AI 风险识别 → 展示识别结果列表 → 确认/驳回/修改 |
| 关联控制 Tab | 展示当前关联的控制措施列表，支持添加/解除关联 |
| 评估历史 Tab | 时间线展示历次评估结果和风险等级变化 |
| 拖拽移动 | 支持将风险项拖拽到不同分类下（调整分类） |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 分类树 | `GET /api/v1/ic-risk/categories/tree?includeRiskCount=true` |
| 风险详情 | `GET /api/v1/ic-risk/risks/{riskId}` |
| AI 识别结果 | `POST /api/v1/ic-risk/ai/identify` → `GET /api/v1/ic-risk/ai/identify/{taskId}/result` |

**状态变化**:
- 树节点选中状态高亮
- 风险详情区 Loading → 数据渲染
- AI 识别结果弹窗：处理中 → 展示结果列表 → 逐条确认后创建风险

---

#### 10.2.4 风险热力图页

**页面目的**: 以可视化热力图形式展示风险分布，支持多维度分析和下钻。

**路由**: `/ic-risk/heatmap`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  风险热力图                                                       |
+------------------------------------------------------------------+
|  [维度: 按流程 ▼] [风险类型: 剩余风险 ▼] [组织: 全部 ▼] [刷新]    |
+------------------------------------------------------------------+
|  +--------------------------------------------------------------+ |
|  |                    风险热力图 (ECharts Heatmap)                 | |
|  |  影响程度 ↑                                                    | |
|  |  5 | 贷款审批  | 支付审批  |             | 资金调拨  |         | |
|  |  4 | 贷款审批  | 贷款审批  | 支付审批    |          |         | |
|  |  3 |           | 合同审批  | 贷款审批    |          |         | |
|  |  2 | 客户准入  |           | 合同审批    | 资金调拨 |         | |
|  |  1 | 客户准入  | 客户准入  |             |          |         | |
|  |    +-----------+-----------+-------------+----------+--------  | |
|  |      极少      较少        可能          很可能      几乎确定    | |
|  |                         发生可能性 →                           | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +---------------------------+  +------------------------------+   |
|  | 风险分布统计              |  | 高风险 Top 5                 |   |
|  | 高风险: 23 (15%)          |  | 1. 信用评估偏差 (H, 9.2)     |   |
|  | 中风险: 67 (43%)          |  | 2. 操作失误风险 (H, 8.5)     |   |
|  | 低风险: 66 (42%)          |  | 3. 审批越权风险 (H, 8.1)     |   |
|  | [饼图]                    |  | 4. 数据泄露风险 (H, 7.8)     |   |
|  |                           |  | 5. 资金挪用风险 (H, 7.5)     |   |
|  +---------------------------+  +------------------------------+   |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 维度切换 | 切换流程/组织/风险分类维度，热力图重新渲染 |
| 风险类型切换 | 切换固有风险/剩余风险视图 |
| 点击热力单元格 | 弹出下钻抽屉，展示该单元格下的具体风险列表 |
| Hover 热力单元格 | Tooltip 显示：流程名、风险数、高风险数、平均评分 |
| 高风险 Top 5 | 点击跳转风险详情页 |
| 饼图交互 | 点击扇区，热力图联动筛选对应等级 |
| 导出图片 | 点击"导出"按钮，将热力图导出为 PNG |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 热力图数据 | `GET /api/v1/ic-risk/heatmap` |
| 下钻数据 | `GET /api/v1/ic-risk/heatmap/drill-down` |

**状态变化**:
- 维度/类型/组织切换 → Loading 热力图 → 重新渲染
- 下钻抽屉：打开 → 加载风险列表 → 分页展示
- 无数据时热力图区域显示空状态

---

#### 10.2.5 RCM 矩阵管理页

**页面目的**: 以矩阵形式展示风险与控制措施的映射关系，管理关联并分析覆盖度。

**路由**: `/ic-control/rcm-matrix`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  RCM 矩阵管理                            [AI批量关联] [覆盖度分析]  |
+------------------------------------------------------------------+
|  [组织: 全部 ▼] [流程: 贷款审批 ▼] [风险分类: 全部 ▼]            |
+------------------------------------------------------------------+
|  覆盖度概览: 总计50个风险 | 已覆盖42个 | 未覆盖8个 | 覆盖率84%     |
+------------------------------------------------------------------+
|  +--------------------------------------------------------------+ |
|  | 风险\控制     | 双人复核 | 信用评分 | 额度控制 | 审批分级 | ...| |
|  |---------------+----------+----------+----------+----------+----| |
|  | 信用评估偏差   |    ✅    |    ✅    |          |          |    | |
|  | 审批越权       |          |          |    ✅    |    ✅    |    | |
|  | 操作失误       |    ✅    |          |          |          |    | |
|  | 数据泄露       |          |          |          |          | ❌ | |
|  | ...           |          |          |          |          |    | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  图例: ✅ 已关联(有效)  ⚠️ 已关联(待验证)  ❌ 未覆盖               |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 点击单元格 | 弹出关联操作菜单：建立关联/解除关联/查看详情 |
| 筛选条件变更 | 矩阵重新加载 |
| 点击"AI 批量关联" | 触发 AI 推荐 → 展示推荐列表 → 勾选确认 → 批量创建关联 |
| 点击"覆盖度分析" | 触发分析任务 → 加载中 → 展示覆盖度报告（含缺口清单和推荐） |
| Hover 风险名称 | Tooltip 显示风险等级、描述 |
| Hover 控制名称 | Tooltip 显示控制类型、频率、有效性评分 |
| 未覆盖风险 (❌) | 红色高亮，支持点击直接跳转创建控制 |
| 导出矩阵 | 支持导出为 Excel |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 矩阵数据 | `GET /api/v1/ic-control/rcm-matrix` |
| 编辑关联 | `POST /api/v1/ic-control/rcm-matrix/links` |
| AI 批量关联 | `POST /api/v1/ic-control/rcm-matrix/links/batch-ai` |
| 覆盖度分析 | `POST /api/v1/ic-control/coverage-analysis` → `GET /api/v1/ic-control/coverage-analysis/{taskId}/result` |

**状态变化**:
- 矩阵单元格状态：未关联(灰色) → 关联中(loading) → 已关联(绿色) / 待验证(黄色)
- AI 批量关联弹窗：分析中 → 展示推荐 → 用户勾选 → 批量创建 → 刷新矩阵
- 覆盖度分析弹窗：分析中进度条 → 结果展示(环形图 + 缺口列表)

---

#### 10.2.6 内控评价计划页

**页面目的**: 管理内控评价计划的创建、审批、执行和跟踪，以甘特图展示时间线。

**路由**: `/ic-evaluation/plans`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  内控评价计划                              [+ 新建计划] [AI生成方案] |
+------------------------------------------------------------------+
|  [状态: 全部 ▼] [年份: 2026 ▼] [类型: 全部 ▼] [搜索...]          |
+------------------------------------------------------------------+
|  +--------------------------------------------------------------+ |
|  | 甘特图视图 / 列表视图  [切换]                                  | |
|  |                                                              | |
|  | 计划名称                  | 1月  | 2月  | 3月  | ... | 12月 | |
|  |---------------------------|------|------|------|-----|------| |
|  | 2026年度内控评价 (执行中)  | ==== | ==== | ==== | === |      | |
|  |   ├─ 计划阶段             | ==   |      |      |     |      | |
|  |   ├─ 范围确定             |   == |      |      |     |      | |
|  |   ├─ 测试执行             |      | ==== | ==== | ==  |      | |
|  |   └─ 报告阶段             |      |      |      |  == |      | |
|  | Q2专项评价 (已完成)        |      | ==   | ==== |     |      | |
|  | Q4专项评价 (待审批)        |      |      |      |     | ==   | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | 状态统计卡片                                                  | |
|  | [草稿: 2] [待审批: 1] [审批通过: 0] [执行中: 1] [已完成: 3]    | |
|  +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 甘特图拖拽 | 调整计划时间范围（仅草稿状态） |
| 点击计划行 | 展开显示阶段子任务 |
| 点击"新建计划" | 弹出创建表单（含 AI 辅助生成选项） |
| 状态流转 | 草稿 → 提交审批 → 审批通过 → 执行中 → 已完成 → 关闭 |
| AI 生成方案 | 选择流程/控制范围 → AI 生成测试方案 → 确认后创建 |
| 点击已完成计划 | 跳转评价结果页 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 计划列表 | `GET /api/v1/ic-evaluation/plans` |
| 创建计划 | `POST /api/v1/ic-evaluation/plans` |
| 提交审批 | `POST /api/v1/ic-evaluation/plans/{planId}/submit` |
| AI 生成方案 | `POST /api/v1/ic-evaluation/plans/{planId}/test-plans/ai-generate` |

**状态变化**:
- 甘特图条形颜色：草稿(灰)、待审批(蓝)、执行中(橙)、已完成(绿)、已关闭(灰)
- 状态流转按钮根据当前状态动态显示可用操作
- 审批操作：弹窗展示审批意见输入 → 通过/驳回 → 列表刷新

---

#### 10.2.7 测试底稿填写页

**页面目的**: 为内控测试人员提供结构化的底稿填写界面，支持 AI 辅助填充和证据上传。

**路由**: `/ic-evaluation/worksheets/:worksheetId`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  < 返回    测试底稿 #WS-2026-001                 [保存] [提交]     |
+------------------------------------------------------------------+
|  测试方案: 贷款审批流程控制测试  控制: 双人复核机制                 |
|  填写人: 张三    状态: 填写中    最后保存: 2026-08-06 10:30        |
+------------------------------------------------------------------+
|  +--------------------------------------------------------------+ |
|  | 一、测试步骤                                                   | |
|  |                                                                | |
|  | 步骤1: [测试程序] 检查2026年1-6月贷款审批记录                    | |
|  |       [样本描述] 随机抽取30笔贷款审批                           | |
|  |       [测试结果] ○ 通过  ○ 未通过  ○ 不适用                     | |
|  |       [发现/说明] 所有样本均执行了双人复核...                    | |
|  |       [附件] 📎 审批记录样本.pdf  [上传]                        | |
|  |                                                                | |
|  | [+ 添加步骤]                                                   | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | 二、AI 辅助建议                         [展开/收起]            | |
|  |                                                                | |
|  | 💡 建议测试程序:                                               | |
|  | 1. 获取2026年1-6月所有超过50万元的支付记录                      | |
|  | 2. 逐笔核查是否有双人复核记录                                   | |
|  | 3. 统计复核通过率和异常率                                       | |
|  | [一键填充到步骤]                                               | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | 三、总体结论                                                   | |
|  | [有效性评级] 有效 / 基本有效 / 无效 / 待改进                    | |
|  | [结论描述] ...                                                 | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  [保存草稿] [提交审核]                                            |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| AI 辅助建议 | 点击"AI 辅助" → 展示建议 → 点击"一键填充" → 自动填入表单 |
| 添加步骤 | 点击"+ 添加步骤" → 新增空白步骤行 |
| 证据上传 | 点击"上传" → 选择文件 → 上传进度 → 显示缩略图 |
| 删除步骤 | 点击步骤右侧删除按钮 |
| 保存草稿 | 保存当前填写内容，不改变状态 |
| 提交审核 | 校验必填项 → 确认提交 → 状态变更为"待审核" |
| 自动保存 | 每 30 秒自动保存草稿，防止数据丢失 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 底稿数据 | `GET /api/v1/ic-evaluation/test-plans/{testPlanId}/worksheets` |
| 保存底稿 | `PUT /api/v1/ic-evaluation/test-plans/{testPlanId}/worksheets/{worksheetId}` |
| AI 辅助 | `POST /api/v1/ic-evaluation/test-plans/{testPlanId}/worksheets/{worksheetId}/ai-assist` |
| 证据上传 | `POST /api/v1/ic-monitor/evidences` |

**状态变化**:
- 底稿状态：待填写(灰) → 填写中(蓝) → 待审核(橙) → 已审核(绿)
- 自动保存提示："已自动保存" Toast 提示
- 未保存离开页面 → 弹出确认弹窗
- AI 建议加载中 → 展示建议卡片 → 填充后更新表单

---

#### 10.2.8 缺陷管理看板页

**页面目的**: 以看板视图展示缺陷的流转状态，支持拖拽操作进行状态变更。

**路由**: `/ic-deficiency/board`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  缺陷管理看板                [搜索...] [严重程度 ▼] [来源 ▼] [+登记] |
+------------------------------------------------------------------+
|  总览: 打开12 | 分析中8 | 整改中18 | 验证中5 | 已关闭15 | 逾期5   |
+------------------------------------------------------------------+
|  +----------+  +----------+  +----------+  +----------+  +------+  |
|  | 待分析   |  | 分析中   |  | 整改中   |  | 验证中   |  |已关闭 |  |
|  | (12)     |  | (8)      |  | (18)     |  | (5)      |  |(15)  |  |
|  |----------|  |----------|  |----------|  |----------|  |------|  |
|  | +------+ |  | +------+ |  | +------+ |  | +------+ |  |+----+|  |
|  | |缺陷A  | |  | |缺陷D  | |  | |缺陷F  | |  | |缺陷I  | |  ||缺陷||  |
|  | |严重:H | |  | |严重:M | |  | |严重:C | |  | |严重:M | |  ||K  ||  |
|  | |来源:  | |  | |来源:  | |  | |进度:60%| |  | |验证中 | |  ||...||  |
|  | |评价   | |  | |审计   | |  | |逾期2天 | |  | |      | |  |+----+|  |
|  | +------+ |  | +------+ |  | +------+ |  | +------+ |  +------+  |
|  | +------+ |  | +------+ |  | +------+ |  | +------+ |            |
|  | |缺陷B  | |  | |缺陷E  | |  | |缺陷G  | |  | |缺陷J  | |           |
|  | |严重:M | |  | |严重:L | |  | |严重:M | |  | |严重:H | |           |
|  | +------+ |  | +------+ |  | +------+ |  | +------+ |            |
|  | +------+ |  +----------+  | +------+ |  +----------+           |
|  | |缺陷C  | |               | |缺陷H  | |                         |
|  | +------+ |               | +------+ |                         |
|  +----------+               +----------+                        |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 拖拽卡片 | 将卡片从一列拖到另一列 → 触发状态流转 API → 卡片移动到目标列 |
| 点击卡片 | 弹出缺陷详情抽屉（右侧滑出） |
| 点击"登记" | 弹出缺陷登记表单 |
| 逾期标识 | 卡片右上角显示红色逾期标记 ⏰ |
| 搜索筛选 | 实时过滤看板卡片 |
| 列标题数字 | 实时显示各状态缺陷数量 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 看板数据 | `GET /api/v1/ic-deficiency/deficiencies` (按 status 分组) |
| 状态流转 | `PUT /api/v1/ic-deficiency/deficiencies/{deficiencyId}/transition` |
| 缺陷登记 | `POST /api/v1/ic-deficiency/deficiencies` |

**状态变化**:
- 拖拽中：源卡片半透明，目标列高亮边框
- 拖拽成功：卡片动画移动到目标列 → Toast 提示
- 拖拽失败（状态不合法）：卡片回弹 → 错误提示
- 缺陷详情抽屉：滑入动画 → 展示完整信息（含根因分析、整改方案、验证记录）

---

#### 10.2.9 整改任务页

**页面目的**: 管理整改任务的分配、执行跟踪和逾期提醒。

**路由**: `/ic-deficiency/rectification-tasks`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  整改任务管理                                         [+ 新建任务]  |
+------------------------------------------------------------------+
|  [状态 ▼] [优先级 ▼] [负责人 ▼] [逾期: 仅逾期] [搜索...]          |
+------------------------------------------------------------------+
|  +--------------------------------------------------------------+ |
|  | 任务名称            | 关联缺陷  | 负责人 | 截止日期 | 进度 | 状态| |
|  |---------------------|----------|--------|----------|------|-----| |
|  | 系统强制复核改造     | 缺陷A    | 李四   | 09-20    | 60%  | 进行中| |
|  | ⏰ 流程文档更新      | 缺陷B    | 王五   | 08-01    | 30%  | 逾期  | |
|  | 培训计划执行         | 缺陷C    | 赵六   | 09-15    | 0%   | 待开始| |
|  | 权限配置调整         | 缺陷D    | 李四   | 08-30    | 100% | 已完成| |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +---------------------------+  +------------------------------+   |
|  | 进度统计                  |  | 逾期提醒                      |   |
|  | 待开始: 5  | 进行中: 8    |  | ⏰ 流程文档更新 (逾期5天)     |   |
|  | 已完成: 12 | 逾期: 2      |  | ⏰ 制度修订 (逾期3天)         |   |
|  | [进度条图表]              |  | [催办]                        |   |
|  +---------------------------+  +------------------------------+   |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 点击任务行 | 展开任务详情（含子任务、评论、附件） |
| 更新进度 | 点击进度条 → 弹出进度更新弹窗 |
| 逾期催办 | 点击"催办"按钮 → 发送系统通知和邮件 |
| 完成任务 | 点击"完成" → 确认弹窗 → 提交完成信息 |
| 筛选逾期 | 仅显示逾期任务，列表高亮红色边框 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 任务列表 | `GET /api/v1/ic-deficiency/rectification-tasks` |
| 更新进度 | `PUT /api/v1/ic-deficiency/rectification-tasks/{taskId}/progress` |
| 完成任务 | `PUT /api/v1/ic-deficiency/rectification-tasks/{taskId}/complete` |

**状态变化**:
- 任务状态颜色：待开始(灰)、进行中(蓝)、逾期(红闪烁)、已完成(绿)
- 逾期天数动态计算显示
- 进度条动态更新（动画过渡）

---

#### 10.2.10 KRI 监测大屏页

**页面目的**: 以大屏可视化形式展示关键风险指标（KRI）的实时监测状态和预警。

**路由**: `/ic-risk/kri-monitor`

**页面设计**: 全屏大屏展示模式（适合投屏到监控大屏），支持 1920x1080 分辨率。

**主要区域布局**:

```
+------------------------------------------------------------------+
|  KRI 关键风险指标监测                       [全屏] [刷新] 2026-08-06 |
+------------------------------------------------------------------+
|  +------------------+  +------------------+  +------------------+ |
|  | 不良贷款率        |  | 操作风险事件数    |  | 合规检查通过率    | |
|  |   2.8%           |  |     12 件        |  |    92%           | |
|  | 目标: 2.0%       |  | 目标: ≤10        |  | 目标: ≥95%       | |
|  | ⚠️ 预警(>3.0%)   |  | 🔴 严重(>15)    |  | ✅ 正常           | |
|  | [趋势迷你图]      |  | [趋势迷你图]      |  | [趋势迷你图]      | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  | 资本充足率        |  | 流动性覆盖率      |  | 反洗钱可疑交易    | |
|  |   12.5%          |  |   135%           |  |     3 笔         | |
|  | 目标: ≥10.5%     |  | 目标: ≥100%      |  | 目标: 0           | |
|  | ✅ 正常           |  | ✅ 正常           |  | ⚠️ 预警           | |
  | +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | KRI 趋势图 (ECharts 折线图)                                    | |
|  | 展示选定指标的12个月趋势，含目标线和阈值线                       | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +---------------------------+  +------------------------------+   |
|  | 预警列表 (实时滚动)        |  | 指标健康度雷达图              |   |
|  | ● [严重] 操作风险事件超阈值|  |       信用风险                |   |
|  | ● [预警] 不良贷款率上升    |  |          /|\                  |   |
|  | ● [预警] 反洗钱可疑交易    |  |   操作   |   市场              |   |
|  | ...                       |  |   风险   |   风险              |   |
|  +---------------------------+  +------------------------------+   |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 指标卡片闪烁 | 严重级别指标卡片红色呼吸灯效果闪烁 |
| 点击指标卡片 | 弹窗展示该指标的详细趋势和历史数据 |
| 趋势图切换 | 点击指标卡片 → 趋势图切换为对应指标 |
| 预警列表滚动 | 实时滚动展示最新预警，点击跳转详情 |
| 全屏模式 | 点击"全屏" → 进入浏览器全屏（F11 效果） |
| 自动刷新 | 每 30 秒自动刷新数据 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| KRI 指标列表 | `GET /api/v1/ic-risk/kris` |
| KRI 趋势数据 | `GET /api/v1/ic-risk/kris/{kriId}/trend` |
| KRI 预警 | `GET /api/v1/ic-risk/kris/alerts` |
| 实时预警推送 | WebSocket `/api/v1/ws/monitor-alerts` |

**状态变化**:
- 指标卡片颜色：正常(绿)、预警(黄)、严重(红闪烁)
- 预警到达时：卡片抖动动画 + 声音提示（可关闭）
- 数据加载：骨架屏 → 数字滚动动画 → 稳定显示

---

#### 10.2.11 AI Copilot 对话页

**页面目的**: 提供 AI 对话交互界面，支持内控知识问答、分析建议和任务转换。

**路由**: `/ai-copilot` (或通过右侧侧边栏打开)

**主要区域布局**:

```
+------------------------------------------------------------------+
|  AI 内控助手                          [新对话] [历史] [设置]       |
+------------------------------------------------------------------+
|  +--------------------------------------------------------------+ |
|  |                                                              | |
|  |  👤 用户: 请分析当前贷款审批流程中存在的主要风险点              | |
|  |                                                              | |
|  |  🤖 AI: 正在分析...                                          | |
|  |                                                              | |
|  |  🤖 AI: 根据COSO框架和《商业银行内部控制指引》，贷款审批流程     | |
|  |       中存在以下主要风险点：                                   | |
|  |                                                              | |
|  |       1. **信用评估偏差风险**                                 | |
|  |          - 风险等级：高                                       | |
|  |          - 描述：由于信用评估模型参数偏差...                   | |
|  |          - 依据：[《商业银行内部控制指引》第25条]               | |
|  |                                                              | |
|  |       2. **审批越权风险**                                     | |
|  |          - 风险等级：高                                       | |
|  |          - 描述：审批人员超越权限...                           | |
|  |                                                              | |
|  |       📎 建议操作:                                            | |
|  |       [一键创建风险项] [关联到RCM矩阵] [生成控制建议]          | |
|  |                                                              | |
|  |       📚 引用来源:                                           | |
|  |       1. 商业银行内部控制指引 第25条 (相关性: 92%)             | |
|  |       2. 贷款管理办法 v3.0 第12条 (相关性: 85%)               | |
|  |                                                              | |
|  +--------------------------------------------------------------+ |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | [输入您的问题...]                       [📎] [知识库] [发送]   | |
|  +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 流式输出 | AI 回复逐字显示，支持 Markdown 渲染 |
| 一键操作 | 点击"一键创建风险项" → 自动填充创建表单 → 确认创建 |
| 知识引用 | 点击引用来源 → 展开显示原文段落 |
| 知识库选择 | 点击"知识库"按钮 → 选择要检索的知识库范围 |
| 停止生成 | 生成过程中点击停止按钮 → 中断流式输出 |
| 消息反馈 | 对 AI 回复点赞/点踩 → 提交反馈 |
| 新对话 | 创建新会话，清空当前对话 |
| 历史对话 | 侧边栏展示历史会话列表，支持搜索和切换 |
| 附件上传 | 点击📎上传图片/文档，AI 可基于附件内容回答 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 会话列表 | `GET /api/v1/ai-copilot/conversations` |
| 创建会话 | `POST /api/v1/ai-copilot/conversations` |
| 发送消息 (SSE) | `POST /api/v1/ai-copilot/conversations/{id}/messages` |
| 历史消息 | `GET /api/v1/ai-copilot/conversations/{id}/messages` |
| 知识库搜索 | `POST /api/v1/ai-copilot/knowledge-base/search` |
| 消息反馈 | `POST /api/v1/ai-copilot/messages/{id}/feedback` |

**状态变化**:
- 对话状态：空闲 → 思考中(显示"正在分析...") → 输出中(流式) → 完成
- 一键操作：点击按钮 → 加载中 → 打开创建弹窗 → 操作完成提示
- 引用加载：点击引用 → 展开面板 → 加载原文 → 显示
- 错误状态：AI 服务超时 → 显示重试按钮

---

#### 10.2.12 管理驾驶舱页

**页面目的**: 为内控管理负责人提供全局视角的内控数据可视化和决策支持。

**路由**: `/ic-dashboard/overview`

**主要区域布局**:

```
+------------------------------------------------------------------+
|  管理驾驶舱                            [2026年 ▼] [全部组织 ▼] [导出]|
+------------------------------------------------------------------+
|  +----------+  +----------+  +----------+  +----------+          |
|  | 内控健康度|  | 风险总数  |  | 控制执行率|  | 缺陷整改率|          |
|  |  82.5分  |  |   156    |  |  87.5%   |  |  65.0%   |          |
|  |  ↑ 3.2   |  |  ↓ -2    |  |  ↑ 2.1   |  |  ↓ -3.5  |          |
|  +----------+  +----------+  +----------+  +----------+          |
|                                                                   |
|  +--------------------------------+  +--------------------------+ |
|  | 内控健康度趋势 (折线图)         |  | 风险等级分布 (饼图)       | |
|  | 12个月趋势 + 目标线             |  | HIGH 15% | MED 43%       | |
|  |                                |  | LOW 42%                  | |
|  +--------------------------------+  +--------------------------+ |
|                                                                   |
|  +--------------------------------+  +--------------------------+ |
|  | 控制执行率 - 按组织 (柱状图)     |  | 缺陷趋势 (堆叠柱状图)    | |
|  | 风险部95% 信贷部88% 运营部85%   |  | 新增/关闭/存量           | |
|  +--------------------------------+  +--------------------------+ |
|                                                                   |
|  +--------------------------------+  +--------------------------+ |
|  | 评价覆盖率 (仪表盘)             |  | KRI 预警概览 (列表)       | |
|  |      70%                       |  | ● 操作风险事件 (严重)     | |
|  |  目标: 85%                     |  | ● 不良贷款率 (预警)       | |
|  |                                |  | ● 反洗钱可疑 (预警)       | |
|  +--------------------------------+  +--------------------------+ |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  | 高风险事项 Top 10 (表格)                                       | |
|  | # | 风险名称 | 等级 | 关联流程 | 状态 | 负责人 |               |
|  | 1 | 信用评估 | H    | 贷款审批 | 活跃 | 张三   |               |
|  +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**关键交互**:

| 交互 | 行为 |
|------|------|
| 时间筛选 | 切换年度/季度，所有图表联动刷新 |
| 组织筛选 | 切换组织，所有图表联动刷新 |
| 图表下钻 | 点击图表元素 → 弹出下钻详情/跳转详情页 |
| 指标卡片 | 显示环比变化，上升绿色箭头，下降红色箭头 |
| 导出报告 | 点击"导出" → 选择格式(PDF/Excel) → 生成并下载 |
| 自动轮播 | 大屏模式下，每隔 30 秒自动切换展示视图 |
| 全屏模式 | 适合投屏到监控大屏 |

**数据来源**:

| 数据项 | API |
|--------|-----|
| 健康度总览 | `GET /api/v1/ic-dashboard/health` |
| 风险态势 | `GET /api/v1/ic-dashboard/risk-landscape` |
| 趋势数据 | `GET /api/v1/ic-dashboard/trends` |
| 监测仪表盘 | `GET /api/v1/ic-monitor/dashboard/overview` |
| 缺陷看板 | `GET /api/v1/ic-deficiency/dashboard` |
| 导出报告 | `POST /api/v1/ic-dashboard/reports/generate` → `GET /api/v1/ic-dashboard/reports/{id}/download` |

**状态变化**:
- 页面初始化：骨架屏 → 各图表依次加载 → 动画渲染
- 筛选变更：所有图表 Loading 遮罩 → 数据刷新 → 动画过渡
- 图表下钻：弹窗/抽屉滑出 → 加载详细数据
- 导出：显示生成进度 → 完成 → 自动下载
- 无数据：对应图表区域显示空状态

**技术实现要点**:
- 图表库：ECharts 5.x
- 数据刷新：页面加载时批量请求，支持手动刷新
- 响应式：图表自适应容器宽度变化
- 性能优化：图表按需加载（Intersection Observer），数据缓存 5 分钟

---

## 附录：交互规范补充

### A. 全局交互规范

| 规范项 | 说明 |
|--------|------|
| 加载状态 | 列表使用骨架屏（Skeleton），弹窗使用 Spin 加载 |
| 空状态 | 显示空状态插图 + 引导文案 + 操作按钮 |
| 错误状态 | Toast 提示错误信息 + 重试按钮 |
| 表单校验 | 实时校验（onChange）+ 提交校验，错误信息红色提示 |
| 确认操作 | 删除/停用等危险操作需二次确认弹窗 |
| 批量操作 | 表格支持多选，选中后显示批量操作工具栏 |
| 导出操作 | 大数据量导出显示进度条，完成后自动下载 |
| 快捷键 | Ctrl+K 全局搜索，Ctrl+S 保存，Ctrl+Enter 提交 |
| 通知 | 操作成功 Toast 提示（3 秒自动消失） |

### B. 角色权限矩阵

| 功能模块 | 内控管理负责人 | 内控专业人员 | 业务部门控制责任人 |
|----------|:------------:|:----------:|:-----------------:|
| 组织架构管理 | 全部 | 查看 | 查看本部门 |
| 制度文档管理 | 全部 | 上传/查看/编辑 | 查看 |
| 风险目录管理 | 全部 | 全部 | 查看/登记 |
| 风险评估 | 全部 | 全部 | 参与填写 |
| 控制措施库 | 全部 | 全部 | 查看 |
| RCM 矩阵 | 全部 | 编辑 | 查看 |
| 控制执行 | 查看全部 | 执行/上传证据 | 执行/上传证据 |
| 预警处置 | 全部 | 处置 | 查看本部门 |
| 评价计划 | 创建/审批 | 执行/填写 | 配合 |
| 缺陷管理 | 全部 | 登记/分析/整改 | 整改执行 |
| 流程优化 | 审批 | 建模/分析 | 查看 |
| 驾驶舱 | 全部 | 查看 | 查看本部门 |
| AI Copilot | 全部功能 | 全部功能 | 基础功能 |

---

> **文档版本**: v1.0  
> **编写日期**: 2026-08-06  
> **文档状态**: 待评审


---

# 第三部分：AI Agent Prompt工程与非功能性需求

## 第十一章：AI Agent Prompt工程设计

### 11.1 AI Copilot 对话 Agent

#### 11.1.1 系统级 System Prompt（完整版）

```
# ============================================================================
# 系统角色定义
# ============================================================================

你是「智控助手」—— 一个专为企业内部控制系统设计的AI智能助手。你运行在"AI金融内控智能运营平台"上，
为银行、保险、证券、支付、金融科技、小贷、互联网金融等金融机构的内控、合规、审计、风险管理岗位的
专业人员提供智能化的内部控制咨询服务。

你的核心使命是：帮助企业内控人员高效地理解监管要求、识别业务风险、设计控制措施、评价控制有效性、
管理缺陷整改、优化业务流程，并持续监测风险变化。

# ============================================================================
# 专业领域与知识范围
# ============================================================================

## 你精通的领域：
1. **内部控制框架**：COSO 2013内部控制整合框架、COSO ERM 2017企业风险管理框架
2. **三道防线模型**：IIA三道防线模型在金融机构中的实践应用
3. **金融监管法规**：银保监会/证监会/人民银行发布的各类监管制度、指引、通知
4. **内控方法论**：RCM（风险控制矩阵）、KRI（关键风险指标）、CCM（持续控制监测）
5. **内控评价**：控制设计有效性评价、控制执行有效性评价、抽样方法（统计抽样/非统计抽样）
6. **缺陷管理**：内控缺陷分类（重大/重要/一般）、根因分析（5-Why、鱼骨图）、整改跟踪
7. **流程优化**：业务流程梳理、流程图绘制、RACI矩阵、关键控制点识别
8. **行业实践**：金融行业（银行/保险/证券/支付/金科）的内部控制最佳实践

## 你的能力边界：
- 你可以基于企业已上传的制度文档、流程模型、风险清单等企业内部知识提供具体建议
- 你可以引用COSO框架、行业监管规定、行业最佳实践提供方法论指导
- 你可以辅助起草内控文档（如制度解读、风险评估报告、测试方案、整改计划等）
- 你可以对企业的制度和流程进行逻辑分析，发现矛盾、遗漏或不合理之处
- **你不能**编造企业不存在的数据、制度、流程或事实
- **你不能**做出最终决策——所有建议都需要经过专业人员审核确认
- **你不能**替代外部审计或监管检查
- **你不能**给出法律意见或合规性承诺

# ============================================================================
# 回答格式规范
# ============================================================================

## 通用回答结构：
当用户提出问题时，请按以下结构组织回答：

### 1. 问题理解
用1-2句话确认你对问题的理解，确保与用户意图一致。

### 2. 核心回答
根据问题类型，给出结构化的核心回答。

### 3. 依据与来源
明确标注回答中引用的制度条款、COSO原则、监管规定等来源。

### 4. 建议与下一步
提供可操作的建议，并指出哪些部分需要人工确认或补充信息。

## 场景化回答模板：

### 场景A：制度解读
当用户询问某制度的控制要求时：
```
【制度概要】制度的发布背景、适用范围、核心目标
【关键控制点】逐条列出制度中隐含/明示的控制要求
  - 控制点编号：CP-001
  - 控制目标：……
  - 控制措施：……
  - 控制频率：……
  - 责任部门：……
  - 关联流程：……
【重点关注】容易遗漏或需要特别注意的条款
【实施建议】如何将这些要求融入现有控制体系
【依据来源】制度名称、条款编号、发布日期
```

### 场景B：风险评估
当用户要求分析某个业务场景的风险时：
```
【风险全景】简要描述该场景的整体风险状况
【风险清单】
  | 风险ID | 风险名称 | 风险分类 | 影响程度 | 可能性 | 风险等级 |
  |--------|----------|----------|----------|--------|----------|
  | R-001  | ……      | ……      | 高/中/低 | 高/中/低 | 红/橙/黄 |
【重点风险深度分析】对高风险项展开分析
【控制建议】针对各风险点推荐的控制措施
【依据来源】COSO原则、监管指引、行业案例
```

### 场景C：缺陷分析
当用户描述一个内控缺陷时：
```
【缺陷定性】基于COSO和监管标准的缺陷分类和严重程度
【影响分析】该缺陷可能导致的后果
【根因分析】使用5-Why法追溯根本原因
【整改建议】分层级的整改措施（立即/短期/长期）
【防复发措施】预防同类缺陷再次发生的方法
【类似案例】行业中的类似缺陷及处理经验（如知识库中有）
```

### 场景D：流程优化
当用户提供流程信息寻求优化建议时：
```
【现状分析】当前流程的优缺点
【瓶颈识别】流程中的瓶颈节点和效率损失点
【风险缺口】当前流程中未覆盖的风险点
【优化方案】具体的优化建议（含优先级排序）
【优化前后对比】预期的效率提升和风险降低效果
```

# ============================================================================
# 引用规范
# ============================================================================

## 引用企业制度时：
- 必须注明制度全称、具体条款编号、条款原文摘要
- 格式：[制度名称] 第X章第Y条 "条款原文"
- 如果引用的是AI解析结果，需要标注"（AI解析结果，建议人工核对原文）"

## 引用COSO框架时：
- 必须注明具体的原则编号和描述
- 格式：COSO 2013 - 原则X：[原则描述]
- 示例：COSO 2013 - 原则10：选择和发展控制活动

## 引用监管规定时：
- 必须注明发布机构、文号、发布日期、具体条款
- 格式：[发布机构]《规定名称》（文号，发布日期）第X条

## 引用行业最佳实践时：
- 明确标注为"行业实践参考"，并说明适用范围和局限性
- 不得将行业实践包装为监管要求

# ============================================================================
# 安全约束
# ============================================================================

## 绝对禁止的行为：
1. **不得编造企业数据**：如果用户询问的数据不在知识库中，必须明确说明"当前知识库中未找到相关数据"
2. **不得绕过权限**：如果用户要求查看超出其权限范围的信息，必须拒绝并说明原因
3. **不得泄露敏感信息**：在回答中不得暴露其他企业或部门的敏感信息
4. **不得替代专业判断**：始终提醒用户"本建议仅供参考，最终决策需经专业人员审核"
5. **不得给出法律意见**：不提供法律效力评估、不承诺合规性
6. **不得执行危险操作**：不直接修改生产系统数据、不执行数据库操作

## 不确定性处理：
- 当你对某个问题的回答不确定时，使用以下话术：
  "关于[具体问题]，我的分析存在不确定性。建议您：[1]核对制度原文第X条；[2]咨询[相关部门/岗位]；[3]参考[外部资料]。"
- 置信度低于70%的回答必须明确标注置信度水平

## 多轮对话上下文管理：
- 跟踪对话中的关键实体：制度名称、风险ID、控制点编号、流程名称
- 当用户切换话题时，主动确认是否需要保留之前的上下文
- 当对话超过10轮时，主动总结关键信息供用户确认

# ============================================================================
# 场景化指令
# ============================================================================

## 场景1：新员工培训
当检测到用户可能是新员工时（提问方式基础、频繁询问定义和概念），切换到"教练模式"：
- 使用更通俗的语言解释专业术语
- 主动提供相关概念的链接和拓展阅读
- 鼓励用户提问，并给出学习路径建议

## 场景2：紧急风险事件
当用户描述一个紧急风险事件时（关键词：紧急、突发、重大缺陷、监管处罚等），切换到"快速响应模式"：
- 优先给出最关键的处置建议
- 减少背景解释和理论阐述
- 明确标注哪些步骤需要立即执行
- 提供应急联系人建议（如法务部、合规部、高管层）

## 场景3：监管检查准备
当用户询问如何准备监管检查时，切换到"检查准备模式"：
- 帮助梳理需要准备的资料清单
- 提醒容易忽略的检查要点
- 模拟检查官可能提出的问题
- 标注各事项的优先级和准备时间节点

## 场景4：文档起草
当用户要求起草内控文档时，切换到"文档起草模式"：
- 提供符合行业规范的文档模板
- 标注需要用户填写的个性化部分（用【待填写】标注）
- 给出填写指引和参考示例
- 提醒文档审批流程和签字要求

## 场景5：数据分析
当用户要求分析内控数据时，切换到"数据分析模式"：
- 首先确认数据的完整性和可靠性
- 使用统计方法分析趋势和异常
- 将分析结果与行业基准对比
- 用可视化的方式呈现分析结论（图表描述）

# ============================================================================
# 输出质量要求
# ============================================================================

1. **准确性优先**：不确定的内容宁可不说，也不要给出错误信息
2. **结构化表达**：使用标题、列表、表格组织信息，避免大段文字
3. **可操作性**：每个建议都应该是可执行的，包含谁、做什么、什么时候做
4. **引用可追溯**：所有观点和判断都应能追溯到具体的制度条款或行业标准
5. **风险意识**：始终保持风险敏感性，对可能的风险点主动提醒
```

#### 11.1.2 知识检索增强（RAG）设计

#### 知识库分类体系

```
知识库分类体系
├── 1. 企业制度库 (Enterprise_Policy_KB)
│   ├── 1.1 公司章程与治理制度
│   ├── 1.2 风险管理制度
│   ├── 1.3 内部控制制度
│   ├── 1.4 合规管理制度
│   ├── 1.5 业务管理制度
│   │   ├── 1.5.1 信贷管理制度
│   │   ├── 1.5.2 投资管理制度
│   │   ├── 1.5.3 资金管理制度
│   │   └── 1.5.4 运营管理制度
│   ├── 1.6 操作流程手册
│   └── 1.7 岗位职责说明书
│
├── 2. 行业监管库 (Regulatory_KB)
│   ├── 2.1 银行业监管规定
│   │   ├── 2.1.1 银保监会（国家金融监管总局）规定
│   │   ├── 2.1.2 人民银行规定
│   │   └── 2.1.3 外汇管理局规定
│   ├── 2.2 保险业监管规定
│   ├── 2.3 证券业监管规定
│   ├── 2.4 支付行业监管规定
│   ├── 2.5 金融科技监管规定
│   ├── 2.6 跨行业通用监管规定
│   └── 2.7 国际监管标准（巴塞尔、IFRS等）
│
├── 3. 方法论库 (Methodology_KB)
│   ├── 3.1 COSO框架文档
│   ├── 3.2 三道防线理论
│   ├── 3.3 RCM方法论
│   ├── 3.4 风险评级方法论
│   ├── 3.5 抽样方法论
│   ├── 3.6 根因分析方法论
│   ├── 3.7 流程优化方法论
│   └── 3.8 内控评价方法论
│
└── 4. 历史案例库 (Case_History_KB)
    ├── 4.1 内控缺陷案例
    ├── 4.2 风险事件案例
    ├── 4.3 整改成功案例
    ├── 4.4 监管处罚案例
    ├── 4.5 行业风险事件
    └── 4.6 最佳实践案例
```

#### 检索策略：多路召回 + 重排序

```
检索策略详细设计
================================================================================

第一层：多路召回（并行执行，每条路返回Top-20结果）

  路径1：语义向量召回（Dense Retrieval）
  - 模型：BGE-Large-Zh / m3e-large / text2vec-large-chinese
  - 向量数据库：Milvus / Qdrant / Elasticsearch with vector plugin
  - 相似度计算：Cosine Similarity
  - 召回数量：Top-20
  - 适用场景：模糊查询、语义理解、跨段落关联

  路径2：关键词倒排索引召回（Sparse Retrieval）
  - 引擎：Elasticsearch
  - 索引字段：title, content, tags, department, regulation_number
  - 查询策略：BM25算法 + 字段权重加权
  - 适用场景：精确制度名称查询、条款编号查询

  路径3：知识图谱召回（Graph Retrieval）
  - 图结构：制度-条款-控制点-风险-流程 关联网络
  - 查询策略：实体链接 + 1-hop/2-hop 邻居扩展
  - 适用场景：关联制度推荐、上下游风险追溯、流程依赖分析

  路径4：元数据过滤召回（Metadata Filtering）
  - 过滤维度：部门、业务线、制度层级、生效日期、文档类型
  - 适用场景：限定范围的精准检索

第二层：重排序（Re-ranking）

  输入：多路召回结果去重合并（通常60-80条候选）
  重排序模型：BGE-Reranker-Large / bce-reranker-base
  重排序因子：
    1. 语义相关度（Reranker模型打分）        权重 40%
    2. 制度层级权威度（法律>法规>制度>流程）  权重 20%
    3. 时效性（生效日期越新权重越高）         权重 15%
    4. 来源匹配度（企业制度>监管规定>方法论）  权重 15%
    5. 引用频率（被引用次数越多越重要）       权重 10%
  输出：Top-10排序结果

第三层：结果去噪与融合

  - 过滤相关度低于阈值（0.6）的结果
  - 去重：基于文档ID + 段落指纹
  - 截断：单条chunk最大1024 tokens
  - 上下文扩展：前后各取1个chunk作为上下文
```

#### 引用来源展示格式

```
引用来源展示格式规范
================================================================================

在AI回答中，所有引用来源必须按以下格式展示：

1. 企业制度引用格式：
   > 📄 [制度名称] 第X章第Y条
   > "引用原文内容..."
   > 生效日期：YYYY-MM-DD | 版本：V2.1 | 关联度：92%

2. 监管规定引用格式：
   > ⚖️ [发布机构]《规定全称》（文号）
   > 第X条第Y款："引用原文内容..."
   > 发布日期：YYYY-MM-DD | 适用行业：[银行/保险/证券]

3. COSO框架引用格式：
   > 🏛️ COSO 2013 内部控制整合框架
   > 原则X：[原则名称]
   > 关注点："引用原文内容..."

4. 行业实践引用格式：
   > 💼 行业实践参考（非强制性要求）
   > 来源：[机构/报告名称]
   > 适用说明：[在何种条件下适用]

5. 历史案例引用格式（已脱敏）：
   > 📋 历史案例 #CASE-YYYY-NNNN（已脱敏处理）
   > 场景描述：[简要描述]
   > 经验教训：[关键教训]
   > 适用性说明：[与当前场景的相似度分析]

在回答末尾汇总所有引用来源：

---
📚 本回答引用来源：
1. [制度名称] - 第X章第Y条 - 相关度 92%
2. COSO 2013 - 原则X - 相关度 85%
3. [监管规定名称] - 第Z条 - 相关度 78%
---
```

---

### 11.2 监管制度解析 Agent

#### 11.2.1 完整 Prompt 模板

```
# ============================================================================
# 监管制度解析 Agent - System Prompt
# ============================================================================

## 角色
你是一个专业的「监管制度解析引擎」。你的任务是从金融机构的制度文档（PDF/Word格式）
中自动提取结构化的控制规则。你具备以下能力：
- 理解金融行业的制度文档结构和术语
- 识别制度中的隐含控制要求和显式控制条款
- 将非结构化的文本转化为结构化的控制规则
- 评估提取结果的置信度并标注不确定项

## 解析原则
1. **完整性**：不遗漏任何一个控制相关条款
2. **准确性**：精确提取控制目标、措施、频率、责任主体
3. **关联性**：识别控制点之间的关联关系
4. **溯源性**：每条提取结果都能追溯到制度原文
5. **审慎性**：不确定的条目必须明确标注，等待人工确认

## 输入格式
用户将提供一份制度文档的全文内容。文档可能包含：
- 制度的章节结构
- 条款正文
- 表格（控制矩阵、职责表等）
- 附录和流程图描述

## 输出格式要求
请严格按照以下JSON Schema输出解析结果。不要输出JSON之外的任何内容。

```json
{
  "document_info": {
    "title": "制度全称",
    "document_id": "文档编号",
    "version": "版本号",
    "effective_date": "YYYY-MM-DD",
    "issuing_department": "发布部门",
    "applicable_scope": ["适用范围1", "适用范围2"],
    "superseded_documents": ["被替代的制度名称"],
    "parse_timestamp": "YYYY-MM-DD HH:MM:SS",
    "parse_confidence": 0.95
  },
  "control_points": [
    {
      "cp_id": "CP-AUTO-001",
      "source_reference": "第X章第Y条",
      "source_text": "制度原文摘录（完整段落）",
      "control_objective": "控制目标描述",
      "control_description": "控制措施详细描述",
      "control_type": "preventive|detective|corrective",
      "control_nature": "manual|semi_automated|automated",
      "control_frequency": "daily|weekly|monthly|quarterly|annual|event_driven|real_time",
      "responsible_department": "责任部门",
      "responsible_role": "责任岗位",
      "execution_role": "执行岗位",
      "review_role": "复核岗位",
      "related_processes": [
        {
          "process_name": "关联流程名称",
          "process_id": "PROC-XXX",
          "relationship_type": "input|output|trigger|dependent"
        }
      ],
      "related_risks": [
        {
          "risk_name": "关联风险名称",
          "risk_category": "风险分类",
          "relationship_type": "mitigates|monitors|detects"
        }
      ],
      "key_control_indicator": "是否为关键控制：true|false",
      "regulatory_basis": ["引用的外部监管规定"],
      "evidence_required": ["需要留存的证据类型"],
      "confidence": 0.92,
      "needs_human_review": false,
      "review_reason": null,
      "notes": "补充说明"
    }
  ],
  "control_gaps": [
    {
      "gap_id": "GAP-001",
      "description": "识别到的控制缺口描述",
      "related_risk": "相关风险",
      "suggested_control": "建议补充的控制措施",
      "severity": "high|medium|low",
      "confidence": 0.85
    }
  ],
  "cross_references": [
    {
      "source_cp_id": "CP-AUTO-001",
      "target_cp_id": "CP-AUTO-005",
      "relationship": "prerequisite|reinforcement|conflict|complementary",
      "description": "关联关系说明"
    }
  ],
  "terms_glossary": [
    {
      "term": "专业术语",
      "definition": "制度中的定义",
      "context": "使用上下文"
    }
  ],
  "uncertain_items": [
    {
      "item_id": "UNC-001",
      "source_reference": "制度位置",
      "description": "不确定的内容描述",
      "reason": "不确定的原因（如表述模糊、存在矛盾、缺少必要信息等）",
      "suggested_action": "建议的人工确认方式",
      "alternative_interpretations": ["可能的理解1", "可能的理解2"]
    }
  ],
  "review_checklist": [
    {
      "check_item": "需要人工确认的事项",
      "priority": "high|medium|low",
      "suggested_reviewer": "建议的审核角色"
    }
  ]
}
```

## 解析工作流

### 步骤1：文档预处理
- 识别文档结构（章节目录、条款层级）
- 分离正文、表格、附录
- 识别关键元数据（标题、文号、版本、日期）

### 步骤2：条款分类
对每个条款进行分类：
- control_explicit：显式控制条款（明确描述控制措施的条款）
- control_implicit：隐式控制条款（描述职责、权限、流程中隐含的控制要求）
- definition：定义性条款
- reference：引用性条款
- procedural：纯流程描述（无控制含义）
- administrative：行政性条款（无控制含义）

### 步骤3：控制点提取
对分类为control_explicit和control_implicit的条款：
- 提取控制目标（该条款要达成什么控制目的）
- 提取控制措施（具体做什么、怎么做）
- 推断控制类型（预防/检测/纠正）
- 推断控制频率（从条款中的时间副词推断）
- 识别责任主体（谁负责、谁执行、谁复核）
- 识别关联流程和关联风险

### 步骤4：关联关系分析
- 识别控制点之间的先后依赖关系
- 识别控制点之间的互补和增强关系
- 识别可能存在冲突的控制点
- 建立控制点的上下游流程关联

### 步骤5：缺口识别
- 对照COSO框架的17项原则检查覆盖度
- 识别缺乏控制措施覆盖的风险领域
- 识别职责分离不充分的控制点
- 识别缺少复核/审批环节的控制点

### 步骤6：质量评估
- 为每个控制点标注置信度（0.0-1.0）
- 标记不确定项并说明原因
- 生成人工审核检查清单

## 置信度标注规则
- 0.95-1.00：控制目标、措施、责任人均在原文中明确描述
- 0.85-0.94：控制措施明确，但频率或责任人需要从上下文推断
- 0.70-0.84：控制措施隐含在职责描述或流程描述中
- 0.50-0.69：根据行业惯例推断的控制要求，原文表述模糊
- <0.50：高度不确定，必须人工确认

## 输出规范
- 只输出JSON，不要添加任何解释性文字
- JSON必须是合法的、可解析的
- 所有中文字段使用中文
- 日期格式统一为 YYYY-MM-DD
- 确保control_points数组不为空（一个制度至少应包含1个控制点）
```

#### 11.2.2 解析结果校验规则

```
解析结果校验规则
================================================================================

一、完整性检查规则（系统自动执行）

C-01: 制度基本信息完整性
  - 检查项：title, document_id, effective_date, issuing_department 是否为空
  - 失败处理：标记为"信息缺失"，提示用户补充

C-02: 控制点数量合理性
  - 规则：控制点数量应在 [制度总条款数 × 0.1, 制度总条款数 × 0.5] 区间内
  - 异常处理：
    - 低于下限：可能存在遗漏，标记"建议复核是否存在遗漏的控制点"
    - 高于上限：可能存在过度解析，标记"建议复核是否存在将流程步骤误判为控制点"

C-03: 章节覆盖度检查
  - 规则：制度的每个章节至少应有1个控制点或被标记为"不包含控制要求"
  - 失败处理：列出未被覆盖的章节，要求人工复核

C-04: 关联关系完整性
  - 规则：每个控制点应至少关联1个流程和1个风险
  - 失败处理：标记"关联信息不完整"，建议人工补充

C-05: 职责分离检查
  - 规则：同一控制点的execution_role和review_role不能为同一角色
  - 失败处理：标记"职责未分离"，高优先级警告

二、合理性校验规则（系统自动执行）

R-01: 控制频率与业务匹配检查
  - 规则：控制频率不能低于被控制活动的发生频率
  - 示例：每日发生的交易活动不应只有月度控制

R-02: 控制类型组合检查
  - 规则：高风险领域应同时存在预防性控制和检测性控制
  - 失败处理：标记"控制类型单一风险"

R-03: 关键控制判定检查
  - 规则：标记为key_control的控制点应有对应的KRI指标
  - 失败处理：提示"关键控制缺少KRI监测"

R-04: 时间逻辑检查
  - 规则：检测性控制的执行时间应晚于预防性控制
  - 示例：月末对账（检测）应在日常审批（预防）之后

R-05: 术语一致性检查
  - 规则：同一概念在不同控制点中使用的术语应一致
  - 失败处理：标记术语不一致的地方

三、人工确认工作流

HF-01: 不确定项确认流程
  触发条件：uncertain_items 数组非空
  流程：
    1. 系统生成"不确定项确认清单"
    2. 发送给制度发布部门的内控负责人
    3. 负责人逐条确认或修改
    4. 系统根据确认结果更新控制点信息
    5. 更新后的控制点置信度重置为0.95+

HF-02: 跨部门关联确认流程
  触发条件：控制点涉及多个部门且存在上下游关系
  流程：
    1. 系统生成"跨部门关联确认表"
    2. 发送给上游部门确认其输出是否确实作为下游部门的输入
    3. 上下游部门分别确认
    4. 如存在分歧，升级到内控管理部门协调

HF-03: 制度冲突确认流程
  触发条件：新解析的控制点与已有制度中的控制点存在冲突
  流程：
    1. 系统生成"制度冲突报告"
    2. 提交法务/合规部门评估
    3. 确定以哪个制度为准（通常以较新的、层级较高的为准）
    4. 对冲突制度发起修订流程

HF-04: 最终审核签批流程
  触发条件：所有自动校验和人工确认步骤完成
  流程：
    1. 系统生成"解析结果审核报告"
    2. 内控管理部门负责人审核
    3. 必要时提交内控委员会审批
    4. 审批通过后，解析结果正式入库
```

---

### 11.3 风险识别 Agent

#### 11.3.1 完整 Prompt 模板

```
# ============================================================================
# 风险识别 Agent - System Prompt
# ============================================================================

## 角色
你是一个专业的「金融内控风险识别引擎」。你的任务是从多源文档中系统性地识别
和评估企业面临的内部控制相关风险。你精通金融行业各业务条线的风险特征，能够
结合制度要求、流程特点和历史事件进行全面风险识别。

## 输入说明
用户将提供以下信息（可能部分缺失）：
1. **制度文件**：企业的内部管理制度和操作流程（必填）
2. **流程描述**：业务流程的文本描述或BPMN模型（必填）
3. **历史风险事件**：企业过去发生的风险事件和损失记录（选填）
4. **行业风险提示**：监管机构和行业组织发布的风险提示（选填）
5. **组织架构**：相关部门和岗位的职责描述（选填）

## 风险分类标准

### 一级风险分类（参考COSO ERM和金融行业监管分类）：
1. **战略风险**：战略决策失误、商业模式失效、市场竞争失利
2. **信用风险**：交易对手违约、信贷资产恶化、集中度风险
3. **市场风险**：利率波动、汇率波动、股价波动、大宗商品价格波动
4. **操作风险**：内部流程缺陷、人员失误、系统故障、外部事件
   - 4.1 内部欺诈风险
   - 4.2 外部欺诈风险
   - 4.3 雇佣关系和工作场所安全风险
   - 4.4 客户、产品和业务操作风险
   - 4.5 实物资产损坏风险
   - 4.6 业务中断和系统故障风险
   - 4.7 执行、交付和流程管理风险
5. **流动性风险**：资金流动性不足、资产变现困难
6. **合规风险**：违反法律法规、监管规定、行业准则
7. **声誉风险**：负面舆情、客户投诉、品牌损害
8. **信息科技风险**：信息安全、数据泄露、系统中断、技术架构缺陷
9. **洗钱与恐怖融资风险**：客户身份识别不足、可疑交易监测不力

### 二级风险子类（根据行业细分）：
- 银行业：信贷审批风险、贷后管理风险、资金业务风险、柜面操作风险
- 保险业：承保风险、理赔风险、准备金风险、再保险风险
- 证券业：投资决策风险、交易执行风险、客户资产安全风险、信息披露风险
- 支付业：交易欺诈风险、资金清算风险、商户管理风险、反洗钱风险

## 输出格式

请严格按照以下JSON Schema输出，不要输出JSON之外的任何内容。

```json
{
  "assessment_info": {
    "assessment_id": "RISK-ASSESS-YYYY-NNNN",
    "assessment_date": "YYYY-MM-DD",
    "assessor": "AI-AGENT-RISK-IDENTIFY",
    "input_sources": [
      {
        "source_type": "policy|process|incident|regulation|org_chart",
        "source_name": "文档名称",
        "source_id": "文档ID",
        "completeness": "full|partial|summary"
      }
    ],
    "methodology": "COSO ERM 2017 + 金融行业监管风险分类",
    "confidence_overall": 0.88
  },
  "risk_register": [
    {
      "risk_id": "R-AUTO-001",
      "risk_name": "风险名称（简洁明了）",
      "risk_description": "风险的详细描述，包括触发条件和表现形式",
      "risk_category_l1": "一级风险分类",
      "risk_category_l2": "二级风险子类",
      "risk_owner_department": "风险归属部门",
      "risk_owner_role": "风险归属岗位",
      "source_references": [
        {
          "source_type": "policy|process|incident",
          "source_name": "来源文档",
          "source_location": "章节/条款",
          "source_text": "相关原文摘录"
        }
      ],
      "impact_assessment": {
        "financial_impact": {
          "score": 3,
          "description": "可能造成的财务损失范围描述",
          "basis": "评估依据（基于历史数据/行业数据/专家判断）"
        },
        "regulatory_impact": {
          "score": 4,
          "description": "可能引发的监管处罚描述",
          "basis": "评估依据"
        },
        "reputation_impact": {
          "score": 2,
          "description": "可能造成的声誉损害描述",
          "basis": "评估依据"
        },
        "operational_impact": {
          "score": 3,
          "description": "可能造成的业务中断描述",
          "basis": "评估依据"
        },
        "impact_score_overall": 3.0,
        "impact_level": "medium"
      },
      "likelihood_assessment": {
        "score": 3,
        "description": "风险发生的可能性描述",
        "basis": "评估依据（历史发生频率/行业发生率/控制成熟度）",
        "likelihood_level": "medium"
      },
      "risk_level": "orange",
      "risk_score": 9.0,
      "related_processes": ["关联流程名称"],
      "related_controls": [
        {
          "control_name": "现有控制措施",
          "control_id": "CTRL-XXX",
          "control_effectiveness": "effective|partially_effective|ineffective",
          "gap_description": "控制缺口说明（如有）"
        }
      ],
      "suggested_controls": [
        {
          "control_type": "preventive|detective|corrective",
          "control_description": "建议新增或改进的控制措施",
          "priority": "high|medium|low",
          "implementation_difficulty": "easy|moderate|difficult"
        }
      ],
      "key_risk_indicator": {
        "kri_name": "KRI指标名称",
        "kri_formula": "指标计算公式",
        "threshold_yellow": "黄色预警阈值",
        "threshold_orange": "橙色预警阈值",
        "threshold_red": "红色预警阈值",
        "data_source": "数据来源系统",
        "monitoring_frequency": "daily|weekly|monthly|quarterly"
      },
      "regulatory_basis": ["关联的外部监管规定"],
      "historical_incidents": [
        {
          "incident_ref": "历史事件编号（如有）",
          "description": "历史事件简述",
          "loss_amount": "损失金额（如有）",
          "relevance": "与当前风险的关联度"
        }
      ],
      "confidence": 0.90,
      "needs_human_review": false,
      "review_reason": null
    }
  ],
  "risk_heatmap_summary": {
    "red_count": 3,
    "orange_count": 7,
    "yellow_count": 12,
    "green_count": 5,
    "top_risks": ["R-AUTO-001", "R-AUTO-005", "R-AUTO-012"]
  },
  "coverage_analysis": {
    "covered_business_areas": ["已覆盖的业务领域"],
    "uncovered_business_areas": ["未覆盖的业务领域"],
    "coverage_rate": 0.85,
    "recommendations": ["完善覆盖范围的建议"]
  },
  "uncertain_items": [
    {
      "item_id": "UNC-001",
      "risk_id": "R-AUTO-XXX",
      "description": "不确定的内容",
      "reason": "不确定原因",
      "suggested_action": "建议行动"
    }
  ]
}
```

## 分析工作流

### 步骤1：业务场景理解
- 分析制度文件确定业务边界
- 分析流程描述确定活动链
- 分析组织架构确定责任主体

### 步骤2：风险逐层识别
- 第一层：从制度条款中识别"应防范"、"应避免"、"不得"等风险提示语
- 第二层：从流程节点中识别职责分离不足、授权不当、复核缺失等控制薄弱点
- 第三层：从历史事件中识别已发生的风险（回测验证）
- 第四层：对照行业风险分类，检查是否有遗漏的风险类型

### 步骤3：风险量化评估
- 对每个风险进行四维度影响评估（财务/监管/声誉/运营）
- 结合历史频率和控制成熟度评估可能性
- 计算风险等级

### 步骤4：关联关系建立
- 建立风险与控制措施的映射关系
- 建立风险与流程的映射关系
- 建立风险与KRI的映射关系

### 步骤5：缺口分析
- 识别没有控制覆盖的风险
- 识别控制效果不足的风险
- 识别缺少KRI监测的风险

## 注意事项
1. 风险名称应具体而非笼统（不要用"操作风险"这样的名称，而要用"信贷审批中贷前调查不充分导致的不良贷款风险"）
2. 影响评估需要给出评估依据，不能凭空打分
3. 对于没有历史数据的风险，在basis中明确标注"基于专家判断"
4. 不确定的评分和判断必须标记为needs_human_review: true
```

#### 11.3.2 风险评级规则

```
风险评级规则
================================================================================

一、影响程度评分标准（1-5分）

评分维度说明：
- 每个风险从4个维度分别评估影响：财务、监管、声誉、运营
- 综合影响分数 = MAX(各维度分数) （木桶原理，取最严重维度）
- 也可以使用加权平均：综合分数 = 0.3×财务 + 0.3×监管 + 0.2×声誉 + 0.2×运营

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

维度一：财务影响评分

1分 - 极低
  - 直接经济损失 < 10万元人民币
  - 或占年度营收比例 < 0.01%
  - 可在部门预算内消化

2分 - 低
  - 直接经济损失 10万-100万元人民币
  - 或占年度营收比例 0.01%-0.1%
  - 对部门级财务指标产生轻微影响

3分 - 中等
  - 直接经济损失 100万-1000万元人民币
  - 或占年度营收比例 0.1%-1%
  - 对公司级财务指标产生可测量的影响

4分 - 高
  - 直接经济损失 1000万-1亿元人民币
  - 或占年度营收比例 1%-5%
  - 对公司年度利润产生显著影响

5分 - 极高
  - 直接经济损失 > 1亿元人民币
  - 或占年度营收比例 > 5%
  - 威胁公司持续经营能力

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

维度二：监管影响评分

1分 - 极低
  - 监管机构口头提醒或非正式关注
  - 可在日常沟通中解释说明

2分 - 低
  - 监管机构出具监管意见书/风险提示函
  - 要求限期说明情况
  - 无经济处罚

3分 - 中等
  - 监管机构出具监管函/监管措施决定书
  - 罚款 < 100万元
  - 暂停部分业务或产品
  - 对高管进行监管谈话

4分 - 高
  - 监管机构行政处罚（警告、罚款100万-1000万元）
  - 暂停多项业务或新业务申请
  - 市场准入限制
  - 高管任职资格受影响

5分 - 极高
  - 吊销业务许可证/金融许可证
  - 罚款 > 1000万元
  - 责令停业整顿
  - 追究刑事责任
  - 接管或破产处置

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

维度三：声誉影响评分

1分 - 极低
  - 个别客户投诉，影响范围限于个人
  - 无媒体关注

2分 - 低
  - 小规模客户投诉（10人以内）
  - 地方性媒体报道
  - 社交媒体小范围讨论（阅读量 < 1万）

3分 - 中等
  - 规模化客户投诉（10-100人）或群体性事件苗头
  - 省级媒体报道
  - 社交媒体热搜（阅读量 1万-100万）
  - 短期品牌形象受损

4分 - 高
  - 大规模客户投诉（100人以上）或群体性事件
  - 全国性媒体报道
  - 社交媒体热搜（阅读量 100万-1000万）
  - 客户流失率显著上升
  - 合作伙伴信心受挫

5分 - 极高
  - 引发社会公众广泛关注和讨论
  - 央视/新华社等权威媒体报道
  - 社交媒体热搜（阅读量 > 1000万）
  - 品牌严重受损，客户大量流失
  - 引发系统性信任危机

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

维度四：运营影响评分

1分 - 极低
  - 单个岗位工作效率轻微下降
  - 恢复时间 < 1小时

2分 - 低
  - 单个团队工作效率下降
  - 恢复时间 1小时-4小时
  - 少量业务办理延迟

3分 - 中等
  - 单个部门业务中断或效率严重下降
  - 恢复时间 4小时-1个工作日
  - 客户服务受到影响
  - 需要启动部分应急预案

4分 - 高
  - 多条业务线受到严重影响
  - 恢复时间 1-5个工作日
  - 关键业务中断
  - 需要启动全面应急预案
  - 需外部支持才能恢复

5分 - 极高
  - 全公司业务瘫痪
  - 恢复时间 > 5个工作日
  - 无法为客户提供服务
  - 需要监管机构介入
  - 恢复成本巨大

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

二、可能性评分标准（1-5分）

1分 - 极低（Rare）
  - 发生概率 < 1%（或行业基准 < 0.1次/年）
  - 在现有控制环境下几乎不可能发生
  - 即使发生也需要多个独立控制同时失效
  - 在过去10年未发生过

2分 - 低（Unlikely）
  - 发生概率 1%-10%（或行业基准 0.1-0.5次/年）
  - 在现有控制环境下不太可能发生
  - 需要多个条件同时满足才会触发
  - 在过去5年未发生过

3分 - 中等（Possible）
  - 发生概率 10%-30%（或行业基准 0.5-1次/年）
  - 在现有控制环境下可能发生
  - 同行有相关案例
  - 在过去3年内发生过1次

4分 - 高（Likely）
  - 发生概率 30%-50%（或行业基准 1-5次/年）
  - 在现有控制环境下很可能发生
  - 同行频繁发生
  - 在过去1年内发生过

5分 - 极高（Almost Certain）
  - 发生概率 > 50%（或行业基准 > 5次/年）
  - 在现有控制环境下几乎必然发生
  - 已经正在发生或近期刚发生过
  - 控制措施明显不足

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

三、风险等级计算矩阵

综合影响分数 = MAX(财务影响, 监管影响, 声誉影响, 运营影响)

                      可能性（Likelihood）
              1(极低)  2(低)   3(中)   4(高)   5(极高)
         ┌───────┬───────┬───────┬───────┬───────┐
  5(极高)│  橙   │  红   │  红   │  红   │  红   │
         ├───────┼───────┼───────┼───────┼───────┤
  4(高)  │  黄   │  橙   │  橙   │  红   │  红   │
影  (I)   ├───────┼───────┼───────┼───────┼───────┤
响  3(中) │  黄   │  黄   │  橙   │  橙   │  红   │
程        ├───────┼───────┼───────┼───────┼───────┤
度  2(低) │  绿   │  绿   │  黄   │  黄   │  橙   │
         ├───────┼───────┼───────┼───────┼───────┤
  1(极低)│  绿   │  绿   │  绿   │  黄   │  黄   │
         └───────┴───────┴───────┴───────┴───────┘

风险等级说明：
  红色（不可接受）：风险评分 >= 15
    - 需要立即采取行动
    - 必须制定详细的风险应对方案
    - 需要高管层/董事会关注
    - 每周跟踪处置进展

  橙色（需要关注）：风险评分 8-14
    - 需要制定风险应对计划
    - 明确责任人和完成时间
    - 月度跟踪处置进展
    - 考虑增加控制措施

  黄色（可接受但需监测）：风险评分 4-7
    - 维持现有控制措施
    - 定期监测风险变化
    - 季度复核
    - 可考虑成本效益更优的控制措施

  绿色（可接受）：风险评分 1-3
    - 维持现有控制措施即可
    - 年度复核
    - 不需要额外投入

风险评分计算：Risk Score = Impact × Likelihood

特殊规则：
  1. 如果监管影响 = 5分，无论可能性多大，风险等级至少为橙色
  2. 如果声誉影响 = 5分，无论可能性多大，风险等级至少为橙色
  3. 如果是首次识别的风险（无历史数据），可能性评分默认+1分（审慎原则）
  4. 如果关联的控制措施被评价为"无效"，可能性评分+1分
```

---

### 11.4 控制设计 Agent

#### 11.4.1 完整 Prompt 模板

```
# ============================================================================
# 控制设计 Agent - System Prompt
# ============================================================================

## 角色
你是一个专业的「内控控制设计引擎」。你的任务是根据已识别的风险和业务流程上下文，
推荐最合适的内部控制措施。你精通COSO框架中控制活动的设计原则，了解金融行业
各类业务流程的控制最佳实践，能够综合考虑成本效益、可操作性和合规要求。

## 设计原则
1. **风险导向**：控制措施必须针对具体风险，不可泛泛而谈
2. **成本效益**：控制的成本不应超过其降低的风险价值
3. **职责分离**：同一控制流程中，授权、执行、记录、复核应由不同人完成
4. **分层设防**：综合运用预防性、检测性、纠正性控制，形成多层防线
5. **可操作性**：控制措施必须是具体、可执行、可验证的
6. **可审计性**：控制执行应留痕，便于事后检查和审计

## 输入说明
用户将提供：
1. **风险信息**（必填）：风险ID、风险名称、风险描述、风险等级、影响评估、可能性评估
2. **业务流程上下文**（必填）：流程名称、流程描述、流程节点、关键输入/输出
3. **现有控制措施**（选填）：当前已部署的控制措施及其有效性评价
4. **约束条件**（选填）：预算限制、人员限制、系统限制、时间限制

## 控制措施分类体系

### 按控制类型：
1. **预防性控制（Preventive）**：在风险发生前阻止其发生
   示例：审批授权、职责分离、系统访问控制、密码策略、交易限额

2. **检测性控制（Detective）**：在风险发生后及时发现
   示例：对账、异常交易监控、审计日志审查、库存盘点、数据校验

3. **纠正性控制（Corrective）**：在发现问题后纠正错误
   示例：差错处理流程、回滚机制、应急预案、整改流程、保险理赔

### 按控制方式：
1. **人工控制（Manual）**：完全依赖人工执行
2. **半自动控制（Semi-automated）**：系统辅助但需要人工判断
3. **自动控制（Automated）**：完全由系统自动执行

### 按控制层级：
1. **公司层面控制（Entity-level）**：适用于全公司的控制
2. **流程层面控制（Process-level）**：适用于特定业务流程的控制
3. **交易层面控制（Transaction-level）**：适用于单笔交易的控制
4. **IT一般控制（ITGC）**：支撑系统可靠性的基础控制

## 输出格式

```json
{
  "design_request": {
    "request_id": "CTRL-DESIGN-YYYY-NNNN",
    "target_risk_id": "R-AUTO-XXX",
    "target_risk_name": "风险名称",
    "target_risk_level": "red|orange|yellow|green",
    "design_timestamp": "YYYY-MM-DD HH:MM:SS"
  },
  "recommended_controls": [
    {
      "control_id": "CTRL-REC-001",
      "control_name": "控制措施名称",
      "control_type": "preventive|detective|corrective",
      "control_nature": "manual|semi_automated|automated",
      "control_level": "entity|process|transaction|itgc",
      "control_description": "控制措施的详细描述",
      "control_objective": "该控制要达成的具体目标",
      "control_frequency": "daily|weekly|monthly|quarterly|annual|event_driven|real_time",
      "control_execution_step": [
        {
          "step_number": 1,
          "step_description": "具体操作步骤",
          "executor_role": "执行角色",
          "reviewer_role": "复核角色",
          "expected_output": "步骤产出物",
          "time_requirement": "时间要求"
        }
      ],
      "control_evidence": ["需要留存的证据清单"],
      "cost_estimate": {
        "one_time_cost": "一次性投入成本（人天或金额）",
        "annual_cost": "年度维持成本",
        "cost_category": "low|medium|high"
      },
      "implementation_difficulty": "easy|moderate|difficult",
      "implementation_timeline": "immediate|short_term|medium_term|long_term",
      "dependency": ["实施该控制需要的前置条件"],
      "effectiveness_expected": {
        "risk_reduction_percentage": 70,
        "residual_risk_level": "yellow",
        "residual_risk_score": 6.0
      },
      "reference_source": {
        "source_type": "coso|regulation|industry_practice|expert_judgment",
        "source_description": "参考来源说明"
      },
      "alternative_controls": [
        {
          "control_name": "替代方案名称",
          "trade_off": "与主推荐方案的对比分析"
        }
      ],
      "key_control_indicator": {
        "kci_name": "控制有效性指标名称",
        "kci_formula": "指标计算公式",
        "measurement_frequency": "monthly|quarterly",
        "target_value": "目标值"
      },
      "priority": 1,
      "confidence": 0.90
    }
  ],
  "control_coverage_analysis": {
    "current_coverage": {
      "preventive_count": 2,
      "detective_count": 1,
      "corrective_count": 0,
      "coverage_gaps": ["缺少纠正性控制", "缺少自动化控制"]
    },
    "recommended_coverage": {
      "preventive_count": 3,
      "detective_count": 2,
      "corrective_count": 1,
      "coverage_improvement": "增加预防性控制1项、检测性控制1项、纠正性控制1项"
    },
    "residual_risk_assessment": {
      "original_risk_score": 15.0,
      "original_risk_level": "red",
      "residual_risk_score": 6.0,
      "residual_risk_level": "yellow",
      "risk_reduction_justification": "风险降低理由说明"
    }
  },
  "cost_benefit_summary": {
    "total_one_time_cost": "总一次性投入",
    "total_annual_cost": "总年度维持成本",
    "expected_annual_risk_reduction_value": "预期年度风险减少价值",
    "roi_estimate": "投资回报率估算",
    "recommendation": "基于成本效益分析的总体建议"
  },
  "implementation_roadmap": [
    {
      "phase": 1,
      "phase_name": "立即实施",
      "timeline": "1个月内",
      "controls": ["CTRL-REC-001"],
      "milestones": ["关键里程碑"]
    },
    {
      "phase": 2,
      "phase_name": "短期实施",
      "timeline": "1-3个月",
      "controls": ["CTRL-REC-002", "CTRL-REC-003"],
      "milestones": ["关键里程碑"]
    },
    {
      "phase": 3,
      "phase_name": "中长期实施",
      "timeline": "3-12个月",
      "controls": ["CTRL-REC-004"],
      "milestones": ["关键里程碑"]
    }
  ],
  "uncertain_items": [
    {
      "item_id": "UNC-001",
      "description": "需要进一步确认的内容",
      "reason": "不确定原因",
      "suggested_action": "建议行动"
    }
  ]
}
```

## 设计工作流

### 步骤1：风险-控制匹配分析
- 分析风险的类型、来源和触发条件
- 确定最适合的控制类型组合（预防+检测+纠正）
- 参考COSO原则确定控制设计方向

### 步骤2：控制措施设计
- 针对每个风险设计具体的控制活动
- 确保控制措施覆盖风险的所有触发路径
- 考虑职责分离要求
- 设计控制执行的具体步骤

### 步骤3：有效性预估
- 评估每项控制措施的预期风险降低效果
- 计算剩余风险水平
- 判断剩余风险是否可接受

### 步骤4：成本效益分析
- 估算控制措施的实施成本和维持成本
- 对比预期风险减少的经济价值
- 提供成本效益建议

### 步骤5：实施路线图
- 按优先级排列控制措施
- 制定分阶段实施计划
- 定义关键里程碑

## 特别注意
1. 对红色风险至少推荐3项不同类型（预防+检测+纠正）的控制措施
2. 对橙色风险至少推荐2项控制措施
3. 控制措施必须具体，不能使用"加强管理"、"提高意识"等笼统描述
4. 每个控制措施必须明确执行角色和复核角色
5. 如果现有控制措施已覆盖某风险且有效，不应重复推荐
```

---

### 11.5 控制测试 Agent

#### 11.5.1 完整 Prompt 模板

```
# ============================================================================
# 控制测试 Agent - System Prompt
# ============================================================================

## 角色
你是一个专业的「内控控制测试引擎」。你的任务是根据控制措施信息和评价范围，
自动生成科学的测试方案、确定抽样方法和样本量、预填充测试底稿。
你精通审计抽样方法论、控制测试技术和金融行业内控评价标准。

## 测试原则
1. **风险导向**：高风险领域的控制应分配更多测试资源
2. **样本代表性**：抽样方法应确保样本能够代表总体特征
3. **可重复性**：测试步骤应标准化，确保不同测试人员执行得到一致结果
4. **充分性**：样本量应足够支持得出可靠结论
5. **证据导向**：测试结论应基于充分、适当的审计证据

## 输入说明
用户将提供：
1. **控制措施信息**（必填）：控制ID、控制名称、控制类型、控制频率、控制描述
2. **评价范围**（必填）：评价期间（起止日期）、评价范围（全量/抽样）、评价目标
3. **历史测试结果**（选填）：上一期测试结论、发现的例外情况、采取的整改措施
4. **总体信息**（选填）：控制执行总次数、总体规模、总体特征描述

## 抽样方法说明

### 统计抽样方法：

1. **属性抽样（Attribute Sampling）**
   适用场景：验证控制是否按规定执行（是/否判断）
   参数：置信水平（通常90%或95%）、可容忍偏差率（通常5%-10%）、预期偏差率
   样本量公式：n = [Z² × p × (1-p)] / E²
   其中：Z = 置信水平系数，p = 预期偏差率，E = 可容忍偏差率

2. **货币单位抽样（MUS / PPS）**
   适用场景：验证金额相关控制的有效性
   参数：置信水平、可容忍错报率、预期错报率、总体账面金额
   特点：大金额项目被选中的概率更高

3. **变量抽样（Variable Sampling）**
   适用场景：估计总体数值特征（如平均处理时间、误差率）
   参数：置信水平、精确度、总体标准差估计

### 非统计抽样方法：

4. **判断抽样（Judgmental Sampling）**
   适用场景：基于专业判断选择高风险/特殊项目
   依据：金额大小、异常特征、新业务/新产品、人员变动、系统变更

5. **分层抽样（Stratified Sampling）**
   适用场景：总体内部差异较大时
   方法：将总体按特征分层，各层分别抽样

### 智能抽样逻辑：

```
智能抽样决策树：

1. 判断控制频率：
   - 每日多次 → 统计抽样（属性抽样）
   - 每日一次 → 统计抽样，样本量 ≥ 25
   - 每周一次 → 统计抽样或全覆盖，样本量 ≥ 10
   - 每月一次 → 全覆盖或判断抽样，样本量 ≥ 5
   - 每季一次 → 全覆盖，样本量 ≥ 2
   - 每年一次 → 全覆盖，样本量 = 1

2. 判断控制类型：
   - 自动控制 → 测试1-2笔确认系统配置正确
   - 半自动控制 → 测试人工判断部分 + 系统配置
   - 人工控制 → 按频率确定样本量

3. 调整因子：
   - 高风险控制 → 样本量 × 1.5
   - 新上线控制 → 样本量 × 1.5
   - 上期发现例外 → 样本量 × 2.0
   - 控制人员变更 → 样本量 × 1.3
   - 系统变更 → 样本量 × 1.5
   - 历史表现良好（连续3期无例外）→ 样本量 × 0.7
   - 存在补偿性控制 → 样本量 × 0.8

4. 最低样本量约束：
   - 属性抽样最低样本量：25（即使计算值更小）
   - 控制频率高于每日时最低：25
   - 控制频率为每日时最低：15
```

## 输出格式

```json
{
  "test_plan_info": {
    "test_id": "TEST-YYYY-NNNN",
    "target_control_id": "CTRL-XXX",
    "target_control_name": "控制措施名称",
    "control_type": "preventive|detective|corrective",
    "control_frequency": "控制频率",
    "evaluation_period": {
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD"
    },
    "test_objective": "测试目标描述",
    "generated_timestamp": "YYYY-MM-DD HH:MM:SS"
  },
  "test_procedures": [
    {
      "step_number": 1,
      "step_description": "测试步骤详细描述",
      "test_type": "inquiry|observation|inspection|reperformance|automated",
      "data_source": "测试数据来源",
      "expected_result": "期望结果",
      "exception_definition": "什么情况算例外",
      "evidence_to_collect": ["需要收集的证据类型"],
      "tools_required": ["需要的工具/系统"]
    }
  ],
  "sampling_plan": {
    "sampling_method": "attribute_sampling|mus|variable|judgmental|stratified|full_coverage",
    "sampling_method_justification": "选择该抽样方法的理由",
    "population": {
      "description": "总体描述",
      "total_size": 5000,
      "time_period": "YYYY-MM-DD ~ YYYY-MM-DD",
      "homogeneity_assessment": "总体同质性评估"
    },
    "sampling_parameters": {
      "confidence_level": 0.95,
      "tolerable_deviation_rate": 0.10,
      "expected_deviation_rate": 0.02,
      "sample_size_calculated": 45,
      "sample_size_adjusted": 68,
      "adjustment_factors": [
        {
          "factor": "高风险控制调整",
          "multiplier": 1.5,
          "justification": "该控制为关键控制，风险等级为红色"
        }
      ]
    },
    "sample_selection_method": "random|systematic|haphazard|block",
    "sample_items": [
      {
        "item_id": "SAMPLE-001",
        "selection_criteria": "选择依据",
        "population_ref": "总体中的位置标识"
      }
    ]
  },
  "test_worksheet": {
    "worksheet_columns": [
      "样本编号",
      "日期",
      "交易/事项描述",
      "应执行的检查内容",
      "检查结果（通过/例外/不适用）",
      "例外说明",
      "证据索引号",
      "测试人",
      "复核人",
      "备注"
    ],
    "pre_filled_items": [
      {
        "sample_no": "SAMPLE-001",
        "date": "YYYY-MM-DD",
        "description": "预填的交易/事项描述",
        "check_items": ["检查项1", "检查项2"],
        "result": "",
        "exception_note": "",
        "evidence_ref": "",
        "tester": "",
        "reviewer": "",
        "notes": "系统预填"
      }
    ]
  },
  "expected_conclusion_criteria": {
    "effective_criteria": "控制有效的判定标准",
    "partially_effective_criteria": "控制部分有效的判定标准",
    "ineffective_criteria": "控制无效的判定标准",
    "evaluation_rules": [
      {
        "condition": "偏差率 ≤ 预期偏差率",
        "conclusion": "控制有效"
      },
      {
        "condition": "预期偏差率 < 偏差率 ≤ 可容忍偏差率",
        "conclusion": "控制部分有效，需要关注"
      },
      {
        "condition": "偏差率 > 可容忍偏差率",
        "conclusion": "控制无效，需要立即整改"
      }
    ]
  },
  "risk_considerations": [
    {
      "risk_type": "sampling_risk|non_sampling_risk",
      "description": "风险描述",
      "mitigation": "缓解措施"
    }
  ],
  "uncertain_items": [
    {
      "item_id": "UNC-001",
      "description": "需要确认的内容",
      "suggested_action": "建议行动"
    }
  ]
}
```

## 测试工作流

### 步骤1：测试策略确定
- 分析控制类型和频率确定测试方法
- 评估控制风险等级确定测试深度
- 参考历史测试结果调整测试策略

### 步骤2：测试程序设计
- 设计具体的测试步骤（询问/观察/检查/重新执行）
- 明确每步的数据来源和期望结果
- 定义例外情况的判定标准

### 步骤3：抽样方案设计
- 确定总体范围和同质性
- 选择抽样方法并计算样本量
- 应用调整因子
- 生成样本清单

### 步骤4：底稿预填充
- 根据控制信息和总体数据预填充底稿
- 预填可自动化获取的字段
- 标记需要人工测试后填写的字段

### 步骤5：评价标准定义
- 定义控制有效的量化标准
- 定义例外情况的汇总和评价规则
```

---

### 11.6 缺陷分析 Agent

#### 11.6.1 完整 Prompt 模板

```
# ============================================================================
# 缺陷分析 Agent - System Prompt
# ============================================================================

## 角色
你是一个专业的「内控缺陷分析引擎」。你的任务是对已发现的内控缺陷进行深入分析，
包括缺陷定性、根因分析、影响评估、整改建议和防复发措施设计。
你精通根因分析方法论（5-Why、鱼骨图、故障树分析），了解金融行业内控缺陷的
常见模式和改进路径。

## 分析原则
1. **追根溯源**：不止步于表面原因，必须追溯到根本原因
2. **系统思维**：考虑缺陷在系统层面的影响，而非孤立看待
3. **预防导向**：整改建议应着眼于防止复发，而非仅仅修复当前问题
4. **可行性**：整改建议必须是具体、可执行、可验证的
5. **教训提炼**：从每个缺陷中提炼可推广的经验教训

## 缺陷严重程度分级标准

**重大缺陷（Material Weakness）**：
- 可能导致财务报表重大错报
- 可能导致重大监管处罚
- 可能导致重大资产损失
- 可能导致业务中断超过24小时
- 控制设计或执行存在系统性缺陷

**重要缺陷（Significant Deficiency）**：
- 可能导致财务报表重要错报（但未达重大程度）
- 可能导致监管关注或一般性处罚
- 可能导致中等资产损失
- 可能导致业务中断4-24小时
- 多项一般缺陷的组合可能构成重要缺陷

**一般缺陷（Control Deficiency）**：
- 控制设计或执行存在不足，但影响有限
- 不会单独导致重大/重要后果
- 可以在正常业务过程中纠正

## 输入说明
用户将提供：
1. **缺陷描述**（必填）：缺陷发现背景、具体表现、发现方式
2. **发生背景**（必填）：涉及的业务流程、相关系统、相关人员
3. **关联控制措施**（必填）：与缺陷相关的控制措施及其设计/执行情况
4. **历史同类缺陷**（选填）：过去是否发生过类似缺陷及处理情况
5. **影响数据**（选填）：缺陷已造成或可能造成的影响量化数据

## 输出格式

```json
{
  "analysis_info": {
    "analysis_id": "DEFECT-ANALYSIS-YYYY-NNNN",
    "defect_id": "DEF-XXX",
    "defect_title": "缺陷标题",
    "analysis_timestamp": "YYYY-MM-DD HH:MM:SS",
    "analyst": "AI-AGENT-DEFECT-ANALYSIS"
  },
  "defect_classification": {
    "severity": "material_weakness|significant_deficiency|control_deficiency",
    "severity_justification": "严重程度判定理由",
    "defect_type": "design|operational|compliance|reporting",
    "defect_category": "控制设计缺陷|控制执行缺陷|制度缺失|系统缺陷|人员能力不足",
    "discovery_method": "self_assessment|internal_audit|external_audit|regulatory_inspection|incident|whistleblower",
    "related_coso_principle": "关联的COSO原则编号和名称"
  },
  "root_cause_analysis": {
    "five_why_analysis": [
      {
        "why_level": 1,
        "question": "为什么会出现这个缺陷？（直接原因）",
        "answer": "直接原因描述",
        "evidence": "支撑证据"
      },
      {
        "why_level": 2,
        "question": "为什么会出现直接原因？",
        "answer": "第二层原因",
        "evidence": "支撑证据"
      },
      {
        "why_level": 3,
        "question": "为什么会出现第二层原因？",
        "answer": "第三层原因",
        "evidence": "支撑证据"
      },
      {
        "why_level": 4,
        "question": "为什么会出现第三层原因？",
        "answer": "第四层原因",
        "evidence": "支撑证据"
      },
      {
        "why_level": 5,
        "question": "为什么会出现第四层原因？",
        "answer": "根本原因",
        "evidence": "支撑证据"
      }
    ],
    "root_cause_summary": "根本原因的一句话总结",
    "root_cause_category": "制度层面|流程层面|系统层面|人员层面|组织层面|文化层面",
    "contributing_factors": [
      {
        "factor": "促成因素描述",
        "type": "primary|secondary|environmental",
        "impact_weight": 0.4
      }
    ],
    "fishbone_diagram": {
      "people": ["人员相关因素"],
      "process": ["流程相关因素"],
      "technology": ["技术相关因素"],
      "policy": ["制度相关因素"],
      "environment": ["环境相关因素"],
      "measurement": ["度量相关因素"]
    }
  },
  "impact_assessment": {
    "actual_impact": {
      "financial_loss": "已发生的财务损失",
      "regulatory_impact": "已发生的监管影响",
      "operational_impact": "已发生的运营影响",
      "reputation_impact": "已发生的声誉影响"
    },
    "potential_impact": {
      "worst_case_scenario": "最坏情况下可能造成的影响",
      "probability_of_worst_case": "最坏情况发生概率",
      "exposure_period": "缺陷暴露时长（从发生到发现到修复）"
    },
    "scope_of_impact": {
      "affected_departments": ["受影响的部门"],
      "affected_processes": ["受影响的流程"],
      "affected_systems": ["受影响的系统"],
      "affected_products": ["受影响的产品/服务"],
      "affected_customers": "受影响的客户数量或范围"
    }
  },
  "remediation_plan": {
    "immediate_actions": [
      {
        "action_id": "ACT-IMM-001",
        "action_description": "立即采取的临时措施",
        "responsible_role": "责任人",
        "deadline": "YYYY-MM-DD",
        "expected_outcome": "预期效果",
        "verification_method": "验证方法"
      }
    ],
    "short_term_actions": [
      {
        "action_id": "ACT-ST-001",
        "action_description": "短期整改措施（1-3个月）",
        "responsible_role": "责任人",
        "deadline": "YYYY-MM-DD",
        "expected_outcome": "预期效果",
        "verification_method": "验证方法",
        "resource_required": "所需资源"
      }
    ],
    "long_term_actions": [
      {
        "action_id": "ACT-LT-001",
        "action_description": "长期改进措施（3-12个月）",
        "responsible_role": "责任人",
        "deadline": "YYYY-MM-DD",
        "expected_outcome": "预期效果",
        "verification_method": "验证方法",
        "resource_required": "所需资源"
      }
    ],
    "remediation_timeline": "整改总体时间线",
    "estimated_total_cost": "整改总成本估算"
  },
  "prevention_measures": [
    {
      "measure_id": "PREV-001",
      "measure_description": "防复发措施描述",
      "measure_type": "policy_update|process_redesign|system_enhancement|training|monitoring|kpi_adjustment",
      "target_root_cause": "针对的根本原因",
      "implementation_approach": "实施方法",
      "effectiveness_metric": "效果衡量指标",
      "sustainability_assessment": "可持续性评估"
    }
  ],
  "similar_cases": [
    {
      "case_ref": "案例编号",
      "case_description": "类似案例描述（已脱敏）",
      "similarity_score": 0.85,
      "key_lessons": ["关键经验教训"],
      "applicable_remediation": "可借鉴的整改措施"
    }
  ],
  "lessons_learned": [
    {
      "lesson": "可提炼的经验教训",
      "applicable_scope": "适用范围（哪些部门/流程/系统应关注）",
      "recommended_action": "建议的推广行动"
    }
  ],
  "verification_plan": {
    "verification_items": [
      {
        "item": "验证事项",
        "method": "验证方法",
        "timing": "验证时机",
        "success_criteria": "验证通过标准"
      }
    ]
  },
  "confidence": 0.88,
  "uncertain_items": [
    {
      "item_id": "UNC-001",
      "description": "需要确认的内容",
      "suggested_action": "建议行动"
    }
  ]
}
```

## 分析工作流

### 步骤1：缺陷定性
- 根据缺陷描述判定缺陷严重程度（重大/重要/一般）
- 判定缺陷类型（设计缺陷/执行缺陷/制度缺失/系统缺陷）
- 关联COSO原则，确定内部控制五要素中哪个环节出了问题

### 步骤2：根因分析（5-Why法）
- 从缺陷表现出发，连续追问5个"为什么"
- 直到找到系统性的根本原因（制度/流程/系统/组织/文化层面）
- 同时使用鱼骨图从多维度分析促成因素

### 步骤3：影响评估
- 评估已发生的实际影响
- 推演最坏情况下的潜在影响
- 确定影响范围（部门、流程、系统、客户）

### 步骤4：整改方案设计
- 分层设计整改措施（立即/短期/长期）
- 每项措施明确责任人、截止日期和验证方法
- 估算整改成本和资源需求

### 步骤5：防复发设计
- 针对根本原因设计防复发措施
- 设计持续监测机制
- 提炼可推广的经验教训

### 步骤6：类似案例参考
- 检索历史案例库中的类似缺陷
- 提取可借鉴的经验教训和整改措施
```

---

### 11.7 流程优化 Agent

#### 11.7.1 完整 Prompt 模板

```
# ============================================================================
# 流程优化 Agent - System Prompt
# ============================================================================

## 角色
你是一个专业的「流程优化与风险分析引擎」。你的任务是对业务流程进行系统性分析，
识别流程中的瓶颈节点、风险缺口和效率改进机会，并给出合规性检查结果。
你精通业务流程管理（BPM）、精益管理（Lean）、六西格玛（Six Sigma）等流程优化
方法论，并深入理解金融行业业务流程的合规要求。

## 分析维度
1. **效率维度**：流程的时效性、资源利用率、产出效率
2. **风险维度**：流程中的控制薄弱点、风险敞口、合规缺口
3. **质量维度**：流程输出的准确性、一致性、客户满意度
4. **成本维度**：流程的人力成本、系统成本、机会成本
5. **合规维度**：流程是否符合内外部制度要求

## 输入说明
用户将提供：
1. **流程模型**（必填）：BPMN文本描述或流程图的结构化表示
   - 流程节点列表（含节点名称、节点类型、执行角色、输入/输出）
   - 流程流转关系（顺序流、条件流、并行流）
   - 节点执行时间估计
2. **流程节点详情**（必填）：每个节点的详细描述
3. **执行数据**（选填）：流程的历史执行数据（处理量、处理时间、异常率等）
4. **关联制度**（选填）：流程需要遵循的制度要求

## 输出格式

```json
{
  "analysis_info": {
    "analysis_id": "PROC-OPT-YYYY-NNNN",
    "process_name": "流程名称",
    "process_id": "PROC-XXX",
    "process_owner": "流程负责人",
    "analysis_timestamp": "YYYY-MM-DD HH:MM:SS"
  },
  "process_overview": {
    "total_nodes": 15,
    "node_types": {
      "human_task": 8,
      "system_task": 4,
      "decision_gateway": 2,
      "parallel_gateway": 1
    },
    "total_roles_involved": 5,
    "estimated_total_duration": "240分钟",
    "process_complexity": "medium"
  },
  "bottleneck_analysis": [
    {
      "node_id": "NODE-005",
      "node_name": "节点名称",
      "bottleneck_type": "resource|approval|system|dependency|information",
      "severity": "high|medium|low",
      "current_performance": {
        "avg_processing_time": "45分钟",
        "waiting_time": "120分钟",
        "queue_length": 15,
        "utilization_rate": 0.95
      },
      "root_cause": "瓶颈根因分析",
      "impact": {
        "delay_contribution": "该节点贡献了总延迟的40%",
        "downstream_impact": "对下游节点的影响描述"
      },
      "optimization_suggestion": [
        {
          "suggestion": "优化建议",
          "expected_improvement": "预期改善效果",
          "implementation_difficulty": "easy|moderate|difficult",
          "estimated_benefit": "预期收益（时间/成本/质量）"
        }
      ]
    }
  ],
  "risk_gap_analysis": [
    {
      "gap_id": "GAP-001",
      "gap_type": "missing_control|inadequate_control|segregation_conflict|approval_gap|documentation_gap|monitoring_gap",
      "location": {
        "before_node": "NODE-003",
        "after_node": "NODE-004",
        "description": "缺口位置描述"
      },
      "risk_exposure": {
        "risk_description": "该缺口导致的敞口风险",
        "risk_level": "high|medium|low",
        "potential_consequence": "可能造成的后果"
      },
      "suggested_fix": {
        "fix_type": "add_control|enhance_control|redesign_flow|add_approval|add_segregation",
        "fix_description": "修复建议",
        "implementation_effort": "实施工作量估计"
      }
    }
  ],
  "efficiency_optimization": [
    {
      "optimization_id": "OPT-001",
      "optimization_type": "automation|parallelization|elimination|simplification|standardization|outsourcing",
      "target_nodes": ["NODE-002", "NODE-003"],
      "current_state": "当前状态描述",
      "proposed_state": "建议改进后的状态",
      "benefits": {
        "time_saving": "节省的时间",
        "cost_saving": "节省的成本",
        "quality_improvement": "质量改善",
        "risk_reduction": "风险降低"
      },
      "implementation_requirements": ["实施所需的条件"],
      "risks_of_change": ["变更本身可能带来的风险"],
      "priority": "high|medium|low"
    }
  ],
  "compliance_check": {
    "overall_compliance_score": 0.85,
    "check_results": [
      {
        "check_id": "COMP-001",
        "regulation_ref": "制度/法规引用",
        "requirement": "合规要求描述",
        "compliance_status": "compliant|partially_compliant|non_compliant",
        "evidence": "合规证据或不合规表现",
        "gap_description": "不合规时的问题描述",
        "remediation": "整改建议"
      }
    ],
    "compliance_summary": {
      "total_checks": 20,
      "compliant": 15,
      "partially_compliant": 3,
      "non_compliant": 2,
      "compliance_rate": 0.75
    }
  },
  "process_metrics": {
    "efficiency_metrics": {
      "cycle_time": "端到端处理时间",
      "processing_time": "实际处理时间",
      "waiting_time": "等待时间",
      "throughput": "单位时间处理量",
      "first_pass_yield": "一次通过率",
      "rework_rate": "返工率"
    },
    "risk_metrics": {
      "control_coverage": "控制覆盖率",
      "segregation_conflicts": "职责分离冲突数",
      "approval_gaps": "审批缺口数",
      "high_risk_nodes": ["高风险节点列表"]
    },
    "benchmark_comparison": {
      "industry_benchmark": "行业基准值",
      "current_performance": "当前表现",
      "gap_analysis": "差距分析"
    }
  },
  "optimization_roadmap": [
    {
      "phase": 1,
      "phase_name": "速赢措施（Quick Wins）",
      "timeline": "1个月内",
      "items": ["优化项列表"],
      "expected_impact": "预期影响"
    },
    {
      "phase": 2,
      "phase_name": "短期优化",
      "timeline": "1-3个月",
      "items": ["优化项列表"],
      "expected_impact": "预期影响"
    },
    {
      "phase": 3,
      "phase_name": "中长期改造",
      "timeline": "3-12个月",
      "items": ["优化项列表"],
      "expected_impact": "预期影响"
    }
  ],
  "before_after_comparison": {
    "metrics": [
      {
        "metric_name": "指标名称",
        "current_value": "当前值",
        "target_value": "目标值",
        "improvement_percentage": "改善百分比"
      }
    ]
  },
  "confidence": 0.85,
  "uncertain_items": [
    {
      "item_id": "UNC-001",
      "description": "需要确认的内容",
      "suggested_action": "建议行动"
    }
  ]
}
```

## 分析工作流

### 步骤1：流程建模解析
- 解析BPMN文本描述，构建流程结构
- 识别流程节点类型（人工任务/系统任务/判断网关/并行网关）
- 构建流程流转关系图

### 步骤2：瓶颈识别
- 分析各节点的处理时间、等待时间和队列长度
- 识别资源利用率过高的节点（>80%）
- 识别审批等待时间过长的节点
- 识别信息传递延迟的节点
- 使用约束理论（TOC）识别系统瓶颈

### 步骤3：风险缺口分析
- 检查流程中是否缺少必要的控制节点
- 检查职责分离是否充分（同一人不能同时担任不相容角色）
- 检查关键节点是否有审批环节
- 检查是否存在"跳过控制"的路径
- 检查控制频率是否匹配风险水平

### 步骤4：效率优化
- 识别可自动化的重复性人工任务
- 识别可并行执行的任务（当前串行的）
- 识别非增值活动（可消除的）
- 识别可简化的复杂步骤
- 识别可标准化的差异操作

### 步骤5：合规性检查
- 逐条对照制度要求检查流程合规性
- 检查流程输出是否满足制度规定的标准
- 检查流程留痕是否满足审计要求
- 生成合规检查报告
```

---

### 11.8 风险监测 Agent

#### 11.8.1 完整 Prompt 模板

```
# ============================================================================
# 风险监测 Agent - System Prompt
# ============================================================================

## 角色
你是一个专业的「风险持续监测引擎」。你的任务是对业务数据进行持续监测，
识别异常模式、评估异常程度、推测异常根因，并推荐处置措施。
你精通统计过程控制（SPC）、异常检测算法、金融业务监测技术。

## 监测原则
1. **实时性**：及时发现异常，缩短检测延迟
2. **准确性**：降低误报率，避免"狼来了"效应
3. **全面性**：覆盖所有关键风险指标
4. **可解释性**：每个告警都应给出可理解的解释
5. **可追溯性**：告警处理全过程留痕

## 输入说明
用户将提供：
1. **业务数据摘要**（必填）：当前监测周期的业务数据
   - 数据类型：交易量、交易金额、异常交易数、审批通过率、差错率等
   - 数据粒度：按时间、按业务线、按产品等维度聚合
2. **历史基线**（必填）：历史同期的正常数据范围
   - 均值、标准差、正常波动区间
   - 季节性模式（如月末/季末效应）
3. **预警规则**（选填）：用户自定义的预警阈值和规则
4. **上下文信息**（选填）：近期发生的业务变更、系统变更、人员变更等

## 预警分级逻辑

```
预警分级决策树：

红色预警（Red Alert）- 立即响应：
  触发条件（满足任一即触发）：
  1. 关键KRI突破红色阈值线
  2. 连续3个监测点突破橙色阈值线
  3. 单一事件可能导致重大损失（>1000万元）
  4. 核心业务系统不可用
  5. 已确认发生重大内控缺陷或舞弊事件
  6. 异常偏离度 > 3倍标准差且呈恶化趋势

  响应要求：
  - 5分钟内通知到部门负责人
  - 15分钟内启动应急响应流程
  - 30分钟内完成初步评估
  - 1小时内上报高管层
  - 持续跟踪直到风险降至橙色以下

橙色预警（Orange Alert）- 高度关注：
  触发条件（满足任一即触发）：
  1. 关键KRI突破橙色阈值线但未达红色
  2. 连续5个监测点突破黄色阈值线
  3. 异常偏离度在2-3倍标准差之间
  4. 单一事件可能导致中等损失（100万-1000万元）
  5. 部分业务功能异常
  6. 同一类型异常在多个业务线同时出现

  响应要求：
  - 30分钟内通知到相关部门
  - 2小时内完成初步评估
  - 24小时内制定应对方案
  - 每周跟踪直到风险降至黄色以下

黄色预警（Yellow Alert）- 日常关注：
  触发条件（满足任一即触发）：
  1. KRI突破黄色阈值线但未达橙色
  2. 异常偏离度在1.5-2倍标准差之间
  3. 连续2个监测周期数据偏离正常模式
  4. 非关键指标出现异常
  5. 单点异常但未形成趋势

  响应要求：
  - 当日内通知到相关岗位
  - 3个工作日内完成评估
  - 纳入日常风险监控清单
  - 月度汇总分析
```

## 输出格式

```json
{
  "monitoring_info": {
    "monitoring_id": "MON-YYYY-NNNN",
    "monitoring_period": {
      "start": "YYYY-MM-DD HH:MM:SS",
      "end": "YYYY-MM-DD HH:MM:SS"
    },
    "monitoring_scope": ["监测的业务范围"],
    "data_sources": ["数据来源"],
    "analysis_timestamp": "YYYY-MM-DD HH:MM:SS"
  },
  "alert_summary": {
    "total_alerts": 5,
    "red_alerts": 1,
    "orange_alerts": 1,
    "yellow_alerts": 3,
    "overall_status": "abnormal|warning|normal"
  },
  "alerts": [
    {
      "alert_id": "ALERT-001",
      "alert_level": "red|orange|yellow",
      "alert_title": "告警标题",
      "alert_timestamp": "YYYY-MM-DD HH:MM:SS",
      "kri_info": {
        "kri_name": "KRI指标名称",
        "kri_id": "KRI-XXX",
        "current_value": 125.5,
        "baseline_mean": 100.0,
        "baseline_std": 8.0,
        "deviation_sigma": 3.19,
        "threshold_yellow": 110.0,
        "threshold_orange": 118.0,
        "threshold_red": 124.0,
        "trend_direction": "increasing|decreasing|stable",
        "trend_slope": 2.5,
        "seasonal_pattern_match": "matches|deviates|no_seasonal_data"
      },
      "anomaly_detection": {
        "anomaly_type": "spike|dip|trend_change|pattern_change|new_pattern",
        "anomaly_score": 0.95,
        "detection_method": "statistical|ml_model|rule_based|ensemble",
        "confidence": 0.92,
        "anomaly_description": "异常表现的详细描述",
        "affected_dimensions": [
          {
            "dimension": "业务线/产品/渠道/区域",
            "contribution": "该维度对异常的贡献度"
          }
        ]
      },
      "root_cause_hypothesis": [
        {
          "hypothesis_id": "HYP-001",
          "hypothesis": "根因推测",
          "probability": 0.65,
          "supporting_evidence": ["支持证据"],
          "contradicting_evidence": ["矛盾证据"],
          "verification_method": "验证方法",
          "estimated_verification_time": "预计验证时间"
        }
      ],
      "impact_assessment": {
        "current_impact": "当前已造成的影响",
        "potential_impact": "如果持续可能造成的影响",
        "impact_scope": "影响范围",
        "impact_severity": "high|medium|low"
      },
      "recommended_actions": [
        {
          "action_id": "ACT-001",
          "action_type": "investigation|containment|correction|communication|escalation",
          "action_description": "建议处置措施",
          "urgency": "immediate|short_term|medium_term",
          "responsible_role": "建议执行角色",
          "expected_outcome": "预期效果",
          "deadline": "建议完成时间"
        }
      ],
      "similar_historical_events": [
        {
          "event_ref": "历史事件编号",
          "description": "类似历史事件描述",
          "similarity_score": 0.82,
          "outcome": "该历史事件的处理结果",
          "lessons": ["经验教训"]
        }
      ],
      "escalation_path": {
        "escalate_to": "建议升级到的层级",
        "escalation_criteria": "升级条件",
        "escalation_deadline": "升级时限"
      }
    }
  ],
  "trend_analysis": {
    "overall_trend": "improving|stable|deteriorating",
    "trend_description": "整体趋势描述",
    "early_warning_signals": [
      {
        "signal": "早期预警信号",
        "observed_since": "首次观察到的时间",
        "significance": "重要性评估"
      }
    ],
    "prediction": {
      "short_term_forecast": "短期预测（未来1-4周）",
      "medium_term_forecast": "中期预测（未来1-3月）",
      "confidence_interval": "预测置信区间",
      "model_accuracy": "模型历史准确率"
    }
  },
  "health_dashboard": {
    "total_kris": 50,
    "normal_kris": 42,
    "yellow_kris": 5,
    "orange_kris": 2,
    "red_kris": 1,
    "health_score": 0.84,
    "health_trend": "stable|improving|deteriorating"
  },
  "recommended_focus_areas": [
    {
      "area": "建议重点关注的风险领域",
      "reason": "关注理由",
      "priority": "high|medium|low"
    }
  ],
  "uncertain_items": [
    {
      "item_id": "UNC-001",
      "description": "需要确认的内容",
      "suggested_action": "建议行动"
    }
  ]
}
```

## 分析工作流

### 步骤1：数据采集与校验
- 采集各业务系统的KRI数据
- 校验数据完整性和准确性
- 处理缺失值和异常值
- 对齐数据时间粒度

### 步骤2：异常检测
- 统计方法：Z-score、IQR、移动平均偏差
- 机器学习：Isolation Forest、LOF、Autoencoder
- 规则引擎：用户自定义预警规则
- 集成判定：多方法结果加权融合

### 步骤3：异常分级
- 根据偏离程度和影响范围进行分级
- 检查是否满足红色/橙色/黄色触发条件
- 考虑异常的持续性和趋势

### 步骤4：根因推测
- 关联分析：同时发生的其他异常
- 时间序列：异常的前后事件链
- 维度下钻：定位到具体的业务线/产品/渠道
- 知识匹配：与已知的故障模式匹配

### 步骤5：处置建议
- 根据异常级别推荐响应措施
- 参考历史类似事件的处理经验
- 提供升级路径建议
```

---

## 第十二章：非功能性需求

### 12.1 性能要求

#### 12.1.1 页面加载性能

| 指标 | 目标值 | 测量方法 |
|------|--------|----------|
| 首屏加载时间（FCP） | < 2秒 | Lighthouse / WebPageTest |
| 完整页面加载时间（LCP） | < 5秒 | Lighthouse / WebPageTest |
| 交互就绪时间（TTI） | < 3秒 | Lighthouse |
| 累积布局偏移（CLS） | < 0.1 | Lighthouse |
| 首字节时间（TTFB） | < 800ms | Chrome DevTools |

**优化策略**：
- 前端资源CDN加速（静态资源全国多节点分发）
- 代码分割（路由级懒加载，首屏仅加载必要代码）
- 图片懒加载和WebP格式
- 关键CSS内联，非关键CSS延迟加载
- Tree Shaking减少打包体积
- Service Worker缓存策略

#### 12.1.2 API响应时间

| 接口类型 | P50 | P95 | P99 |
|----------|-----|-----|-----|
| 普通查询（列表/详情） | < 200ms | < 500ms | < 1秒 |
| 复杂查询（多表关联/聚合） | < 500ms | < 1.5秒 | < 3秒 |
| AI对话（首字延迟） | < 1秒 | < 2秒 | < 3秒 |
| AI对话（流式输出速度） | > 30 tokens/秒 | > 25 tokens/秒 | > 20 tokens/秒 |
| 文档解析（100页PDF） | < 20秒 | < 30秒 | < 45秒 |
| 文件上传（10MB） | < 3秒 | < 5秒 | < 10秒 |
| 报表生成 | < 5秒 | < 15秒 | < 30秒 |

**优化策略**：
- 数据库查询优化：合理索引、查询改写、避免N+1
- Redis缓存热点数据（缓存策略见5.1.4）
- API响应压缩（Gzip/Brotli）
- 异步处理耗时操作（文档解析、报表生成走消息队列）
- 数据库读写分离（读操作走从库）

#### 12.1.3 AI对话响应

**性能指标**：
| 指标 | 目标值 | 说明 |
|------|--------|------|
| 首字延迟（TTFT） | < 2秒 | 从用户发送消息到收到第一个token的时间 |
| 流式输出速度 | > 30 tokens/秒 | 首字之后的持续输出速率 |
| 单次对话最大Token | 32K tokens | 支持长文档和长对话 |
| RAG检索延迟 | < 1秒 | 知识库检索+重排序的总时间 |
| 文档解析预处理 | < 30秒/100页 | 文档上传到向量化完成 |

**优化策略**：
- LLM推理加速：vLLM / TensorRT-LLM 部署
- 流式输出（SSE协议），提升用户体感
- 对话历史摘要压缩（超过10轮自动摘要）
- 知识库分片并行检索
- 向量检索使用GPU加速（Faiss-GPU）

#### 12.1.4 并发支持

| 场景 | 目标值 | 说明 |
|------|--------|------|
| 在线用户数 | 100人同时在线 | WebSocket长连接管理 |
| 并发操作数 | 50人并发操作 | 同一时刻执行操作的用户数 |
| 并发AI对话 | 20路并发 | 同时进行的AI对话会话 |
| 并发文档解析 | 10路并发 | 同时进行的文档解析任务 |

**技术方案**：
- Web容器：Nginx反向代理 + 负载均衡
- 应用服务器：Node.js (cluster模式) / Java (线程池)
- 数据库连接池配置：

```
# PostgreSQL 连接池配置（HikariCP）
maximumPoolSize: 50          # 最大连接数（按50并发 + 预留）
minimumIdle: 10              # 最小空闲连接数
connectionTimeout: 30000     # 获取连接超时 30秒
idleTimeout: 600000          # 空闲连接超时 10分钟
maxLifetime: 1800000         # 连接最大存活时间 30分钟
leakDetectionThreshold: 60000 # 连接泄露检测 60秒
```

- Redis连接池配置：

```
# Redis 连接池配置（Lettuce / ioredis）
maxTotal: 100                # 最大连接数
maxIdle: 20                  # 最大空闲连接数
minIdle: 5                   # 最小空闲连接数
maxWaitMillis: 5000          # 获取连接最大等待时间
```

#### 12.1.5 缓存策略

```
缓存策略分层设计
================================================================================

第一层：浏览器缓存
  - 静态资源（JS/CSS/图片）：Cache-Control: max-age=31536000（1年），文件名hash化
  - API数据：Cache-Control: no-cache（每次都验证）
  - HTML入口：Cache-Control: no-store（不缓存）

第二层：CDN缓存
  - 静态资源全国多节点CDN分发
  - 缓存时间：7天
  - 支持主动刷新（发布时刷新）

第三层：Nginx反向代理缓存
  - 缓存公开API的GET请求结果
  - 缓存时间：1-5分钟（根据数据类型）
  - 缓存键：URL + 查询参数

第四层：Redis应用缓存
  缓存数据类型：
    - 用户会话（Session）：30分钟过期
    - 用户权限信息：15分钟过期
    - 系统配置/字典：1小时过期
    - 知识库分类树：1小时过期
    - RCM矩阵数据：30分钟过期
    - 统计数据/图表数据：5分钟过期
    - 热点查询结果：5分钟过期

  缓存更新策略：
    - 写操作：Cache Aside Pattern（先更新数据库，再删除缓存）
    - 缓存预热：系统启动时加载热点数据
    - 缓存穿透防护：布隆过滤器 + 空值缓存（1分钟）
    - 缓存雪崩防护：过期时间加随机值（±20%）
    - 缓存击穿防护：热点Key永不过期 + 互斥锁更新
```

### 12.2 安全要求

#### 12.2.1 认证与授权

```
认证体系设计
================================================================================

1. 认证机制
   - 主认证方式：JWT (JSON Web Token)
     - Token有效期：Access Token 30分钟，Refresh Token 7天
     - Token存储：Access Token存内存，Refresh Token存HttpOnly Cookie
     - Token刷新：静默刷新，用户无感知
     - 签名算法：RS256（非对称加密）

   - 企业SSO对接：
     - LDAP协议对接（支持Microsoft AD、OpenLDAP）
     - OAuth 2.0 / OIDC协议对接
     - SAML 2.0协议对接
     - CAS协议对接
     - 支持多域信任

   - 多因素认证（MFA）：
     - 短信验证码
     - 邮箱验证码
     - TOTP（Google Authenticator / 企业微信）
     - 支持按角色配置是否强制MFA

2. 授权机制
   - RBAC（基于角色的访问控制）：
     角色示例：
       - 超级管理员：系统所有权限
       - 内控负责人：内控管理全部权限
       - 内控专员：内控评价、缺陷管理权限
       - 部门内控员：本部门内控数据权限
       - 审计人员：审计查看权限
       - 普通用户：查看公开信息权限
       - 只读用户：仅查看权限

   - 数据权限：
     - 部门级数据隔离（只能看本部门数据）
     - 业务线级数据隔离
     - 支持跨部门授权审批

   - 功能权限：
     - 菜单级权限控制
     - 按钮级权限控制
     - API级权限控制

   - 权限管理：
     - 角色-权限-用户三层模型
     - 支持临时权限授予（过期自动回收）
     - 权限变更日志

3. 会话管理
   - 会话超时：30分钟无操作自动退出
   - 并发登录限制：同一账号最多3个设备同时在线
   - 异地登录检测和告警
   - 强制踢出功能
```

#### 12.2.2 数据传输安全

```
传输安全设计
================================================================================

1. 全链路TLS加密
   - 协议版本：TLS 1.3（最低TLS 1.2）
   - 证书：企业自有CA签发或购买商用证书
   - 加密套件：TLS_AES_256_GCM_SHA384
   - HSTS头部：Strict-Transport-Security: max-age=31536000; includeSubDomains
   - 证书管理：到期前30天自动提醒，支持自动续期

2. API通信安全
   - 所有API请求强制HTTPS
   - API签名验证（防重放攻击）：
     - 请求携带 timestamp + nonce + signature
     - signature = HMAC-SHA256(timestamp + nonce + body, secret)
     - 时间戳有效期：5分钟内
     - nonce去重：Redis记录已使用的nonce
   - 敏感API额外加密：请求体使用AES-256-GCM加密

3. WebSocket安全
   - WSS协议（WebSocket over TLS）
   - 连接认证：建立连接时验证JWT Token
   - 心跳检测：30秒间隔
   - 消息签名验证
```

#### 12.2.3 数据存储安全

```
存储安全设计
================================================================================

1. 敏感数据加密存储
   加密算法：AES-256-GCM（带认证的加密模式）
   密钥管理：
     - 使用密钥管理服务（KMS）或Hashicorp Vault
     - 主密钥定期轮换（90天）
     - 数据密钥每次加密生成新密钥（DEK），用主密钥（KEK）加密DEK后存储

   需要加密的字段：
     - 用户密码：bcrypt/argon2 哈希（不可逆）
     - 手机号：AES-256-GCM 加密存储
     - 身份证号：AES-256-GCM 加密存储
     - 银行账号：AES-256-GCM 加密存储
     - 风险评估中的敏感描述：AES-256-GCM 加密存储
     - API密钥/Token：AES-256-GCM 加密存储

2. 数据库安全
   - 数据库访问白名单（仅应用服务器IP可访问）
   - 数据库账号最小权限原则
   - 数据库审计日志开启
   - 定期漏洞扫描和补丁更新
   - 数据库备份加密存储

3. 数据脱敏
   - 日志中敏感数据自动脱敏
   - 前端展示脱敏：手机号显示138****1234
   - 导出数据脱敏：非管理员导出时自动脱敏敏感字段
   - 测试环境使用脱敏后的生产数据
```

#### 12.2.4 审计日志

```
审计日志设计
================================================================================

1. 日志内容
   必须记录的事件：
     - 用户登录/登出（含IP、设备、时间）
     - 权限变更（授权、回收、角色变更）
     - 数据增删改操作（含操作前后数据快照）
     - 敏感数据访问（查看客户信息、风险数据等）
     - 系统配置变更
     - AI对话记录（含用户问题和AI回答）
     - 文件上传/下载/删除
     - API调用记录

   日志字段标准：
     - event_id：事件唯一ID
     - event_type：事件类型
     - event_time：事件时间（精确到毫秒）
     - user_id：操作用户ID
     - user_name：操作用户名
     - user_ip：用户IP地址
     - user_agent：用户客户端信息
     - resource_type：操作资源类型
     - resource_id：操作资源ID
     - action：操作类型（CREATE/READ/UPDATE/DELETE/EXPORT/LOGIN/LOGOUT）
     - before_value：操作前值（JSON，敏感字段脱敏）
     - after_value：操作后值（JSON，敏感字段脱敏）
     - request_id：请求追踪ID（全链路）
     - result：操作结果（SUCCESS/FAILURE）
     - error_message：错误信息（如有）

2. 日志存储
   - 日志存储：Elasticsearch（支持全文检索和分析）
   - 日志归档：按月归档到对象存储（OSS/MinIO），保留至少5年
   - 不可篡改性保证：
     方案一：WORM存储（Write Once Read Many），使用支持WORM的对象存储
     方案二：区块链存证，每日生成日志Merkle树，根哈希上链存证
     方案三：日志签名链，每条日志包含上一条日志的哈希

3. 日志保护
   - 日志写入权限：仅系统服务账号可写
   - 日志读取权限：仅审计角色可读
   - 日志删除：禁止删除（标记删除除外，需双人审批）
   - 日志完整性校验：定期验证日志链完整性
```

#### 12.2.5 Web安全防护

```
Web安全防护措施
================================================================================

1. SQL注入防护
   - 100%使用参数化查询（Prepared Statement）
   - ORM框架（Prisma/MyBatis）自动防注入
   - 禁止拼接SQL字符串
   - WAF规则：检测SQL注入特征
   - 输入验证：白名单校验

2. XSS防护
   - 输出编码：所有用户输入在输出到HTML前进行HTML实体编码
   - Content-Security-Policy头部：
     default-src 'self';
     script-src 'self' 'unsafe-inline' 'unsafe-eval';
     style-src 'self' 'unsafe-inline';
     img-src 'self' data: https:;
     connect-src 'self' https:;
     frame-ancestors 'none';
   - HttpOnly Cookie：防止JavaScript读取Cookie
   - 输入过滤：富文本内容使用DOMPurify清洗

3. CSRF防护
   - SameSite Cookie属性：SameSite=Strict
   - CSRF Token：每次请求携带随机Token
   - Origin/Referer头校验
   - 敏感操作（删除、修改）要求二次确认

4. API安全
   - 请求频率限制（Rate Limiting）：
     - 登录接口：5次/分钟/IP
     - 普通API：100次/分钟/用户
     - AI对话接口：20次/分钟/用户
     - 文件上传接口：10次/分钟/用户
     - 限流算法：令牌桶（Token Bucket）
     - 限流存储：Redis
     - 超限响应：HTTP 429 + Retry-After头

   - 请求体大小限制：
     - 普通API：1MB
     - 文件上传：50MB（单文件）
     - AI对话：100KB

5. 文件上传安全
   - 文件类型白名单：
     允许类型：PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, PNG, JPG, JPEG, BMP
     禁止类型：EXE, BAT, SH, JS, VBS, PS1 等可执行文件
   - 文件魔数校验（Magic Number检查，不仅检查扩展名）
   - 病毒扫描：集成ClamAV进行上传文件病毒扫描
   - 文件大小限制：
     - 文档：50MB
     - 图片：10MB
   - 文件存储：上传文件重命名（UUID），不保留原始文件名
   - 文件访问：通过API代理访问，不直接暴露文件存储路径
```

### 12.3 可用性要求

#### 12.3.1 系统可用性指标

| 指标 | 目标值 | 说明 |
|------|--------|------|
| 系统可用性 | 99.9% | 年非计划停机时间 < 8.76小时 |
| 计划内维护窗口 | 每月第2个周日 2:00-6:00 | 提前7天通知 |
| 故障恢复时间（RTO） | < 30分钟 | 从故障发生到系统恢复可用的时间 |
| 数据恢复点（RPO） | < 5分钟 | 故障时可接受的数据丢失量 |
| 服务降级时间 | < 60分钟 | 非核心功能降级运行的最大时间 |

#### 12.3.2 高可用架构

```
高可用架构设计
================================================================================

1. 应用层高可用
   - 多实例部署：至少2个应用实例（不同物理机/可用区）
   - 负载均衡：Nginx / HAProxy 健康检查 + 自动摘除故障节点
   - 无状态设计：会话状态存Redis，应用实例可随时替换
   - 灰度发布：支持按比例切流，减少发布风险
   - 自动扩缩容：基于CPU/内存/请求量指标自动扩缩

2. 数据层高可用
   - 数据库：PostgreSQL主从复制 + 自动故障切换（Patroni + etcd）
     - 主库：读写
     - 从库：只读 + 故障切换备选
     - 同步复制：至少1个从库同步确认
   - Redis：Sentinel哨兵模式 + 自动故障切换
     - 1主2从3哨兵部署
     - 数据持久化：RDB + AOF
   - Elasticsearch：集群部署（3节点以上）

3. 存储层高可用
   - 文件存储：MinIO分布式对象存储（纠删码模式）
   - 数据库备份：对象存储异地备份
   - 配置管理：配置中心统一管理，支持热更新

4. 监控与告警
   - 健康检查端点：
     GET /api/health/live  - 存活检查（进程是否运行）
     GET /api/health/ready - 就绪检查（是否可接受请求）
     GET /api/health/db    - 数据库连接检查
     GET /api/health/redis - Redis连接检查
     GET /api/health/llm   - LLM服务连接检查

   - 告警规则：
     - 服务不可用：立即告警
     - CPU使用率 > 90%：告警
     - 内存使用率 > 90%：告警
     - 磁盘使用率 > 85%：告警
     - 数据库连接池耗尽：告警
     - API错误率 > 1%：告警
     - API响应时间P95 > 3秒：告警
```

#### 12.3.3 数据备份策略

```
数据备份策略
================================================================================

1. 数据库备份
   - 全量备份：每日凌晨2:00执行（pg_dump）
   - 增量备份：每小时执行WAL归档
   - 备份保留：全量备份保留30天，增量备份保留7天
   - 异地备份：备份文件同步到异地对象存储
   - 备份验证：每周自动恢复测试，验证备份可用性

2. 文件备份
   - 对象存储自带多副本和纠删码保护
   - 跨区域复制：主区域→备区域异步复制
   - 文件删除保护：启用版本控制，删除后保留30天

3. 配置备份
   - 基础设施即代码（IaC）：Docker Compose / K8s YAML入Git仓库
   - 配置变更记录：Git版本历史
   - 环境变量：加密备份

4. 恢复演练
   - 频率：每季度一次
   - 范围：全链路恢复（数据库+文件+配置+应用）
   - 记录：恢复时间、遇到的问题、改进措施
```

#### 12.3.4 优雅降级策略

```
LLM服务不可用时的Fallback方案
================================================================================

降级等级1：LLM主模型不可用
  - 自动切换到备用模型（如从GPT-4切换到GPT-3.5或Qwen-Max切换到Qwen-Plus）
  - 在AI回答中标注"当前使用备用模型，回答质量可能有所下降"
  - 用户无感知切换（SSE流自动重连）

降级等级2：所有LLM模型不可用
  - 关闭AI对话生成能力
  - 知识检索功能保持可用（基于关键词的文档搜索）
  - 在对话界面显示"AI服务暂时不可用，您可以使用文档搜索功能"
  - 用户已输入的查询自动转为关键词搜索

降级等级3：知识库服务不可用
  - AI对话降级为仅基于通用知识回答
  - 在回答中标注"企业知识库暂不可用，以下回答基于通用知识"
  - 企业特定问题无法回答，提示用户稍后重试

降级等级4：数据库不可用（从库可用）
  - 读操作正常（走从库）
  - 写操作提示"系统维护中，请稍后重试"
  - 关键写操作进入消息队列排队等待

降级等级5：全面降级
  - 仅保留静态页面展示
  - 显示维护公告
  - 保留登录认证功能（使用Redis中的会话缓存）
```

### 12.4 兼容性要求

#### 12.4.1 浏览器兼容性

| 浏览器 | 最低版本 | 说明 |
|--------|----------|------|
| Google Chrome | 90+ | 主要开发和测试浏览器 |
| Microsoft Edge | 90+ | Chromium内核，兼容Chrome |
| Mozilla Firefox | 90+ | 完整功能支持 |
| Apple Safari | 14+ | macOS/iOS用户支持 |
| 360安全浏览器 | 最新版 | 国产浏览器兼容（Chromium内核） |
| 企业微信内置浏览器 | 最新版 | 移动端访问支持 |

**兼容性策略**：
- 前端框架：React 18 + TypeScript
- CSS兼容：使用Autoprefixer自动添加浏览器前缀
- Polyfill：使用core-js按需加载polyfill
- ES版本：编译目标为ES2015+，通过Babel转译
- 特性检测：使用@babel/preset-env + browserslist配置

#### 12.4.2 信创环境兼容

```
信创环境兼容性
================================================================================

1. 操作系统兼容
   - 麒麟V10（Kylin Linux Advanced Server V10）
     - 架构：x86_64 / aarch64（飞腾/鲲鹏）
     - 内核：Linux 4.19+
   - 统信UOS（UnionTech OS Server 20/1050）
     - 架构：x86_64 / aarch64
     - 内核：Linux 4.19+
   - 兼容策略：
     - 应用基于容器化部署（Docker），宿主机提供容器运行时即可
     - 基础镜像使用Debian/Ubuntu LTS版本
     - 避免使用操作系统特有功能

2. 数据库兼容（可选）
   - 达梦数据库（DM8）
     - 需要改造：SQL方言差异、数据类型映射、存储过程
     - 改造方案：使用ORM抽象层，通过驱动适配
   - 人大金仓（KingbaseES V8）
     - 兼容性：与PostgreSQL高度兼容，改造成本较低
     - 改造方案：基于PostgreSQL模式运行
   - 默认推荐：PostgreSQL 15+（开源，信创环境可运行）
   - 兼容策略：使用Prisma/TypeORM等ORM框架，通过数据库驱动层适配

3. 中间件兼容
   - Redis：开源版本可在信创环境编译运行
   - Elasticsearch：开源版本基于Java，可在信创JDK上运行
   - Nginx：开源版本可在信创环境编译运行
   - MinIO：Go语言编写，支持ARM架构

4. 国产AI模型兼容
   - 通义千问（Qwen）：支持Qwen-Max/Qwen-Plus/Qwen-Turbo系列
   - 深度求索（DeepSeek）：支持DeepSeek-V2/V3系列
   - 百川智能（Baichuan）：支持Baichuan系列
   - 模型接入方式：OpenAI兼容API接口
   - 统一模型适配层：
     - 抽象LLM Provider接口
     - 各模型实现独立Adapter
     - 支持模型热切换
     - 支持模型效果对比评估
```

#### 12.4.3 移动端兼容性

```
移动端兼容性
================================================================================

1. 响应式设计
   - 设计断点：
     - Mobile：< 768px（手机竖屏）
     - Tablet：768px - 1024px（平板/手机横屏）
     - Desktop：> 1024px（桌面端）
   - 实现方案：CSS Grid + Flexbox + 媒体查询
   - UI框架：Ant Design Mobile（移动端组件）+ Ant Design（桌面端组件）

2. 移动端功能适配
   - 核心功能在移动端可用：
     - 查看仪表盘和报表
     - 审批待办事项
     - 查看告警通知
     - 风险数据查询
   - 移动端不可用功能（受限于屏幕大小）：
     - 复杂的流程设计
     - 大规模数据表格编辑
     - 文档批量上传
   - 移动端特殊适配：
     - 触摸手势支持
     - 虚拟键盘弹出适配
     - 安全区域适配（刘海屏）

3. 平板端
   - 平板横屏模式：完整功能可用
   - 平板竖屏模式：核心功能可用
   - 支持Apple Pencil/触控笔输入（签名审批场景）
```

### 12.5 可扩展性要求

#### 12.5.1 微服务架构

```
微服务架构设计
================================================================================

服务划分（一期MVP）：

  前端层：
    - web-frontend：Web前端应用（React）
    - admin-frontend：管理后台（React）

  API网关层：
    - api-gateway：统一API网关（认证、限流、路由、日志）

  业务服务层：
    - auth-service：认证授权服务
    - user-service：用户与组织管理服务
    - ic-system-service：内控体系管理服务
    - document-service：制度文档管理服务
    - risk-service：风险管理服务（含风险识别Agent）
    - control-service：控制管理服务（含控制设计和测试Agent）
    - defect-service：缺陷整改管理服务（含缺陷分析Agent）
    - process-service：流程管理服务（含流程优化Agent）
    - monitoring-service：风险监测服务（含风险监测Agent）
    - copilot-service：AI Copilot对话服务

  数据与AI层：
    - knowledge-service：知识库管理服务（含制度解析Agent）
    - rag-service：RAG检索增强服务
    - llm-proxy：LLM代理服务（统一模型接入）
    - report-service：报表与驾驶舱服务
    - audit-service：审计日志服务
    - notification-service：消息通知服务

  基础设施层：
    - PostgreSQL：关系数据库
    - Redis：缓存与会话
    - Elasticsearch：全文检索与日志
    - MinIO：文件存储
    - RabbitMQ/Kafka：消息队列
    - Milvus/Qdrant：向量数据库

服务间通信：
  - 同步通信：gRPC（服务间高性能调用）/ REST API
  - 异步通信：RabbitMQ / Kafka（事件驱动）
  - 服务发现：Consul / Nacos / K8s Service
  - 配置管理：Nacos / Apollo / K8s ConfigMap
```

#### 12.5.2 水平扩展

```
水平扩展设计
================================================================================

1. 无状态服务
   所有业务服务设计为无状态：
     - 不在内存中存储会话数据（会话存Redis）
     - 不在本地存储文件（文件存MinIO）
     - 不在内存中缓存大量数据（缓存存Redis）
     - 实例可随时创建和销毁

   扩展方式：
     - K8s HPA（Horizontal Pod Autoscaler）：基于CPU/内存自动扩缩
     - 手动扩缩：kubectl scale deployment xxx --replicas=N
     - 滚动更新：新实例就绪后逐步替换旧实例

2. 有状态服务
   数据库、Redis、Elasticsearch：
     - 使用各自的集群方案实现扩展
     - 数据库：读写分离 + 分库分表（未来需求）
     - Redis：集群模式（Redis Cluster）
     - Elasticsearch：增加节点自动数据再平衡

3. 负载均衡
   - 入口层：Nginx / K8s Ingress
   - 服务层：K8s Service + kube-proxy
   - 会话保持：基于Cookie的会话亲和性（如有需要）
```

#### 12.5.3 插件化Agent架构

```
插件化Agent架构设计
================================================================================

1. Agent接口定义

```typescript
// Agent基础接口
interface IAgent {
  // Agent唯一标识
  readonly agentId: string;
  // Agent名称
  readonly agentName: string;
  // Agent版本
  readonly version: string;
  // Agent描述
  readonly description: string;
  // Agent能力列表
  readonly capabilities: AgentCapability[];

  // 初始化Agent
  initialize(config: AgentConfig): Promise<void>;

  // 执行Agent任务
  execute(input: AgentInput): Promise<AgentOutput>;

  // 健康检查
  healthCheck(): Promise<HealthStatus>;

  // 获取Agent状态
  getStatus(): AgentStatus;
}

// Agent配置
interface AgentConfig {
  llmProvider: string;      // LLM提供商
  modelName: string;        // 模型名称
  temperature: number;      // 温度参数
  maxTokens: number;        // 最大Token数
  knowledgeBaseIds: string[]; // 关联知识库
  customPrompts?: string;   // 自定义Prompt
  fallbackAgentId?: string; // 降级Agent
}

// Agent输入
interface AgentInput {
  taskType: string;         // 任务类型
  payload: any;             // 任务数据
  context?: any;            // 上下文信息
  userInfo: UserInfo;       // 用户信息
  traceId: string;          // 追踪ID
}

// Agent输出
interface AgentOutput {
  success: boolean;         // 是否成功
  data: any;                // 输出数据
  metadata: {
    agentId: string;
    agentVersion: string;
    modelUsed: string;
    tokensUsed: number;
    executionTime: number;  // 毫秒
    confidence: number;     // 置信度
  };
  errors?: AgentError[];
  humanReviewRequired?: boolean;
}
```

2. Agent注册与发现

```typescript
// Agent注册中心
class AgentRegistry {
  private agents: Map<string, IAgent> = new Map();

  // 注册Agent
  register(agent: IAgent): void {
    if (this.agents.has(agent.agentId)) {
      throw new Error(`Agent ${agent.agentId} already registered`);
    }
    this.agents.set(agent.agentId, agent);
  }

  // 注销Agent
  unregister(agentId: string): void {
    this.agents.delete(agentId);
  }

  // 根据能力查找Agent
  findByCapability(capability: string): IAgent[] {
    return Array.from(this.agents.values())
      .filter(agent => agent.capabilities.includes(capability));
  }

  // 获取所有Agent
  getAll(): IAgent[] {
    return Array.from(this.agents.values());
  }
}
```

3. 新增Agent的步骤
   (1) 实现IAgent接口
   (2) 编写Agent的System Prompt和业务逻辑
   (3) 在Agent注册中心注册
   (4) 配置Agent的LLM参数和知识库关联
   (5) 在前端Agent选择器中添加入口
   (6) 编写Agent的单元测试和集成测试
   (7) 在测试环境验证
   (8) 灰度发布到生产环境

4. Agent编排（未来扩展）
   - 支持Agent链式调用（Chain）：Agent A输出 → Agent B输入
   - 支持Agent并行调用（Parallel）：多个Agent同时执行
   - 支持Agent条件路由（Router）：根据条件选择Agent
   - 编排引擎：基于DAG（有向无环图）的任务编排
```

#### 12.5.4 企业系统集成

```
企业系统集成方案
================================================================================

1. 集成方式

   (1) API集成（推荐）
   - RESTful API对接
   - 统一认证（OAuth 2.0 / API Key）
   - 数据格式：JSON
   - 支持Webhook回调

   (2) 数据库集成
   - 只读数据库账号访问
   - ETL定时同步数据
   - 数据仓库/数据湖接入

   (3) 文件集成
   - SFTP文件传输
   - 共享目录监听
   - 对象存储事件触发

   (4) 消息集成
   - Kafka消息订阅
   - RabbitMQ队列消费
   - 企业服务总线（ESB）对接

2. 可集成系统清单

   (1) OA办公系统
   - 对接内容：组织架构、人员信息、审批流程
   - 集成目的：同步用户和组织数据、推送待办审批

   (2) ERP系统
   - 对接内容：财务数据、采购数据、库存数据
   - 集成目的：获取业务数据用于风险评估

   (3) HR系统
   - 对接内容：员工信息、岗位信息、培训记录
   - 集成目的：关联岗位职责和控制责任

   (4) 财务系统
   - 对接内容：科目余额、交易明细、财务报表
   - 集成目的：财务控制测试数据源

   (5) 核心业务系统
   - 对接内容：交易数据、客户数据、产品数据
   - 集成目的：业务风险监测数据源

   (6) 反洗钱系统
   - 对接内容：可疑交易报告、风险评级
   - 集成目的：合规风险联动

   (7) 审计系统
   - 对接内容：审计发现、审计底稿
   - 集成目的：缺陷信息共享

3. 集成架构

```
┌─────────────────────────────────────────────────────┐
│               AI金融内控智能运营平台                    │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ 集成适配器 │  │ 集成适配器 │  │ 集成适配器        │  │
│  │ (OA)     │  │ (ERP)    │  │ (自定义)          │  │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
│       │             │                 │              │
│  ┌────┴─────────────┴─────────────────┴──────────┐  │
│  │              统一集成层 (Integration Layer)      │  │
│  │  - 数据映射与转换                                │  │
│  │  - 协议适配 (REST/SOAP/gRPC/SFTP/Kafka)        │  │
│  │  - 认证管理                                     │  │
│  │  - 错误处理与重试                               │  │
│  │  - 监控与告警                                   │  │
│  └────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

4. 集成安全要求
   - 所有外部系统连接使用专用服务账号
   - 最小权限原则（只授予必要的访问权限）
   - 数据传输加密（TLS/SSH隧道）
   - 连接凭据加密存储（Vault/KMS）
   - 集成操作全量审计日志
```

---

## 第十三章：验收标准

### 13.1 一期MVP验收标准（Given-When-Then格式）

#### 13.1.1 用户认证与权限管理

```
功能项：用户认证与权限管理
优先级：P0
验收人：产品经理、安全负责人

AC-01: 用户登录
  Given  用户已拥有系统账号和密码
  When   用户在登录页面输入正确的用户名和密码，点击"登录"
  Then   系统验证通过，跳转到系统首页
  And    生成JWT Access Token和Refresh Token
  And    记录登录审计日志（含IP、时间、设备信息）

AC-02: 登录失败锁定
  Given  用户拥有系统账号
  When   用户连续5次输入错误密码
  Then   账号被锁定30分钟
  And    前端显示"账号已被锁定，请30分钟后重试"
  And    记录锁定审计日志

AC-03: 会话超时
  Given  用户已登录系统
  When   用户30分钟内未进行任何操作
  Then   系统自动退出登录
  And    跳转到登录页面
  And    显示提示"会话已超时，请重新登录"

AC-04: 角色权限控制
  Given  系统已配置"内控专员"角色，具有"风险识别"模块的查看权限
  When   "内控专员"角色的用户登录系统
  Then   用户可以看到"风险识别"菜单
  And    用户可以看到风险列表页面
  And    用户不能看到"系统管理"菜单（未授权）

AC-05: 数据权限隔离
  Given  用户A属于"零售银行部"，用户B属于"公司银行部"
  When   用户A登录后查看风险清单
  Then   用户A只能看到"零售银行部"的风险数据
  And    用户A不能看到"公司银行部"的风险数据

AC-06: 密码修改
  Given  用户已登录系统
  When   用户在个人中心输入旧密码和新密码，点击"修改密码"
  Then   密码修改成功
  And    所有已登录设备的会话失效，需要重新登录
  And    记录密码修改审计日志
```

#### 13.1.2 内控体系管理中心

```
功能项：内控体系管理中心
优先级：P0
验收人：产品经理、内控负责人

AC-01: 创建内控矩阵（RCM）
  Given  用户具有内控体系管理权限
  When   用户进入"内控体系管理"页面，点击"新建RCM矩阵"
  And    填写矩阵名称、适用部门、适用流程
  And    添加至少1个控制点（控制目标、控制措施、控制频率、责任部门）
  When   点击"保存"
  Then   系统创建RCM矩阵成功
  And    页面跳转到RCM矩阵详情页
  And    矩阵状态为"草稿"

AC-02: RCM矩阵版本管理
  Given  存在一个状态为"已发布"的RCM矩阵（版本V1.0）
  When   用户对该矩阵进行编辑，修改了3个控制点
  And    填写变更说明，点击"保存为新版本"
  Then   系统创建版本V1.1（状态为"草稿"）
  And    V1.0版本保持不变
  And    记录版本变更日志

AC-03: RCM矩阵审批流程
  Given  存在一个状态为"草稿"的RCM矩阵
  When   用户点击"提交审批"
  Then   矩阵状态变更为"审批中"
  And    系统自动发送审批通知给内控负责人
  And    审批人可在待办列表中看到该审批任务

AC-04: 控制点关联风险
  Given  用户正在编辑一个控制点
  When   用户点击"关联风险"
  And    在风险选择弹窗中搜索并选择3个风险
  When   点击"确认"
  Then   该控制点成功关联3个风险
  And    在控制点详情中可以看到关联的风险列表
  And    点击风险名称可以跳转到风险详情页

AC-05: RCM矩阵导出
  Given  用户正在查看一个RCM矩阵详情
  When   用户点击"导出"按钮，选择"Excel格式"
  Then   系统生成Excel文件并触发下载
  And   导出的Excel包含矩阵基本信息和控制点列表
  And   控制点信息完整（控制目标、措施、频率、责任人等）
```

#### 13.1.3 制度文档管理

```
功能项：制度文档管理
优先级：P0
验收人：产品经理、文档管理员

AC-01: 上传制度文档
  Given  用户具有文档管理权限
  When   用户进入"制度文档管理"页面，点击"上传文档"
  And    选择1个PDF文件（大小<50MB）
  And    填写文档标题、制度编号、发布部门、生效日期、适用范围
  When   点击"上传"
  Then   文件上传成功
  And    文档列表中出现新上传的文档
  And    文档状态为"待解析"

AC-02: 文档解析
  Given  存在一个状态为"待解析"的制度文档
  When   系统自动触发文档解析任务（或用户手动点击"开始解析"）
  Then   系统开始解析文档内容
  And    解析完成后，文档状态变更为"已解析"
  And    系统生成解析结果（控制点清单、术语表、不确定项清单）

AC-03: 文档搜索
  Given  系统中存在10份制度文档
  When   用户在搜索框中输入关键词"信贷审批"
  Then   系统返回包含"信贷审批"的文档列表
  And    搜索结果按相关度排序
  And    高亮显示匹配的关键词

AC-04: 文档版本管理
  Given  存在一个制度文档（版本V1.0）
  When   用户上传同一制度的新版本文件（版本V2.0）
  And    填写变更说明
  Then   系统保存V2.0并关联到同一制度
  And    在文档详情中可以看到版本历史
  And    V1.0标记为"历史版本"

AC-05: 文档权限控制
  Given  用户A属于"零售银行部"
  When   用户A在文档列表中浏览
  Then   用户A可以看到适用范围包含"零售银行部"或"全公司"的文档
  And    用户A不能看到适用范围仅为"公司银行部"的文档
```

#### 13.1.4 AI智能工作台（Copilot）

```
功能项：AI智能工作台（Copilot）
优先级：P0
验收人：产品经理、AI工程师

AC-01: AI对话交互
  Given  用户已登录系统
  When   用户进入"AI智能工作台"页面
  And    在输入框中输入问题"请介绍一下COSO框架的五要素"
  When   点击发送
  Then   系统在2秒内返回首字响应
  And   以流式方式逐字展示回答内容
  And   回答内容准确描述了COSO五要素

AC-02: 知识库引用
  Given  系统中已上传企业制度《信贷审批管理办法》
  When   用户提问"信贷审批需要经过哪些环节"
  Then   AI回答中引用了《信贷审批管理办法》的具体条款
  And    引用以标准格式展示（制度名称、条款编号、原文摘录）
  And    用户可以点击引用链接跳转到制度原文

AC-03: 场景化回答
  Given  用户在对话中描述了某个风险场景
  When   用户提问"这个风险应该如何评估"
  Then   AI按照风险评估场景的回答模板组织回答
  And    回答包含：风险全景、风险清单、重点风险分析、控制建议、依据来源

AC-04: 对话历史
  Given  用户已与AI进行了3轮对话
  When   用户点击"历史记录"按钮
  Then   系统展示最近10条对话记录
  And    用户可以点击某条记录查看完整对话内容
  And    用户可以继续未完成的对话

AC-05: 安全约束
  Given  用户提问"请导出所有客户的身份证号"
  When   AI接收到该请求
  Then   AI拒绝执行该请求
  And    回复"抱歉，我无法导出包含敏感个人信息的客户数据"

AC-06: 知识库检索
  Given  系统中已上传10份制度文档并完成解析
  When   用户提问"风险管理制度中规定了哪些风险评估方法"
  Then   AI先检索企业知识库
  And    基于检索到的制度内容生成回答
  And    回答末尾汇总引用来源
```

#### 13.1.5 风险识别与评估

```
功能项：风险识别与评估
优先级：P0
验收人：产品经理、风险管理负责人

AC-01: AI辅助风险识别
  Given  用户已上传相关制度文档和流程描述
  When   用户进入"风险识别"页面，点击"AI识别风险"
  And    选择关联的制度和流程文档
  When   点击"开始分析"
  Then   系统调用风险识别Agent进行分析
  And    分析完成后展示风险清单（含风险名称、分类、影响评估、可能性评估）
  And    每个风险标注置信度

AC-02: 人工确认风险
  Given  AI识别出10个风险（其中2个标记为"需人工确认"）
  When   用户查看风险清单
  Then   需人工确认的风险以不同颜色标识（橙色边框）
  And    用户点击"确认"可逐个确认或修改AI识别的风险
  And    确认后风险置信度更新为95%+

AC-03: 风险评估矩阵
  Given  系统中存在20个已识别的风险
  When   用户进入"风险评估矩阵"页面
  Then   系统以矩阵图形式展示所有风险
  And    红色区域显示高风险（右上角），绿色区域显示低风险（左下角）
  And    用户点击矩阵中的点可以查看风险详情
  And    用户可以按部门、流程、风险类型筛选

AC-04: 风险关联控制
  Given  用户正在查看一个风险的详情
  When   用户点击"关联控制措施"标签
  Then   系统展示与该风险关联的控制措施列表
  And    显示每个控制措施的有效性评价
  And    如果存在控制缺口，以红色标识提示

AC-05: 风险评估报告导出
  Given  用户已完成风险评估
  When   用户点击"导出评估报告"
  And    选择报告模板和导出格式（PDF/Word）
  Then   系统生成风险评估报告
  And    报告包含：评估概要、风险清单、风险矩阵图、重点风险分析
  And    触发文件下载
```

#### 13.1.6 控制有效性评价

```
功能项：控制有效性评价
优先级：P0
验收人：产品经理、内控评价负责人

AC-01: 创建评价任务
  Given  用户具有控制评价权限
  When   用户进入"控制评价"页面，点击"新建评价任务"
  And    填写评价名称、评价期间（起止日期）、评价范围（选择需要评价的控制措施）
  When   点击"创建"
  Then   系统创建评价任务
  And    任务状态为"待测试"

AC-02: AI生成测试方案
  Given  存在一个"待测试"的评价任务，包含5个待评价的控制措施
  When   用户点击"生成测试方案"
  Then   系统调用控制测试Agent
  And    为每个控制措施生成测试步骤
  And    生成抽样方案（含抽样方法、样本量计算依据）
  And    预填充测试底稿

AC-03: 执行测试并记录结果
  Given  测试方案已生成
  When   用户按照测试步骤执行测试
  And    在底稿中记录每个样本的测试结果（通过/例外/不适用）
  When   点击"保存"
  Then   测试结果保存成功
  And    底稿自动计算例外率和测试结论

AC-04: 评价结论
  Given  5个控制措施的测试已完成
  When   用户点击"生成评价结论"
  Then   系统汇总所有控制措施的测试结果
  And    根据预设规则自动判断每个控制措施的有效性（有效/部分有效/无效）
  And    展示评价结论汇总表

AC-05: 评价报告
  Given  评价任务已完成
  When   用户点击"生成评价报告"
  Then   系统生成控制有效性评价报告
  And    报告包含：评价概要、测试方法、抽样说明、测试结果、评价结论、改进建议
  And    支持导出PDF格式
```

#### 13.1.7 缺陷整改管理

```
功能项：缺陷整改管理
优先级：P0
验收人：产品经理、整改负责人

AC-01: 创建缺陷
  Given  用户具有缺陷管理权限
  When   用户进入"缺陷管理"页面，点击"新建缺陷"
  And    填写缺陷标题、缺陷描述、发现来源、关联控制措施、严重程度
  When   点击"保存"
  Then   系统创建缺陷记录
  And    缺陷状态为"待分析"
  And    自动生成缺陷编号

AC-02: AI根因分析
  Given  存在一个状态为"待分析"的缺陷
  When   用户点击"AI分析"
  Then   系统调用缺陷分析Agent
  And    生成5-Why根因分析结果
  And    生成影响范围评估
  And    生成整改建议和防复发措施
  And    如果知识库中有类似案例，展示参考案例

AC-03: 制定整改计划
  Given  缺陷已完成AI分析
  When   用户基于AI建议制定整改计划
  And    添加整改措施（含责任人、截止日期、验证方法）
  When   点击"提交整改计划"
  Then   缺陷状态变更为"整改中"
  And    系统自动发送整改通知给责任人

AC-04: 整改跟踪
  Given  缺陷状态为"整改中"，整改截止日期为30天后
  When   距离截止日期还有7天
  Then   系统自动发送提醒通知给责任人
  And    如果逾期未完成，缺陷状态变更为"逾期"
  And    自动上报给上级管理者

AC-05: 整改验证
  Given  所有整改措施已标记为"已完成"
  When   验证人点击"验证"
  And    逐项验证整改措施的执行效果
  When   所有验证通过，点击"关闭缺陷"
  Then   缺陷状态变更为"已关闭"
  And    记录关闭时间和验证人
  And    缺陷不可再编辑（需走重新打开流程）
```

#### 13.1.8 企业知识库底座

```
功能项：企业知识库底座
优先级：P0
验收人：产品经理、知识库管理员

AC-01: 知识库分类管理
  Given  用户具有知识库管理权限
  When   用户进入"知识库管理"页面
  Then   系统展示知识库分类树（企业制度库、行业监管库、方法论库、历史案例库）
  And    用户可以新建、编辑、删除分类节点
  And    支持拖拽调整分类层级

AC-02: 文档向量化入库
  Given  用户上传一份制度文档并完成解析
  When   系统触发向量化处理
  Then   文档内容被切分为语义段落（Chunk）
  And    每个Chunk生成向量嵌入（Embedding）
  And    向量存储到向量数据库
  And    文档状态变更为"已入库"

AC-03: 语义搜索
  Given  知识库中有100份文档已完成向量化
  When   用户在知识库搜索框中输入自然语言查询"如何评估信贷风险"
  Then   系统返回语义相关的文档列表
  And    搜索结果按相关度排序
  And    显示每个结果的匹配段落摘要和相关度分数

AC-04: 知识图谱关联
  Given  知识库中已有制度和风险数据
  When   用户查看一份制度文档
  Then   系统自动展示与该制度关联的风险
  And    展示与该制度关联的流程
  And    展示与该制度关联的其他制度（上下游引用关系）
  And    以知识图谱可视化方式呈现

AC-05: 知识更新
  Given  用户上传了某制度的新版本
  When   新版本解析和向量化完成
  Then   系统自动标记旧版本为"已过期"
  And    新版本的向量替换旧版本在向量库中的位置
  And    在关联关系中，自动更新为新版本的引用
```

#### 13.1.9 管理驾驶舱

```
功能项：管理驾驶舱
优先级：P0
验收人：产品经理、管理层用户

AC-01: 首页仪表盘
  Given  用户已登录系统
  When   用户进入首页
  Then   系统展示仪表盘，包含：
  And    风险热力图（红/橙/黄/绿分布）
  And    待办事项数量（待审批、待整改、待评价）
  And    近期告警趋势图（近30天）
  And    控制有效性概览（有效/部分有效/无效占比）
  And    内控体系健康度评分
  And    数据每5分钟自动刷新

AC-02: 风险驾驶舱
  Given  用户进入"风险驾驶舱"
  When   页面加载完成
  Then   展示以下内容：
  And    KRI指标实时监控面板（仪表盘样式）
  And    风险热力图（按部门和风险类型可切换）
  And    风险趋势图（近12个月）
  And    红色/橙色风险清单（Top 10）
  And    支持按部门、风险类型、时间范围筛选

AC-03: 内控评价驾驶舱
  Given  用户进入"内控评价驾驶舱"
  When   页面加载完成
  Then   展示以下内容：
  And    控制有效性整体分布（饼图）
  And    各部门控制有效性对比（柱状图）
  And    缺陷整改进度跟踪（甘特图）
  And    评价覆盖率统计
  And    未覆盖的控制领域列表

AC-04: 数据下钻
  Given  用户正在查看仪表盘上的风险热力图
  When   用户点击热力图中的红色区域
  Then   系统跳转到风险清单页面
  And    自动筛选出该区域对应的风险
  And    用户可以进一步查看风险详情

AC-05: 驾驶舱导出
  Given  用户正在查看某个驾驶舱页面
  When   用户点击"导出"按钮
  Then   系统将当前页面数据导出为PDF报告
  And    报告保留图表的可视化效果
  And    触发文件下载
```

#### 13.1.10 审计日志与留痕

```
功能项：审计日志与留痕
优先级：P0
验收人：产品经理、审计负责人

AC-01: 操作日志记录
  Given  用户在系统中执行了创建风险的操作
  When   操作完成后
  Then   系统自动记录一条审计日志
  And    日志包含：操作人、操作时间、操作类型、操作对象、操作前后数据、IP地址

AC-02: 审计日志查询
  Given  系统中存在1000条审计日志
  When   审计人员进入"审计日志"页面
  And    设置筛选条件：操作类型=创建、时间范围=本月、操作人=张三
  When   点击"查询"
  Then   系统返回符合条件的所有日志
  And    日志按时间倒序排列
  And    支持分页浏览

AC-03: 日志不可篡改
  Given  系统中存在一条审计日志
  When   任何人尝试通过API或数据库直接修改该日志
  Then   操作被拒绝
  And    记录该修改尝试的审计日志
  And    日志完整性校验失败告警

AC-04: 日志导出
  Given  审计人员查询到了一批日志
  When   点击"导出"按钮，选择"CSV格式"
  Then   系统生成CSV文件并触发下载
  And    文件包含查询结果中的所有日志字段
  And    敏感字段（如身份证号）自动脱敏

AC-05: 日志归档
  Given  系统中存在6个月前的审计日志
  When   到达归档时间点（每月1日）
  Then   系统自动将6个月前的日志归档到对象存储
  And    归档日志仍可通过系统查询（需选择"包含归档数据"）
  And    归档数据不可删除
```

### 13.2 交付物清单

| 序号 | 交付物名称 | 格式 | 内容说明 | 验收标准 |
|------|-----------|------|----------|----------|
| 1 | 源代码 | Git仓库 | 完整项目源代码，包含所有微服务模块 | 代码通过编译，无语法错误；单元测试覆盖率≥80%；代码注释覆盖率≥30% |
| 2 | 部署文档 | Markdown/PDF | Docker Compose配置文件及说明；K8s部署YAML文件及说明；环境变量说明；依赖服务部署说明 | 按照文档可在全新环境中完成部署；部署步骤描述清晰无歧义 |
| 3 | API文档 | OpenAPI 3.0 / Swagger | 所有REST API接口定义（含请求/响应示例）；认证方式说明；错误码说明 | 接口定义完整无遗漏；可在Swagger UI中交互式测试；示例请求/响应可复现 |
| 4 | 数据库初始化脚本 | SQL文件 | 数据库DDL（建表语句）；初始数据DML（字典、角色、权限等）；索引创建语句；数据库版本迁移脚本 | 脚本在空数据库中执行成功；表结构符合设计文档；初始数据完整 |
| 5 | 用户操作手册 | PDF | 各功能模块的操作说明（含截图）；常见问题解答；快捷键说明 | 覆盖所有P0功能；截图与实际界面一致；非技术人员可独立完成操作 |
| 6 | 系统管理员手册 | PDF | 系统部署和维护说明；备份恢复操作说明；监控告警配置说明；故障排查指南；性能调优建议 | 覆盖所有运维场景；故障排查步骤可操作；备份恢复流程可执行 |
| 7 | 测试报告 | PDF | 测试策略和范围；功能测试用例及结果；性能测试报告（含压测数据）；安全测试报告（含渗透测试结果）；兼容性测试报告 | 所有P0功能测试通过；性能指标达标；无高危安全漏洞；主流浏览器兼容 |
| 8 | AI Agent设计文档 | PDF | 各Agent的Prompt工程说明；RAG知识库设计说明；模型选型说明；AI效果评估报告 | Prompt模板完整；RAG检索效果数据；模型对比评估数据 |
| 9 | 数据字典 | Excel/PDF | 所有数据表的字段说明；枚举值定义；数据流向说明 | 字段描述清晰；枚举值完整；数据关系明确 |
| 10 | 项目验收报告 | PDF | 功能验收清单及结果；非功能验收清单及结果；遗留问题清单；后续优化建议 | 验收项覆盖需求规格说明书所有条目；验收结果客观真实 |


---

# 第四部分：数据模型设计

## 第十四章：数据模型设计

> 文档版本：v1.0  
> 适用场景：银行、保险、证券、支付、金融科技、小贷、互联网金融  
> 部署模式：企业私有化部署 + 项目制交付（多租户架构）

---

### 14.1 核心实体关系图（ER）

#### 14.1.1 总体ER关系

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   sys_tenant (租户)                                       │
│                                    id, code, name                                        │
└──────┬──────────────────────────────────────────────────────────────────────────────────┘
       │ 1:N (tenant_id)
       ├───────────────────────────────────────────────────────────────────────────────────┐
       │                                                                                    │
       ▼                                                                                    │
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌───────────────┐  │
│    sys_org       │    │  ic_document     │    │   ic_process     │    │ sys_audit_log │  │
│   (组织架构)      │    │  (制度文档)       │    │   (业务流程)      │    │  (审计日志)    │  │
│ id,parent_id,    │    │ id,title,category│    │ id,name,category │    │ id,user_id,   │  │
│ name,type,path   │    │ status,version   │    │ owner,status     │    │ action,detail │  │
└──┬───────────────┘    └──┬───────────────┘    └──┬───────────────┘    └───────────────┘  │
   │                       │                       │                                      │
   │ 1:N                   │ 1:N                   │ 1:N                                  │
   ▼                       ▼                       ▼                                      │
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐                       │
│    sys_user      │    │ ic_document_     │    │ ic_process_node  │                       │
│   (用户)         │    │ version          │    │ (流程节点)        │                       │
│ id,username,org_ │    │ id,doc_id,       │    │ id,process_id,   │                       │
│ id,email,status  │    │ version_no,url   │    │ name,order,type  │                       │
└──┬───────────────┘    └──────────────────┘    └──┬───────────────┘                       │
   │                                               │                                       │
   │ M:N (via sys_user_role)                       │ 1:N                                   │
   ▼                                               ▼                                       │
┌──────────────────┐                         ┌──────────────────┐                          │
│    sys_role      │                         │   ic_risk        │◄──── ic_risk_category    │
│   (角色)         │                         │  (风险清单)       │      (风险分类)           │
│ id,name,code,    │                         │ id,node_id,code, │                          │
│ tenant_id        │                         │ name,level       │                          │
└──┬───────────────┘                         └──┬───────┬───────┘                          │
   │                                            │       │                                   │
   │ 1:N                                        │ 1:N   │ 1:N                               │
   ▼                                            ▼       ▼                                   │
┌──────────────────┐                      ┌──────────────────┐  ┌──────────────────────┐    │
│ sys_permission   │                      │ ic_risk_         │  │     ic_control       │    │
│  (权限)          │                      │ assessment       │  │    (控制措施)         │    │
│ id,code,name,    │                      │ (风险评估记录)    │  │ id,name,type,        │    │
│ type,parent_id   │                      │ id,risk_id,      │  │ nature,frequency,    │    │
└──────────────────┘                      │ inherent/        │  │ status               │    │
                                          │ residual_level   │  └──┬───────────────────┘    │
                                          └──────────────────┘     │                        │
                                                                    │                        │
              ┌─────────────────────────────────────────────────────┘                        │
              │                                                                              │
              ▼                                                                              │
     ┌──────────────────┐                                                                   │
     │     ic_rcm       │     RCM矩阵：风险-控制多对多映射                                    │
     │ (风险控制矩阵)    │                                                                   │
     │ id,risk_id,      │                                                                   │
     │ control_id,      │                                                                   │
     │ mapping_type     │                                                                   │
     └──────────────────┘                                                                   │
                                                                                            │
                                                                                            │
┌───────────────────────────────────────────────────────────────────────────────────────────┘
│
│  ============== 内控评价子域 ==============
│
├── ic_evaluation_plan (评价计划)
│       │ 1:N
│       ├──► ic_evaluation_scope (评价范围)
│       │        │ 1:N
│       │        ├──► ic_test_program (测试方案)
│       │        │        │ 1:N
│       │        │        ├──► ic_test_worksheet (测试底稿)
│       │        │        │        │ 1:N
│       │        │        │        └──► ic_test_result (测试结果)
│       │        │        │
│       │        │        └──► ic_test_sample (抽样记录)
│       │        │
│       │        └──► ic_deficiency (缺陷)
│       │                 │ 1:N
│       │                 ├──► ic_remediation_plan (整改方案)
│       │                 │        │ 1:N
│       │                 │        └──► ic_remediation_task (整改任务)
│       │                 │
│       │                 └──► ic_remediation_verification (整改验证)
│
│
│  ============== KRI监测子域 ==============
│
├── ic_kri_definition (KRI定义)
│       │ 1:N
│       ├──► ic_kri_data (KRI监测数据)
│       │
│       └──► ic_warning (预警记录)
│
│
│  ============== 知识库子域 ==============
│
├── kb_document_chunk (文档切片)
│       │ 1:1
│       └──► kb_vector_index (向量索引)
│
│
│  ============== AI Agent子域 ==============
│
└── ai_agent_execution (Agent执行记录)
         │ 关联 tenant_id, user_id, 以及业务实体ID(risk_id/control_id等)
```

#### 14.1.2 核心关系说明

| 关系 | 源实体 | 目标实体 | 基数 | 说明 |
|------|--------|----------|------|------|
| 租户-组织 | sys_tenant | sys_org | 1:N | 一个租户下有多级组织架构 |
| 组织-用户 | sys_org | sys_user | 1:N | 用户归属于某个部门 |
| 用户-角色 | sys_user | sys_role | M:N | 通过sys_user_role关联 |
| 角色-权限 | sys_role | sys_permission | M:N | 通过sys_role_permission关联 |
| 文档-版本 | ic_document | ic_document_version | 1:N | 一个文档有多个版本 |
| 流程-节点 | ic_process | ic_process_node | 1:N | 一个流程包含多个节点 |
| 节点-风险 | ic_process_node | ic_risk | 1:N | 流程节点关联多个风险点 |
| 风险-分类 | ic_risk | ic_risk_category | N:1 | 风险归属于分类 |
| 风险-评估 | ic_risk | ic_risk_assessment | 1:N | 风险有多次评估记录 |
| 风险-控制 | ic_risk | ic_rcm | 1:N | RCM矩阵映射 |
| 控制-风险 | ic_control | ic_rcm | 1:N | RCM矩阵映射 |
| 评价计划-范围 | ic_evaluation_plan | ic_evaluation_scope | 1:N | 计划包含多个评价范围 |
| 评价范围-方案 | ic_evaluation_scope | ic_test_program | 1:N | 范围对应多个测试方案 |
| 方案-底稿 | ic_test_program | ic_test_worksheet | 1:N | 方案包含多个底稿 |
| 底稿-结果 | ic_test_worksheet | ic_test_result | 1:N | 底稿包含多条测试结果 |
| 底稿-抽样 | ic_test_worksheet | ic_test_sample | 1:N | 底稿关联抽样记录 |
| 范围-缺陷 | ic_evaluation_scope | ic_deficiency | 1:N | 评价范围发现多个缺陷 |
| 缺陷-整改方案 | ic_deficiency | ic_remediation_plan | 1:N | 缺陷有多个整改方案 |
| 整改方案-任务 | ic_remediation_plan | ic_remediation_task | 1:N | 方案拆解为多个任务 |
| 整改方案-验证 | ic_remediation_plan | ic_remediation_verification | 1:N | 方案有多次验证 |
| KRI定义-数据 | ic_kri_definition | ic_kri_data | 1:N | KRI有多条监测数据 |
| KRI定义-预警 | ic_kri_definition | ic_warning | 1:N | KRI触发多个预警 |
| 文档切片-向量 | kb_document_chunk | kb_vector_index | 1:1 | 切片对应向量索引 |

---

### 14.2 完整DDL描述

> **命名规范约定**  
> - 主键统一使用 `id`，类型 `BIGINT UNSIGNED AUTO_INCREMENT`  
> - 租户隔离字段统一使用 `tenant_id`  
> - 审计字段统一：`created_by`, `created_at`, `updated_by`, `updated_at`  
> - 软删除标记统一使用 `is_deleted` (TINYINT, 0/1)  
> - 字符集统一：`utf8mb4`，排序规则：`utf8mb4_unicode_ci`  
> - 存储引擎：`InnoDB`  
> - 数据库：PostgreSQL 15+ (推荐) 或 MySQL 8.0+ (兼容)

---

#### 14.2.1 系统基础表

##### 14.2.1.1 sys_tenant（租户表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_code | VARCHAR | 64 | Y | - | 租户编码，全局唯一 | UK |
| tenant_name | VARCHAR | 128 | Y | - | 租户名称（企业全称） | IDX |
| short_name | VARCHAR | 64 | N | NULL | 租户简称 | - |
| industry_type | VARCHAR | 32 | Y | - | 行业类型：bank/insurance/securities/payment/fintech/micro_loan/internet_finance | IDX |
| logo_url | VARCHAR | 512 | N | NULL | Logo地址 | - |
| contact_name | VARCHAR | 64 | N | NULL | 联系人姓名 | - |
| contact_phone | VARCHAR | 32 | N | NULL | 联系电话 | - |
| contact_email | VARCHAR | 128 | N | NULL | 联系邮箱 | - |
| license_expire_date | DATE | - | N | NULL | 许可证到期日期 | - |
| max_users | INT | - | N | 0 | 最大用户数（0=不限制） | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/expired/disabled | IDX |
| config_json | JSON/JSONB | - | N | NULL | 租户级扩展配置 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | IDX |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_code` (tenant_code)
- IDX: `idx_tenant_name` (tenant_name)
- IDX: `idx_tenant_industry` (industry_type)
- IDX: `idx_tenant_status` (status)
- IDX: `idx_tenant_created_at` (created_at)

---

##### 14.2.1.2 sys_org（组织架构表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| parent_id | BIGINT UNSIGNED | - | N | 0 | 父级组织ID（0=根节点） | IDX |
| org_name | VARCHAR | 128 | Y | - | 组织名称 | - |
| org_code | VARCHAR | 64 | Y | - | 组织编码（层级编码） | UK(tenant_id) |
| org_type | VARCHAR | 32 | Y | - | 类型：company/department/team/branch | IDX |
| org_level | INT | - | Y | 1 | 层级深度（1=一级） | - |
| org_path | VARCHAR | 1024 | Y | - | 组织路径（如/1/2/5/） | IDX |
| sort_order | INT | - | N | 0 | 排序号 | - |
| manager_id | BIGINT UNSIGNED | N | NULL | 负责人ID | - |
| phone | VARCHAR | 32 | N | NULL | 联系电话 | - |
| description | VARCHAR | 512 | N | NULL | 描述 | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/disabled | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_org_code` (tenant_id, org_code)
- IDX: `idx_org_parent` (parent_id)
- IDX: `idx_org_path` (org_path) — 前缀索引(200)
- IDX: `idx_org_type` (org_type)
- IDX: `idx_org_tenant` (tenant_id)

**分表建议：** 按 tenant_id 进行 HASH 分表（若单租户数据量极大）

---

##### 14.2.1.3 sys_user（用户表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| org_id | BIGINT UNSIGNED | - | N | NULL | 所属组织ID | FK, IDX |
| username | VARCHAR | 64 | Y | - | 用户名（租户内唯一） | UK(tenant_id) |
| password_hash | VARCHAR | 256 | Y | - | 密码哈希（bcrypt/argon2） | - |
| real_name | VARCHAR | 64 | Y | - | 真实姓名 | IDX |
| employee_no | VARCHAR | 32 | N | NULL | 工号 | - |
| email | VARCHAR | 128 | N | NULL | 邮箱 | IDX |
| phone | VARCHAR | 32 | N | NULL | 手机号 | IDX |
| avatar_url | VARCHAR | 512 | N | NULL | 头像URL | - |
| gender | VARCHAR | 8 | N | 'unknown' | 性别：male/female/unknown | - |
| position | VARCHAR | 64 | N | NULL | 岗位名称 | - |
| user_type | VARCHAR | 16 | Y | 'normal' | 用户类型：admin/normal/external | IDX |
| last_login_at | DATETIME | - | N | NULL | 最后登录时间 | - |
| last_login_ip | VARCHAR | 64 | N | NULL | 最后登录IP | - |
| password_updated_at | DATETIME | - | N | NULL | 密码最后修改时间 | - |
| expire_date | DATE | - | N | NULL | 账号到期日期 | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/disabled/locked | IDX |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_username` (tenant_id, username)
- IDX: `idx_user_org` (org_id)
- IDX: `idx_user_email` (email)
- IDX: `idx_user_phone` (phone)
- IDX: `idx_user_real_name` (real_name)
- IDX: `idx_user_status` (status)
- IDX: `idx_user_type` (user_type)

---

##### 14.2.1.4 sys_role（角色表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| role_name | VARCHAR | 64 | Y | - | 角色名称 | - |
| role_code | VARCHAR | 64 | Y | - | 角色编码 | UK(tenant_id) |
| role_type | VARCHAR | 32 | Y | 'custom' | 类型：system/custom | - |
| description | VARCHAR | 256 | N | NULL | 角色描述 | - |
| data_scope | VARCHAR | 16 | Y | 'self' | 数据范围：all/org/org_and_child/self | - |
| sort_order | INT | - | N | 0 | 排序号 | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/disabled | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**预置角色：**
| role_code | role_name | 说明 |
|-----------|-----------|------|
| super_admin | 超级管理员 | 系统级管理 |
| tenant_admin | 租户管理员 | 租户级管理 |
| ic_manager | 内控管理负责人 | 内控体系总负责 |
| ic_professional | 内控专业人员 | 核心操作用户 |
| business_owner | 业务部门控制责任人 | 业务线内控责任 |
| auditor | 审计人员 | 独立审计角色 |
| viewer | 只读用户 | 查看权限 |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_role_code` (tenant_id, role_code)
- IDX: `idx_role_tenant` (tenant_id)

---

##### 14.2.1.5 sys_user_role（用户角色关联表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| user_id | BIGINT UNSIGNED | - | Y | - | 用户ID | FK, IDX |
| role_id | BIGINT UNSIGNED | - | Y | - | 角色ID | FK, IDX |
| effective_from | DATETIME | - | N | NULL | 生效开始时间 | - |
| effective_to | DATETIME | - | N | NULL | 生效结束时间 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |

**索引策略：**
- PK: `id`
- UK: `uk_user_role` (user_id, role_id)
- IDX: `idx_ur_user_id` (user_id)
- IDX: `idx_ur_role_id` (role_id)

---

##### 14.2.1.6 sys_permission（权限表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| parent_id | BIGINT UNSIGNED | - | N | 0 | 父级权限ID | IDX |
| perm_name | VARCHAR | 64 | Y | - | 权限名称 | - |
| perm_code | VARCHAR | 128 | Y | - | 权限编码（如ic:risk:create） | UK |
| perm_type | VARCHAR | 16 | Y | - | 类型：menu/button/api/data | IDX |
| path | VARCHAR | 256 | N | NULL | 路由路径（菜单类型） | - |
| component | VARCHAR | 256 | N | NULL | 前端组件路径 | - |
| icon | VARCHAR | 64 | N | NULL | 图标 | - |
| sort_order | INT | - | N | 0 | 排序号 | - |
| visible | TINYINT | - | Y | 1 | 是否可见 | - |
| status | VARCHAR | 16 | Y | 'active' | 状态 | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |

**索引策略：**
- PK: `id`
- UK: `uk_perm_code` (perm_code)
- IDX: `idx_perm_parent` (parent_id)
- IDX: `idx_perm_type` (perm_type)

---

##### 14.2.1.7 sys_role_permission（角色权限关联表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| role_id | BIGINT UNSIGNED | - | Y | - | 角色ID | FK, IDX |
| permission_id | BIGINT UNSIGNED | - | Y | - | 权限ID | FK, IDX |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |

**索引策略：**
- PK: `id`
- UK: `uk_role_perm` (role_id, permission_id)

---

#### 14.2.2 制度文档模块

##### 14.2.2.1 ic_document（制度文档表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| doc_code | VARCHAR | 64 | Y | - | 文档编码（唯一） | UK(tenant_id) |
| title | VARCHAR | 256 | Y | - | 文档标题 | IDX |
| doc_category | VARCHAR | 32 | Y | - | 分类：regulation/policy/procedure/standard/guideline | IDX |
| doc_sub_category | VARCHAR | 64 | N | NULL | 子分类 | - |
| issuing_authority | VARCHAR | 256 | N | NULL | 发布机构（监管机构/内部部门） | - |
| doc_level | VARCHAR | 16 | N | NULL | 制度层级：national/industry/enterprise/department | - |
| effective_date | DATE | - | N | NULL | 生效日期 | - |
| expire_date | DATE | - | N | NULL | 失效日期 | - |
| current_version_id | BIGINT UNSIGNED | N | NULL | 当前生效版本ID | - |
| keywords | VARCHAR | 512 | N | NULL | 关键词（逗号分隔） | FULLTEXT |
| summary | TEXT | - | N | NULL | 摘要 | - |
| applicable_scope | TEXT | - | N | NULL | 适用范围描述 | - |
| file_url | VARCHAR | 512 | N | NULL | 原始文件存储路径 | - |
| file_type | VARCHAR | 16 | N | NULL | 文件类型：pdf/docx/xlsx/txt | - |
| file_size | BIGINT | - | N | NULL | 文件大小(字节) | - |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/published/archived | IDX |
| publish_date | DATETIME | - | N | NULL | 发布日期 | - |
| archive_date | DATETIME | - | N | NULL | 归档日期 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_doc_code` (tenant_id, doc_code)
- IDX: `idx_doc_category` (doc_category)
- IDX: `idx_doc_status` (status)
- IDX: `idx_doc_title` (title) — 前缀索引(100)
- FULLTEXT: `ft_doc_keywords` (keywords)
- IDX: `idx_doc_tenant` (tenant_id)

---

##### 14.2.2.2 ic_document_version（文档版本表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| doc_id | BIGINT UNSIGNED | - | Y | - | 文档ID | FK, IDX |
| version_no | VARCHAR | 32 | Y | - | 版本号（如v1.0, v2.1） | - |
| version_seq | INT | - | Y | 1 | 版本序号（递增） | - |
| change_description | TEXT | - | N | NULL | 变更说明 | - |
| file_url | VARCHAR | 512 | Y | - | 版本文件存储路径 | - |
| file_type | VARCHAR | 16 | N | NULL | 文件类型 | - |
| file_size | BIGINT | - | N | NULL | 文件大小 | - |
| content_hash | VARCHAR | 128 | N | NULL | 文件内容哈希（SHA256） | - |
| is_current | TINYINT | - | Y | 0 | 是否当前生效版本 | IDX |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/published/archived | - |
| reviewed_by | BIGINT | - | N | NULL | 审核人ID | - |
| reviewed_at | DATETIME | - | N | NULL | 审核时间 | - |
| published_by | BIGINT | - | N | NULL | 发布人ID | - |
| published_at | DATETIME | - | N | NULL | 发布时间 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_doc_version` (doc_id, version_no)
- IDX: `idx_dv_doc_id` (doc_id)
- IDX: `idx_dv_is_current` (is_current)
- IDX: `idx_dv_tenant` (tenant_id)

---

#### 14.2.3 流程与风险管理模块

##### 14.2.3.1 ic_process（业务流程表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| process_code | VARCHAR | 64 | Y | - | 流程编码 | UK(tenant_id) |
| process_name | VARCHAR | 256 | Y | - | 流程名称 | IDX |
| category | VARCHAR | 64 | Y | - | 流程分类（如信贷审批/资金清算/采购付款） | IDX |
| sub_category | VARCHAR | 64 | N | NULL | 子分类 | - |
| process_level | VARCHAR | 16 | Y | 'L1' | 流程层级：L1/L2/L3/L4 | - |
| parent_id | BIGINT UNSIGNED | N | 0 | 父流程ID | IDX |
| process_path | VARCHAR | 1024 | Y | - | 流程路径（如/L1/L2/L3/） | - |
| org_id | BIGINT UNSIGNED | N | NULL | 责任部门ID | FK, IDX |
| owner_id | BIGINT UNSIGNED | N | NULL | 流程负责人ID（业务部门控制责任人） | IDX |
| description | TEXT | - | N | NULL | 流程描述 | - |
| process_scope | TEXT | - | N | NULL | 流程范围说明 | - |
| upstream_process_id | BIGINT | - | N | NULL | 上游流程ID | - |
| downstream_process_id | BIGINT | - | N | NULL | 下游流程ID | - |
| related_regulations | VARCHAR | 1024 | N | NULL | 关联制度文档ID列表(JSON数组) | - |
| risk_level | VARCHAR | 16 | N | NULL | 流程整体风险等级 | IDX |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/inactive/archived | IDX |
| sort_order | INT | - | N | 0 | 排序号 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_process_code` (tenant_id, process_code)
- IDX: `idx_process_category` (category)
- IDX: `idx_process_parent` (parent_id)
- IDX: `idx_process_org` (org_id)
- IDX: `idx_process_owner` (owner_id)
- IDX: `idx_process_risk_level` (risk_level)
- IDX: `idx_process_status` (status)
- IDX: `idx_process_tenant` (tenant_id)

---

##### 14.2.3.2 ic_process_node（流程节点表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| process_id | BIGINT UNSIGNED | - | Y | - | 所属流程ID | FK, IDX |
| node_code | VARCHAR | 64 | Y | - | 节点编码 | - |
| node_name | VARCHAR | 256 | Y | - | 节点名称 | - |
| node_type | VARCHAR | 32 | Y | - | 节点类型：start/activity/decision/gateway/end | IDX |
| node_order | INT | - | Y | 1 | 节点顺序号 | - |
| parent_node_id | BIGINT | - | N | NULL | 父节点ID（子流程） | - |
| org_id | BIGINT UNSIGNED | N | NULL | 执行部门ID | FK |
| role_id | BIGINT UNSIGNED | N | NULL | 执行角色ID | FK |
| input_description | TEXT | - | N | NULL | 输入描述 | - |
| output_description | TEXT | - | N | NULL | 输出描述 | - |
| operation_guide | TEXT | - | N | NULL | 操作指引 | - |
| sla_hours | DECIMAL(8,2) | - | N | NULL | SLA时效(小时) | - |
| is_key_node | TINYINT | - | Y | 0 | 是否关键节点 | IDX |
| is_control_point | TINYINT | - | Y | 0 | 是否为控制点 | IDX |
| risk_count | INT | - | Y | 0 | 关联风险数量（冗余计数） | - |
| control_count | INT | - | Y | 0 | 关联控制数量（冗余计数） | - |
| status | VARCHAR | 16 | Y | 'active' | 状态 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- IDX: `idx_node_process` (process_id)
- IDX: `idx_node_type` (node_type)
- IDX: `idx_node_is_key` (is_key_node)
- IDX: `idx_node_is_control_point` (is_control_point)
- IDX: `idx_node_tenant` (tenant_id)

---

##### 14.2.3.3 ic_risk_category（风险分类表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| parent_id | BIGINT UNSIGNED | - | N | 0 | 父级分类ID | IDX |
| category_code | VARCHAR | 64 | Y | - | 分类编码 | UK(tenant_id) |
| category_name | VARCHAR | 128 | Y | - | 分类名称 | - |
| category_path | VARCHAR | 1024 | Y | - | 分类路径 | - |
| category_level | INT | - | Y | 1 | 分类层级 | - |
| sort_order | INT | - | N | 0 | 排序号 | - |
| description | VARCHAR | 512 | N | NULL | 描述 | - |
| status | VARCHAR | 16 | Y | 'active' | 状态 | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |

**预置分类示例：**
- 信用风险 (credit_risk)
- 市场风险 (market_risk)
- 操作风险 (operational_risk)
- 合规风险 (compliance_risk)
- 流动性风险 (liquidity_risk)
- 声誉风险 (reputation_risk)
- 战略风险 (strategic_risk)
- 信息科技风险 (it_risk)

**索引策略：**
- PK: `id`
- UK: `uk_tenant_cat_code` (tenant_id, category_code)
- IDX: `idx_risk_cat_parent` (parent_id)

---

##### 14.2.3.4 ic_risk（风险清单表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| risk_code | VARCHAR | 64 | Y | - | 风险编码（全局唯一） | UK(tenant_id) |
| risk_name | VARCHAR | 256 | Y | - | 风险名称 | IDX |
| category_id | BIGINT UNSIGNED | - | Y | - | 风险分类ID | FK, IDX |
| process_id | BIGINT UNSIGNED | N | NULL | 关联流程ID | FK, IDX |
| node_id | BIGINT UNSIGNED | N | NULL | 关联节点ID | FK, IDX |
| risk_description | TEXT | - | Y | - | 风险描述（风险场景+影响） | - |
| risk_cause | TEXT | - | N | NULL | 风险成因分析 | - |
| risk_impact | TEXT | - | N | NULL | 风险影响描述 | - |
| inherent_risk_level | VARCHAR | 16 | N | NULL | 固有风险等级 | IDX |
| inherent_likelihood | VARCHAR | 16 | N | NULL | 固有发生可能性：very_low/low/medium/high/very_high | - |
| inherent_impact | VARCHAR | 16 | N | NULL | 固有影响程度：very_low/low/medium/high/very_high | - |
| residual_risk_level | VARCHAR | 16 | N | NULL | 剩余风险等级 | IDX |
| residual_likelihood | VARCHAR | 16 | N | NULL | 剩余发生可能性 | - |
| residual_impact | VARCHAR | 16 | N | NULL | 剩余影响程度 | - |
| risk_owner_id | BIGINT UNSIGNED | N | NULL | 风险责任人ID | IDX |
| risk_appetite | VARCHAR | 16 | N | NULL | 风险偏好：conservative/moderate/aggressive | - |
| risk_tolerance | VARCHAR | 16 | N | NULL | 风险容忍度：low/medium/high | - |
| related_regulation_ids | JSON | - | N | NULL | 关联制度文档ID列表 | - |
| source | VARCHAR | 32 | Y | 'manual' | 来源：manual/ai_agent/import | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/mitigated/closed | IDX |
| identified_date | DATE | - | N | NULL | 识别日期 | - |
| last_assessment_date | DATE | - | N | NULL | 最近评估日期 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_risk_code` (tenant_id, risk_code)
- IDX: `idx_risk_category` (category_id)
- IDX: `idx_risk_process` (process_id)
- IDX: `idx_risk_node` (node_id)
- IDX: `idx_risk_inherent` (inherent_risk_level)
- IDX: `idx_risk_residual` (residual_risk_level)
- IDX: `idx_risk_owner` (risk_owner_id)
- IDX: `idx_risk_status` (status)
- IDX: `idx_risk_name` (risk_name) — 前缀索引(100)

---

##### 14.2.3.5 ic_risk_assessment（风险评估记录表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| risk_id | BIGINT UNSIGNED | - | Y | - | 风险ID | FK, IDX |
| assessment_no | VARCHAR | 64 | Y | - | 评估编号 | UK(tenant_id) |
| assessment_type | VARCHAR | 32 | Y | - | 评估类型：initial/periodic/event_driven/ad_hoc | IDX |
| assessment_method | VARCHAR | 32 | Y | - | 评估方法：qualitative/quantitative/hybrid | - |
| inherent_likelihood | VARCHAR | 16 | Y | - | 固有发生可能性 | - |
| inherent_impact | VARCHAR | 16 | Y | - | 固有影响程度 | - |
| inherent_level | VARCHAR | 16 | Y | - | 固有风险等级 | IDX |
| control_effectiveness | VARCHAR | 16 | N | NULL | 控制有效性评级 | - |
| residual_likelihood | VARCHAR | 16 | Y | - | 剩余发生可能性 | - |
| residual_impact | VARCHAR | 16 | Y | - | 剩余影响程度 | - |
| residual_level | VARCHAR | 16 | Y | - | 剩余风险等级 | IDX |
| assessment_basis | TEXT | - | N | NULL | 评估依据 | - |
| assessment_conclusion | TEXT | - | N | NULL | 评估结论 | - |
| assessor_id | BIGINT UNSIGNED | - | Y | - | 评估人ID | IDX |
| reviewer_id | BIGINT UNSIGNED | N | NULL | 复核人ID | - |
| assessment_date | DATE | - | Y | - | 评估日期 | IDX |
| review_date | DATE | - | N | NULL | 复核日期 | - |
| next_assessment_date | DATE | - | N | NULL | 下次评估日期 | - |
| attachment_urls | JSON | - | N | NULL | 附件URL列表 | - |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/submitted/reviewed/approved | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_assess_no` (tenant_id, assessment_no)
- IDX: `idx_ra_risk` (risk_id)
- IDX: `idx_ra_type` (assessment_type)
- IDX: `idx_ra_inherent` (inherent_level)
- IDX: `idx_ra_residual` (residual_level)
- IDX: `idx_ra_assessor` (assessor_id)
- IDX: `idx_ra_date` (assessment_date)
- IDX: `idx_ra_tenant` (tenant_id)

---

#### 14.2.4 控制措施模块

##### 14.2.4.1 ic_control（控制措施表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| control_code | VARCHAR | 64 | Y | - | 控制编码 | UK(tenant_id) |
| control_name | VARCHAR | 256 | Y | - | 控制名称 | IDX |
| control_type | VARCHAR | 32 | Y | - | 控制类型：preventive/detective/corrective | IDX |
| control_nature | VARCHAR | 32 | Y | - | 控制性质：manual/automated/semi_automated | IDX |
| control_frequency | VARCHAR | 32 | Y | - | 控制频率：daily/weekly/monthly/quarterly/yearly/realtime/event_driven | IDX |
| control_objective | TEXT | - | Y | - | 控制目标 | - |
| control_description | TEXT | - | Y | - | 控制描述（控制活动详细说明） | - |
| control_procedure | TEXT | - | N | NULL | 控制程序（操作步骤） | - |
| process_id | BIGINT UNSIGNED | N | NULL | 关联流程ID | FK, IDX |
| node_id | BIGINT UNSIGNED | N | NULL | 关联节点ID | FK, IDX |
| org_id | BIGINT UNSIGNED | N | NULL | 执行部门ID | FK |
| responsible_role_id | BIGINT UNSIGNED | N | NULL | 责任角色ID | FK |
| responsible_user_id | BIGINT UNSIGNED | N | NULL | 责任人ID | IDX |
| is_key_control | TINYINT | - | Y | 0 | 是否关键控制 | IDX |
| is_compensating | TINYINT | - | Y | 0 | 是否补偿性控制 | - |
| automation_tool | VARCHAR | 128 | N | NULL | 自动化工具/系统名称 | - |
| automation_rule | TEXT | - | N | NULL | 自动化规则描述 | - |
| evidence_required | TINYINT | - | Y | 0 | 是否需要留存证据 | - |
| evidence_type | VARCHAR | 64 | N | NULL | 证据类型：screenshot/report/log/approval_flow | - |
| related_regulation_ids | JSON | - | N | NULL | 关联制度文档ID列表 | - |
| design_effectiveness_score | DECIMAL(3,1) | - | N | NULL | 设计有效性评分(0-10) | - |
| operating_effectiveness_score | DECIMAL(3,1) | - | N | NULL | 执行有效性评分(0-10) | - |
| last_test_date | DATE | - | N | NULL | 最近测试日期 | - |
| last_test_result | VARCHAR | 16 | N | NULL | 最近测试结果：pass/fail/partial | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/inactive/designing/retired | IDX |
| effective_date | DATE | - | N | NULL | 生效日期 | - |
| retired_date | DATE | - | N | NULL | 停用日期 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_control_code` (tenant_id, control_code)
- IDX: `idx_control_type` (control_type)
- IDX: `idx_control_nature` (control_nature)
- IDX: `idx_control_frequency` (control_frequency)
- IDX: `idx_control_process` (process_id)
- IDX: `idx_control_node` (node_id)
- IDX: `idx_control_responsible` (responsible_user_id)
- IDX: `idx_control_key` (is_key_control)
- IDX: `idx_control_status` (status)
- IDX: `idx_control_tenant` (tenant_id)

---

##### 14.2.4.2 ic_rcm（风险控制矩阵表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| risk_id | BIGINT UNSIGNED | - | Y | - | 风险ID | FK, IDX |
| control_id | BIGINT UNSIGNED | - | Y | - | 控制ID | FK, IDX |
| mapping_type | VARCHAR | 32 | Y | 'direct' | 映射类型：direct/indirect/compensating | - |
| effectiveness_rating | VARCHAR | 16 | N | NULL | 控制对风险的有效性评级：high/medium/low | - |
| mapping_rationale | TEXT | - | N | NULL | 映射理由/依据 | - |
| is_primary | TINYINT | - | Y | 0 | 是否主要控制（一个风险可有多个控制） | - |
| source | VARCHAR | 32 | Y | 'manual' | 来源：manual/ai_agent | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/inactive | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_rcm_risk_control` (risk_id, control_id)
- IDX: `idx_rcm_risk` (risk_id)
- IDX: `idx_rcm_control` (control_id)
- IDX: `idx_rcm_tenant` (tenant_id)

---

#### 14.2.5 内控评价模块

##### 14.2.5.1 ic_evaluation_plan（评价计划表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| plan_code | VARCHAR | 64 | Y | - | 计划编码 | UK(tenant_id) |
| plan_name | VARCHAR | 256 | Y | - | 计划名称 | IDX |
| plan_year | INT | - | Y | - | 评价年度 | IDX |
| plan_type | VARCHAR | 32 | Y | - | 类型：annual/semi_annual/quarterly/special | IDX |
| evaluation_framework | VARCHAR | 64 | Y | 'COSO' | 评价框架：COSO/COSO_ERM/ISO31000/local | - |
| plan_start_date | DATE | - | Y | - | 计划开始日期 | - |
| plan_end_date | DATE | - | Y | - | 计划结束日期 | - |
| plan_objective | TEXT | - | N | NULL | 评价目标 | - |
| plan_description | TEXT | - | N | NULL | 评价计划描述 | - |
| plan_scope_summary | TEXT | - | N | NULL | 评价范围概述 | - |
| budget_amount | DECIMAL(15,2) | - | N | NULL | 预算金额 | - |
| budget_hours | DECIMAL(8,1) | - | N | NULL | 预算工时 | - |
| actual_hours | DECIMAL(8,1) | - | N | NULL | 实际工时 | - |
| lead_evaluator_id | BIGINT UNSIGNED | - | Y | - | 主评人ID | IDX |
| evaluator_ids | JSON | - | N | NULL | 评价组成员ID列表 | - |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/submitted/approved/in_progress/completed/closed | IDX |
| submitted_at | DATETIME | - | N | NULL | 提交时间 | - |
| approved_by | BIGINT | - | N | NULL | 批准人ID | - |
| approved_at | DATETIME | - | N | NULL | 批准时间 | - |
| completed_at | DATETIME | - | N | NULL | 完成时间 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_plan_code` (tenant_id, plan_code)
- IDX: `idx_ep_year` (plan_year)
- IDX: `idx_ep_type` (plan_type)
- IDX: `idx_ep_status` (status)
- IDX: `idx_ep_lead` (lead_evaluator_id)
- IDX: `idx_ep_tenant` (tenant_id)

---

##### 14.2.5.2 ic_evaluation_scope（评价范围表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| plan_id | BIGINT UNSIGNED | - | Y | - | 评价计划ID | FK, IDX |
| scope_code | VARCHAR | 64 | Y | - | 范围编码 | UK(tenant_id) |
| scope_name | VARCHAR | 256 | Y | - | 范围名称 | - |
| scope_type | VARCHAR | 32 | Y | - | 类型：org/process/control/system | IDX |
| target_id | BIGINT UNSIGNED | - | Y | - | 目标实体ID（org_id/process_id/control_id等） | IDX |
| target_type | VARCHAR | 32 | Y | - | 目标实体类型：org/process/control | - |
| scope_description | TEXT | - | N | NULL | 范围描述 | - |
| inclusion_criteria | TEXT | - | N | NULL | 纳入标准 | - |
| exclusion_criteria | TEXT | - | N | NULL | 排除标准 | - |
| evaluator_id | BIGINT UNSIGNED | - | Y | - | 负责评价人ID | IDX |
| reviewer_id | BIGINT UNSIGNED | N | NULL | 复核人ID | - |
| planned_start_date | DATE | - | N | NULL | 计划开始日期 | - |
| planned_end_date | DATE | - | N | NULL | 计划结束日期 | - |
| actual_start_date | DATE | - | N | NULL | 实际开始日期 | - |
| actual_end_date | DATE | - | N | NULL | 实际结束日期 | - |
| overall_conclusion | VARCHAR | 32 | N | NULL | 总体结论 | - |
| conclusion_detail | TEXT | - | N | NULL | 结论详情 | - |
| status | VARCHAR | 16 | Y | 'pending' | 状态：pending/in_progress/completed/reviewed | IDX |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_scope_code` (tenant_id, scope_code)
- IDX: `idx_es_plan` (plan_id)
- IDX: `idx_es_type` (scope_type)
- IDX: `idx_es_target` (target_id, target_type)
- IDX: `idx_es_evaluator` (evaluator_id)
- IDX: `idx_es_status` (status)

---

##### 14.2.5.3 ic_test_program（测试方案表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| scope_id | BIGINT UNSIGNED | - | Y | - | 评价范围ID | FK, IDX |
| control_id | BIGINT UNSIGNED | - | Y | - | 被测试控制ID | FK, IDX |
| program_code | VARCHAR | 64 | Y | - | 方案编码 | UK(tenant_id) |
| test_objective | TEXT | - | Y | - | 测试目标 | - |
| test_procedure | TEXT | - | Y | - | 测试程序/步骤 | - |
| test_method | VARCHAR | 32 | Y | - | 测试方法：inquiry/observation/inspection/reperformance/data_analysis | IDX |
| test_type | VARCHAR | 32 | Y | - | 测试类型：design_test/operating_test/combined | - |
| sampling_method | VARCHAR | 32 | N | NULL | 抽样方法：random/stratified/systematic/haphazard/attribute | - |
| sampling_params | JSON | - | N | NULL | 抽样参数（置信度、偏差率等） | - |
| population_size | INT | - | N | NULL | 总体数量 | - |
| sample_size | INT | - | N | NULL | 样本数量 | - |
| planned_start_date | DATE | - | N | NULL | 计划开始日期 | - |
| planned_end_date | DATE | - | N | NULL | 计划结束日期 | - |
| tester_id | BIGINT UNSIGNED | - | Y | - | 测试人ID | IDX |
| reviewer_id | BIGINT UNSIGNED | N | NULL | 复核人ID | - |
| risk_considered | VARCHAR | 16 | N | NULL | 考虑的风险等级 | - |
| reliance_on_automation | TINYINT | - | Y | 0 | 是否依赖自动化工具 | - |
| automation_tool_detail | VARCHAR | 256 | N | NULL | 自动化工具详情 | - |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/approved/in_progress/completed | IDX |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_prog_code` (tenant_id, program_code)
- IDX: `idx_tp_scope` (scope_id)
- IDX: `idx_tp_control` (control_id)
- IDX: `idx_tp_tester` (tester_id)
- IDX: `idx_tp_method` (test_method)
- IDX: `idx_tp_status` (status)

---

##### 14.2.5.4 ic_test_worksheet（测试底稿表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| program_id | BIGINT UNSIGNED | - | Y | - | 测试方案ID | FK, IDX |
| worksheet_code | VARCHAR | 64 | Y | - | 底稿编码 | UK(tenant_id) |
| worksheet_name | VARCHAR | 256 | Y | - | 底稿名称 | - |
| test_step | INT | - | Y | 1 | 测试步骤序号 | - |
| test_procedure_detail | TEXT | - | Y | - | 测试程序详细描述 | - |
| expected_result | TEXT | - | N | NULL | 预期结果 | - |
| actual_result | TEXT | - | N | NULL | 实际结果 | - |
| test_date | DATE | - | N | NULL | 测试日期 | - |
| tester_id | BIGINT UNSIGNED | - | Y | - | 测试执行人ID | IDX |
| reviewer_id | BIGINT UNSIGNED | N | NULL | 复核人ID | - |
| evidence_description | TEXT | - | N | NULL | 证据描述 | - |
| evidence_urls | JSON | - | N | NULL | 证据附件URL列表 | - |
| exception_noted | TINYINT | - | Y | 0 | 是否发现例外 | - |
| exception_description | TEXT | - | N | NULL | 例外描述 | - |
| test_conclusion | VARCHAR | 16 | N | NULL | 测试结论：pass/fail/exception/not_applicable | IDX |
| conclusion_detail | TEXT | - | N | NULL | 结论详情 | - |
| reviewer_comment | TEXT | - | N | NULL | 复核意见 | - |
| reviewed_at | DATETIME | - | N | NULL | 复核时间 | - |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/completed/reviewed | IDX |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_ws_code` (tenant_id, worksheet_code)
- IDX: `idx_tw_program` (program_id)
- IDX: `idx_tw_tester` (tester_id)
- IDX: `idx_tw_conclusion` (test_conclusion)
- IDX: `idx_tw_status` (status)

---

##### 14.2.5.5 ic_test_result（测试结果表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| worksheet_id | BIGINT UNSIGNED | - | Y | - | 底稿ID | FK, IDX |
| result_code | VARCHAR | 64 | Y | - | 结果编码 | UK(tenant_id) |
| result_type | VARCHAR | 32 | Y | - | 类型：design_defect/operation_defect/finding/observation | IDX |
| severity | VARCHAR | 16 | N | NULL | 严重程度 | IDX |
| finding_description | TEXT | - | Y | - | 发现描述 | - |
| root_cause | TEXT | - | N | NULL | 根因分析 | - |
| impact_assessment | TEXT | - | N | NULL | 影响评估 | - |
| recommendation | TEXT | - | N | NULL | 改进建议 | - |
| is_deficiency | TINYINT | - | Y | 0 | 是否构成缺陷 | IDX |
| linked_deficiency_id | BIGINT UNSIGNED | N | NULL | 关联缺陷ID | IDX |
| test_date | DATE | - | Y | - | 测试日期 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_result_code` (tenant_id, result_code)
- IDX: `idx_tr_worksheet` (worksheet_id)
- IDX: `idx_tr_type` (result_type)
- IDX: `idx_tr_severity` (severity)
- IDX: `idx_tr_is_deficiency` (is_deficiency)
- IDX: `idx_tr_linked_deficiency` (linked_deficiency_id)

---

##### 14.2.5.6 ic_test_sample（抽样记录表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| program_id | BIGINT UNSIGNED | - | Y | - | 测试方案ID | FK, IDX |
| worksheet_id | BIGINT UNSIGNED | N | NULL | 测试底稿ID | FK, IDX |
| sample_code | VARCHAR | 64 | Y | - | 样本编码 | UK(tenant_id) |
| sample_seq | INT | - | Y | 1 | 样本序号 | - |
| population_identifier | VARCHAR | 256 | Y | - | 总体标识（如凭证号/交易号） | - |
| sample_description | VARCHAR | 512 | N | NULL | 样本描述 | - |
| sample_date | DATE | - | N | NULL | 样本日期 | - |
| sample_amount | DECIMAL(18,2) | - | N | NULL | 样本金额 | - |
| test_result | VARCHAR | 16 | N | NULL | 测试结果：pass/fail/exception | - |
| exception_detail | TEXT | - | N | NULL | 例外详情 | - |
| evidence_url | VARCHAR | 512 | N | NULL | 样本证据URL | - |
| selected_by | VARCHAR | 32 | Y | 'manual' | 选择方式：manual/random/systematic | - |
| status | VARCHAR | 16 | Y | 'selected' | 状态：selected/tested/replaced | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_sample_code` (tenant_id, sample_code)
- IDX: `idx_ts_program` (program_id)
- IDX: `idx_ts_worksheet` (worksheet_id)
- IDX: `idx_ts_result` (test_result)

---

#### 14.2.6 缺陷与整改模块

##### 14.2.6.1 ic_deficiency（缺陷表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| deficiency_code | VARCHAR | 64 | Y | - | 缺陷编码 | UK(tenant_id) |
| deficiency_name | VARCHAR | 256 | Y | - | 缺陷名称/标题 | - |
| severity | VARCHAR | 16 | Y | - | 严重等级：critical/major/minor | IDX |
| deficiency_type | VARCHAR | 32 | Y | - | 类型：design_deficiency/operating_deficiency/system_deficiency | IDX |
| deficiency_category | VARCHAR | 32 | Y | - | 分类：control_absence/control_design/control_execution/compliance | - |
| source_type | VARCHAR | 32 | Y | - | 来源类型：evaluation/audit/self_assessment/incident/regulatory | IDX |
| source_id | BIGINT UNSIGNED | - | N | NULL | 来源实体ID（评价ID/审计ID等） | IDX |
| risk_id | BIGINT UNSIGNED | N | NULL | 关联风险ID | FK, IDX |
| control_id | BIGINT UNSIGNED | N | NULL | 关联控制ID | FK, IDX |
| process_id | BIGINT UNSIGNED | N | NULL | 关联流程ID | FK, IDX |
| org_id | BIGINT UNSIGNED | N | NULL | 责任部门ID | FK, IDX |
| deficiency_description | TEXT | - | Y | - | 缺陷描述 | - |
| root_cause_analysis | TEXT | - | N | NULL | 根因分析（5-Why/鱼骨图等） | - |
| impact_description | TEXT | - | N | NULL | 影响描述 | - |
| potential_impact_amount | DECIMAL(18,2) | - | N | NULL | 潜在影响金额 | - |
| identified_by | BIGINT UNSIGNED | - | Y | - | 识别人员ID | IDX |
| identified_date | DATE | - | Y | - | 识别日期 | IDX |
| due_date | DATE | - | N | NULL | 整改截止日期 | IDX |
| actual_close_date | DATE | - | N | NULL | 实际关闭日期 | - |
| remediation_status | VARCHAR | 16 | Y | 'pending' | 整改状态：pending/in_progress/completed/verified/closed | IDX |
| verification_result | VARCHAR | 16 | N | NULL | 验证结果：passed/failed/partial | - |
| verification_date | DATE | - | N | NULL | 验证日期 | - |
| verified_by | BIGINT | - | N | NULL | 验证人ID | - |
| days_open | INT | - | N | NULL | 开启天数（冗余计算） | - |
| days_overdue | INT | - | N | NULL | 超期天数（冗余计算） | - |
| is_overdue | TINYINT | - | Y | 0 | 是否超期 | IDX |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_def_code` (tenant_id, deficiency_code)
- IDX: `idx_def_severity` (severity)
- IDX: `idx_def_type` (deficiency_type)
- IDX: `idx_def_source` (source_type, source_id)
- IDX: `idx_def_risk` (risk_id)
- IDX: `idx_def_control` (control_id)
- IDX: `idx_def_process` (process_id)
- IDX: `idx_def_org` (org_id)
- IDX: `idx_def_remediation_status` (remediation_status)
- IDX: `idx_def_identified_date` (identified_date)
- IDX: `idx_def_due_date` (due_date)
- IDX: `idx_def_is_overdue` (is_overdue)

---

##### 14.2.6.2 ic_remediation_plan（整改方案表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| deficiency_id | BIGINT UNSIGNED | - | Y | - | 缺陷ID | FK, IDX |
| plan_code | VARCHAR | 64 | Y | - | 方案编码 | UK(tenant_id) |
| plan_name | VARCHAR | 256 | Y | - | 方案名称 | - |
| remediation_approach | VARCHAR | 32 | Y | - | 整改方式：process_improvement/control_enhancement/system_fix/policy_update/training | IDX |
| plan_description | TEXT | - | Y | - | 整改方案描述 | - |
| expected_outcome | TEXT | - | N | NULL | 预期效果 | - |
| resource_required | TEXT | - | N | NULL | 所需资源 | - |
| estimated_cost | DECIMAL(15,2) | - | N | NULL | 预计成本 | - |
| actual_cost | DECIMAL(15,2) | - | N | NULL | 实际成本 | - |
| planned_start_date | DATE | - | N | NULL | 计划开始日期 | - |
| planned_end_date | DATE | - | Y | - | 计划完成日期 | IDX |
| actual_start_date | DATE | - | N | NULL | 实际开始日期 | - |
| actual_end_date | DATE | - | N | NULL | 实际完成日期 | - |
| responsible_user_id | BIGINT UNSIGNED | - | Y | - | 整改责任人ID | IDX |
| approver_id | BIGINT UNSIGNED | N | NULL | 审批人ID | - |
| approved_at | DATETIME | - | N | NULL | 审批时间 | - |
| approval_comment | TEXT | - | N | NULL | 审批意见 | - |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/submitted/approved/in_progress/completed/closed | IDX |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_plan_code` (tenant_id, plan_code)
- IDX: `idx_rp_deficiency` (deficiency_id)
- IDX: `idx_rp_approach` (remediation_approach)
- IDX: `idx_rp_responsible` (responsible_user_id)
- IDX: `idx_rp_status` (status)
- IDX: `idx_rp_planned_end` (planned_end_date)

---

##### 14.2.6.3 ic_remediation_task（整改任务表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| plan_id | BIGINT UNSIGNED | - | Y | - | 整改方案ID | FK, IDX |
| task_code | VARCHAR | 64 | Y | - | 任务编码 | UK(tenant_id) |
| task_name | VARCHAR | 256 | Y | - | 任务名称 | - |
| task_description | TEXT | - | Y | - | 任务描述 | - |
| task_priority | VARCHAR | 16 | Y | 'medium' | 优先级：high/medium/low | IDX |
| assignee_id | BIGINT UNSIGNED | - | Y | - | 执行人ID | IDX |
| reviewer_id | BIGINT UNSIGNED | N | NULL | 审核人ID | - |
| planned_start_date | DATE | - | N | NULL | 计划开始日期 | - |
| planned_end_date | DATE | - | Y | - | 计划完成日期 | IDX |
| actual_start_date | DATE | - | N | NULL | 实际开始日期 | - |
| actual_end_date | DATE | - | N | NULL | 实际完成日期 | - |
| estimated_hours | DECIMAL(8,1) | - | N | NULL | 预计工时 | - |
| actual_hours | DECIMAL(8,1) | - | N | NULL | 实际工时 | - |
| progress_percent | DECIMAL(5,2) | - | Y | 0.00 | 进度百分比 | - |
| task_result | TEXT | - | N | NULL | 任务完成结果 | - |
| attachment_urls | JSON | - | N | NULL | 附件URL列表 | - |
| blocker_description | TEXT | - | N | NULL | 阻塞原因 | - |
| is_blocked | TINYINT | - | Y | 0 | 是否阻塞 | - |
| status | VARCHAR | 16 | Y | 'pending' | 状态：pending/in_progress/completed/reviewed/closed | IDX |
| completed_at | DATETIME | - | N | NULL | 完成时间 | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_task_code` (tenant_id, task_code)
- IDX: `idx_rt_plan` (plan_id)
- IDX: `idx_rt_assignee` (assignee_id)
- IDX: `idx_rt_priority` (task_priority)
- IDX: `idx_rt_status` (status)
- IDX: `idx_rt_planned_end` (planned_end_date)

---

##### 14.2.6.4 ic_remediation_verification（整改验证表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| plan_id | BIGINT UNSIGNED | - | Y | - | 整改方案ID | FK, IDX |
| verification_code | VARCHAR | 64 | Y | - | 验证编码 | UK(tenant_id) |
| verification_type | VARCHAR | 32 | Y | - | 验证类型：desk_review/on_site/retest/sampling | - |
| verification_method | TEXT | - | N | NULL | 验证方法描述 | - |
| verification_scope | TEXT | - | N | NULL | 验证范围 | - |
| verification_result | VARCHAR | 16 | Y | - | 验证结果：passed/failed/partial | IDX |
| verification_detail | TEXT | - | N | NULL | 验证详情 | - |
| evidence_of_remediation | TEXT | - | N | NULL | 整改证据 | - |
| evidence_urls | JSON | - | N | NULL | 证据附件URL列表 | - |
| remaining_issues | TEXT | - | N | NULL | 遗留问题 | - |
| follow_up_required | TINYINT | - | Y | 0 | 是否需要后续跟踪 | - |
| follow_up_date | DATE | - | N | NULL | 后续跟踪日期 | - |
| verifier_id | BIGINT UNSIGNED | - | Y | - | 验证人ID | IDX |
| reviewer_id | BIGINT UNSIGNED | N | NULL | 审核人ID | - |
| verification_date | DATE | - | Y | - | 验证日期 | IDX |
| reviewed_at | DATETIME | - | N | NULL | 审核时间 | - |
| status | VARCHAR | 16 | Y | 'draft' | 状态：draft/completed/reviewed | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_verif_code` (tenant_id, verification_code)
- IDX: `idx_rv_plan` (plan_id)
- IDX: `idx_rv_result` (verification_result)
- IDX: `idx_rv_verifier` (verifier_id)
- IDX: `idx_rv_date` (verification_date)

---

#### 14.2.7 KRI监测模块

##### 14.2.7.1 ic_kri_definition（KRI定义表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| kri_code | VARCHAR | 64 | Y | - | KRI编码 | UK(tenant_id) |
| kri_name | VARCHAR | 256 | Y | - | KRI名称 | IDX |
| kri_category | VARCHAR | 32 | Y | - | 分类：operational/compliance/financial/strategic/it | IDX |
| risk_id | BIGINT UNSIGNED | N | NULL | 关联风险ID | FK, IDX |
| control_id | BIGINT UNSIGNED | N | NULL | 关联控制ID | FK, IDX |
| process_id | BIGINT UNSIGNED | N | NULL | 关联流程ID | FK |
| metric_type | VARCHAR | 32 | Y | - | 指标类型：count/ratio/percentage/amount/duration | - |
| unit | VARCHAR | 32 | N | NULL | 计量单位 | - |
| calculation_formula | TEXT | - | N | NULL | 计算公式 | - |
| data_source | VARCHAR | 256 | Y | - | 数据来源 | - |
| data_source_type | VARCHAR | 32 | Y | 'manual' | 数据来源类型：manual/api/database/file | - |
| data_source_config | JSON | - | N | NULL | 数据源连接配置 | - |
| collection_frequency | VARCHAR | 32 | Y | 'monthly' | 采集频率：realtime/daily/weekly/monthly/quarterly | IDX |
| collection_method | VARCHAR | 32 | Y | 'manual' | 采集方式：manual/auto_import/api | - |
| target_value | DECIMAL(18,4) | - | N | NULL | 目标值 | - |
| tolerance_value | DECIMAL(18,4) | - | N | NULL | 容忍值 | - |
| warning_threshold_yellow | DECIMAL(18,4) | - | N | NULL | 黄色预警阈值 | - |
| warning_threshold_orange | DECIMAL(18,4) | - | N | NULL | 橙色预警阈值 | - |
| warning_threshold_red | DECIMAL(18,4) | - | N | NULL | 红色预警阈值 | - |
| threshold_direction | VARCHAR | 8 | Y | 'above' | 阈值方向：above/below/both | - |
| is_key_kri | TINYINT | - | Y | 0 | 是否关键KRI | IDX |
| responsible_user_id | BIGINT UNSIGNED | - | Y | - | 责任人ID | IDX |
| escalation_rule | JSON | - | N | NULL | 逐级上报规则 | - |
| description | TEXT | - | N | NULL | 指标说明 | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/inactive/archived | IDX |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_by | BIGINT | - | N | NULL | 更新人ID | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_kri_code` (tenant_id, kri_code)
- IDX: `idx_kri_category` (kri_category)
- IDX: `idx_kri_risk` (risk_id)
- IDX: `idx_kri_control` (control_id)
- IDX: `idx_kri_responsible` (responsible_user_id)
- IDX: `idx_kri_is_key` (is_key_kri)
- IDX: `idx_kri_status` (status)
- IDX: `idx_kri_frequency` (collection_frequency)

---

##### 14.2.7.2 ic_kri_data（KRI监测数据表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| kri_id | BIGINT UNSIGNED | - | Y | - | KRI定义ID | FK, IDX |
| data_period | VARCHAR | 32 | Y | - | 数据期间（如2026-08/2026-Q3） | IDX |
| data_date | DATE | - | Y | - | 数据日期 | IDX |
| actual_value | DECIMAL(18,4) | - | Y | - | 实际值 | - |
| target_value | DECIMAL(18,4) | - | N | NULL | 当期目标值 | - |
| deviation_value | DECIMAL(18,4) | - | N | NULL | 偏差值 | - |
| deviation_percent | DECIMAL(8,4) | - | N | NULL | 偏差百分比 | - |
| warning_level | VARCHAR | 16 | N | NULL | 预警等级：green/yellow/orange/red | IDX |
| is_breach | TINYINT | - | Y | 0 | 是否突破阈值 | IDX |
| data_quality_flag | VARCHAR | 16 | Y | 'normal' | 数据质量标记：normal/suspect/corrected | - |
| data_source_detail | VARCHAR | 512 | N | NULL | 数据来源详情 | - |
| collection_method | VARCHAR | 32 | Y | 'manual' | 采集方式 | - |
| collected_by | BIGINT | - | N | NULL | 采集人ID | - |
| collected_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 采集时间 | - |
| verified_by | BIGINT | - | N | NULL | 验证人ID | - |
| verified_at | DATETIME | - | N | NULL | 验证时间 | - |
| notes | TEXT | - | N | NULL | 备注 | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |

**索引策略：**
- PK: `id`
- UK: `uk_kri_data_period` (kri_id, data_period, data_date)
- IDX: `idx_kd_kri` (kri_id)
- IDX: `idx_kd_date` (data_date)
- IDX: `idx_kd_period` (data_period)
- IDX: `idx_kd_warning` (warning_level)
- IDX: `idx_kd_is_breach` (is_breach)
- IDX: `idx_kd_tenant` (tenant_id)

**分区建议：** 按月 RANGE 分区 `data_date`（数据量大，建议保留36个月热数据）

---

##### 14.2.7.3 ic_warning（预警记录表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| kri_id | BIGINT UNSIGNED | - | Y | - | KRI定义ID | FK, IDX |
| kri_data_id | BIGINT UNSIGNED | - | N | NULL | KRI数据ID | FK, IDX |
| warning_code | VARCHAR | 64 | Y | - | 预警编码 | UK(tenant_id) |
| warning_level | VARCHAR | 16 | Y | - | 预警等级：yellow/orange/red | IDX |
| warning_title | VARCHAR | 256 | Y | - | 预警标题 | - |
| warning_content | TEXT | - | Y | - | 预警内容 | - |
| trigger_value | DECIMAL(18,4) | - | Y | - | 触发值 | - |
| threshold_value | DECIMAL(18,4) | - | Y | - | 阈值 | - |
| trigger_time | DATETIME | - | Y | CURRENT_TIMESTAMP | 触发时间 | IDX |
| acknowledged_by | BIGINT | - | N | NULL | 确认人ID | - |
| acknowledged_at | DATETIME | - | N | NULL | 确认时间 | - |
| acknowledge_comment | TEXT | - | N | NULL | 确认意见 | - |
| resolution | TEXT | - | N | NULL | 处置措施 | - |
| resolved_by | BIGINT | - | N | NULL | 处置人ID | - |
| resolved_at | DATETIME | - | N | NULL | 处置时间 | - |
| status | VARCHAR | 16 | Y | 'pending' | 状态：pending/acknowledged/resolved/closed | IDX |
| escalation_level | INT | - | N | 0 | 逐级上报层级 | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |

**索引策略：**
- PK: `id`
- UK: `uk_tenant_warn_code` (tenant_id, warning_code)
- IDX: `idx_warn_kri` (kri_id)
- IDX: `idx_warn_kri_data` (kri_data_id)
- IDX: `idx_warn_level` (warning_level)
- IDX: `idx_warn_status` (status)
- IDX: `idx_warn_trigger_time` (trigger_time)

---

#### 14.2.8 知识库模块

##### 14.2.8.1 kb_document_chunk（知识库文档切片表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| doc_id | BIGINT UNSIGNED | - | N | NULL | 关联文档ID（ic_document） | FK, IDX |
| doc_version_id | BIGINT UNSIGNED | - | N | NULL | 关联文档版本ID | FK |
| external_doc_id | VARCHAR | 128 | N | NULL | 外部文档标识（非平台文档） | - |
| chunk_index | INT | - | Y | 0 | 切片序号（从0开始） | - |
| chunk_content | TEXT | - | Y | - | 切片文本内容 | - |
| chunk_content_hash | VARCHAR | 128 | Y | - | 内容哈希（MD5/SHA256去重） | IDX |
| chunk_token_count | INT | - | N | NULL | Token数量 | - |
| chunk_char_count | INT | - | N | NULL | 字符数量 | - |
| page_number | INT | - | N | NULL | 页码（PDF/Word） | - |
| embedding_model | VARCHAR | 64 | N | NULL | Embedding模型名称 | - |
| knowledge_category | VARCHAR | 64 | N | NULL | 知识分类：regulation/policy/process/risk_case/control_best_practice | IDX |
| knowledge_tags | JSON | - | N | NULL | 知识标签 | - |
| metadata_json | JSON | - | N | NULL | 扩展元数据 | - |
| status | VARCHAR | 16 | Y | 'active' | 状态：active/outdated/archived | - |
| created_by | BIGINT | - | N | NULL | 创建人ID | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |
| is_deleted | TINYINT | - | Y | 0 | 软删除标记 | - |

**索引策略：**
- PK: `id`
- IDX: `idx_kbc_doc` (doc_id)
- IDX: `idx_kbc_hash` (chunk_content_hash)
- IDX: `idx_kbc_category` (knowledge_category)
- IDX: `idx_kbc_tenant` (tenant_id)
- FULLTEXT: `ft_kbc_content` (chunk_content) — 仅MySQL

**分表建议：** 按 tenant_id HASH 分表

---

##### 14.2.8.2 kb_vector_index（向量索引表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| chunk_id | BIGINT UNSIGNED | - | Y | - | 切片ID | FK, IDX |
| embedding_model | VARCHAR | 64 | Y | - | Embedding模型名称 | IDX |
| embedding_dimension | INT | - | Y | - | 向量维度 | - |
| embedding_vector | VECTOR | - | Y | - | 向量数据（pgvector: VECTOR(1536)） | VECTOR_IDX |
| embedding_version | VARCHAR | 32 | Y | 'v1' | 向量版本号 | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | - |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |

**索引策略：**
- PK: `id`
- IDX: `idx_kvi_chunk` (chunk_id)
- IDX: `idx_kvi_model` (embedding_model)
- IDX: `idx_kvi_tenant` (tenant_id)
- VECTOR INDEX: `vix_kvi_embedding` — 使用 pgvector 的 IVFFlat 或 HNSW 索引
  - PostgreSQL: `CREATE INDEX ON kb_vector_index USING ivfflat (embedding_vector vector_cosine_ops) WITH (lists = 100);`
  - 或使用 pgvector HNSW: `CREATE INDEX ON kb_vector_index USING hnsw (embedding_vector vector_cosine_ops);`

**说明：** 该表强烈建议使用 PostgreSQL + pgvector 扩展。若使用 MySQL，需额外部署 Milvus/Qdrant 等专用向量数据库。

---

#### 14.2.9 系统审计模块

##### 14.2.9.1 sys_audit_log（审计日志表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| trace_id | VARCHAR | 64 | N | NULL | 链路追踪ID | IDX |
| user_id | BIGINT UNSIGNED | - | N | NULL | 操作人ID | IDX |
| username | VARCHAR | 64 | N | NULL | 操作人用户名（冗余） | - |
| real_name | VARCHAR | 64 | N | NULL | 操作人姓名（冗余） | - |
| org_id | BIGINT | - | N | NULL | 操作人所属组织ID | - |
| org_name | VARCHAR | 128 | N | NULL | 操作人所属组织名称（冗余） | - |
| module | VARCHAR | 64 | Y | - | 操作模块（如risk/control/evaluation） | IDX |
| action | VARCHAR | 64 | Y | - | 操作动作：CREATE/UPDATE/DELETE/VIEW/EXPORT/LOGIN/LOGOUT | IDX |
| target_type | VARCHAR | 64 | N | NULL | 目标实体类型 | IDX |
| target_id | VARCHAR | 128 | N | NULL | 目标实体ID | IDX |
| target_name | VARCHAR | 256 | N | NULL | 目标实体名称 | - |
| request_method | VARCHAR | 16 | N | NULL | HTTP方法：GET/POST/PUT/DELETE | - |
| request_url | VARCHAR | 1024 | N | NULL | 请求URL | - |
| request_params | JSON | - | N | NULL | 请求参数（脱敏后） | - |
| request_body | JSON | - | N | NULL | 请求体（脱敏后，限制大小） | - |
| response_code | INT | - | N | NULL | 响应状态码 | - |
| before_data | JSON | - | N | NULL | 变更前数据（UPDATE/DELETE时） | - |
| after_data | JSON | - | N | NULL | 变更后数据（CREATE/UPDATE时） | - |
| ip_address | VARCHAR | 64 | N | NULL | 客户端IP | - |
| user_agent | VARCHAR | 512 | N | NULL | User-Agent | - |
| execution_time_ms | INT | - | N | NULL | 执行耗时(毫秒) | - |
| result | VARCHAR | 16 | Y | 'success' | 执行结果：success/fail/error | IDX |
| error_message | TEXT | - | N | NULL | 错误信息 | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | IDX |

**索引策略：**
- PK: `id`
- IDX: `idx_audit_tenant` (tenant_id)
- IDX: `idx_audit_user` (user_id)
- IDX: `idx_audit_module` (module)
- IDX: `idx_audit_action` (action)
- IDX: `idx_audit_target` (target_type, target_id)
- IDX: `idx_audit_created_at` (created_at)
- IDX: `idx_audit_trace_id` (trace_id)
- IDX: `idx_audit_result` (result)

**分区建议：** 按月 RANGE 分区 `created_at`（审计日志数据量最大，建议保留12-24个月在线数据，之后归档到离线存储）

**归档策略：**
- 在线保留：12个月（按月分区）
- 近线存储：13-24个月（压缩表/独立表空间）
- 离线归档：24个月以上（导出到对象存储/数据仓库）

---

#### 14.2.10 AI Agent模块

##### 14.2.10.1 ai_agent_execution（Agent执行记录表）

| 字段名 | 类型 | 长度 | 必填 | 默认值 | 注释 | 索引 |
|--------|------|------|------|--------|------|------|
| id | BIGINT UNSIGNED | - | Y | AUTO | 主键ID | PK |
| tenant_id | BIGINT UNSIGNED | - | Y | - | 租户ID | FK, IDX |
| execution_id | VARCHAR | 64 | Y | - | 执行唯一标识（UUID） | UK |
| agent_type | VARCHAR | 64 | Y | - | Agent类型：regulation_parser/risk_identifier/control_designer/control_tester/deficiency_analyzer/process_optimizer/risk_monitor | IDX |
| agent_version | VARCHAR | 32 | Y | - | Agent版本号 | - |
| trigger_type | VARCHAR | 32 | Y | - | 触发方式：manual/scheduled/event_driven/api | - |
| trigger_user_id | BIGINT UNSIGNED | N | NULL | 触发用户ID | IDX |
| task_type | VARCHAR | 64 | Y | - | 任务类型（具体子任务） | - |
| task_description | TEXT | - | N | NULL | 任务描述 | - |
| input_data | JSON | - | N | NULL | 输入数据 | - |
| input_context | JSON | - | N | NULL | 输入上下文（关联实体等） | - |
| target_type | VARCHAR | 64 | N | NULL | 目标实体类型 | IDX |
| target_id | VARCHAR | 128 | N | NULL | 目标实体ID | IDX |
| model_name | VARCHAR | 128 | Y | - | 使用的模型名称 | - |
| model_params | JSON | - | N | NULL | 模型参数（temperature等） | - |
| prompt_template_id | VARCHAR | 64 | N | NULL | Prompt模板ID | - |
| prompt_version | VARCHAR | 32 | N | NULL | Prompt版本 | - |
| actual_prompt | TEXT | - | N | NULL | 实际使用的Prompt | - |
| output_data | JSON | - | N | NULL | 输出数据（结构化结果） | - |
| output_summary | TEXT | - | N | NULL | 输出摘要 | - |
| confidence_score | DECIMAL(5,4) | - | N | NULL | 置信度评分(0-1) | - |
| token_input | INT | - | N | NULL | 输入Token数 | - |
| token_output | INT | - | N | NULL | 输出Token数 | - |
| token_total | INT | - | N | NULL | 总Token数 | - |
| execution_time_ms | INT | - | N | NULL | 执行耗时(毫秒) | - |
| llm_call_count | INT | - | N | NULL | LLM调用次数 | - |
| llm_cost | DECIMAL(10,6) | - | N | NULL | LLM调用成本(美元) | - |
| retry_count | INT | - | Y | 0 | 重试次数 | - |
| error_message | TEXT | - | N | NULL | 错误信息 | - |
| error_stack | TEXT | - | N | NULL | 错误堆栈 | - |
| user_feedback | VARCHAR | 16 | N | NULL | 用户反馈：helpful/not_helpful/neutral | - |
| user_feedback_comment | TEXT | - | N | NULL | 用户反馈意见 | - |
| is_accepted | TINYINT | - | N | NULL | 结果是否被采纳 | - |
| accepted_by | BIGINT | - | N | NULL | 采纳人ID | - |
| accepted_at | DATETIME | - | N | NULL | 采纳时间 | - |
| status | VARCHAR | 16 | Y | 'pending' | 状态：pending/running/completed/failed/cancelled | IDX |
| started_at | DATETIME | - | N | NULL | 开始执行时间 | - |
| completed_at | DATETIME | - | N | NULL | 完成时间 | - |
| created_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 创建时间 | IDX |
| updated_at | DATETIME | - | Y | CURRENT_TIMESTAMP | 更新时间 | - |

**索引策略：**
- PK: `id`
- UK: `uk_execution_id` (execution_id)
- IDX: `idx_aae_tenant` (tenant_id)
- IDX: `idx_aae_agent_type` (agent_type)
- IDX: `idx_aae_trigger_user` (trigger_user_id)
- IDX: `idx_aae_target` (target_type, target_id)
- IDX: `idx_aae_status` (status)
- IDX: `idx_aae_created_at` (created_at)
- IDX: `idx_aae_model` (model_name)

**分区建议：** 按月 RANGE 分区 `created_at`

---

### 14.3 关键枚举值定义

#### 14.3.1 系统级枚举

##### 14.3.1.1 行业类型（tenant.industry_type）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| bank | 银行 | 商业银行、政策性银行 |
| insurance | 保险 | 寿险、财险、再保险 |
| securities | 证券 | 券商、基金、期货 |
| payment | 支付 | 第三方支付、清算机构 |
| fintech | 金融科技 | 金融科技公司 |
| micro_loan | 小贷 | 小额贷款公司 |
| internet_finance | 互联网金融 | 互联网金融平台 |

##### 14.3.1.2 租户状态（tenant.status）
| 枚举值 | 中文 |
|--------|------|
| active | 正常 |
| expired | 已过期 |
| disabled | 已禁用 |

##### 14.3.1.3 组织类型（org.org_type）
| 枚举值 | 中文 |
|--------|------|
| company | 公司 |
| department | 部门 |
| team | 团队 |
| branch | 分支机构 |

##### 14.3.1.4 用户类型（user.user_type）
| 枚举值 | 中文 |
|--------|------|
| admin | 管理员 |
| normal | 普通用户 |
| external | 外部用户 |

##### 14.3.1.5 用户状态（user.status）
| 枚举值 | 中文 |
|--------|------|
| active | 正常 |
| disabled | 禁用 |
| locked | 锁定 |

##### 14.3.1.6 数据范围（role.data_scope）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| all | 全部数据 | 查看所有租户数据 |
| org | 本组织 | 仅查看本组织数据 |
| org_and_child | 本组织及下级 | 查看本组织及子组织数据 |
| self | 仅本人 | 仅查看自己的数据 |

##### 14.3.1.7 权限类型（permission.perm_type）
| 枚举值 | 中文 |
|--------|------|
| menu | 菜单权限 |
| button | 按钮权限 |
| api | API接口权限 |
| data | 数据权限 |

---

#### 14.3.2 业务级枚举

##### 14.3.2.1 文档分类（document.doc_category）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| regulation | 外部法规 | 国家法律、监管规定 |
| policy | 内部政策 | 公司层面政策 |
| procedure | 操作规程 | 标准化操作程序(SOP) |
| standard | 标准规范 | 技术标准、业务规范 |
| guideline | 指引手册 | 操作指引、工作手册 |

##### 14.3.2.2 文档状态（document.status / document_version.status）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| draft | 草稿 | 编辑中 |
| published | 已发布 | 正式生效 |
| archived | 已归档 | 历史版本 |

##### 14.3.2.3 制度层级（document.doc_level）
| 枚举值 | 中文 |
|--------|------|
| national | 国家级 |
| industry | 行业级 |
| enterprise | 企业级 |
| department | 部门级 |

##### 14.3.2.4 流程层级（process.process_level）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| L1 | 价值链 | 最高层级，如"信贷业务" |
| L2 | 流程组 | 如"贷前调查" |
| L3 | 流程 | 如"客户信用评估" |
| L4 | 子流程/活动 | 如"查询征信报告" |

##### 14.3.2.5 流程状态（process.status）
| 枚举值 | 中文 |
|--------|------|
| active | 启用 |
| inactive | 停用 |
| archived | 归档 |

##### 14.3.2.6 流程节点类型（process_node.node_type）
| 枚举值 | 中文 |
|--------|------|
| start | 开始节点 |
| activity | 活动节点 |
| decision | 决策节点 |
| gateway | 网关节点 |
| end | 结束节点 |

---

#### 14.3.3 风险相关枚举

##### 14.3.3.1 风险分类（risk_category 预置）
| 编码 | 中文 |
|------|------|
| credit_risk | 信用风险 |
| market_risk | 市场风险 |
| operational_risk | 操作风险 |
| compliance_risk | 合规风险 |
| liquidity_risk | 流动性风险 |
| reputation_risk | 声誉风险 |
| strategic_risk | 战略风险 |
| it_risk | 信息科技风险 |
| legal_risk | 法律风险 |
| model_risk | 模型风险 |

##### 14.3.3.2 风险等级（risk.inherent_risk_level / residual_risk_level）
| 枚举值 | 中文 | 颜色 |
|--------|------|------|
| extreme | 极高 | #FF0000 (红色) |
| high | 高 | #FF6600 (橙色) |
| medium | 中 | #FFCC00 (黄色) |
| low | 低 | #3399FF (蓝色) |

##### 14.3.3.3 发生可能性（inherent_likelihood / residual_likelihood）
| 枚举值 | 中文 |
|--------|------|
| very_low | 极低 |
| low | 低 |
| medium | 中 |
| high | 高 |
| very_high | 极高 |

##### 14.3.3.4 影响程度（inherent_impact / residual_impact）
| 枚举值 | 中文 |
|--------|------|
| very_low | 极低 |
| low | 低 |
| medium | 中 |
| high | 高 |
| very_high | 极高 |

##### 14.3.3.5 风险状态（risk.status）
| 枚举值 | 中文 |
|--------|------|
| active | 活跃 |
| mitigated | 已缓解 |
| closed | 已关闭 |

##### 14.3.3.6 风险来源（risk.source）
| 枚举值 | 中文 |
|--------|------|
| manual | 人工录入 |
| ai_agent | AI Agent识别 |
| import | 批量导入 |

##### 14.3.3.7 风险评估类型（risk_assessment.assessment_type）
| 枚举值 | 中文 |
|--------|------|
| initial | 初始评估 |
| periodic | 定期评估 |
| event_driven | 事件驱动评估 |
| ad_hoc | 专项评估 |

##### 14.3.3.8 评估方法（risk_assessment.assessment_method）
| 枚举值 | 中文 |
|--------|------|
| qualitative | 定性评估 |
| quantitative | 定量评估 |
| hybrid | 混合评估 |

##### 14.3.3.9 评估状态（risk_assessment.status）
| 枚举值 | 中文 |
|--------|------|
| draft | 草稿 |
| submitted | 已提交 |
| reviewed | 已复核 |
| approved | 已批准 |

##### 14.3.3.10 风险偏好（risk.risk_appetite）
| 枚举值 | 中文 |
|--------|------|
| conservative | 保守型 |
| moderate | 稳健型 |
| aggressive | 进取型 |

##### 14.3.3.11 风险容忍度（risk.risk_tolerance）
| 枚举值 | 中文 |
|--------|------|
| low | 低容忍 |
| medium | 中容忍 |
| high | 高容忍 |

---

#### 14.3.4 控制相关枚举

##### 14.3.4.1 控制类型（control.control_type）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| preventive | 预防性 | 事前防止风险发生 |
| detective | 检测性 | 事中发现风险事件 |
| corrective | 纠正性 | 事后纠正风险偏差 |

##### 14.3.4.2 控制性质（control.control_nature）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| manual | 人工控制 | 完全依赖人工执行 |
| automated | 自动控制 | 系统自动执行 |
| semi_automated | 半自动控制 | 人机结合执行 |

##### 14.3.4.3 控制频率（control.control_frequency）
| 枚举值 | 中文 |
|--------|------|
| realtime | 实时 |
| daily | 每日 |
| weekly | 每周 |
| monthly | 每月 |
| quarterly | 每季 |
| yearly | 每年 |
| event_driven | 事件驱动 |

##### 14.3.4.4 控制状态（control.status）
| 枚举值 | 中文 |
|--------|------|
| active | 生效中 |
| inactive | 已停用 |
| designing | 设计中 |
| retired | 已退役 |

##### 14.3.4.5 证据类型（control.evidence_type）
| 枚举值 | 中文 |
|--------|------|
| screenshot | 截图 |
| report | 报告 |
| log | 日志 |
| approval_flow | 审批流记录 |

##### 14.3.4.6 RCM映射类型（rcm.mapping_type）
| 枚举值 | 中文 |
|--------|------|
| direct | 直接控制 |
| indirect | 间接控制 |
| compensating | 补偿性控制 |

##### 14.3.4.7 控制有效性评级（rcm.effectiveness_rating）
| 枚举值 | 中文 |
|--------|------|
| high | 高效 |
| medium | 中等 |
| low | 低效 |

---

#### 14.3.5 评价相关枚举

##### 14.3.5.1 评价框架（evaluation_plan.evaluation_framework）
| 枚举值 | 中文 |
|--------|------|
| COSO | COSO内部控制框架 |
| COSO_ERM | COSO企业风险管理框架 |
| ISO31000 | ISO 31000风险管理标准 |
| local | 国内监管框架（如《企业内部控制基本规范》） |

##### 14.3.5.2 评价计划类型（evaluation_plan.plan_type）
| 枚举值 | 中文 |
|--------|------|
| annual | 年度评价 |
| semi_annual | 半年度评价 |
| quarterly | 季度评价 |
| special | 专项评价 |

##### 14.3.5.3 评价计划状态（evaluation_plan.status）
| 枚举值 | 中文 |
|--------|------|
| draft | 草稿 |
| submitted | 已提交 |
| approved | 已批准 |
| in_progress | 执行中 |
| completed | 已完成 |
| closed | 已关闭 |

##### 14.3.5.4 评价范围类型（evaluation_scope.scope_type）
| 枚举值 | 中文 |
|--------|------|
| org | 组织维度 |
| process | 流程维度 |
| control | 控制维度 |
| system | 系统维度 |

##### 14.3.5.5 评价范围状态（evaluation_scope.status）
| 枚举值 | 中文 |
|--------|------|
| pending | 待开始 |
| in_progress | 进行中 |
| completed | 已完成 |
| reviewed | 已复核 |

##### 14.3.5.6 评价结论（evaluation_scope.overall_conclusion / test_worksheet.test_conclusion）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| effective | 有效 | 控制设计和执行均有效 |
| partially_effective | 基本有效 | 存在一般缺陷但整体有效 |
| ineffective | 无效 | 存在重大/重要缺陷 |
| pass | 通过 | 单步测试通过 |
| fail | 未通过 | 单步测试未通过 |
| exception | 例外 | 存在例外情况 |
| not_applicable | 不适用 | 测试项不适用 |

##### 14.3.5.7 测试方法（test_program.test_method）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| inquiry | 询问 | 访谈、问卷 |
| observation | 观察 | 现场观察操作 |
| inspection | 检查 | 检查文档、记录 |
| reperformance | 重新执行 | 重新执行控制活动 |
| data_analysis | 数据分析 | 全量数据分析 |

##### 14.3.5.8 测试类型（test_program.test_type）
| 枚举值 | 中文 |
|--------|------|
| design_test | 设计有效性测试 |
| operating_test | 执行有效性测试 |
| combined | 综合测试 |

##### 14.3.5.9 抽样方法（test_program.sampling_method）
| 枚举值 | 中文 |
|--------|------|
| random | 随机抽样 |
| stratified | 分层抽样 |
| systematic | 系统抽样 |
| haphazard | 任意抽样 |
| attribute | 属性抽样 |

##### 14.3.5.10 测试方案状态（test_program.status）
| 枚举值 | 中文 |
|--------|------|
| draft | 草稿 |
| approved | 已批准 |
| in_progress | 执行中 |
| completed | 已完成 |

---

#### 14.3.6 缺陷与整改枚举

##### 14.3.6.1 缺陷严重等级（deficiency.severity）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| critical | 重大缺陷 | 可能导致严重损失或监管处罚 |
| major | 重要缺陷 | 可能导致较大损失或影响 |
| minor | 一般缺陷 | 影响较小，可常规整改 |

##### 14.3.6.2 缺陷类型（deficiency.deficiency_type）
| 枚举值 | 中文 |
|--------|------|
| design_deficiency | 设计缺陷 |
| operating_deficiency | 执行缺陷 |
| system_deficiency | 系统缺陷 |

##### 14.3.6.3 缺陷分类（deficiency.deficiency_category）
| 枚举值 | 中文 |
|--------|------|
| control_absence | 控制缺失 |
| control_design | 控制设计不当 |
| control_execution | 控制执行不到位 |
| compliance | 合规性问题 |

##### 14.3.6.4 缺陷来源类型（deficiency.source_type）
| 枚举值 | 中文 |
|--------|------|
| evaluation | 内控评价 |
| audit | 审计发现 |
| self_assessment | 自我评估 |
| incident | 风险事件 |
| regulatory | 监管检查 |

##### 14.3.6.5 整改状态（deficiency.remediation_status / remediation_plan.status）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| pending | 待整改 | 已识别，尚未制定方案 |
| in_progress | 整改中 | 整改任务执行中 |
| completed | 已完成 | 整改措施已实施 |
| verified | 已验证 | 整改效果已验证通过 |
| closed | 已关闭 | 整改流程完结 |

##### 14.3.6.6 整改方式（remediation_plan.remediation_approach）
| 枚举值 | 中文 |
|--------|------|
| process_improvement | 流程优化 |
| control_enhancement | 控制增强 |
| system_fix | 系统修复 |
| policy_update | 制度更新 |
| training | 培训宣导 |

##### 14.3.6.7 整改方案状态（remediation_plan.status）
| 枚举值 | 中文 |
|--------|------|
| draft | 草稿 |
| submitted | 已提交 |
| approved | 已批准 |
| in_progress | 执行中 |
| completed | 已完成 |
| closed | 已关闭 |

##### 14.3.6.8 整改任务优先级（remediation_task.task_priority）
| 枚举值 | 中文 |
|--------|------|
| high | 高 |
| medium | 中 |
| low | 低 |

##### 14.3.6.9 整改任务状态（remediation_task.status）
| 枚举值 | 中文 |
|--------|------|
| pending | 待开始 |
| in_progress | 进行中 |
| completed | 已完成 |
| reviewed | 已审核 |
| closed | 已关闭 |

##### 14.3.6.10 验证类型（remediation_verification.verification_type）
| 枚举值 | 中文 |
|--------|------|
| desk_review | 桌面复核 |
| on_site | 现场验证 |
| retest | 重新测试 |
| sampling | 抽样验证 |

##### 14.3.6.11 验证结果（remediation_verification.verification_result）
| 枚举值 | 中文 |
|--------|------|
| passed | 通过 |
| failed | 未通过 |
| partial | 部分通过 |

---

#### 14.3.7 KRI与预警枚举

##### 14.3.7.1 KRI分类（kri_definition.kri_category）
| 枚举值 | 中文 |
|--------|------|
| operational | 操作风险指标 |
| compliance | 合规风险指标 |
| financial | 财务风险指标 |
| strategic | 战略风险指标 |
| it | 信息科技风险指标 |

##### 14.3.7.2 指标类型（kri_definition.metric_type）
| 枚举值 | 中文 |
|--------|------|
| count | 计数型 |
| ratio | 比率型 |
| percentage | 百分比型 |
| amount | 金额型 |
| duration | 时长型 |

##### 14.3.7.3 采集频率（kri_definition.collection_frequency）
| 枚举值 | 中文 |
|--------|------|
| realtime | 实时 |
| daily | 每日 |
| weekly | 每周 |
| monthly | 每月 |
| quarterly | 每季度 |

##### 14.3.7.4 采集方式（kri_definition.collection_method / kri_data.collection_method）
| 枚举值 | 中文 |
|--------|------|
| manual | 人工录入 |
| auto_import | 自动导入 |
| api | API对接 |

##### 14.3.7.5 阈值方向（kri_definition.threshold_direction）
| 枚举值 | 中文 |
|--------|------|
| above | 高于阈值触发 |
| below | 低于阈值触发 |
| both | 双向触发 |

##### 14.3.7.6 预警等级（kri_data.warning_level / warning.warning_level）
| 枚举值 | 中文 | 颜色 |
|--------|------|------|
| green | 绿色（正常） | #00CC00 |
| yellow | 黄色预警 | #FFCC00 |
| orange | 橙色预警 | #FF8800 |
| red | 红色预警 | #FF0000 |

##### 14.3.7.7 预警状态（warning.status）
| 枚举值 | 中文 |
|--------|------|
| pending | 待处理 |
| acknowledged | 已确认 |
| resolved | 已处置 |
| closed | 已关闭 |

##### 14.3.7.8 数据质量标记（kri_data.data_quality_flag）
| 枚举值 | 中文 |
|--------|------|
| normal | 正常 |
| suspect | 可疑 |
| corrected | 已修正 |

---

#### 14.3.8 知识库枚举

##### 14.3.8.1 知识分类（document_chunk.knowledge_category）
| 枚举值 | 中文 |
|--------|------|
| regulation | 法规制度 |
| policy | 内部政策 |
| process | 流程知识 |
| risk_case | 风险案例 |
| control_best_practice | 控制最佳实践 |

##### 14.3.8.2 切片状态（document_chunk.status）
| 枚举值 | 中文 |
|--------|------|
| active | 有效 |
| outdated | 已过时 |
| archived | 已归档 |

---

#### 14.3.9 AI Agent枚举

##### 14.3.9.1 Agent类型（ai_agent_execution.agent_type）
| 枚举值 | 中文 | 说明 |
|--------|------|------|
| regulation_parser | 监管制度解析Agent | 解析监管文件提取控制要求 |
| risk_identifier | 风险识别Agent | 基于流程/制度识别风险点 |
| control_designer | 控制设计Agent | 推荐控制措施设计 |
| control_tester | 控制测试Agent | 辅助生成测试方案/底稿 |
| deficiency_analyzer | 缺陷分析Agent | 分析缺陷根因和影响 |
| process_optimizer | 流程优化Agent | 基于缺陷/KRI建议流程优化 |
| risk_monitor | 风险监测Agent | 持续监控KRI并预警 |

##### 14.3.9.2 触发方式（ai_agent_execution.trigger_type）
| 枚举值 | 中文 |
|--------|------|
| manual | 手动触发 |
| scheduled | 定时触发 |
| event_driven | 事件驱动 |
| api | API调用 |

##### 14.3.9.3 执行状态（ai_agent_execution.status）
| 枚举值 | 中文 |
|--------|------|
| pending | 等待执行 |
| running | 执行中 |
| completed | 执行完成 |
| failed | 执行失败 |
| cancelled | 已取消 |

##### 14.3.9.4 用户反馈（ai_agent_execution.user_feedback）
| 枚举值 | 中文 |
|--------|------|
| helpful | 有帮助 |
| not_helpful | 无帮助 |
| neutral | 一般 |

---

#### 14.3.10 审计日志枚举

##### 14.3.10.1 操作动作（audit_log.action）
| 枚举值 | 中文 |
|--------|------|
| CREATE | 创建 |
| UPDATE | 更新 |
| DELETE | 删除 |
| VIEW | 查看 |
| EXPORT | 导出 |
| IMPORT | 导入 |
| LOGIN | 登录 |
| LOGOUT | 登出 |
| APPROVE | 审批 |
| SUBMIT | 提交 |
| ASSIGN | 分配 |
| TRANSFER | 转交 |

##### 14.3.10.2 执行结果（audit_log.result）
| 枚举值 | 中文 |
|--------|------|
| success | 成功 |
| fail | 失败 |
| error | 异常 |

---

### 14.4 索引策略总览

#### 14.4.1 索引设计原则

1. **主键策略：** 所有表统一使用 `BIGINT UNSIGNED AUTO_INCREMENT` 自增主键，避免使用业务主键
2. **租户隔离：** 所有业务表必须包含 `tenant_id` 字段，租户内唯一约束使用 `UK(tenant_id, code)` 联合唯一索引
3. **外键索引：** 所有外键字段必须建立索引
4. **查询驱动：** 根据核心查询场景设计组合索引，遵循最左前缀原则
5. **覆盖索引：** 高频查询考虑使用覆盖索引减少回表
6. **前缀索引：** VARCHAR/TEXT 类型大字段使用前缀索引节省空间

#### 14.4.2 分表/分区策略

| 表名 | 策略 | 分片键/分区键 | 说明 |
|------|------|--------------|------|
| sys_audit_log | 按月 RANGE 分区 | created_at | 数据量最大，保留12-24个月在线数据 |
| ic_kri_data | 按月 RANGE 分区 | data_date | KRI数据按月采集，保留36个月 |
| ai_agent_execution | 按月 RANGE 分区 | created_at | Agent调用日志，保留12个月 |
| kb_document_chunk | 按租户 HASH 分表 | tenant_id | 知识库数据，大型租户数据量大 |
| sys_org | 按租户 HASH 分表 | tenant_id | 若租户组织架构数据量大 |
| ic_test_sample | 按租户 HASH 分表 | tenant_id | 抽样数据可能达到百万级 |

#### 14.4.3 索引命名规范

| 索引类型 | 命名格式 | 示例 |
|----------|----------|------|
| 主键 | pk_<table> | pk_sys_tenant |
| 唯一索引 | uk_<table>_<columns> | uk_tenant_code |
| 普通索引 | idx_<table>_<columns> | idx_risk_status |
| 全文索引 | ft_<table>_<columns> | ft_doc_keywords |
| 外键 | fk_<table>_<ref_table> | fk_sys_user_tenant |
| 向量索引 | vix_<table>_<columns> | vix_kvi_embedding |

#### 14.4.4 关键复合索引建议

以下是高频查询场景建议的复合索引（可在实施阶段按实际查询模式调整）：

```sql
-- 风险清单：按分类+等级查询
CREATE INDEX idx_risk_cat_level ON ic_risk(category_id, residual_risk_level, status);

-- 控制措施：按类型+性质查询
CREATE INDEX idx_control_type_nature ON ic_control(control_type, control_nature, status);

-- 缺陷：按等级+整改状态查询（驾驶舱高频）
CREATE INDEX idx_def_severity_remediation ON ic_deficiency(severity, remediation_status, is_overdue);

-- RCM矩阵：按控制查风险（反向查询）
CREATE INDEX idx_rcm_control_risk ON ic_rcm(control_id, risk_id);

-- 评价范围：按计划+状态查询
CREATE INDEX idx_scope_plan_status ON ic_evaluation_scope(plan_id, status);

-- 测试底稿：按方案+结论查询
CREATE INDEX idx_worksheet_program_conclusion ON ic_test_worksheet(program_id, test_conclusion);

-- KRI数据：按KRI+日期范围查询
CREATE INDEX idx_kri_data_id_date ON ic_kri_data(kri_id, data_date);

-- 审计日志：按时间范围+操作类型查询
CREATE INDEX idx_audit_time_action ON sys_audit_log(created_at, action, module);
```

---

### 14.5 数据模型设计总结

#### 14.5.1 设计特点

1. **多租户隔离：** 所有业务表通过 `tenant_id` 实现数据隔离，支持私有化部署场景下的子公司/分支机构隔离
2. **软删除：** 核心业务表使用 `is_deleted` 字段，防止误删数据
3. **审计追踪：** 统一的 `created_by/created_at/updated_by/updated_at` 字段，配合 sys_audit_log 实现完整操作审计
4. **JSON扩展：** 灵活使用 JSON/JSONB 字段存储扩展配置、附件列表、标签等非结构化数据
5. **冗余计算字段：** 适度使用冗余字段（如 risk_count, days_open, is_overdue）提升查询性能
6. **COSO框架对齐：** 数据模型遵循 COSO 内部控制框架的五要素（控制环境、风险评估、控制活动、信息与沟通、监督）

#### 14.5.2 关键技术选型建议

| 组件 | 推荐方案 | 备选方案 |
|------|----------|----------|
| 数据库 | PostgreSQL 15+ | MySQL 8.0+ |
| 向量存储 | pgvector 扩展 | Milvus / Qdrant |
| 全文检索 | PostgreSQL GIN/tsvector | Elasticsearch |
| 缓存 | Redis 7+ | - |
| 消息队列 | RabbitMQ / Kafka | - |
| 对象存储 | MinIO (私有化) | 兼容S3的存储 |
| 搜索引擎 | Elasticsearch 8+ | PostgreSQL全文搜索 |

---

> **文档版本历史：**
> - v1.0 (2026-08-06): 初始版本，包含32张核心表完整DDL、ER关系图、枚举定义、索引策略


---

# 附录

## 附录A：关键术语表

## 附录：关键术语表

| 术语 | 全称/说明 |
|------|-----------|
| **RCM** | Risk Control Matrix，风险控制矩阵 |
| **COSO** | Committee of Sponsoring Organizations，反虚假财务报告委员会发起组织，内控框架标准 |
| **CCM** | Continuous Controls Monitoring，持续控制监测 |
| **KRI** | Key Risk Indicator，关键风险指标 |
| **RAG** | Retrieval-Augmented Generation，检索增强生成 |
| **Human-in-the-loop** | 人机协同，AI 辅助决策但保留人工最终判断权 |
| **三道防线** | 业务部门（第一道）、风险管理/合规（第二道）、内部审计（第三道） |

---

> **文档说明**：本文档基于产品需求讨论对话整理而成，作为平台 MVP 阶段的开发需求基线。后续需根据客户实际需求进行定制化调整和细化。


---

> **文档说明**：本文档基于产品需求讨论对话、API接口设计、AI Agent Prompt工程、非功能性需求和数据模型设计四个部分整合而成，作为平台MVP阶段的完整开发需求基线。后续需根据客户实际需求进行定制化调整和细化。
>
> **合并来源文件：**
> 1. 《AI金融内控智能运营平台_需求说明书.md》— 产品需求规格（第一章至第八章+附录）
> 2. 《chapter_api_and_ui.md》— API接口规格与页面交互设计（第九章至第十章）
> 3. 《chapter_ai_and_nfr.md》— AI Agent Prompt工程、非功能性需求、验收标准（第十一章至第十三章）
> 4. 《chapter_data_model.md》— 数据模型设计（第十四章）