import { useState, useMemo, useCallback } from 'react';
import { Card, Table, Input, Tag, Badge } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import RiskTree from './components/RiskTree';
import type { RiskCategory, RiskRecord } from '@/services/risk';
import { seedRiskCategories } from '@/mocks/data/riskCategories';
import { seedRisks } from '@/mocks/data/risks';

const RISK_LEVEL_COLOR: Record<string, string> = {
  '高': '#ff4d4f',
  '中': '#fa8c16',
  '低': '#52c41a',
};

function RiskDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory | null>(null);
  const [searchText, setSearchText] = useState('');

  const categories = useMemo(() => seedRiskCategories as RiskCategory[], []);

  const risks = useMemo(() => seedRisks as RiskRecord[], []);

  const filteredRisks = useMemo(() => {
    let result = risks;
    if (selectedCategory) {
      result = result.filter((r) => r.categoryId === selectedCategory.id);
    }
    if (searchText) {
      const kw = searchText.toLowerCase();
      result = result.filter(
        (r) =>
          r.riskCode.toLowerCase().includes(kw) ||
          r.riskName.toLowerCase().includes(kw),
      );
    }
    return result;
  }, [risks, selectedCategory, searchText]);

  const handleCategorySelect = useCallback((cat: RiskCategory | null) => {
    setSelectedCategory(cat);
  }, []);

  const columns: ColumnsType<RiskRecord> = [
    {
      title: '风险代码',
      dataIndex: 'riskCode',
      key: 'riskCode',
      width: 120,
    },
    {
      title: '风险名称',
      dataIndex: 'riskName',
      key: 'riskName',
      width: 200,
    },
    {
      title: '风险描述',
      dataIndex: 'riskDescription',
      key: 'riskDescription',
      ellipsis: true,
    },
    {
      title: '固有风险等级',
      dataIndex: 'inherentRiskLevel',
      key: 'inherentRiskLevel',
      width: 120,
      render: (level: string) => (
        <Tag color={RISK_LEVEL_COLOR[level] || '#d9d9d9'}>{level}</Tag>
      ),
    },
    {
      title: '残留风险等级',
      dataIndex: 'residualRiskLevel',
      key: 'residualRiskLevel',
      width: 120,
      render: (level: string) => (
        <Tag color={RISK_LEVEL_COLOR[level] || '#d9d9d9'}>{level}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) =>
        status === 'active' ? (
          <Tag color="green">启用</Tag>
        ) : (
          <Tag color="red">禁用</Tag>
        ),
    },
  ];

  return (
    <PageContainer title="风险目录管理">
      <div style={{ display: 'flex', gap: 16, height: 'calc(100vh - 240px)' }}>
        {/* Left: Risk category tree */}
        <Card title="风险分类" size="small" style={{ width: 280, flexShrink: 0 }}>
          <RiskTree categories={categories} onSelect={handleCategorySelect} />
        </Card>

        {/* Right: Risk list */}
        <Card
          title={
            selectedCategory
              ? `${selectedCategory.categoryName} - 风险清单`
              : '全部风险清单'
          }
          size="small"
          style={{ flex: 1 }}
          extra={
            <Badge
              count={filteredRisks.length}
              style={{ backgroundColor: '#1890ff' }}
              overflowCount={999}
            />
          }
        >
          <div style={{ marginBottom: 16 }}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="搜索风险..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ width: 300 }}
            />
          </div>

          <Table<RiskRecord>
            columns={columns}
            dataSource={filteredRisks}
            rowKey="id"
            size="small"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
            scroll={{ x: 800 }}
            locale={{
              emptyText: <EmptyState description="暂无风险数据" />,
            }}
          />
        </Card>
      </div>
    </PageContainer>
  );
}

export default RiskDirectory;
