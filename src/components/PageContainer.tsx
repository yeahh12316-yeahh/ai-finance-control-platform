import { Breadcrumb, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  breadcrumb?: { title: string; path?: string }[];
  onBack?: () => void;
}

function PageContainer({ title, children, extra, breadcrumb, onBack }: PageContainerProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb
          style={{ marginBottom: 16 }}
          items={breadcrumb.map((item) => ({
            title: item.path ? (
              <a onClick={() => navigate(item.path!)}>{item.title}</a>
            ) : (
              item.title
            ),
          }))}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Space>
          {(onBack || breadcrumb) && (
            <ArrowLeftOutlined
              onClick={handleBack}
              style={{ cursor: 'pointer', fontSize: 16, color: '#1a365d' }}
            />
          )}
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
        </Space>
        {extra && <Space>{extra}</Space>}
      </div>

      {children}
    </div>
  );
}

export default PageContainer;
