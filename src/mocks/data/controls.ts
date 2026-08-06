export const seedControls = [
  // Preventive controls (预防性控制)
  {
    id: '1', controlCode: 'C001', controlName: '客户身份识别与尽职调查', controlType: 'preventive' as const,
    controlNature: 'manual' as const, controlFrequency: '每笔', processId: '4',
    description: '对新客户进行身份识别和尽职调查，包括证件核验、经营状况核实和负面信息筛查',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '2', controlCode: 'C002', controlName: '抵质押物价值定期重估', controlType: 'preventive' as const,
    controlNature: 'semi_automated' as const, controlFrequency: '每季', processId: '22',
    description: '定期对抵质押物进行市场价值重估，确保担保覆盖率满足要求',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '3', controlCode: 'C003', controlName: '利率风险限额管理', controlType: 'preventive' as const,
    controlNature: 'automated' as const, controlFrequency: '每日', processId: '11',
    description: '设置利率风险敞口限额，系统自动监控并在超限时预警',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '4', controlCode: 'C004', controlName: '汇率风险对冲机制', controlType: 'preventive' as const,
    controlNature: 'semi_automated' as const, controlFrequency: '每日', processId: '18',
    description: '对外币贷款敞口进行定期评估并执行对冲操作',
    status: 'active', effectivenessRating: '部分有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '5', controlCode: 'C005', controlName: '授信审批权限分级', controlType: 'preventive' as const,
    controlNature: 'automated' as const, controlFrequency: '持续', processId: '11',
    description: '根据授信金额设置分级审批权限，超额自动升级审批层级',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '6', controlCode: 'C006', controlName: '放款双人复核机制', controlType: 'preventive' as const,
    controlNature: 'manual' as const, controlFrequency: '每笔', processId: '20',
    description: '放款操作需经经办和复核两人分别确认后方可执行',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '7', controlCode: 'C007', controlName: '流动性压力测试', controlType: 'preventive' as const,
    controlNature: 'automated' as const, controlFrequency: '每月', processId: '18',
    description: '定期开展流动性压力测试，评估极端情景下的流动性风险',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '8', controlCode: 'C008', controlName: '资产负债期限匹配管理', controlType: 'preventive' as const,
    controlNature: 'automated' as const, controlFrequency: '每日', processId: '28',
    description: '监控资产负债期限缺口，确保流动性覆盖率满足监管要求',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '9', controlCode: 'C009', controlName: '合同合规审查', controlType: 'preventive' as const,
    controlNature: 'manual' as const, controlFrequency: '每笔', processId: '16',
    description: '法律合规部门对贷款合同条款进行合规性审查',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '10', controlCode: 'C010', controlName: '反洗钱交易监控', controlType: 'preventive' as const,
    controlNature: 'automated' as const, controlFrequency: '持续', processId: '4',
    description: '通过反洗钱系统对可疑交易进行实时监控和预警',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // Detective controls (检测性控制)
  {
    id: '11', controlCode: 'C011', controlName: '贷后资金用途监控', controlType: 'detective' as const,
    controlNature: 'automated' as const, controlFrequency: '持续', processId: '26',
    description: '通过资金流向监控系统追踪贷款资金实际用途',
    status: 'active', effectivenessRating: '部分有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '12', controlCode: 'C012', controlName: '舆情监测与预警', controlType: 'detective' as const,
    controlNature: 'automated' as const, controlFrequency: '持续', processId: '27',
    description: '通过网络舆情监测系统及时发现负面信息并预警',
    status: 'active', effectivenessRating: '部分有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '13', controlCode: 'C013', controlName: '集中度指标监控', controlType: 'detective' as const,
    controlNature: 'automated' as const, controlFrequency: '每日', processId: '11',
    description: '监控单一客户、行业、区域的授信集中度指标',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // Corrective controls (纠正性控制)
  {
    id: '14', controlCode: 'C014', controlName: '信贷业务流程优化', controlType: 'corrective' as const,
    controlNature: 'manual' as const, controlFrequency: '每季', processId: '12',
    description: '根据市场变化和内控评价结果持续优化信贷业务流程',
    status: 'active', effectivenessRating: '部分有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '15', controlCode: 'C015', controlName: '数据安全事件响应', controlType: 'corrective' as const,
    controlNature: 'semi_automated' as const, controlFrequency: '事件驱动', processId: '4',
    description: '建立数据安全事件应急响应机制，发生泄露时快速处置',
    status: 'active', effectivenessRating: '有效',
    createdAt: '2025-03-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
];
