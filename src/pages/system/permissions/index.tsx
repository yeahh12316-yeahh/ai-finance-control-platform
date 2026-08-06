import { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Tag,
  Select,
  Drawer,
  Descriptions,
  Space,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import PageContainer from '@/components/PageContainer';
import { seedPermissions } from '@/mocks/data/permissions';

const { Text } = Typography;

interface PermissionRecord {
  id: string;
  permCode: string;
  permName: string;
  permType: 'menu' | 'button' | 'api';
  parentId: string;
  path: string;
  icon: string;
  sortOrder: number;
}

const TYPE_OPTIONS = [
  { label: '全部', value: '' },
  { label: '菜单', value: 'menu' },
  { label: '按钮', value: 'button' },
  { label: 'API', value: 'api' },
];

const TYPE_COLORS: Record<string, string> = {
  menu: 'blue',
  button: 'green',
  api: 'orange',
};

const TYPE_LABELS: Record<string, string> = {
  menu: '菜单',
  button: '按钮',
  api: 'API',
};

function PermissionConfig() {
  const [permissions, setPermissions] = useState<PermissionRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPerm, setSelectedPerm] = useState<PermissionRecord | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPermissions([...seedPermissions] as PermissionRecord[]);
      setLoading(false);
    }, 300);
  }, []);

  const filteredPermissions = useMemo(() => {
    if (!typeFilter) return permissions;
    return permissions.filter((p) => p.permType === typeFilter);
  }, [permissions, typeFilter]);

  // Build tree structure for the table
  const treeData = useMemo(() => {
    const map = new Map<string, PermissionRecord & { children?: PermissionRecord[] }>();
    const roots: (PermissionRecord & { children?: PermissionRecord[] })[] = [];

    for (const perm of filteredPermissions) {
      map.set(perm.id, { ...perm, children: [] });
    }

    for (const perm of filteredPermissions) {
      const node = map.get(perm.id);
      if (!node) continue;

      if (perm.parentId === '0') {
        roots.push(node);
      } else {
        const parent = map.get(perm.parentId);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(node);
        }
      }
    }

    // Remove empty children arrays
    const cleanChildren = (
      nodes: (PermissionRecord & { children?: PermissionRecord[] })[],
    ) => {
      for (const node of nodes) {
        if (node.children && node.children.length === 0) {
          delete node.children;
        } else if (node.children) {
          cleanChildren(node.children);
        }
      }
    };
    cleanChildren(roots);

    return roots;
  }, [filteredPermissions]);

  const handleViewDetail = (record: PermissionRecord) => {
    setSelectedPerm(record);
    setDrawerOpen(true);
  };

  const columns: ColumnsType<PermissionRecord> = [
    {
      title: '权限名称',
      dataIndex: 'permName',
      key: 'permName',
      width: 200,
      render: (text: string, record: PermissionRecord) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      ),
    },
    {
      title: '权限编码',
      dataIndex: 'permCode',
      key: 'permCode',
      width: 180,
    },
    {
      title: '类型',
      dataIndex: 'permType',
      key: 'permType',
      width: 100,
      render: (type: string) => (
        <Tag color={TYPE_COLORS[type] || 'default'}>
          {TYPE_LABELS[type] || type}
        </Tag>
      ),
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      width: 180,
      render: (path: string) => (
        <Text code copyable>
          {path || '-'}
        </Text>
      ),
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 160,
      render: (icon: string) => icon || '-',
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 80,
    },
  ];

  return (
    <PageContainer
      title="权限配置"
      extra={
        <Select
          style={{ width: 120 }}
          value={typeFilter}
          onChange={setTypeFilter}
          options={TYPE_OPTIONS}
        />
      }
    >
      <Table<PermissionRecord>
        columns={columns}
        dataSource={treeData}
        rowKey="id"
        loading={loading}
        defaultExpandAllRows
        pagination={false}
        scroll={{ x: 900 }}
        style={{ marginTop: 16 }}
      />

      <Drawer
        title="权限详情"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={480}
      >
        {selectedPerm && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="权限名称">
              {selectedPerm.permName}
            </Descriptions.Item>
            <Descriptions.Item label="权限编码">
              <Text code>{selectedPerm.permCode}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="类型">
              <Tag color={TYPE_COLORS[selectedPerm.permType]}>
                {TYPE_LABELS[selectedPerm.permType]}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="路径">
              {selectedPerm.path || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="图标">
              {selectedPerm.icon || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="排序">
              {selectedPerm.sortOrder}
            </Descriptions.Item>
            <Descriptions.Item label="上级ID">
              {selectedPerm.parentId}
            </Descriptions.Item>
            <Descriptions.Item label="ID">{selectedPerm.id}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </PageContainer>
  );
}

export default PermissionConfig;
