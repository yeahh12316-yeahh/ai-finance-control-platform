import type { ButtonProps } from 'antd';
import { Button, Popconfirm } from 'antd';

interface ConfirmButtonProps extends ButtonProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

function ConfirmButton({
  title = '确认操作',
  description = '确定要执行此操作吗？',
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  ...buttonProps
}: ConfirmButtonProps) {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      okText={confirmText}
      cancelText={cancelText}
    >
      <Button {...buttonProps} />
    </Popconfirm>
  );
}

export default ConfirmButton;
