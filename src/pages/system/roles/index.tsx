import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tree,
  Space,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TreeDataNode } from 'antd/es/tree';
import PageContainer from '@/components/PageContainer';
import StatusTag from '@/components/StatusTag';
import { seedRoles } from '@/mocks/data/roles';
import { seedPermissions } from '@/mocks/data/permissions';

const { TextArea } = Input;

interface RoleRecord {
  id: string;
  roleCode: string;
  roleName: string;
  description: string;
  permissions: string[];
  status: string;
  createdAt: string;
}

interface PermissionNode {
  id: string;
  permCode: string;
  permName: string;
  permType: 'menu' | 'button' | 'api';
  parentId: string;
  path: string;
  icon: string;
  sortOrder: number;
}

const STATUS_OPTIONS = [
  { value: 'active', label: '启用', color: 'green' },
  { value: 'disabled', label: '禁用', color: 'red' },
];

function buildPermissionTree(permissions: PermissionNode[]): TreeDataNode[] {
  const map = new Map<string, TreeDataNode & { parentId: string }>();
  const roots: TreeDataNode[] = [];

  for (const perm of permissions) {
    const node: TreeDataNode & { parentId: string } = {
      key: perm.permCode,
      title: perm.permName,
      parentId: perm.parentId,
    };
    map.set(perm.permCode, node);
  }

  for (const perm of permissions) {
    const node = map.get(perm.permCode);
    if (!node) continue;

    if (perm.parentId === '0') {
      roots.push(node);
    } else {
      const parent = map.get(
        permissions.find((p) => p.id === perm.parentId)?.permCode || '',
      );
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
  }

  return roots;
}

function RoleManagement() {
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleRecord | null>(null);
  const [form] = Form.useForm();
  const [permissionTree, setPermissionTree] = useState<TreeDataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRoles([...seedRoles]);
      setPermissionTree(buildPermissionTree(seedPermissions as PermissionNode[]));
      setLoading(false);
    }, 300);
  }, []);

  const handleAdd = () => {
    setEditingRole(null);
    setCheckedKeys([]);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: RoleRecord) => {
    setEditingRole(record);
    setCheckedKeys(record.permissions);
    form.setFieldsValue({
      roleCode: record.roleCode,
      roleName: record.roleName,
      description: record.description,
      status: record.status,
    });
    setModalOpen(true);
  };

  const handleDelete = (record: RoleRecord) => {
    const newRoles = roles.filter((r) => r.id !== record.id);
    setRoles(newRoles);
    message.success('删除成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (checkedKeys.length === 0) {
        message.warning('请至少分配一个权限');
        return;
      }

      if (editingRole) {
        const updated = roles.map((r) =>
          r.id === editingRole.id
            ? { ...r, ...values, permissions: checkedKeys }
            : r,
        );
        setRoles(updated);
        message.success('编辑成功');
      } else {
        const newRole: RoleRecord = {
          id: String(Date.now()),
          roleCode: values.roleCode,
          roleName: values.roleName,
          description: values.description || '',
          permissions: checkedKeys,
          status: values.status || 'active',
          createdAt: new Date().toISOString(),
        };
        setRoles([...roles, newRole]);
        message.success('新增成功');
      }

      setModalOpen(false);
      form.resetFields();
    } catch {
      // validation failed
    }
  };

  const columns: ColumnsType<RoleRecord> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 180,
    },
    {
      title: '编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
      width: 120,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <StatusTag status={status} options={STATUS_OPTIONS} />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (val: string) => new Date(val).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除该角色吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="角色管理">
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增角色
        </Button>
      </div>

      <Table<RoleRecord>
        columns={columns}
        dataSource={roles}
        rowKey="id"
        loading={loading}
        scroll={{ x: 900 }}
        pagination={{
          total: roles.length,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />

      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        destroyOnClose
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="roleCode"
            label="角色编码"
            rules={[{ required: true, message: '请输入角色编码' }]}
          >
            <Input placeholder="请输入角色编码" disabled={!!editingRole} />
          </Form.Item>

          <Form.Item
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item name="description" label="描述">
            <TextArea rows={3} placeholder="请输入角色描述" />
          </Form.Item>

          <Form.Item name="status" label="状态" initialValue="active">
            <StatusTag
              status={form.getFieldValue('status') || 'active'}
              options={STATUS_OPTIONS}
            />
          </Form.Item>

          <Form.Item label="权限分配" required>
            <div
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: 6,
                padding: '12px 16px',
                maxHeight: 360,
                overflow: 'auto',
              }}
            >
              <Tree
                checkable
                defaultExpandAll
                treeData={permissionTree}
                checkedKeys={checkedKeys}
                onCheck={(keys) => {
                  setCheckedKeys(keys as string[]);
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}

export default RoleManagement;
