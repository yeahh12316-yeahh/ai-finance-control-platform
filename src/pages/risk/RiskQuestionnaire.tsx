import { useEffect, useState } from 'react';
import {
  Form, Button, Slider, Input, Card, Row, Col, Statistic, Divider, Result, Space, message, Spin,
} from 'antd';
import {
  SendOutlined, CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import { getRisks, submitAssessment } from '@/services/risk';
import { calculateRiskLevel, riskLevelOptions } from '@/types/risk';
import AssessmentTable from './components/AssessmentTable';
import type { RiskAssessment } from '@/types/risk';

const { TextArea } = Input;

interface QuestionItem {
  key: string;
  riskId: string;
  riskName: string;
  riskDescription: string;
}

function RiskQuestionnaire() {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    summary: { high: number; medium: number; low: number };
    details: RiskAssessment[];
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    getRisks({ page: 1, pageSize: 20 })
      .then((res) => {
        if (res.data?.list) {
          const items = res.data.list.slice(0, 10).map((risk) => ({
            key: `q_${risk.id}`,
            riskId: risk.id,
            riskName: risk.riskName,
            riskDescription: risk.riskDescription,
          }));
          setQuestions(items);

          const initialValues: Record<string, number | string> = {};
          items.forEach((item) => {
            initialValues[`${item.key}_impact`] = 3;
            initialValues[`${item.key}_likelihood`] = 3;
            initialValues[`${item.key}_notes`] = '';
          });
          form.setFieldsValue(initialValues);
        }
      })
      .catch(() => message.error('获取风险数据失败'))
      .finally(() => setLoading(false));
  }, [form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const assessments: RiskAssessment[] = [];
      let highCount = 0;
      let mediumCount = 0;
      let lowCount = 0;

      for (const question of questions) {
        const impact = values[`${question.key}_impact`] || 3;
        const likelihood = values[`${question.key}_likelihood`] || 3;
        const notes = values[`${question.key}_notes`] || '';
        const riskLevel = calculateRiskLevel(impact, likelihood);

        if (riskLevel === '极高' || riskLevel === '高') highCount++;
        else if (riskLevel === '中') mediumCount++;
        else lowCount++;

        try {
          const res = await submitAssessment({
            riskId: question.riskId,
            inherentImpact: impact,
            inherentLikelihood: likelihood,
            inherentRiskLevel: riskLevel,
            residualImpact: Math.max(1, impact - 1),
            residualLikelihood: Math.max(1, likelihood - 1),
            residualRiskLevel: calculateRiskLevel(Math.max(1, impact - 1), Math.max(1, likelihood - 1)),
            controlEffectiveness: 'partially_effective',
            assessedBy: 'current_user',
            comments: notes,
          });
          if (res.data) {
            assessments.push(res.data as RiskAssessment);
          }
        } catch {
          // Continue processing
        }
      }

      setResult({
        summary: { high: highCount, medium: mediumCount, low: lowCount },
        details: assessments,
      });

      message.success('评估提交成功');
    } catch {
      message.error('请完善所有评估项');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setResult(null);
    const initialValues: Record<string, number | string> = {};
    questions.forEach((item) => {
      initialValues[`${item.key}_impact`] = 3;
      initialValues[`${item.key}_likelihood`] = 3;
      initialValues[`${item.key}_notes`] = '';
    });
    form.setFieldsValue(initialValues);
  };

  const impactMarks: Record<number, string> = {
    1: '极低', 2: '低', 3: '中', 4: '高', 5: '极高',
  };
  const likelihoodMarks: Record<number, string> = {
    1: '极低', 2: '低', 3: '中', 4: '高', 5: '极高',
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Spin size="large" tip="加载评估问题..." />
      </div>
    );
  }

  return (
    <div>
      {!result ? (
        <>
          <Card
            title="风险评估问卷"
            extra={
              <Space>
                <Button onClick={handleReset}>重置</Button>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  提交评估
                </Button>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <p style={{ color: '#666', marginBottom: 24 }}>
              请对以下{questions.length}个风险事项进行影响程度和发生可能性的评估（1-5分）
            </p>

            <Form form={form} layout="vertical">
              {questions.map((question, index) => (
                <Card
                  key={question.key}
                  size="small"
                  title={`${index + 1}. ${question.riskName}`}
                  style={{ marginBottom: 16 }}
                  type="inner"
                >
                  <p style={{ color: '#666', marginBottom: 12 }}>{question.riskDescription}</p>

                  <Row gutter={24}>
                    <Col span={11}>
                      <Form.Item
                        name={`${question.key}_impact`}
                        label="影响程度评分"
                        rules={[{ required: true }]}
                        initialValue={3}
                      >
                        <Slider min={1} max={5} marks={impactMarks} />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name={`${question.key}_likelihood`}
                        label="发生可能性评分"
                        rules={[{ required: true }]}
                        initialValue={3}
                      >
                        <Slider min={1} max={5} marks={likelihoodMarks} />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Form.Item
                        shouldUpdate={(prev, cur) =>
                          prev[`${question.key}_impact`] !== cur[`${question.key}_impact`] ||
                          prev[`${question.key}_likelihood`] !== cur[`${question.key}_likelihood`]
                        }
                        noStyle
                      >
                        {({ getFieldValue }) => {
                          const impact = getFieldValue(`${question.key}_impact`) || 3;
                          const likelihood = getFieldValue(`${question.key}_likelihood`) || 3;
                          const level = calculateRiskLevel(impact, likelihood);
                          const color = riskLevelOptions.find((o) => o.value === level)?.color || '#d9d9d9';
                          return (
                            <div style={{
                              background: color,
                              color: '#fff',
                              borderRadius: '50%',
                              width: 48,
                              height: 48,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              fontSize: 14,
                            }}>
                              {level}
                            </div>
                          );
                        }}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name={`${question.key}_notes`}
                    label="备注"
                    initialValue=""
                  >
                    <TextArea rows={2} placeholder="补充说明（可选）" />
                  </Form.Item>
                </Card>
              ))}
            </Form>
          </Card>
        </>
      ) : (
        <>
          {/* Assessment Result */}
          <Card title="评估结果" style={{ marginBottom: 16 }}>
            <Row gutter={24} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="高风险"
                    value={result.summary.high}
                    prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                    valueStyle={{ color: '#ff4d4f' }}
                    suffix={`/ ${questions.length}`}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="中风险"
                    value={result.summary.medium}
                    prefix={<WarningOutlined style={{ color: '#faad14' }} />}
                    valueStyle={{ color: '#faad14' }}
                    suffix={`/ ${questions.length}`}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="低风险"
                    value={result.summary.low}
                    prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    valueStyle={{ color: '#52c41a' }}
                    suffix={`/ ${questions.length}`}
                  />
                </Card>
              </Col>
            </Row>

            <Divider />

            {result.summary.high > 0 ? (
              <Result
                status="warning"
                title={`评估发现 ${result.summary.high} 个高风险项，需要重点关注`}
                subTitle="请及时制定风险应对措施并跟踪整改"
                extra={
                  <Button type="primary" onClick={handleReset}>
                    重新评估
                  </Button>
                }
              />
            ) : (
              <Result
                status="success"
                title="当前风险评估可控"
                subTitle={`所有 ${questions.length} 项风险均在可控范围内`}
                extra={
                  <Button onClick={handleReset}>重新评估</Button>
                }
              />
            )}
          </Card>

          {result.details.length > 0 && (
            <Card title="评估明细" style={{ marginBottom: 16 }}>
              <AssessmentTable dataSource={result.details} />
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default RiskQuestionnaire;
