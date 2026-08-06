import { useState, useMemo, useCallback } from 'react';
import { Select, Switch, Space, Card, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import RCMMatrixTable from './components/RCMMatrixTable';
import type { RCMMapping, MappingType } from '@/types/rcm';
import type { ControlRecord } from '@/types/control';
import type { RiskCategory } from '@/services/risk';
import type { RiskRow } from './components/RCMMatrixTable';
import { seedRisks } from '@/mocks/data/risks';
import { seedRiskCategories } from '@/mocks/data/riskCategories';
import { seedControls } from '@/mocks/data/controls';
import { seedRCMMappings } from '@/mocks/data/rcm';

function RCMMatrix() {
  const [riskCategoryFilter, setRiskCategoryFilter] = useState<string>('');
  const [riskLevelFilter, setRiskLevelFilter] = useState<string>('');
  const [controlTypeFilter, setControlTypeFilter] = useState<string>('');
  const [onlyMapped, setOnlyMapped] = useState(false);
  const [mappings, setMappings] = useState<RCMMapping[]>(seedRCMMappings as RCMMapping[]);
  const [loading] = useState(false);

  const risks = useMemo(() => seedRisks, []);
  const categories = useMemo(() => seedRiskCategories as RiskCategory[], []);
  const controls = useMemo(() => seedControls as ControlRecord[], []);

  // Build risk rows with control mappings
  const riskRows: RiskRow[] = useMemo(() => {
    let filtered = [...risks];

    if (riskCategoryFilter) {
      filtered = filtered.filter((r) => r.categoryId === riskCategoryFilter);
    }

    if (riskLevelFilter) {
      filtered = filtered.filter((r) => r.inherentRiskLevel === riskLevelFilter);
    }

    const rows: RiskRow[] = filtered.map((r) => {
      const riskMap = new Map<string, RCMMapping>();
      mappings.forEach((m) => {
        if (m.riskId === r.id) {
          riskMap.set(m.controlId, m);
        }
      });

      return {
        id: r.id,
        riskCode: r.riskCode,
        riskName: r.riskName,
        riskLevel: r.inherentRiskLevel,
        categoryName: categories.find((c) => c.id === r.categoryId)?.categoryName || '',
        controlMappings: riskMap,
      };
    });

    if (onlyMapped) {
      return rows.filter((row) => row.controlMappings.size > 0);
    }

    return rows;
  }, [risks, mappings, categories, riskCategoryFilter, riskLevelFilter, onlyMapped]);

  // Filter controls
  const filteredControls = useMemo(() => {
    if (!controlTypeFilter) return controls;
    return controls.filter((c) => c.controlType === controlTypeFilter);
  }, [controls, controlTypeFilter]);

  const handleAddMapping = useCallback(
    (riskId: string, controlId: string, mappingType: MappingType) => {
      const newMapping: RCMMapping = {
        id: String(Date.now()),
        riskId,
        controlId,
        mappingType,
        effectivenessRating: '有效',
        lastTestedDate: new Date().toISOString(),
      };
      setMappings((prev) => [...prev, newMapping]);
    },
    [],
  );

  const handleDeleteMapping = useCallback((mapping: RCMMapping) => {
    setMappings((prev) => prev.filter((m) => m.id !== mapping.id));
  }, []);

  return (
    <PageContainer title="RCM矩阵管理">
      <Card size="small" style={{ marginBottom: 16 }}>
        <Row gutter={[16, 12]} align="middle">
          <Col>
            <Space>
              <FilterOutlined />
              <span style={{ fontWeight: 500 }}>风险筛选：</span>
            </Space>
          </Col>
          <Col>
            <Select
              placeholder="风险分类"
              value={riskCategoryFilter || undefined}
              onChange={(v) => setRiskCategoryFilter(v || '')}
              allowClear
              style={{ width: 160 }}
              options={categories.map((c) => ({
                label: c.categoryName,
                value: c.id,
              }))}
            />
          </Col>
          <Col>
            <Select
              placeholder="风险等级"
              value={riskLevelFilter || undefined}
              onChange={(v) => setRiskLevelFilter(v || '')}
              allowClear
              style={{ width: 120 }}
              options={[
                { label: '高', value: '高' },
                { label: '中', value: '中' },
                { label: '低', value: '低' },
              ]}
            />
          </Col>
          <Col>
            <Space>
              <span style={{ fontWeight: 500 }}>控制筛选：</span>
            </Space>
          </Col>
          <Col>
            <Select
              placeholder="控制类型"
              value={controlTypeFilter || undefined}
              onChange={(v) => setControlTypeFilter(v || '')}
              allowClear
              style={{ width: 150 }}
              options={[
                { label: '预防性控制', value: 'preventive' },
                { label: '检测性控制', value: 'detective' },
                { label: '纠正性控制', value: 'corrective' },
              ]}
            />
          </Col>
          <Col>
            <Space>
              <span>仅显示已映射：</span>
              <Switch checked={onlyMapped} onChange={setOnlyMapped} />
            </Space>
          </Col>
        </Row>
      </Card>

      <RCMMatrixTable
        risks={riskRows}
        controls={filteredControls}
        mappings={mappings}
        loading={loading}
        onAddMapping={handleAddMapping}
        onDeleteMapping={handleDeleteMapping}
      />
    </PageContainer>
  );
}

export default RCMMatrix;
