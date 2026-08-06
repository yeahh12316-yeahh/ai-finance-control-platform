export const seedRiskCategories = [
  { id: '1', categoryCode: 'RC001', categoryName: '信用风险', parentId: '0', description: '因借款人或交易对手未能履行合同义务而导致损失的风险', sortOrder: 1 },
  { id: '2', categoryCode: 'RC002', categoryName: '市场风险', parentId: '0', description: '因市场价格（利率、汇率、股价、商品价格）不利变动导致损失的风险', sortOrder: 2 },
  { id: '3', categoryCode: 'RC003', categoryName: '操作风险', parentId: '0', description: '因内部流程、人员、系统不完善或失败，或外部事件导致损失的风险', sortOrder: 3 },
  { id: '4', categoryCode: 'RC004', categoryName: '流动性风险', parentId: '0', description: '无法以合理成本及时获得充足资金以应对资产增长或支付到期债务的风险', sortOrder: 4 },
  { id: '5', categoryCode: 'RC005', categoryName: '合规风险', parentId: '0', description: '因违反法律法规、监管规定或行业准则而遭受法律制裁、监管处罚、财务损失或声誉损失的风险', sortOrder: 5 },
  { id: '6', categoryCode: 'RC006', categoryName: '声誉风险', parentId: '0', description: '因负面公众舆论导致客户流失、业务减少或品牌价值下降的风险', sortOrder: 6 },
  { id: '7', categoryCode: 'RC007', categoryName: '战略风险', parentId: '0', description: '因战略决策不当、战略执行不力或外部环境变化导致经营目标无法实现的风险', sortOrder: 7 },
  { id: '8', categoryCode: 'RC008', categoryName: '信息科技风险', parentId: '0', description: '因信息系统故障、数据泄露、网络攻击等科技因素导致损失的风险', sortOrder: 8 },
  { id: '9', categoryCode: 'RC009', categoryName: '洗钱风险', parentId: '0', description: '被不法分子利用从事洗钱、恐怖融资等非法活动而面临法律和声誉损失的风险', sortOrder: 9 },
  { id: '10', categoryCode: 'RC010', categoryName: '集中度风险', parentId: '0', description: '因对单一客户、行业、区域或产品的风险暴露过度集中而导致损失的风险', sortOrder: 10 },
];
