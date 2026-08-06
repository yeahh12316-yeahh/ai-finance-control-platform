import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import {
  UnorderedListOutlined,
  FormOutlined,
  TableOutlined,
  HeatMapOutlined,
} from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';

const tabItems = [
  {
    key: '/risk/list',
    label: (
      <span>
        <UnorderedListOutlined />
        风险清单
      </span>
    ),
  },
  {
    key: '/risk/questionnaire',
    label: (
      <span>
        <FormOutlined />
        风险问卷
      </span>
    ),
  },
  {
    key: '/risk/matrix',
    label: (
      <span>
        <TableOutlined />
        评估矩阵
      </span>
    ),
  },
  {
    key: '/risk/heatmap',
    label: (
      <span>
        <HeatMapOutlined />
        风险热力图
      </span>
    ),
  },
];

function RiskManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = tabItems.find(item => location.pathname.startsWith(item.key))?.key || '/risk/list';

  return (
    <PageContainer
      title="风险识别评估"
      breadcrumb={[
        { title: '首页', path: '/' },
        { title: '风险识别评估' },
      ]}
    >
      <Tabs
        activeKey={activeKey}
        items={tabItems}
        size="large"
        style={{ marginTop: -8 }}
        onChange={(key) => navigate(key)}
      />
      <Outlet />
    </PageContainer>
  );
}

export default RiskManagement;
