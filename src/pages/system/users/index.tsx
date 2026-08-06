import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import PageContainer from '@/components/PageContainer';
import StatusTag from '@/components/StatusTag';
import SearchForm from '@/components/SearchForm';
import type { SearchField } from '@/components/SearchForm';
import { seedUsers } from '@/mocks/data/users';
import { seedRoles } from '@/mocks/data/roles';

interface UserRecord {
  id: string;
  username: string;
  realName: string;
  role: string;
  roleName: string;
  status: string;
  email: string;
  phone: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: 'active', label: '启用', color: 'green' },
  { value: 'disabled', label: '禁用', color: 'red' },
];

const SEARCH_FIELDS: SearchField[] = [
  { name: 'keyword', label: '用户名', placeholder: '请输入用户名' },
  { name: 'realName', label: '真实姓名', placeholder: '请输入真实姓名' },
  {
    name: 'role',
    label: '角色',
    type: 'select',
    placeholder: '请选择角色',
    options: seedRoles.map((r) => ({ label: r.roleName, value: r.roleCode })),
  },
];

function UserManagement() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // Load seed data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mapped = seedUsers.map((u) => ({
        ...u,
        phone: u.phone || '',
      }));
      setUsers(mapped);
      setFilteredUsers(mapped);
      setLoading(false);
    }, 300);
  }, []);

  const handleSearch = useCallback(
    (values: Record<string, unknown>) => {
      let result = [...users];

      if (values.keyword) {
        const kw = (values.keyword as string).toLowerCase();
        result = result.filter((u) => u.username.toLowerCase().includes(kw));
      }

      if (values.realName) {
        const name = (values.realName as string).toLowerCase();
        result = result.filter((u) => u.realName.toLowerCase().includes(name));
      }

      if (values.role) {
        result = result.filter((u) => u.role === values.role);
      }

      setFilteredUsers(result);
      setPagination((prev) => ({ ...prev, current: 1 }));
    },
    [users],
  );

  const handleReset = () => {
    setFilteredUsers(users);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: UserRecord) => {
    setEditingUser(record);
    form.setFieldsValue({
      username: record.username,
      realName: record.realName,
      role: record.role,
      email: record.email,
      phone: record.phone,
      status: record.status,
    });
    setModalOpen(true);
  };

  const handleDelete = (record: UserRecord) => {
    const newUsers = users.filter((u) => u.id !== record.id);
    setUsers(newUsers);
    setFilteredUsers(
      filteredUsers.filter((u) => u.id !== record.id),
    );
    message.success('删除成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingUser) {
        const updated = users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...values,
                roleName:
                  seedRoles.find((r) => r.roleCode === values.role)?.roleName ||
                  u.roleName,
              }
            : u,
        );
        setUsers(updated);
        setFilteredUsers(
          filteredUsers.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  ...values,
                  roleName:
                    seedRoles.find((r) => r.roleCode === values.role)
                      ?.roleName || u.roleName,
                }
              : u,
          ),
        );
        message.success('编辑成功');
      } else {
        const roleName =
          seedRoles.find((r) => r.roleCode === values.role)?.roleName || '';
        const newUser: UserRecord = {
          id: String(Date.now()),
          username: values.username,
          realName: values.realName,
          role: values.role,
          roleName,
          status: values.status || 'active',
          email: values.email || '',
          phone: values.phone || '',
          createdAt: new Date().toISOString(),
        };
        const newUsers = [...users, newUser];
        setUsers(newUsers);
        setFilteredUsers([...filteredUsers, newUser]);
        message.success('新增成功');
      }

      setModalOpen(false);
      form.resetFields();
    } catch {
      // validation failed
    }
  };

  const columns: ColumnsType<UserRecord> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 120,
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 160,
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
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
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
            description="确定要删除该用户吗？"
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
    <PageContainer title="用户管理">
      <SearchForm fields={SEARCH_FIELDS} onSearch={handleSearch} onReset={handleReset} />

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增用户
        </Button>
      </div>

      <Table<UserRecord>
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1000 }}
        pagination={{
          ...pagination,
          total: filteredUsers.length,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
      />

      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        destroyOnClose
        width={520}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" disabled={!!editingUser} />
          </Form.Item>

          <Form.Item
            name="realName"
            label="真实姓名"
            rules={[{ required: true, message: '请输入真实姓名' }]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select
              placeholder="请选择角色"
              options={seedRoles.map((r) => ({
                label: r.roleName,
                value: r.roleCode,
              }))}
            />
          </Form.Item>

          <Form.Item name="email" label="邮箱">
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item name="phone" label="手机号">
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
          >
            <Select
              placeholder="请选择状态"
              options={STATUS_OPTIONS.map((s) => ({
                label: s.label,
                value: s.value,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}

export default UserManagement;
