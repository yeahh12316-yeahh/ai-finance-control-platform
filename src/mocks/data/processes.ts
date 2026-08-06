export const seedProcesses = [
  // L1: 信贷业务
  { id: '1', processCode: 'P001', processName: '信贷业务', parentId: '0', processLevel: 1, description: '银行信贷业务全流程管理', status: 'active', sortOrder: 1, riskCount: 20, controlCount: 15, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L2: 贷前管理
  { id: '2', processCode: 'P001-01', processName: '贷前管理', parentId: '1', processLevel: 2, description: '信贷业务贷前管理流程', status: 'active', sortOrder: 1, riskCount: 8, controlCount: 5, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 客户准入
  { id: '3', processCode: 'P001-01-01', processName: '客户准入', parentId: '2', processLevel: 3, description: '贷款客户准入资格审查', status: 'active', sortOrder: 1, riskCount: 3, controlCount: 2, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '4', processCode: 'P001-01-01-01', processName: '客户身份识别', parentId: '3', processLevel: 4, description: '识别和核实客户身份信息', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '5', processCode: 'P001-01-01-02', processName: '客户尽职调查', parentId: '3', processLevel: 4, description: '对客户进行全面的尽职调查', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '6', processCode: 'P001-01-01-03', processName: '黑名单筛查', parentId: '3', processLevel: 4, description: '反洗钱黑名单和制裁名单筛查', status: 'active', sortOrder: 3, riskCount: 1, controlCount: 0, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 信用评估
  { id: '7', processCode: 'P001-01-02', processName: '信用评估', parentId: '2', processLevel: 3, description: '客户信用评级和额度评估', status: 'active', sortOrder: 2, riskCount: 3, controlCount: 2, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '8', processCode: 'P001-01-02-01', processName: '财务报表分析', parentId: '7', processLevel: 4, description: '分析客户财务报表和经营状况', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '9', processCode: 'P001-01-02-02', processName: '信用评级打分', parentId: '7', processLevel: 4, description: '根据评分卡模型进行信用评级', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '10', processCode: 'P001-01-02-03', processName: '额度测算', parentId: '7', processLevel: 4, description: '根据评级结果测算授信额度', status: 'active', sortOrder: 3, riskCount: 1, controlCount: 0, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 授信审批
  { id: '11', processCode: 'P001-01-03', processName: '授信审批', parentId: '2', processLevel: 3, description: '授信额度和条件的审批流程', status: 'active', sortOrder: 3, riskCount: 2, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '12', processCode: 'P001-01-03-01', processName: '授信方案制定', parentId: '11', processLevel: 4, description: '制定具体的授信方案和条件', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '13', processCode: 'P001-01-03-02', processName: '审批流程管理', parentId: '11', processLevel: 4, description: '多级审批流程的发起和跟踪', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 0, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L2: 贷中管理
  { id: '14', processCode: 'P001-02', processName: '贷中管理', parentId: '1', processLevel: 2, description: '信贷业务贷中管理流程', status: 'active', sortOrder: 2, riskCount: 6, controlCount: 5, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 合同管理
  { id: '15', processCode: 'P001-02-01', processName: '合同管理', parentId: '14', processLevel: 3, description: '贷款合同的签订和管理', status: 'active', sortOrder: 1, riskCount: 2, controlCount: 2, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '16', processCode: 'P001-02-01-01', processName: '合同文本审核', parentId: '15', processLevel: 4, description: '法律合规审核合同文本', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '17', processCode: 'P001-02-01-02', processName: '合同签署归档', parentId: '15', processLevel: 4, description: '合同签署和归档管理', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 放款管理
  { id: '18', processCode: 'P001-02-02', processName: '放款管理', parentId: '14', processLevel: 3, description: '贷款发放和资金划拨管理', status: 'active', sortOrder: 2, riskCount: 2, controlCount: 2, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '19', processCode: 'P001-02-02-01', processName: '放款条件审核', parentId: '18', processLevel: 4, description: '审核放款前提条件是否满足', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '20', processCode: 'P001-02-02-02', processName: '资金划拨执行', parentId: '18', processLevel: 4, description: '执行贷款资金的划拨操作', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 担保管理
  { id: '21', processCode: 'P001-02-03', processName: '担保管理', parentId: '14', processLevel: 3, description: '抵质押物和保证人的管理', status: 'active', sortOrder: 3, riskCount: 2, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '22', processCode: 'P001-02-03-01', processName: '抵质押物评估', parentId: '21', processLevel: 4, description: '对抵质押物进行价值评估', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '23', processCode: 'P001-02-03-02', processName: '担保登记管理', parentId: '21', processLevel: 4, description: '办理担保登记和续期手续', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 0, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L2: 贷后管理
  { id: '24', processCode: 'P001-03', processName: '贷后管理', parentId: '1', processLevel: 2, description: '信贷业务贷后管理流程', status: 'active', sortOrder: 3, riskCount: 6, controlCount: 5, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 贷后检查
  { id: '25', processCode: 'P001-03-01', processName: '贷后检查', parentId: '24', processLevel: 3, description: '贷款发放后的定期和不定期检查', status: 'active', sortOrder: 1, riskCount: 2, controlCount: 2, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '26', processCode: 'P001-03-01-01', processName: '定期贷后检查', parentId: '25', processLevel: 4, description: '按频率执行的常规贷后检查', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '27', processCode: 'P001-03-01-02', processName: '专项贷后检查', parentId: '25', processLevel: 4, description: '针对特定风险事件的专项检查', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 风险分类
  { id: '28', processCode: 'P001-03-02', processName: '风险分类', parentId: '24', processLevel: 3, description: '贷款五级分类管理', status: 'active', sortOrder: 2, riskCount: 2, controlCount: 2, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '29', processCode: 'P001-03-02-01', processName: '风险分类初分', parentId: '28', processLevel: 4, description: '根据分类标准进行初分', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '30', processCode: 'P001-03-02-02', processName: '风险分类复核', parentId: '28', processLevel: 4, description: '对初分结果进行复核确认', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },

  // L3: 不良处置
  { id: '31', processCode: 'P001-03-03', processName: '不良处置', parentId: '24', processLevel: 3, description: '不良贷款的处置和清收', status: 'active', sortOrder: 3, riskCount: 2, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '32', processCode: 'P001-03-03-01', processName: '催收管理', parentId: '31', processLevel: 4, description: '逾期贷款的催收流程', status: 'active', sortOrder: 1, riskCount: 1, controlCount: 1, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
  { id: '33', processCode: 'P001-03-03-02', processName: '核销管理', parentId: '31', processLevel: 4, description: '不良贷款核销的审批和执行', status: 'active', sortOrder: 2, riskCount: 1, controlCount: 0, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
];
