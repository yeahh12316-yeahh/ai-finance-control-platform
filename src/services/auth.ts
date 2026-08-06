import { get, post } from '@/utils/request';
import type { ApiResponse } from '@/types/api';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: Record<string, unknown>;
}

export interface UserInfo {
  id: string;
  username: string;
  realName: string;
  role: string;
  roleName: string;
  status: string;
  email: string;
  phone: string;
}

export interface MenuItem {
  id: string;
  permCode: string;
  name: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}

export function login(params: LoginParams): Promise<ApiResponse<LoginResult>> {
  return post<LoginResult>('/auth/login', params as unknown as Record<string, unknown>);
}

export function getCurrentUser(): Promise<ApiResponse<UserInfo>> {
  return get<UserInfo>('/auth/me');
}

export function logout(): Promise<ApiResponse<null>> {
  return post<null>('/auth/logout');
}

export function getMenus(): Promise<ApiResponse<MenuItem[]>> {
  return get<MenuItem[]>('/auth/menus');
}
