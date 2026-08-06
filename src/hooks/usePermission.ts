import { useMemo } from 'react';
import useAuthStore from '@/stores/authStore';
import { seedRoles } from '@/mocks/data/roles';
import { seedUsers } from '@/mocks/data/users';

export function usePermission() {
  const user = useAuthStore((state) => state.user);

  const userPermissions = useMemo(() => {
    if (!user) return [];

    const seedUser = seedUsers.find((u) => u.username === user.username);
    if (!seedUser) return [];

    const role = seedRoles.find((r) => r.roleCode === seedUser.role);
    if (!role) return [];

    return role.permissions;
  }, [user]);

  const hasPermission = (code: string): boolean => {
    return userPermissions.includes(code);
  };

  const hasAnyPermission = (codes: string[]): boolean => {
    return codes.some((code) => userPermissions.includes(code));
  };

  return {
    hasPermission,
    hasAnyPermission,
    userPermissions,
  };
}
