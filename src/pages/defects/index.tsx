import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import {
  BugOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';

const tabItems = [
  {
    key: '/defects/register',
    label: (
      <span>
        <BugOutlined />
        缺陷登记
      </span>
    ),
  },
  {
    key: '/defects/board',
    label: (
      <span>
        <AppstoreOutlined />
        任务看板
      </span>
    ),
  },
  {
    key: '/defects/verify',
    label: (
      <span>
        <SafetyCertificateOutlined />
        闭环验证
      </span>
    ),
  },
];

export default function DefectsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = tabItems.find(item => location.pathname.startsWith(item.key))?.key || '/defects/register';

  return (
    <PageContainer
      title="缺陷整改管理"
      breadcrumb={[
        { title: '首页', path: '/' },
        { title: '缺陷整改管理' },
      ]}
    >
      <Tabs
        activeKey={activeKey}
        onChange={(key) => navigate(key)}
        items={tabItems}
        size="large"
      />
      <Outlet />
    </PageContainer>
  );
}
