import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import { usePermission } from '@/hooks/usePermission';

interface AuthButtonProps extends ButtonProps {
  permissionCode: string;
}

function AuthButton({ permissionCode, ...buttonProps }: AuthButtonProps) {
  const { hasPermission } = usePermission();

  if (!hasPermission(permissionCode)) {
    return null;
  }

  return <Button {...buttonProps} />;
}

export default AuthButton;
