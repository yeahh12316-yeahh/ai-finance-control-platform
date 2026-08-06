import { useState, useMemo } from 'react';
import { Tree, Input } from 'antd';
import { WarningOutlined, SearchOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import type { RiskCategory } from '@/services/risk';

interface RiskTreeProps {
  categories: RiskCategory[];
  onSelect?: (category: RiskCategory | null) => void;
}

function RiskTree({ categories, onSelect }: RiskTreeProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const filteredCategories = useMemo(() => {
    if (!searchValue) return categories;
    const kw = searchValue.toLowerCase();
    return categories.filter(
      (c) =>
        c.categoryName.toLowerCase().includes(kw) ||
        c.categoryCode.toLowerCase().includes(kw),
    );
  }, [categories, searchValue]);

  const treeData = useMemo(() => {
    const map = new Map<string, DataNode>();
    const roots: DataNode[] = [];

    filteredCategories.forEach((c) => {
      map.set(c.id, {
        key: c.id,
        title: c.categoryName,
        children: [],
      });
    });

    filteredCategories.forEach((c) => {
      const node = map.get(c.id)!;
      if (c.parentId === '0' || !map.has(c.parentId)) {
        roots.push(node);
      } else {
        const parent = map.get(c.parentId);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(node);
        }
      }
    });

    return roots;
  }, [filteredCategories]);

  const handleSelect = (keys: React.Key[]) => {
    setSelectedKeys(keys as string[]);
    if (keys.length > 0) {
      const cat = categories.find((c) => c.id === keys[0]);
      onSelect?.(cat || null);
    } else {
      onSelect?.(null);
    }
  };

  const handleExpandAll = () => {
    setExpandedKeys(categories.map((c) => c.id));
  };

  const handleCollapseAll = () => {
    setExpandedKeys([]);
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="搜索风险分类..."
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
      <Tree
        showIcon
        icon={<WarningOutlined />}
        treeData={treeData}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onSelect={handleSelect}
        onExpand={(keys) => setExpandedKeys(keys as string[])}
        style={{ maxHeight: 'calc(100vh - 350px)', overflow: 'auto' }}
      />
    </div>
  );
}

export default RiskTree;
