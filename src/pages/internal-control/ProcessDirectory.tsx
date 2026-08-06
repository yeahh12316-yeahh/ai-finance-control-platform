import { useState, useCallback } from 'react';
import {
  Card,
  Descriptions,
  Button,
  Modal,
  Form,
  Input,
  TreeSelect,
  Select,
  Popconfirm,
  message,
  Space,
  Badge,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import ProcessTree from './components/ProcessTree';
import type { ProcessNode } from '@/types/process';
import { seedProcesses } from '@/mocks/data/processes';

const { TextArea } = Input;

const STATUS_OPTIONS = [
  { value: 'active', label: '启用' },
  { value: 'disabled', label: '禁用' },
];

function ProcessDirectory() {
  const [selectedNode, setSelectedNode] = useState<ProcessNode | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<ProcessNode | null>(null);
  const [parentNode, setParentNode] = useState<ProcessNode | null>(null);
  const [form] = Form.useForm();
  const [processes, setProcesses] = useState<ProcessNode[]>(seedProcesses as ProcessNode[]);

  const handleSelect = useCallback((node: ProcessNode | null) => {
    setSelectedNode(node);
  }, []);

  const handleAdd = useCallback(
    (parent?: ProcessNode) => {
      setEditingNode(null);
      setParentNode(parent || null);
      form.resetFields();
      if (parent) {
        form.setFieldsValue({ parentId: parent.id });
      }
      setModalOpen(true);
    },
    [form],
  );

  const handleEdit = useCallback(
    (node: ProcessNode) => {
      setEditingNode(node);
      setParentNode(null);
      form.setFieldsValue({
        processName: node.processName,
        parentId: node.parentId === '0' ? undefined : node.parentId,
        processCode: node.processCode,
        description: node.description,
        status: node.status,
        sortOrder: node.sortOrder,
      });
      setModalOpen(true);
    },
    [form],
  );

  const handleDelete = useCallback(
    (node: ProcessNode) => {
      const newProcesses = processes.filter((p) => p.id !== node.id);
      setProcesses(newProcesses);
      if (selectedNode?.id === node.id) {
        setSelectedNode(null);
      }
      message.success('删除成功');
    },
    [processes, selectedNode],
  );

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingNode) {
        const updated = processes.map((p) =>
          p.id === editingNode.id ? { ...p, ...values } : p,
        );
        setProcesses(updated);
        setSelectedNode({ ...editingNode, ...values });
        message.success('编辑成功');
      } else {
        const newId = String(Date.now());
        const parent = parentNode;
        const level = parent ? parent.processLevel + 1 : 1;
        const newProcess: ProcessNode = {
          id: newId,
          processCode: values.processCode || `P${String(processes.length + 1).padStart(3, '0')}`,
          processName: values.processName,
          parentId: values.parentId || '0',
          processLevel: level,
          description: values.description || '',
          status: values.status || 'active',
          sortOrder: values.sortOrder || processes.length + 1,
          riskCount: 0,
          controlCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProcesses([...processes, newProcess]);
        message.success('新增成功');
      }

      setModalOpen(false);
      form.resetFields();
    } catch {
      // validation failed
    }
  };

  const buildTreeSelectData = (items: ProcessNode[]): any[] => {
    const map = new Map<string, any>();
    const roots: any[] = [];

    items.forEach((p) => {
      map.set(p.id, {
        value: p.id,
        title: p.processName,
        children: [],
        disabled: p.id === editingNode?.id,
      });
    });

    items.forEach((p) => {
      const node = map.get(p.id)!;
      if (p.parentId === '0' || !map.has(p.parentId)) {
        roots.push(node);
      } else {
        const parent = map.get(p.parentId);
        if (parent) parent.children.push(node);
      }
    });

    return roots;
  };

  const levelLabels: Record<number, string> = {
    1: '一级流程',
    2: '二级流程',
    3: '三级流程',
    4: '四级流程',
  };

  return (
    <PageContainer title="流程目录管理">
      <div style={{ display: 'flex', gap: 16, height: 'calc(100vh - 240px)' }}>
        {/* Left: Tree */}
        <Card
          title="流程树"
          size="small"
          style={{ width: 360, flexShrink: 0 }}
          extra={
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => handleAdd()}
            >
              新增
            </Button>
          }
        >
          <ProcessTree
            onSelect={handleSelect}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>

        {/* Right: Detail panel */}
        <Card title="节点详情" size="small" style={{ flex: 1 }}>
          {selectedNode ? (
            <div>
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="流程编码">{selectedNode.processCode}</Descriptions.Item>
                <Descriptions.Item label="流程名称">{selectedNode.processName}</Descriptions.Item>
                <Descriptions.Item label="流程层级">
                  {levelLabels[selectedNode.processLevel] || `第${selectedNode.processLevel}级`}
                </Descriptions.Item>
                <Descriptions.Item label="状态">
                  {selectedNode.status === 'active' ? '启用' : '禁用'}
                </Descriptions.Item>
                <Descriptions.Item label="排序号">{selectedNode.sortOrder}</Descriptions.Item>
                <Descriptions.Item label="关联风险数">
                  <Badge
                    count={selectedNode.riskCount}
                    style={{ backgroundColor: '#fa8c16' }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="关联控制数">
                  <Badge
                    count={selectedNode.controlCount}
                    style={{ backgroundColor: '#1890ff' }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="创建时间" span={2}>
                  {new Date(selectedNode.createdAt).toLocaleString('zh-CN')}
                </Descriptions.Item>
                <Descriptions.Item label="更新时间" span={2}>
                  {new Date(selectedNode.updatedAt).toLocaleString('zh-CN')}
                </Descriptions.Item>
                <Descriptions.Item label="描述" span={2}>
                  {selectedNode.description || '-'}
                </Descriptions.Item>
              </Descriptions>

              <div style={{ marginTop: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(selectedNode)}
                  >
                    编辑
                  </Button>
                  {selectedNode.processLevel < 4 && (
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handleAdd(selectedNode)}
                    >
                      新增子节点
                    </Button>
                  )}
                  <Popconfirm
                    title="确认删除"
                    description="确定要删除该流程节点吗？"
                    onConfirm={() => handleDelete(selectedNode)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              </div>
            </div>
          ) : (
            <EmptyState description="请在左侧选择流程节点查看详情" />
          )}
        </Card>
      </div>

      <Modal
        title={editingNode ? '编辑流程' : '新增流程'}
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
            name="processName"
            label="流程名称"
            rules={[{ required: true, message: '请输入流程名称' }]}
          >
            <Input placeholder="请输入流程名称" />
          </Form.Item>

          <Form.Item name="processCode" label="流程编码">
            <Input placeholder="请输入流程编码" />
          </Form.Item>

          <Form.Item name="parentId" label="上级流程">
            <TreeSelect
              placeholder="请选择上级流程（不选则为根节点）"
              treeData={buildTreeSelectData(processes)}
              allowClear
              treeDefaultExpandAll
            />
          </Form.Item>

          <Form.Item name="sortOrder" label="排序号">
            <Input type="number" placeholder="请输入排序号" />
          </Form.Item>

          <Form.Item name="status" label="状态" initialValue="active">
            <Select placeholder="请选择状态" options={STATUS_OPTIONS} />
          </Form.Item>

          <Form.Item name="description" label="描述">
            <TextArea rows={3} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}

export default ProcessDirectory;
