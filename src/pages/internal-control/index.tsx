import { Tabs } from 'antd';
import { PartitionOutlined, WarningOutlined, TableOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import ProcessDirectory from './ProcessDirectory';
import RiskDirectory from './RiskDirectory';
import RCMMatrix from './RCMMatrix';

const tabItems = [
  {
    key: 'process',
    label: (
      <span>
        <PartitionOutlined />
        流程目录
      </span>
    ),
    children: <ProcessDirectory />,
  },
  {
    key: 'risk',
    label: (
      <span>
        <WarningOutlined />
        风险目录
      </span>
    ),
    children: <RiskDirectory />,
  },
  {
    key: 'rcm',
    label: (
      <span>
        <TableOutlined />
        RCM矩阵
      </span>
    ),
    children: <RCMMatrix />,
  },
];

function InternalControlManagement() {
  return (
    <PageContainer title="内控体系管理中心">
      <Tabs
        defaultActiveKey="process"
        items={tabItems}
        size="large"
        style={{ marginTop: -8 }}
      />
    </PageContainer>
  );
}

export default InternalControlManagement;
