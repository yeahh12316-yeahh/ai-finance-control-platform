import { Card, Row, Col, Typography } from 'antd';
import {
  FileSearchOutlined,
  AlertOutlined,
  ToolOutlined,
  ExperimentOutlined,
  BugOutlined,
  ApartmentOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import type { AgentType } from '@/types/copilot';

const { Text, Paragraph } = Typography;

interface AgentInfo {
  type: AgentType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const AGENTS: AgentInfo[] = [
  {
    type: 'regulation_parser',
    name: '监管制度解析',
    description: '自动解析监管政策与内部制度，提取关键管控要求',
    icon: <FileSearchOutlined style={{ fontSize: 28 }} />,
  },
  {
    type: 'risk_identifier',
    name: '风险识别',
    description: '智能识别业务流程中的潜在风险点，辅助风险评估',
    icon: <AlertOutlined style={{ fontSize: 28 }} />,
  },
  {
    type: 'control_designer',
    name: '控制设计',
    description: '基于风险识别结果，推荐适配的控制措施方案',
    icon: <ToolOutlined style={{ fontSize: 28 }} />,
  },
  {
    type: 'control_tester',
    name: '控制测试',
    description: '辅助设计测试方案，分析测试结果，生成测试报告',
    icon: <ExperimentOutlined style={{ fontSize: 28 }} />,
  },
  {
    type: 'deficiency_analyzer',
    name: '缺陷分析',
    description: '分析内控缺陷数据，辅助整改跟踪和根因分析',
    icon: <BugOutlined style={{ fontSize: 28 }} />,
  },
  {
    type: 'process_optimizer',
    name: '流程优化',
    description: '分析流程瓶颈，提供优化建议，提升运营效率',
    icon: <ApartmentOutlined style={{ fontSize: 28 }} />,
  },
  {
    type: 'risk_monitor',
    name: '风险监测',
    description: '实时监测风险指标，生成风险报告和趋势分析',
    icon: <DashboardOutlined style={{ fontSize: 28 }} />,
  },
];

interface AgentSelectorProps {
  selectedAgent: AgentType | null;
  onSelect: (agent: AgentType) => void;
}

function AgentSelector({ selectedAgent, onSelect }: AgentSelectorProps) {
  return (
    <div>
      <Typography.Title level={5} style={{ marginBottom: 16, color: '#1a365d' }}>
        Agent 选择
      </Typography.Title>
      <Row gutter={[8, 8]}>
        {AGENTS.map((agent) => {
          const isSelected = selectedAgent === agent.type;
          return (
            <Col span={24} key={agent.type}>
              <Card
                hoverable
                size="small"
                onClick={() => onSelect(agent.type)}
                style={{
                  borderColor: isSelected ? '#1a365d' : undefined,
                  backgroundColor: isSelected ? '#e6f7ff' : undefined,
                }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      color: isSelected ? '#1a365d' : '#666',
                      marginTop: 2,
                    }}
                  >
                    {agent.icon}
                  </div>
                  <div>
                    <Text strong style={{ color: isSelected ? '#1a365d' : undefined }}>
                      {agent.name}
                    </Text>
                    <Paragraph
                      type="secondary"
                      style={{ margin: '4px 0 0', fontSize: 12, lineHeight: 1.4 }}
                      ellipsis={{ rows: 2 }}
                    >
                      {agent.description}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default AgentSelector;
