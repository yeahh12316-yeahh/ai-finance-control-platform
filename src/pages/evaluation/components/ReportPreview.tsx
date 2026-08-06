import { Card, Descriptions, Tag, Divider, Table, Typography } from 'antd';
import type { EvaluationPlan, TestWorksheet } from '@/types/evaluation';
import {
  PLAN_TYPE_MAP,
  PLAN_STATUS_MAP,
  EVALUATION_FRAMEWORK_MAP,
  TEST_CONCLUSION_MAP,
} from '@/types/evaluation';
import type { PlanType, PlanStatus, EvaluationFramework, TestConclusion } from '@/types/evaluation';

const { Title, Paragraph } = Typography;

interface ReportPreviewProps {
  plan: EvaluationPlan;
  worksheets: TestWorksheet[];
  summary: {
    total: number;
    effective: number;
    partiallyEffective: number;
    ineffective: number;
    withFindings: number;
  };
}

export default function ReportPreview({ plan, worksheets, summary }: ReportPreviewProps) {
  const findings = worksheets.filter((w) => w.finding);

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          内控评价报告
        </Title>
      }
    >
      {/* Section 1: Overview */}
      <Title level={5}>一、评价概述</Title>
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item label="报告名称">{plan.planName}</Descriptions.Item>
        <Descriptions.Item label="计划编号">{plan.planCode}</Descriptions.Item>
        <Descriptions.Item label="评价年度">{plan.planYear}年</Descriptions.Item>
        <Descriptions.Item label="计划类型">
          {PLAN_TYPE_MAP[plan.planType as PlanType]}
        </Descriptions.Item>
        <Descriptions.Item label="评价框架">
          {EVALUATION_FRAMEWORK_MAP[plan.evaluationFramework as EvaluationFramework]}
        </Descriptions.Item>
        <Descriptions.Item label="评价期间">
          {new Date(plan.startDate).toLocaleDateString('zh-CN')} ~ {new Date(plan.endDate).toLocaleDateString('zh-CN')}
        </Descriptions.Item>
        <Descriptions.Item label="评价状态">
          <Tag color={PLAN_STATUS_MAP[plan.status as PlanStatus]?.color}>
            {PLAN_STATUS_MAP[plan.status as PlanStatus]?.label}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="计划描述" span={2}>
          {plan.description}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Section 2: Scope */}
      <Title level={5}>二、评价范围</Title>
      <Paragraph>
        本次评价共覆盖 {summary.total} 个控制措施，涵盖信贷业务、市场风险、信息科技等核心业务领域。
        评价方法包括检查、重新执行、观察等多种测试手段。
      </Paragraph>

      <Divider />

      {/* Section 3: Results Summary */}
      <Title level={5}>三、评价结果汇总</Title>
      <Descriptions column={4} bordered size="small">
        <Descriptions.Item label="底稿总数">{summary.total} 份</Descriptions.Item>
        <Descriptions.Item label="有效">
          <Tag color="success">{summary.effective} 项</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="部分有效">
          <Tag color="warning">{summary.partiallyEffective} 项</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="无效">
          <Tag color="error">{summary.ineffective} 项</Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Section 4: Findings */}
      <Title level={5}>四、发现缺陷</Title>
      {findings.length > 0 ? (
        <Table
          rowKey="id"
          dataSource={findings}
          columns={[
            {
              title: '序号',
              key: 'index',
              width: 60,
              render: (_: unknown, __: unknown, index: number) => index + 1,
            },
            {
              title: '控制名称',
              dataIndex: 'controlName',
              key: 'controlName',
              width: 200,
            },
            {
              title: '测试结论',
              dataIndex: 'testConclusion',
              key: 'testConclusion',
              width: 100,
              render: (c: TestConclusion) => {
                const config = TEST_CONCLUSION_MAP[c];
                return <Tag color={config?.color}>{config?.label}</Tag>;
              },
            },
            {
              title: '缺陷描述',
              dataIndex: 'finding',
              key: 'finding',
              ellipsis: true,
            },
          ]}
          pagination={false}
          size="small"
        />
      ) : (
        <Paragraph>本次评价未发现控制缺陷。</Paragraph>
      )}

      <Divider />

      {/* Section 5: Recommendations */}
      <Title level={5}>五、改进建议</Title>
      {findings.length > 0 ? (
        <Paragraph>
          基于以上发现的 {findings.length} 项缺陷，建议如下：
        </Paragraph>
      ) : (
        <Paragraph>无。</Paragraph>
      )}
      <ol>
        {findings.map((f, index) => (
          <li key={f.id}>
            <strong>{f.controlName}：</strong>
            针对"{f.finding}"，建议加强相关控制措施的执行监督，完善系统自动化控制功能，
            并纳入下期重点跟踪事项。
          </li>
        ))}
      </ol>
    </Card>
  );
}
