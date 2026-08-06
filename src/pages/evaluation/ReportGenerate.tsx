import { useState, useEffect } from 'react';
import {
  Select,
  Button,
  Card,
  Descriptions,
  Tag,
  Table,
  Space,
  message,
  Spin,
  Row,
  Col,
  Statistic,
  Divider,
} from 'antd';
import {
  FileProtectOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { getPlans, getWorksheets } from '@/services/evaluation';
import type { EvaluationPlan, TestWorksheet } from '@/types/evaluation';
import {
  PLAN_STATUS_MAP,
  TEST_CONCLUSION_MAP,
} from '@/types/evaluation';
import type { TestConclusion, PlanStatus } from '@/types/evaluation';
import ReportPreview from './components/ReportPreview';

export default function ReportGeneratePage() {
  const [plans, setPlans] = useState<EvaluationPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<EvaluationPlan | null>(null);
  const [worksheets, setWorksheets] = useState<TestWorksheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await getPlans({ page: 1, pageSize: 100 });
      setPlans(res.data.list);
    } catch {
      // mock data
    }
  };

  const fetchWorksheets = async (planId: string) => {
    if (!planId) return;
    setLoading(true);
    try {
      const res = await getWorksheets({ page: 1, pageSize: 1000, programId: planId });
      setWorksheets(res.data.list);
    } catch {
      // mock data
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
    const plan = plans.find((p) => p.id === planId);
    setSelectedPlan(plan || null);
    fetchWorksheets(planId);
  };

  const handleGenerateReport = () => {
    if (!selectedPlan) {
      message.warning('请先选择评价计划');
      return;
    }
    setGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGenerating(false);
      message.success('报告生成成功');
    }, 1500);
  };

  const handleExport = () => {
    if (!selectedPlan) {
      message.warning('请先选择评价计划并生成报告');
      return;
    }
    message.success('报告已开始下载');
    // Mock download
    const blob = new Blob(['报告内容'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `内控评价报告_${selectedPlan.planName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const summary = {
    total: worksheets.length,
    effective: worksheets.filter((w) => w.testConclusion === 'effective').length,
    partiallyEffective: worksheets.filter((w) => w.testConclusion === 'partially_effective').length,
    ineffective: worksheets.filter((w) => w.testConclusion === 'ineffective').length,
    withFindings: worksheets.filter((w) => w.finding).length,
  };

  const conclusionColumns = [
    {
      title: '控制名称',
      dataIndex: 'controlName',
      key: 'controlName',
      width: 200,
    },
    {
      title: '测试方法',
      dataIndex: 'testMethod',
      key: 'testMethod',
      width: 100,
    },
    {
      title: '样本量',
      dataIndex: 'sampleSize',
      key: 'sampleSize',
      width: 80,
      align: 'center' as const,
    },
    {
      title: '测试结论',
      dataIndex: 'testConclusion',
      key: 'testConclusion',
      width: 110,
      render: (c: TestConclusion) => {
        const config = TEST_CONCLUSION_MAP[c];
        return config ? <Tag color={config.color}>{config.label}</Tag> : <Tag>{c}</Tag>;
      },
    },
    {
      title: '发现问题',
      dataIndex: 'finding',
      key: 'finding',
      ellipsis: true,
      render: (text: string) => text || '-',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <span style={{ marginRight: 8 }}>选择评价计划：</span>
            <Select
              placeholder="选择评价计划"
              style={{ width: 350 }}
              value={selectedPlanId || undefined}
              onChange={handlePlanChange}
              options={plans
                .filter((p) => p.status === 'in_progress' || p.status === 'completed')
                .map((p) => ({
                  label: `${p.planName} (${p.planCode})`,
                  value: p.id,
                }))}
            />
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Space>
              <Button
                type="primary"
                icon={<FileProtectOutlined />}
                onClick={handleGenerateReport}
                disabled={!selectedPlan}
                loading={generating}
              >
                生成报告
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={handleExport}
                disabled={!selectedPlan}
              >
                导出报告
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <Spin spinning={loading}>
        {selectedPlan ? (
          <>
            {/* Summary cards */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={4}>
                <Card>
                  <Statistic
                    title="底稿总数"
                    value={summary.total}
                    suffix="份"
                  />
                </Card>
              </Col>
              <Col span={5}>
                <Card>
                  <Statistic
                    title="有效"
                    value={summary.effective}
                    suffix="项"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={5}>
                <Card>
                  <Statistic
                    title="部分有效"
                    value={summary.partiallyEffective}
                    suffix="项"
                    valueStyle={{ color: '#faad14' }}
                    prefix={<WarningOutlined />}
                  />
                </Card>
              </Col>
              <Col span={5}>
                <Card>
                  <Statistic
                    title="无效"
                    value={summary.ineffective}
                    suffix="项"
                    valueStyle={{ color: '#ff4d4f' }}
                    prefix={<CloseCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={5}>
                <Card>
                  <Statistic
                    title="发现问题"
                    value={summary.withFindings}
                    suffix="项"
                    valueStyle={{ color: '#ff7a45' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Report Preview */}
            <ReportPreview
              plan={selectedPlan}
              worksheets={worksheets}
              summary={summary}
            />

            {/* Detail Table */}
            <Card title="底稿明细" style={{ marginTop: 24 }}>
              <Table
                rowKey="id"
                columns={conclusionColumns}
                dataSource={worksheets}
                pagination={{ pageSize: 10, showTotal: (t) => `共 ${t} 条` }}
              />
            </Card>
          </>
        ) : (
          <Card>
            <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
              <FileProtectOutlined style={{ fontSize: 48, marginBottom: 16 }} />
              <p>请选择一个评价计划以生成报告</p>
            </div>
          </Card>
        )}
      </Spin>
    </div>
  );
}
