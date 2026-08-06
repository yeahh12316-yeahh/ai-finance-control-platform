import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Button,
  Space,
  Tag,
  Divider,
  Spin,
  message,
} from 'antd';
import {
  DownloadOutlined,
  PrinterOutlined,
  HistoryOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import StatusTag from '@/components/StatusTag';
import { seedDocuments } from '@/mocks/data/documents';
import type { DocumentRecord } from '@/types/document';

const DOC_STATUS_OPTIONS = [
  { value: 'draft', label: '草稿', color: 'default' },
  { value: 'published', label: '已发布', color: 'green' },
  { value: 'archived', label: '已归档', color: 'orange' },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function DocumentPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<DocumentRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = seedDocuments.find((d) => d.id === id);
      if (found) {
        setDocument(found);
      } else {
        message.error('文档不存在');
        navigate('/documents');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

  if (loading) {
    return (
      <PageContainer title="文档预览">
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (!document) {
    return null;
  }

  const mockContent = `# ${document.docName}

## 一、总则

### 第一条 制定目的
为规范全行${document.docCategory}工作，完善内部控制体系，根据《商业银行内部控制指引》等监管要求，结合本行实际，制定本${document.docType}。

### 第二条 适用范围
本${document.docType}适用于本行总行各部门、各分支机构及相关子公司。

### 第三条 基本原则
1. **全面性原则**：贯穿决策、执行和监督全过程，覆盖各项业务和管理活动。
2. **审慎性原则**：以风险防范为导向，确保各项业务稳健运行。
3. **有效性原则**：制度设计合理，执行到位，能够有效防范风险。
4. **独立性原则**：内控监督部门保持相对独立，不受业务部门干预。

## 二、组织架构与职责

### 第四条 董事会职责
董事会负责保证本行建立并实施充分有效的内部控制体系，审批整体经营战略和重大政策。

### 第五条 高级管理层职责
高级管理层负责执行董事会批准的内部控制政策，建立识别、计量、监测并控制风险的程序和措施。

### 第六条 内控管理部职责
内控管理部门作为全行内部控制管理的牵头部门，负责制度体系建设、内控评价、整改跟踪等工作。

## 三、控制活动

### 第七条 授权管理
1. 各级管理人员应在授权范围内行使职权和承担责任。
2. 重大事项应实行集体决策审批或联签制度。
3. 任何个人不得单独进行决策或改变集体决策。

### 第八条 岗位分离
1. 关键岗位应实行岗位分离，形成相互制约机制。
2. 前台交易与后台结算、风险监控岗位必须分离。
3. 重要岗位实行定期轮换和强制休假制度。

## 四、信息与沟通

### 第九条 信息系统
1. 建立覆盖所有业务和管理的内部控制信息系统。
2. 确保信息的及时、准确、完整传递。
3. 建立有效的信息安全保护机制。

## 五、监督评价与纠正

### 第十条 监督检查
1. 内控管理部门定期组织内控评价工作。
2. 对发现的内控缺陷应及时报告并制定整改计划。
3. 建立内控缺陷整改跟踪机制，确保整改到位。

---

*本文档由AI自动解析生成，具体内容以原始文档为准。*
`;

  return (
    <PageContainer
      title="文档预览"
      onBack={() => navigate(-1)}
    >
      <Card style={{ marginBottom: 24 }}>
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="文档编码">{document.docCode}</Descriptions.Item>
          <Descriptions.Item label="文档名称">{document.docName}</Descriptions.Item>
          <Descriptions.Item label="分类">{document.docCategory}</Descriptions.Item>
          <Descriptions.Item label="文档类型">{document.docType}</Descriptions.Item>
          <Descriptions.Item label="当前版本">{document.version}</Descriptions.Item>
          <Descriptions.Item label="文件大小">{formatFileSize(document.fileSize)}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <StatusTag status={document.status} options={DOC_STATUS_OPTIONS} />
          </Descriptions.Item>
          <Descriptions.Item label="上传时间">{formatDate(document.uploadAt)}</Descriptions.Item>
          <Descriptions.Item label="上传人">{document.uploadBy}</Descriptions.Item>
          <Descriptions.Item label="标签" span={2}>
            {document.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>
            {document.description}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="文档内容" style={{ marginBottom: 24 }}>
        <div
          style={{
            background: '#fafafa',
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            padding: 24,
            maxHeight: 600,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: 14,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {mockContent}
        </div>
      </Card>

      <div style={{ textAlign: 'center' }}>
        <Space>
          <Button icon={<DownloadOutlined />} onClick={() => message.info('下载功能')}>
            下载
          </Button>
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
            打印
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => navigate(`/documents/${document.id}/versions`)}
          >
            版本历史
          </Button>
        </Space>
      </div>
    </PageContainer>
  );
}

export default DocumentPreview;
