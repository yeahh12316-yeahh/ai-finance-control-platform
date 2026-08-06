import { Card, Typography, Space } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import type { AgentType } from '@/types/copilot';

const { Text } = Typography;

interface PromptTemplate {
  label: string;
  prompt: string;
}

const PROMPT_TEMPLATES: Record<string, PromptTemplate[]> = {
  regulation_parser: [
    { label: '解析制度文档', prompt: '请帮我解析这份制度文档的关键管控要点' },
    { label: '反洗钱合规检查', prompt: '请帮我检查反洗钱制度的合规性' },
    { label: '监管要求对照', prompt: '请帮我对照最新的监管要求检查当前制度' },
  ],
  risk_identifier: [
    { label: '识别业务流程风险', prompt: '请帮我识别当前业务流程中的潜在风险点' },
    { label: '风险评估分析', prompt: '请对识别出的风险进行定量评估分析' },
    { label: '风险矩阵生成', prompt: '请帮我生成风险矩阵图' },
  ],
  control_designer: [
    { label: '设计控制措施', prompt: '请为高风险区域设计适配的控制措施方案' },
    { label: '控制测试方案', prompt: '请帮我设计控制测试方案' },
    { label: '控制矩阵映射', prompt: '请将控制措施映射到RCM矩阵' },
  ],
  control_tester: [
    { label: '分析测试结果', prompt: '请帮我分析控制测试结果数据' },
    { label: '底稿数据分析', prompt: '请分析测试底稿中的不符合项' },
    { label: '生成测试报告', prompt: '请帮我生成控制测试报告' },
  ],
  deficiency_analyzer: [
    { label: '缺陷统计分析', prompt: '请帮我分析当前的内控缺陷统计数据' },
    { label: '整改跟踪', prompt: '请跟踪关键缺陷的整改进度' },
    { label: '根因分析', prompt: '请对反复出现的缺陷进行根因分析' },
  ],
  process_optimizer: [
    { label: '流程瓶颈分析', prompt: '请分析当前业务流程中的瓶颈环节' },
    { label: '流程梳理建议', prompt: '请梳理信贷业务流程并提出优化建议' },
    { label: '效率提升方案', prompt: '请提供流程效率提升的优化方案' },
  ],
  risk_monitor: [
    { label: '风险监测报告', prompt: '请生成当前的风险监测报告' },
    { label: '趋势分析', prompt: '请分析最近6个月的风险指标变化趋势' },
    { label: '预警分析', prompt: '请分析当前的风险预警信号' },
  ],
};

interface PromptTemplatesProps {
  agentType: AgentType;
  onSelect: (prompt: string) => void;
}

function PromptTemplates({ agentType, onSelect }: PromptTemplatesProps) {
  const templates = PROMPT_TEMPLATES[agentType] || [];

  if (templates.length === 0) return null;

  return (
    <div style={{ padding: '24px 0' }}>
      <Space style={{ marginBottom: 16 }}>
        <ThunderboltOutlined style={{ color: '#faad14' }} />
        <Text strong>快捷提问</Text>
      </Space>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {templates.map((tpl, idx) => (
          <Card
            key={idx}
            size="small"
            hoverable
            onClick={() => onSelect(tpl.prompt)}
            style={{ cursor: 'pointer', maxWidth: 300 }}
            styles={{ body: { padding: '8px 12px' } }}
          >
            <Text style={{ fontSize: 13 }}>{tpl.label}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 11 }}>
              {tpl.prompt.length > 40 ? tpl.prompt.slice(0, 40) + '...' : tpl.prompt}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PromptTemplates;
