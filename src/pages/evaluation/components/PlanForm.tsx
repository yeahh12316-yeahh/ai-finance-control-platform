import { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, InputNumber } from 'antd';
import type { EvaluationPlan } from '@/types/evaluation';
import { PLAN_TYPE_MAP, EVALUATION_FRAMEWORK_MAP } from '@/types/evaluation';
import dayjs from 'dayjs';

interface PlanFormProps {
  open: boolean;
  record: EvaluationPlan | null;
  onCancel: () => void;
  onSubmit: (values: Partial<EvaluationPlan>) => void;
}

export default function PlanForm({ open, record, onCancel, onSubmit }: PlanFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (record) {
        form.setFieldsValue({
          planName: record.planName,
          planYear: record.planYear,
          planType: record.planType,
          evaluationFramework: record.evaluationFramework,
          startDate: dayjs(record.startDate),
          endDate: dayjs(record.endDate),
          description: record.description,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          planYear: new Date().getFullYear(),
          planType: 'annual',
          evaluationFramework: 'COSO',
        });
      }
    }
  }, [open, record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const params: Partial<EvaluationPlan> = {
        planName: values.planName,
        planYear: values.planYear,
        planType: values.planType,
        evaluationFramework: values.evaluationFramework,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        description: values.description || '',
      };
      onSubmit(params);
    } catch {
      // validation failed
    }
  };

  return (
    <Modal
      title={record ? '编辑评价计划' : '新增评价计划'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="planName"
          label="计划名称"
          rules={[{ required: true, message: '请输入计划名称' }]}
        >
          <Input placeholder="请输入计划名称" />
        </Form.Item>
        <Form.Item
          name="planYear"
          label="评价年度"
          rules={[{ required: true, message: '请选择评价年度' }]}
        >
          <InputNumber
            min={2020}
            max={2030}
            style={{ width: '100%' }}
            placeholder="选择年度"
          />
        </Form.Item>
        <Form.Item
          name="planType"
          label="计划类型"
          rules={[{ required: true, message: '请选择计划类型' }]}
        >
          <Select
            options={Object.entries(PLAN_TYPE_MAP).map(([value, label]) => ({
              label,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="evaluationFramework"
          label="评价框架"
          rules={[{ required: true, message: '请选择评价框架' }]}
        >
          <Select
            options={Object.entries(EVALUATION_FRAMEWORK_MAP).map(([value, label]) => ({
              label,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="开始日期"
          rules={[{ required: true, message: '请选择开始日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="结束日期"
          rules={[{ required: true, message: '请选择结束日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea rows={3} placeholder="请输入计划描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
