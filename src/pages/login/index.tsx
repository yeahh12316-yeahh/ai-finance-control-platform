import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import useAuthStore from '@/stores/authStore';

const { Title, Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      message.success('登录成功');
      navigate('/dashboard', { replace: true });
    } catch {
      message.error('登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f1a2e 0%, #1a365d 50%, #0f1a2e 100%)',
        padding: 24,
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 880,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
          }}
        >
          {/* Brand Section */}
          <div
            style={{
              flex: '1 1 360px',
              background: 'linear-gradient(160deg, #1a365d 0%, #0d1f3c 100%)',
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 420,
            }}
            className="login-brand-section"
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #d4a853, #b8943a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <SafetyCertificateOutlined
                style={{ fontSize: 36, color: '#fff' }}
              />
            </div>
            <Title
              level={3}
              style={{
                color: '#fff',
                marginBottom: 8,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              AI金融内控智能运营平台
            </Title>
            <Text
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 14,
                letterSpacing: 4,
              }}
            >
              智能驱动 · 风险可控
            </Text>
            <div
              style={{
                marginTop: 40,
                padding: '0 20px',
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: 12,
                }}
              >
                基于AI技术的金融内控管理系统
                <br />
                实现全流程风险识别、评估、监控与整改
              </Text>
            </div>
          </div>

          {/* Login Form Section */}
          <div
            style={{
              flex: '1 1 360px',
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: '#fff',
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <Title
                level={4}
                style={{
                  marginBottom: 4,
                  color: '#1a365d',
                  fontWeight: 600,
                }}
              >
                用户登录
              </Title>
              <Text type="secondary">请输入您的账号和密码</Text>
            </div>

            <Form<LoginFormValues>
              name="login"
              size="large"
              onFinish={handleFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                  placeholder="用户名"
                  autoFocus
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                  placeholder="密码"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{
                    height: 44,
                    background: 'linear-gradient(135deg, #1a365d, #2a5080)',
                    border: 'none',
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  登 录
                </Button>
              </Form.Item>
            </Form>

            <Space
              direction="vertical"
              size={4}
              style={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                演示账号: admin / admin123
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                AI金融内控智能运营平台 v1.0
              </Text>
            </Space>
          </div>
        </div>
      </Card>

      {/* Responsive: hide brand on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .login-brand-section {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
