import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface UserRecord {
  id: string;
  username: string;
  realName: string;
  role: string;
  roleName: string;
  status: string;
  orgId: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateParams {
  username: string;
  realName: string;
  role: string;
  roleName?: string;
  status?: string;
  orgId?: string;
  email?: string;
  phone?: string;
}

export interface UserUpdateParams extends Partial<UserCreateParams> {
  id: string;
}

export function getUsers(params: PaginationParams & { keyword?: string }): Promise<ApiResponse<PaginatedResponse<UserRecord>>> {
  return get<PaginatedResponse<UserRecord>>('/users', params as Record<string, unknown>);
}

export function getUserById(id: string): Promise<ApiResponse<UserRecord>> {
  return get<UserRecord>(`/users/${id}`);
}

export function createUser(params: UserCreateParams): Promise<ApiResponse<UserRecord>> {
  return post<UserRecord>('/users', params as unknown as Record<string, unknown>);
}

export function updateUser(params: UserUpdateParams): Promise<ApiResponse<UserRecord>> {
  const { id, ...data } = params;
  return put<UserRecord>(`/users/${id}`, data as Record<string, unknown>);
}

export function deleteUser(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/users/${id}`);
}

export function getRoles(): Promise<ApiResponse<Record<string, unknown>[]>> {
  return get<Record<string, unknown>[]>('/roles');
}

export function getPermissions(): Promise<ApiResponse<Record<string, unknown>[]>> {
  return get<Record<string, unknown>[]>('/permissions');
}
