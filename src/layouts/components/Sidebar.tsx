import {
  Layout,
  Menu,
  type MenuProps,
} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import menuItems from '@/config/menu';
import useAppStore from '@/stores/appStore';

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed } = useAppStore();

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
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapsed}
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
  );
}

export default Sidebar;
