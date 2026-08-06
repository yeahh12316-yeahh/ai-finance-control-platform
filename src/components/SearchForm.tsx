import { Form, Input, Select, Button, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

export interface SearchField {
  name: string;
  label: string;
  type?: 'input' | 'select';
  placeholder?: string;
  options?: { label: string; value: string }[];
  render?: () => ReactNode;
}

interface SearchFormProps {
  fields: SearchField[];
  onSearch: (values: Record<string, unknown>) => void;
  onReset?: () => void;
}

function SearchForm({ fields, onSearch, onReset }: SearchFormProps) {
  const [form] = Form.useForm();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };

  const renderField = (field: SearchField) => {
    if (field.render) {
      return field.render();
    }

    if (field.type === 'select') {
      return (
        <Select
          placeholder={field.placeholder || `请选择${field.label}`}
          allowClear
          options={field.options}
        />
      );
    }

    return (
      <Input
        placeholder={field.placeholder || `请输入${field.label}`}
        allowClear
      />
    );
  };

  return (
    <Form
      form={form}
      layout="inline"
      style={{ marginBottom: 16, flexWrap: 'wrap', gap: 0 }}
    >
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        {fields.map((field) => (
          <Col key={field.name} xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              name={field.name}
              label={field.label}
              style={{ width: '100%', marginBottom: 0 }}
            >
              {renderField(field)}
            </Form.Item>
          </Col>
        ))}
        <Col>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              style={{ marginLeft: 8 }}
            >
              重置
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;
