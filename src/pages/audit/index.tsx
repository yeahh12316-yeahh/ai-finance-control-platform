import { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import AuditLog from './AuditLog';

export default function AuditPage() {
  return (
    <PageContainer
      title="审计日志"
      breadcrumb={[
        { title: '首页', path: '/' },
        { title: '系统管理' },
        { title: '审计日志' },
      ]}
    >
      <AuditLog />
    </PageContainer>
  );
}
