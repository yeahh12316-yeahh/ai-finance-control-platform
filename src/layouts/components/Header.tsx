import { Layout, Breadcrumb, Avatar, Dropdown, type MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import useAuthStore from '@/stores/authStore';
import useAppStore from '@/stores/appStore';

const { Header } = Layout;

interface AppHeaderProps {
  breadcrumbItems: { title: string; path?: string }[];
}

function AppHeader({ breadcrumbItems }: AppHeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ];

  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <Header
      style={{
        padding: '0 24px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 99,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span
          onClick={toggleSidebar}
          style={{ fontSize: 18, cursor: 'pointer', color: '#1a365d' }}
        >
          {sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        <Breadcrumb
          items={breadcrumbItems.map((item) => ({
            title: item.path ? (
              <a onClick={() => navigate(item.path!)}>{item.title}</a>
            ) : (
              item.title
            ),
          }))}
        />
      </div>
      <Dropdown
        menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
        placement="bottomRight"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
        >
          <Avatar
            size="small"
            icon={<UserOutlined />}
            src={user?.avatar}
            style={{ backgroundColor: '#1a365d' }}
          />
          <span style={{ color: '#1a1a2e' }}>{user?.realName || user?.username}</span>
        </div>
      </Dropdown>
    </Header>
  );
}

export default AppHeader;
