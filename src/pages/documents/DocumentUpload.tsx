import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Form,
  Input,
  Select,
  Button,
  Progress,
  Card,
  Space,
  Descriptions,
  message,
  Tag,
} from 'antd';
import {
  InboxOutlined,
  FilePdfOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import PageContainer from '@/components/PageContainer';

const { Dragger } = Upload;
const { TextArea } = Input;

const DOC_CATEGORIES = [
  { label: '管理制度', value: '管理制度' },
  { label: '操作规程', value: '操作规程' },
  { label: '工作指引', value: '工作指引' },
];

const MOCK_PARSE_RESULT = {
  docName: '银行信贷业务管理办法（2026版）',
  docType: '管理办法',
  docCategory: '管理制度',
  summary: '规范全行信贷业务操作流程和管理要求的基本制度文件，共包含8章42条。',
  chapters: [
    { title: '第一章 总则', keyPoints: '制定依据、适用范围、基本原则' },
    { title: '第二章 客户准入管理', keyPoints: '客户准入审查标准、审批流程' },
    { title: '第三章 授信审批管理', keyPoints: '分级审批体系、审批限额设置' },
    { title: '第四章 贷后管理', keyPoints: '贷后检查频率、内容和报告要求' },
    { title: '第五章 风险分类', keyPoints: '五级分类标准、分类调整程序' },
    { title: '第六章 不良资产处置', keyPoints: '识别、催收、核销流程' },
    { title: '第七章 档案管理', keyPoints: '信贷档案归档和保管要求' },
    { title: '第八章 附则', keyPoints: '解释权、生效日期' },
  ],
};

function DocumentUpload() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [parseResult, setParseResult] = useState<typeof MOCK_PARSE_RESULT | null>(null);

  const handleUpload = () => {
    if (fileList.length === 0) {
      message.warning('请先选择文件');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      message.success('文件上传成功');
    }, 1500);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setAnalyzeProgress(0);
    const interval = setInterval(() => {
      setAnalyzeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setParseResult(MOCK_PARSE_RESULT);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 400);
  };

  return (
    <PageContainer
      title="上传文档"
      onBack={() => navigate(-1)}
    >
      <div style={{ maxWidth: 900 }}>
        <Card style={{ marginBottom: 24 }}>
          <Dragger
            fileList={fileList}
            onChange={({ fileList: fl }) => setFileList(fl)}
            beforeUpload={() => false}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">
              支持 PDF、Word、Excel 格式，单个文件不超过 50MB
            </p>
          </Dragger>

          {fileList.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Form form={form} layout="vertical">
                <Form.Item label="文档名称">
                  <Input value={fileList[0].name} readOnly />
                </Form.Item>
                <Form.Item label="文件类型">
                  <Input value={fileList[0].type || '未知'} readOnly />
                </Form.Item>
                <Form.Item label="分类" required>
                  <Select placeholder="请选择文档分类" options={DOC_CATEGORIES} />
                </Form.Item>
                <Form.Item label="标签">
                  <Select mode="tags" placeholder="输入标签后按回车" />
                </Form.Item>
                <Form.Item label="描述">
                  <TextArea rows={3} placeholder="请输入文档描述" />
                </Form.Item>
              </Form>

              <Space>
                <Button type="primary" loading={uploading} onClick={handleUpload}>
                  {uploading ? '上传中...' : '确认上传'}
                </Button>
                <Button
                  icon={<RobotOutlined />}
                  onClick={handleAnalyze}
                  disabled={!uploading && fileList.length === 0}
                >
                  AI 解析
                </Button>
              </Space>

              {analyzing && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ marginBottom: 8, color: '#1a365d' }}>
                    <RobotOutlined spin /> AI 正在解析文档...
                  </div>
                  <Progress percent={analyzeProgress} status="active" />
                </div>
              )}
            </div>
          )}
        </Card>

        {parseResult && (
          <Card
            title={
              <Space>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <span>AI 解析结果</span>
              </Space>
            }
          >
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="文档名称">{parseResult.docName}</Descriptions.Item>
              <Descriptions.Item label="文档类型">{parseResult.docType}</Descriptions.Item>
              <Descriptions.Item label="文档分类">{parseResult.docCategory}</Descriptions.Item>
              <Descriptions.Item label="解析状态">
                <Tag color="green">已完成</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="内容摘要" span={2}>
                {parseResult.summary}
              </Descriptions.Item>
            </Descriptions>

            <h4 style={{ marginBottom: 12 }}>章节结构识别</h4>
            {parseResult.chapters.map((ch, idx) => (
              <Card
                key={idx}
                size="small"
                style={{ marginBottom: 8 }}
                type="inner"
                title={ch.title}
              >
                <p style={{ margin: 0, color: '#666' }}>{ch.keyPoints}</p>
              </Card>
            ))}

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Space>
                <Button type="primary" onClick={() => navigate('/documents')}>
                  完成并返回列表
                </Button>
                <Button onClick={() => setParseResult(null)}>重新解析</Button>
              </Space>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}

export default DocumentUpload;
