import { useState, useMemo } from 'react';
import { Tree, Input, Badge, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {
  PartitionOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { DataNode, EventDataNode } from 'antd/es/tree';
import type { ProcessNode } from '@/types/process';
import { seedProcesses } from '@/mocks/data/processes';

interface ProcessDataNode extends DataNode {
  processData?: ProcessNode;
  children?: ProcessDataNode[];
}

interface ProcessTreeProps {
  onSelect?: (node: ProcessNode | null) => void;
  onAdd?: (parentNode?: ProcessNode) => void;
  onEdit?: (node: ProcessNode) => void;
  onDelete?: (node: ProcessNode) => void;
}

function buildTree(processes: ProcessNode[]): ProcessDataNode[] {
  const map = new Map<string, ProcessDataNode>();
  const roots: ProcessDataNode[] = [];

  processes.forEach((p) => {
    map.set(p.id, {
      key: p.id,
      title: '',
      processData: p,
      children: [],
    });
  });

  processes.forEach((p) => {
    const node = map.get(p.id)!;
    if (p.parentId === '0' || !map.has(p.parentId)) {
      roots.push(node);
    } else {
      const parent = map.get(p.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
  });

  // Sort by sortOrder
  const sortNodes = (nodes: ProcessDataNode[]) => {
    nodes.sort((a, b) => {
      const aData = a.processData as ProcessNode;
      const bData = b.processData as ProcessNode;
      return aData.sortOrder - bData.sortOrder;
    });
    nodes.forEach((n) => {
      if (n.children) sortNodes(n.children);
    });
  };
  sortNodes(roots);

  return roots;
}

function ProcessTree({ onSelect, onAdd, onEdit, onDelete }: ProcessTreeProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [contextMenuNode, setContextMenuNode] = useState<ProcessNode | null>(null);

  const processes = useMemo(() => seedProcesses as ProcessNode[], []);

  const filteredProcesses = useMemo(() => {
    if (!searchValue) return processes;
    const kw = searchValue.toLowerCase();
    return processes.filter(
      (p) =>
        p.processName.toLowerCase().includes(kw) ||
        p.processCode.toLowerCase().includes(kw),
    );
  }, [processes, searchValue]);

  const treeData = useMemo(() => {
    const data = buildTree(filteredProcesses);

    // Custom title render with search highlight and badges
    const renderTitle = (node: ProcessDataNode): ProcessDataNode => {
      const p = node.processData!;
      const titleStr = (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span>
            {searchValue && p.processName.toLowerCase().includes(searchValue.toLowerCase())
              ? highlightText(p.processName, searchValue)
              : p.processName}
          </span>
          {p.riskCount > 0 && (
            <Badge
              count={p.riskCount}
              size="small"
              style={{ backgroundColor: '#fa8c16' }}
              title="风险数"
            />
          )}
          {p.controlCount > 0 && (
            <Badge
              count={p.controlCount}
              size="small"
              style={{ backgroundColor: '#1890ff' }}
              title="控制数"
            />
          )}
        </span>
      );

      return {
        ...node,
        title: titleStr,
        children: node.children?.map(renderTitle),
      };
    };

    return data.map(renderTitle);
  }, [filteredProcesses, searchValue]);

  const handleSelect = (keys: React.Key[], info: { node: EventDataNode<ProcessDataNode> }) => {
    setSelectedKeys(keys as string[]);
    if (keys.length > 0 && info.node.processData) {
      onSelect?.(info.node.processData);
    }
  };

  const handleRightClick = ({ event, node }: { event: React.MouseEvent; node: EventDataNode<ProcessDataNode> }) => {
    event.preventDefault();
    setContextMenuNode(node.processData || null);
  };

  const getContextMenuItems = (node: ProcessNode | null): MenuProps['items'] => {
    if (!node) return [];
    return [
      {
        key: 'addChild',
        icon: <PlusOutlined />,
        label: '新增子节点',
        onClick: () => {
          onAdd?.(node);
          setContextMenuNode(null);
        },
        disabled: node.processLevel >= 4,
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: '编辑',
        onClick: () => {
          onEdit?.(node);
          setContextMenuNode(null);
        },
      },
      { type: 'divider' },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: '删除',
        danger: true,
        onClick: () => {
          onDelete?.(node);
          setContextMenuNode(null);
        },
      },
    ];
  };

  const handleTreeExpand = (keys: React.Key[]) => {
    setExpandedKeys(keys as string[]);
  };

  // Expand all by default on first load
  const handleExpandAll = () => {
    const allKeys = processes.map((p) => p.id);
    setExpandedKeys(allKeys);
  };

  const handleCollapseAll = () => {
    setExpandedKeys([]);
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="搜索流程..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          allowClear
          size="small"
        />
      </div>
      <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
        <a onClick={handleExpandAll} style={{ fontSize: 12 }}>
          全部展开
        </a>
        <a onClick={handleCollapseAll} style={{ fontSize: 12 }}>
          全部折叠
        </a>
      </div>
      {contextMenuNode && (
        <Dropdown
          menu={{ items: getContextMenuItems(contextMenuNode) }}
          trigger={['contextMenu']}
          open
          onOpenChange={(open) => {
            if (!open) setContextMenuNode(null);
          }}
        >
          <div style={{ position: 'fixed', top: -100, left: -100 }} />
        </Dropdown>
      )}
      <Tree.DirectoryTree
        showIcon
        icon={(props: { expanded?: boolean }) =>
          props.expanded ? <PartitionOutlined /> : <PartitionOutlined />
        }
        treeData={treeData}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onSelect={handleSelect}
        onExpand={handleTreeExpand}
        onRightClick={handleRightClick}
        blockNode
        style={{ maxHeight: 'calc(100vh - 350px)', overflow: 'auto' }}
      />
    </div>
  );
}

function highlightText(text: string, keyword: string): React.ReactNode {
  const idx = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.substring(0, idx)}
      <span style={{ backgroundColor: '#ffd591' }}>{text.substring(idx, idx + keyword.length)}</span>
      {text.substring(idx + keyword.length)}
    </>
  );
}

export default ProcessTree;
