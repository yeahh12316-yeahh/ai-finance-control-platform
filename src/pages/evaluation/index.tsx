import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import {
  ScheduleOutlined,
  FileTextOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';

const tabItems = [
  {
    key: '/evaluation/plan',
    label: (
      <span>
        <ScheduleOutlined />
        评价计划
      </span>
    ),
  },
  {
    key: '/evaluation/worksheet',
    label: (
      <span>
        <FileTextOutlined />
        测试底稿
      </span>
    ),
  },
  {
    key: '/evaluation/report',
    label: (
      <span>
        <FileProtectOutlined />
        报告生成
      </span>
    ),
  },
];

export default function EvaluationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = tabItems.find(item => location.pathname.startsWith(item.key))?.key || '/evaluation/plan';

  return (
    <PageContainer
      title="控制有效性评价"
      breadcrumb={[
        { title: '首页', path: '/' },
        { title: '控制有效性评价' },
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
