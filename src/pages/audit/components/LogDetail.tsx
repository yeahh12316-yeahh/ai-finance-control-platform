import { Drawer, Descriptions, Tag, Typography } from 'antd';
import type { AuditLogRecord } from '@/types/audit';
import { AUDIT_MODULE_MAP, AUDIT_OPERATION_MAP } from '@/types/audit';

const { Paragraph, Text } = Typography;

interface LogDetailProps {
  open: boolean;
  record: AuditLogRecord | null;
  onClose: () => void;
}

export default function LogDetail({ open, record, onClose }: LogDetailProps) {
  if (!record) return null;

  const fullJson = {
    id: record.id,
    userId: record.userId,
    userName: record.userName,
    module: record.module,
    moduleName: record.moduleName,
    operation: record.operation,
    operationDesc: record.operationDesc,
    detail: record.detail,
    result: record.result,
    ip: record.ip,
    userAgent: record.userAgent,
    createdAt: record.createdAt,
  };

  return (
    <Drawer
      title="日志详情"
      open={open}
      onClose={onClose}
      width={640}
    >
      <Descriptions column={1} bordered size="small" style={{ marginBottom: 24 }}>
        <Descriptions.Item label="日志ID">
          <Text code>{record.id}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="用户">
          {record.userName}
        </Descriptions.Item>
        <Descriptions.Item label="用户ID">
          <Text code>{record.userId}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="模块">
          <Tag color="blue">{record.moduleName}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="操作类型">
          <Tag>{record.operationDesc}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="操作详情">
          {record.detail}
        </Descriptions.Item>
        <Descriptions.Item label="操作结果">
          <Tag color={record.result === '成功' ? 'success' : 'error'}>
            {record.result}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="IP地址">
          <Text code>{record.ip}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="User Agent">
          <Text style={{ fontSize: 11 }}>{record.userAgent}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="操作时间">
          {new Date(record.createdAt).toLocaleString('zh-CN')}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 24 }}>
        <Text strong style={{ display: 'block', marginBottom: 8 }}>
          完整JSON数据
        </Text>
        <Paragraph>
          <pre
            style={{
              background: '#f5f5f5',
              padding: 16,
              borderRadius: 8,
              fontSize: 12,
              maxHeight: 400,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {JSON.stringify(fullJson, null, 2)}
          </pre>
        </Paragraph>
      </div>
    </Drawer>
  );
}
