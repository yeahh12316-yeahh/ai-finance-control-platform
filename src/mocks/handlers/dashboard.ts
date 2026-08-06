import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';

function successResponse<T>(data: T) {
  return {
    code: 0,
    message: 'success',
    data,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

export const dashboardHandlers = [
  // GET /api/v1/ic-dashboard/health
  http.get('/api/v1/ic-dashboard/health', () => {
    const healthData = {
      overallScore: 85,
      overallStatus: '良好',
      dimensions: [
        {
          name: '控制环境',
          score: 88,
          status: '良好',
          indicators: [
            { name: '内控组织架构完整性', value: 92 },
            { name: '内控职责清晰度', value: 88 },
            { name: '内控文化认同度', value: 84 },
          ],
        },
        {
          name: '风险评估',
          score: 82,
          status: '良好',
          indicators: [
            { name: '风险识别覆盖率', value: 85 },
            { name: '风险评估及时性', value: 80 },
            { name: '风险矩阵完整性', value: 82 },
          ],
        },
        {
          name: '控制活动',
          score: 85,
          status: '良好',
          indicators: [
            { name: '控制设计有效性', value: 87 },
            { name: '控制执行一致性', value: 83 },
            { name: '控制自动化率', value: 45 },
          ],
        },
        {
          name: '信息与沟通',
          score: 90,
          status: '优秀',
          indicators: [
            { name: '信息传递及时性', value: 92 },
            { name: '沟通渠道畅通度', value: 88 },
            { name: '报告质量满意度', value: 90 },
          ],
        },
        {
          name: '监控活动',
          score: 80,
          status: '良好',
          indicators: [
            { name: '持续监控覆盖率', value: 78 },
            { name: '独立评价频率', value: 82 },
            { name: '缺陷整改闭环率', value: 80 },
          ],
        },
      ],
      lastUpdated: '2026-08-06T00:00:00Z',
    };

    return HttpResponse.json(successResponse(healthData));
  }),

  // GET /api/v1/ic-dashboard/risk-trend
  http.get('/api/v1/ic-dashboard/risk-trend', async ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '6months';

    const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'];
    const monthLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];

    const dataCount = period === '12months' ? 12 : period === '3months' ? 3 : 8;

    const trendData = {
      overallRiskScore: months.slice(-dataCount).map((month, i) => ({
        month,
        monthLabel: monthLabels.slice(-dataCount)[i],
        score: 85 + Math.round(Math.sin(i * 0.5) * 5),
      })),
      riskByCategory: [
        {
          category: '信用风险',
          data: months.slice(-dataCount).map((month) => ({
            month,
            highRiskCount: 2 + Math.round(Math.random()),
            mediumRiskCount: 3 + Math.round(Math.random() * 2),
            lowRiskCount: 4 + Math.round(Math.random() * 2),
          })),
        },
        {
          category: '操作风险',
          data: months.slice(-dataCount).map((month) => ({
            month,
            highRiskCount: 1 + Math.round(Math.random()),
            mediumRiskCount: 2 + Math.round(Math.random() * 2),
            lowRiskCount: 5 + Math.round(Math.random() * 3),
          })),
        },
        {
          category: '合规风险',
          data: months.slice(-dataCount).map((month) => ({
            month,
            highRiskCount: 1 + Math.round(Math.random()),
            mediumRiskCount: 2 + Math.round(Math.random()),
            lowRiskCount: 3 + Math.round(Math.random() * 2),
          })),
        },
      ],
      defectTrend: months.slice(-dataCount).map((month) => ({
        month,
        newDefects: Math.round(Math.random() * 3),
        closedDefects: Math.round(Math.random() * 4),
        openDefects: 4 + Math.round(Math.random() * 2),
      })),
      controlTestPassRate: months.slice(-dataCount).map((month) => ({
        month,
        passRate: 82 + Math.round(Math.random() * 10),
      })),
    };

    return HttpResponse.json(successResponse(trendData));
  }),

  // GET /api/v1/ic-dashboard/summary
  http.get('/api/v1/ic-dashboard/summary', () => {
    const summary = {
      processStats: {
        totalProcesses: 33,
        activeProcesses: 33,
        withRisks: 18,
        withControls: 22,
      },
      riskStats: {
        totalRisks: 20,
        highRisks: 6,
        mediumRisks: 8,
        lowRisks: 6,
      },
      controlStats: {
        totalControls: 15,
        effective: 9,
        partiallyEffective: 6,
        ineffective: 0,
      },
      evaluationStats: {
        totalPlans: 3,
        inProgress: 1,
        completed: 1,
        totalWorksheets: 8,
        completedWorksheets: 5,
      },
      defectStats: {
        totalDefects: 6,
        openDefects: 4,
        closedDefects: 2,
        criticalDefects: 1,
        majorDefects: 3,
        minorDefects: 2,
        overdueDefects: 1,
      },
      documentStats: {
        totalDocuments: 5,
        publishedDocuments: 3,
        draftDocuments: 1,
        archivedDocuments: 1,
      },
    };

    return HttpResponse.json(successResponse(summary));
  }),

  // GET /api/v1/ic-dashboard/alerts
  http.get('/api/v1/ic-dashboard/alerts', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);

    const alerts = [
      {
        id: 'alert-001',
        alertType: 'red',
        alertLevel: 'critical',
        title: '房地产行业授信集中度超标',
        description: '截至2026年6月末，房地产行业授信集中度达到30%，超过监管规定的15%限额',
        source: '集中度指标监控',
        relatedDefectId: 'def-002',
        createdAt: '2026-07-25T00:00:00Z',
        status: 'active',
      },
      {
        id: 'alert-002',
        alertType: 'orange',
        alertLevel: 'warning',
        title: '控制测试通过率低于目标',
        description: '2026年Q2控制测试通过率为87.5%，低于90%的年度目标',
        source: '评价管理',
        relatedDefectId: '',
        createdAt: '2026-07-22T00:00:00Z',
        status: 'active',
      },
      {
        id: 'alert-003',
        alertType: 'orange',
        alertLevel: 'warning',
        title: '缺陷整改及时率偏低',
        description: '当前缺陷整改及时率为75%，低于85%的考核标准',
        source: '缺陷管理',
        relatedDefectId: 'def-002',
        createdAt: '2026-08-01T00:00:00Z',
        status: 'active',
      },
      {
        id: 'alert-004',
        alertType: 'yellow',
        alertLevel: 'info',
        title: '客户准入审批控制缺失整改推进中',
        description: 'DEF-2026-001缺陷的整改任务"系统增加二级审批流程配置"进度延迟',
        source: '缺陷管理',
        relatedDefectId: 'def-001',
        createdAt: '2026-08-03T00:00:00Z',
        status: 'active',
      },
      {
        id: 'alert-005',
        alertType: 'yellow',
        alertLevel: 'info',
        title: '贷后资金用途监控系统升级计划启动',
        description: 'DEF-2026-003缺陷的整改计划已制定，需关注后续执行进度',
        source: '缺陷管理',
        relatedDefectId: 'def-003',
        createdAt: '2026-08-04T00:00:00Z',
        status: 'active',
      },
      {
        id: 'alert-006',
        alertType: 'green',
        alertLevel: 'resolved',
        title: '反洗钱可疑交易报告延迟问题已整改完成',
        description: 'DEF-2025-002缺陷已完成整改验证，反洗钱报告及时率提升至98.5%',
        source: '缺陷管理',
        relatedDefectId: 'def-005',
        createdAt: '2026-04-05T00:00:00Z',
        status: 'resolved',
      },
    ];

    const total = alerts.length;
    const start = (page - 1) * pageSize;
    const paged = alerts.slice(start, start + pageSize);

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        list: paged,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      timestamp: Date.now(),
      requestId: uuid(),
    });
  }),
];
