import { Tag } from 'antd';

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

interface StatusTagProps {
  status: string;
  options: StatusOption[];
}

function StatusTag({ status, options }: StatusTagProps) {
  const option = options.find((opt) => opt.value === status);

  if (!option) {
    return <Tag>{status}</Tag>;
  }

  return <Tag color={option.color}>{option.label}</Tag>;
}

export default StatusTag;
