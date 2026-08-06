import { useEffect, useState } from 'react';
import { Form, Input, Select, TreeSelect, InputNumber, Slider, Row, Col, Divider } from 'antd';
import { getRiskCategories } from '@/services/risk';
import { getProcesses } from '@/services/process';
import type { RiskItem } from '@/types/risk';
import { riskStatusOptions, likelihoodLabels, impactLabels } from '@/types/risk';

const { TextArea } = Input;

interface RiskFormProps {
  initialValues?: RiskItem | null;
  formRef?: React.RefObject<ReturnType<typeof Form.useForm>[0]>;
}

interface TreeNode {
  id: string;
  value: string;
  title: string;
  key: string;
  children?: TreeNode[];
}

function buildTreeNodes(
  list: Array<{ id: string; parentId: string; [key: string]: unknown }>,
  nameField: string,
  parentId: string = '0',
): TreeNode[] {
  return list
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      id: item.id,
      value: item.id,
      title: item[nameField] as string,
      key: item.id,
      children: buildTreeNodes(list, nameField, item.id),
    }));
}

const RiskFormFields: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
  const [categoryTree, setCategoryTree] = useState<TreeNode[]>([]);
  const [processTree, setProcessTree] = useState<TreeNode[]>([]);
  const [inherentImpact, setInherentImpact] = useState(3);
  const [inherentLikelihood, setInherentLikelihood] = useState(3);

  useEffect(() => {
    getRiskCategories().then((res) => {
      if (res.data) {
        setCategoryTree(buildTreeNodes(res.data, 'categoryName'));
      }
    });

    getProcesses().then((res) => {
      if (res.data) {
        setProcessTree(buildTreeNodes(res.data, 'processName'));
      }
    });
  }, []);

  const impactMarks: Record<number, string> = {};
  impactLabels.forEach((label, i) => {
    impactMarks[i + 1] = label;
  });

  const likelihoodMarks: Record<number, string> = {};
  likelihoodLabels.forEach((label, i) => {
    likelihoodMarks[i + 1] = label;
  });

  return (
    <>
      <Divider orientation="left" plain>基本信息</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="riskName"
            label="风险名称"
            rules={[{ required: true, message: '请输入风险名称' }]}
          >
            <Input placeholder="请输入风险名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
          >
            <Select options={riskStatusOptions.map((s) => ({ label: s.label, value: s.value }))} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="categoryId"
            label="风险分类"
            rules={[{ required: true, message: '请选择风险分类' }]}
          >
            <TreeSelect
              placeholder="请选择风险分类"
              treeData={categoryTree}
              treeDefaultExpandAll
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="processId"
            label="关联流程"
            rules={[{ required: true, message: '请选择关联流程' }]}
          >
            <TreeSelect
              placeholder="请选择关联流程"
              treeData={processTree}
              treeDefaultExpandAll
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="riskDescription"
        label="风险描述"
        rules={[{ required: true, message: '请输入风险描述' }]}
      >
        <TextArea rows={3} placeholder="请输入风险描述" />
      </Form.Item>

      <Divider orientation="left" plain>固有风险评估</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="inherentImpact"
            label="影响程度评分"
            rules={[{ required: true, message: '请选择影响程度' }]}
            initialValue={3}
          >
            <Slider
              min={1}
              max={5}
              marks={impactMarks}
              onChange={(val) => setInherentImpact(val)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="inherentLikelihood"
            label="可能性评分"
            rules={[{ required: true, message: '请选择可能性' }]}
            initialValue={3}
          >
            <Slider
              min={1}
              max={5}
              marks={likelihoodMarks}
              onChange={(val) => setInherentLikelihood(val)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" plain>控制措施与剩余风险</Divider>

      <Form.Item
        name="controlMeasures"
        label="控制措施"
      >
        <TextArea rows={3} placeholder="请输入控制措施描述" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="residualImpact"
            label="剩余影响评分"
            rules={[{ required: true, message: '请选择剩余影响程度' }]}
            initialValue={2}
          >
            <Slider min={1} max={5} marks={impactMarks} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="residualLikelihood"
            label="剩余可能性评分"
            rules={[{ required: true, message: '请选择剩余可能性' }]}
            initialValue={2}
          >
            <Slider min={1} max={5} marks={likelihoodMarks} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default RiskFormFields;
