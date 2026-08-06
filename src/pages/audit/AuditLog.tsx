import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  DatePicker,
  Select,
  Space,
  message,
} from 'antd';
import {
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { getAuditLogs, getAuditLogStats } from '@/services/audit';
import type { AuditLogRecord, AuditLogFilterParams, AuditLogStats } from '@/types/audit';
import { AUDIT_MODULE_MAP, AUDIT_OPERATION_MAP } from '@/types/audit';
import LogTable from './components/LogTable';
import LogDetail from './components/LogDetail';

const { RangePicker } = DatePicker;

export default function AuditLogPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuditLogRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20 });
  const [filters, setFilters] = useState<AuditLogFilterParams>({});
  const [stats, setStats] = useState<AuditLogStats | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLogRecord | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAuditLogs({ ...filters, ...pagination });
      setData(res.data.list);
      setTotal(res.data.total);
    } catch {
      // mock data
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getAuditLogStats();
      setStats(res.data);
    } catch {
      // mock data
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchData();
  };

  const handleReset = () => {
    setFilters({});
    setPagination({ page: 1, pageSize: 20 });
  };

  const handleViewDetail = (record: AuditLogRecord) => {
    setSelectedLog(record);
    setDetailOpen(true);
  };

  const handleExport = () => {
    message.success('日志导出已开始');
    // Mock export
    const csvContent = 'id,userId,userName,module,operation,detail,result,ip,createdAt\n' +
      data.map((log) =>
        `${log.id},${log.userId},${log.userName},${log.moduleName},${log.operationDesc},${log.detail},${log.result},${log.ip},${log.createdAt}`
      ).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `审计日志_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDateChange = (_: unknown, dateStrings: [string, string]) => {
    setFilters((prev) => ({
      ...prev,
      startDate: dateStrings[0] || undefined,
      endDate: dateStrings[1] || undefined,
    }));
  };

  return (
    <div>
      {/* Advanced Search */}
      <div
        style={{
          background: '#fafafa',
          padding: '16px',
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <div>
            <span style={{ marginRight: 8, fontSize: 13 }}>时间范围：</span>
            <RangePicker
              style={{ width: 280 }}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <span style={{ marginRight: 8, fontSize: 13 }}>用户：</span>
            <Select
              placeholder="选择用户"
              allowClear
              style={{ width: 140 }}
              value={filters.userId}
              onChange={(val) => setFilters((prev) => ({ ...prev, userId: val }))}
              options={[
                { label: '张管理', value: '1' },
                { label: '李审计', value: '2' },
                { label: '王业务', value: '3' },
              ]}
            />
          </div>
          <div>
            <span style={{ marginRight: 8, fontSize: 13 }}>模块：</span>
            <Select
              placeholder="选择模块"
              allowClear
              style={{ width: 140 }}
              value={filters.module}
              onChange={(val) => setFilters((prev) => ({ ...prev, module: val }))}
              options={Object.entries(AUDIT_MODULE_MAP).map(([value, label]) => ({
                label,
                value,
              }))}
            />
          </div>
          <div>
            <span style={{ marginRight: 8, fontSize: 13 }}>操作类型：</span>
            <Select
              placeholder="选择操作类型"
              allowClear
              style={{ width: 140 }}
              value={filters.operation}
              onChange={(val) => setFilters((prev) => ({ ...prev, operation: val }))}
              options={Object.entries(AUDIT_OPERATION_MAP).map(([value, label]) => ({
                label,
                value,
              }))}
            />
          </div>
          <div>
            <span style={{ marginRight: 8, fontSize: 13 }}>结果：</span>
            <Select
              placeholder="选择结果"
              allowClear
              style={{ width: 100 }}
              value={filters.result}
              onChange={(val) => setFilters((prev) => ({ ...prev, result: val }))}
              options={[
                { label: '成功', value: '成功' },
                { label: '失败', value: '失败' },
              ]}
            />
          </div>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              导出
            </Button>
          </Space>
        </div>
      </div>

      {/* Log Table */}
      <LogTable
        dataSource={data}
        loading={loading}
        total={total}
        pagination={pagination}
        onPaginationChange={(page, pageSize) => setPagination({ page, pageSize })}
        onViewDetail={handleViewDetail}
      />

      {/* Detail Drawer */}
      <LogDetail
        open={detailOpen}
        record={selectedLog}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
