export const seedRisks = [
  // 信用风险 (categoryId: 1)
  {
    id: '1', riskCode: 'R001', riskName: '借款人违约风险', categoryId: '1', processId: '3',
    riskDescription: '借款人因经营不善或恶意逃避债务导致无法按期偿还贷款本息',
    inherentImpact: 4, inherentLikelihood: 3, inherentRiskLevel: '高',
    residualImpact: 2, residualLikelihood: 2, residualRiskLevel: '中',
    controlId: '1', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '2', riskCode: 'R002', riskName: '担保物价值不足风险', categoryId: '1', processId: '21',
    riskDescription: '抵质押物市场价值下降导致担保覆盖不足',
    inherentImpact: 3, inherentLikelihood: 3, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 2, residualRiskLevel: '中',
    controlId: '2', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 市场风险 (categoryId: 2)
  {
    id: '3', riskCode: 'R003', riskName: '利率波动风险', categoryId: '2', processId: '11',
    riskDescription: '市场利率大幅波动导致存贷利差收窄，影响银行净息差',
    inherentImpact: 4, inherentLikelihood: 4, inherentRiskLevel: '高',
    residualImpact: 3, residualLikelihood: 3, residualRiskLevel: '高',
    controlId: '3', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '4', riskCode: 'R004', riskName: '汇率波动风险', categoryId: '2', processId: '18',
    riskDescription: '汇率大幅波动导致外币贷款和跨境业务的汇兑损失',
    inherentImpact: 3, inherentLikelihood: 3, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 2, residualRiskLevel: '中',
    controlId: '4', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 操作风险 (categoryId: 3)
  {
    id: '5', riskCode: 'R005', riskName: '信贷审批操作失误风险', categoryId: '3', processId: '11',
    riskDescription: '审批人员操作失误导致不符合条件的授信获批',
    inherentImpact: 4, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '5', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '6', riskCode: 'R006', riskName: '放款操作差错风险', categoryId: '3', processId: '18',
    riskDescription: '放款金额、账户信息等录入错误导致资金错划',
    inherentImpact: 3, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 1, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '6', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 流动性风险 (categoryId: 4)
  {
    id: '7', riskCode: 'R007', riskName: '资产负债期限错配风险', categoryId: '4', processId: '18',
    riskDescription: '短期负债支撑长期资产导致流动性缺口',
    inherentImpact: 4, inherentLikelihood: 3, inherentRiskLevel: '高',
    residualImpact: 3, residualLikelihood: 2, residualRiskLevel: '中',
    controlId: '7', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '8', riskCode: 'R008', riskName: '存款集中到期风险', categoryId: '4', processId: '28',
    riskDescription: '大额存款集中到期导致短期流动性压力',
    inherentImpact: 3, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '8', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 合规风险 (categoryId: 5)
  {
    id: '9', riskCode: 'R009', riskName: '监管违规风险', categoryId: '5', processId: '16',
    riskDescription: '贷款合同条款违反监管规定或消费者权益保护要求',
    inherentImpact: 5, inherentLikelihood: 2, inherentRiskLevel: '高',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '9', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '10', riskCode: 'R010', riskName: '反洗钱合规风险', categoryId: '5', processId: '4',
    riskDescription: '客户身份识别和可疑交易报告不到位导致反洗钱处罚',
    inherentImpact: 5, inherentLikelihood: 3, inherentRiskLevel: '高',
    residualImpact: 3, residualLikelihood: 2, residualRiskLevel: '中',
    controlId: '10', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 声誉风险 (categoryId: 6)
  {
    id: '11', riskCode: 'R011', riskName: '客户投诉升级风险', categoryId: '6', processId: '25',
    riskDescription: '贷后催收行为不当或服务问题引发客户大规模投诉和媒体曝光',
    inherentImpact: 3, inherentLikelihood: 3, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 2, residualRiskLevel: '中',
    controlId: '11', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '12', riskCode: 'R012', riskName: '负面舆情风险', categoryId: '6', processId: '31',
    riskDescription: '不良贷款大规模暴露引发市场负面评价和投资者信心下降',
    inherentImpact: 4, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '12', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 战略风险 (categoryId: 7)
  {
    id: '13', riskCode: 'R013', riskName: '行业集中度过高风险', categoryId: '7', processId: '11',
    riskDescription: '信贷资产过度集中于房地产等周期性行业，经济下行时风险集中暴露',
    inherentImpact: 4, inherentLikelihood: 3, inherentRiskLevel: '高',
    residualImpact: 3, residualLikelihood: 2, residualRiskLevel: '中',
    controlId: '13', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '14', riskCode: 'R014', riskName: '产品创新不足风险', categoryId: '7', processId: '12',
    riskDescription: '信贷产品同质化严重，缺乏竞争力导致市场份额下降',
    inherentImpact: 3, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '14', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 信息科技风险 (categoryId: 8)
  {
    id: '15', riskCode: 'R015', riskName: '信贷系统故障风险', categoryId: '8', processId: '20',
    riskDescription: '信贷管理系统故障导致放款中断或数据处理错误',
    inherentImpact: 4, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '6', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '16', riskCode: 'R016', riskName: '客户数据泄露风险', categoryId: '8', processId: '4',
    riskDescription: '客户个人信息和信贷数据因安全漏洞导致泄露',
    inherentImpact: 5, inherentLikelihood: 2, inherentRiskLevel: '高',
    residualImpact: 3, residualLikelihood: 1, residualRiskLevel: '中',
    controlId: '15', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 洗钱风险 (categoryId: 9)
  {
    id: '17', riskCode: 'R017', riskName: '贷款资金挪用风险', categoryId: '9', processId: '20',
    riskDescription: '贷款资金被挪用至非法用途或通过复杂交易路径洗白',
    inherentImpact: 4, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '10', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '18', riskCode: 'R018', riskName: '空壳公司套贷风险', categoryId: '9', processId: '5',
    riskDescription: '通过设立空壳公司伪造经营数据骗取银行贷款',
    inherentImpact: 5, inherentLikelihood: 2, inherentRiskLevel: '高',
    residualImpact: 3, residualLikelihood: 1, residualRiskLevel: '中',
    controlId: '1', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },

  // 集中度风险 (categoryId: 10)
  {
    id: '19', riskCode: 'R019', riskName: '单一客户集中度风险', categoryId: '10', processId: '11',
    riskDescription: '对单一借款人授信额度过大，超过监管集中度限额',
    inherentImpact: 5, inherentLikelihood: 2, inherentRiskLevel: '高',
    residualImpact: 3, residualLikelihood: 1, residualRiskLevel: '中',
    controlId: '13', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: '20', riskCode: 'R020', riskName: '关联交易风险', categoryId: '10', processId: '12',
    riskDescription: '关联方之间授信审批不独立，存在利益输送风险',
    inherentImpact: 4, inherentLikelihood: 2, inherentRiskLevel: '中',
    residualImpact: 2, residualLikelihood: 1, residualRiskLevel: '低',
    controlId: '5', status: 'active',
    createdAt: '2025-06-01T00:00:00Z', updatedAt: '2026-08-01T00:00:00Z',
  },
];
