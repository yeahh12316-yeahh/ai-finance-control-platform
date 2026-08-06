import { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import type { DefectRecord } from '@/types/defect';
import {
  SEVERITY_MAP,
  DEFICIENCY_TYPE_MAP,
  DEFICIENCY_CATEGORY_MAP,
  SOURCE_TYPE_MAP,
} from '@/types/defect';
import dayjs from 'dayjs';

interface DefectFormProps {
  open: boolean;
  record: DefectRecord | null;
  onCancel: () => void;
  onSubmit: (values: Partial<DefectRecord>) => void;
}

export default function DefectForm({ open, record, onCancel, onSubmit }: DefectFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (record) {
        form.setFieldsValue({
          defectName: record.defectName,
          description: record.description,
          severity: record.severity,
          deficiencyType: record.deficiencyType,
          deficiencyCategory: record.deficiencyCategory,
          sourceType: record.sourceType,
          processId: record.processId,
          controlId: record.controlId,
          riskId: record.riskId,
          remediationPlan: record.remediationPlan,
          assignedTo: record.assignedTo,
          dueDate: record.dueDate ? dayjs(record.dueDate) : undefined,
          rootCause: record.rootCause,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const params: Partial<DefectRecord> = {
        defectName: values.defectName,
        description: values.description,
        severity: values.severity,
        deficiencyType: values.deficiencyType,
        deficiencyCategory: values.deficiencyCategory,
        sourceType: values.sourceType,
        processId: values.processId,
        controlId: values.controlId,
        riskId: values.riskId,
        remediationPlan: values.remediationPlan,
        assignedTo: values.assignedTo,
        dueDate: values.dueDate?.toISOString(),
        rootCause: values.rootCause,
      };
      onSubmit(params);
    } catch {
      // validation failed
    }
  };

  return (
    <Modal
      title={record ? '编辑缺陷' : '新增缺陷'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      width={700}
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="defectName"
          label="缺陷名称"
          rules={[{ required: true, message: '请输入缺陷名称' }]}
        >
          <Input placeholder="请输入缺陷名称" />
        </Form.Item>
        <Form.Item
          name="description"
          label="缺陷描述"
          rules={[{ required: true, message: '请输入缺陷描述' }]}
        >
          <Input.TextArea rows={3} placeholder="详细描述缺陷情况" />
        </Form.Item>
        <Form.Item
          name="severity"
          label="严重等级"
          rules={[{ required: true, message: '请选择严重等级' }]}
        >
          <Select
            options={Object.entries(SEVERITY_MAP).map(([value, { label }]) => ({
              label,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="deficiencyType"
          label="缺陷类型"
          rules={[{ required: true, message: '请选择缺陷类型' }]}
        >
          <Select
            options={Object.entries(DEFICIENCY_TYPE_MAP).map(([value, label]) => ({
              label,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="deficiencyCategory"
          label="缺陷分类"
          rules={[{ required: true, message: '请选择缺陷分类' }]}
        >
          <Select
            options={Object.entries(DEFICIENCY_CATEGORY_MAP).map(([value, label]) => ({
              label,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="sourceType"
          label="来源类型"
          rules={[{ required: true, message: '请选择来源类型' }]}
        >
          <Select
            options={Object.entries(SOURCE_TYPE_MAP).map(([value, label]) => ({
              label,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item name="processId" label="关联流程">
          <Select
            placeholder="选择关联流程"
            allowClear
            options={[
              { label: '信贷业务全流程', value: '1' },
              { label: '贷前管理', value: '3' },
              { label: '贷后管理', value: '26' },
            ]}
          />
        </Form.Item>
        <Form.Item name="controlId" label="关联控制">
          <Select
            placeholder="选择关联控制"
            allowClear
            options={[
              { label: '客户身份识别与尽职调查', value: '1' },
              { label: '抵质押物价值定期重估', value: '2' },
              { label: '授信审批权限分级', value: '5' },
              { label: '合同合规审查', value: '9' },
              { label: '反洗钱交易监控', value: '10' },
              { label: '贷后资金用途监控', value: '11' },
              { label: '集中度指标监控', value: '13' },
            ]}
          />
        </Form.Item>
        <Form.Item name="riskId" label="关联风险">
          <Select
            placeholder="选择关联风险"
            allowClear
            options={[
              { label: '信用风险', value: '1' },
              { label: '操作风险', value: '5' },
              { label: '合规风险', value: '9' },
              { label: '集中度风险', value: '13' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="remediationPlan"
          label="整改方案"
          rules={[{ required: true, message: '请输入整改方案' }]}
        >
          <Input.TextArea rows={3} placeholder="描述整改措施和计划" />
        </Form.Item>
        <Form.Item
          name="assignedTo"
          label="负责人"
          rules={[{ required: true, message: '请输入负责人' }]}
        >
          <Input placeholder="负责人ID" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="截止日期"
          rules={[{ required: true, message: '请选择截止日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="rootCause" label="根因分析">
          <Input.TextArea rows={2} placeholder="根因分析（可选）" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
