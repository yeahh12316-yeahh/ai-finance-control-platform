import { useCallback } from 'react';
import useAuthStore from '@/stores/authStore';
import { getAuditLogs } from '@/services/audit';

export function useAudit() {
  const user = useAuthStore((state) => state.user);

  const logAudit = useCallback(
    (
      module: string,
      action: string,
      targetType: string,
      targetId: string,
      detail: string,
    ) => {
      if (!user) {
        console.warn('[Audit] User not authenticated, audit log skipped');
        return;
      }

      // In a real app, this would call an API endpoint to create audit logs
      // For now, we log to console and mock the API interaction
      const auditEntry = {
        userId: user.id,
        userName: user.realName || user.username,
        module,
        action,
        targetType,
        targetId,
        detail,
        timestamp: new Date().toISOString(),
      };

      console.log('[Audit Log]', auditEntry);

      // Attempt to send to audit service (this is a read endpoint in mock,
      // but in production there would be a POST endpoint)
      getAuditLogs({ page: 1, pageSize: 1 }).catch(() => {
        // Silently fail in mock mode
      });
    },
    [user],
  );

  return { logAudit };
}
