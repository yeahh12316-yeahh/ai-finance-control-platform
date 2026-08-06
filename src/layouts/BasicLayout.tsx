import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Dropdown,
  theme,
  type MenuProps,
} from 'antd';
import {
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import menuItems from '@/config/menu';
import useAuthStore from '@/stores/authStore';
import useAppStore from '@/stores/appStore';

const { Header, Sider, Content } = Layout;

function BasicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user, logout } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build breadcrumb items from current path
  const breadcrumbItems = useMemo(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const items = [{ title: '首页', path: '/dashboard' }];

    const findLabel = (path: string, items: MenuProps['items']): string | null => {
      if (!items) return null;
      for (const item of items) {
        if (!item) continue;
        if ('key' in item && item.key === path && 'label' in item) {
          return item.label as string;
        }
        if ('children' in item && item.children) {
          const found = findLabel(path, item.children);
          if (found) return found;
        }
      }
      return null;
    };

    let url = '';
    for (const snippet of pathSnippets) {
      url += `/${snippet}`;
      const label = findLabel(url, menuItems);
      if (label) {
        items.push({ title: label, path: url });
      }
    }

    return items;
  }, [location.pathname]);

  // Find selected keys and open keys from current path
  const { selectedKeys, defaultOpenKeys } = useMemo(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const openKeys: string[] = [];
    let accumulated = '';
    for (let i = 0; i < pathSnippets.length - 1; i++) {
      accumulated += `/${pathSnippets[i]}`;
      openKeys.push(accumulated);
    }

    return {
      selectedKeys: [location.pathname],
      defaultOpenKeys: openKeys,
    };
  }, [location.pathname]);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    if (isMobile) {
      useAppStore.setState({ sidebarCollapsed: true });
    }
  };

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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={sidebarCollapsed || isMobile}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) {
            useAppStore.setState({ sidebarCollapsed: true });
          }
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: sidebarCollapsed ? 16 : 18,
            fontWeight: 600,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {sidebarCollapsed ? '内控' : 'AI金融内控平台'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: sidebarCollapsed || isMobile ? 80 : 240,
          transition: 'margin-left 0.2s',
        }}
      >
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
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
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
