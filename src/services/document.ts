import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface DocumentVersion {
  version: string;
  uploadBy: string;
  uploadAt: string;
  fileSize: number;
}

export interface DocumentRecord {
  id: string;
  docCode: string;
  docName: string;
  docCategory: string;
  docType: string;
  version: string;
  fileSize: number;
  fileType: string;
  tags: string[];
  description: string;
  status: string;
  content: string;
  uploadBy: string;
  uploadAt: string;
  updatedAt: string;
  versions: DocumentVersion[];
}

export interface DocumentCreateParams {
  docName: string;
  docCategory?: string;
  docType?: string;
  fileSize?: number;
  fileType?: string;
  tags?: string[];
  description?: string;
  status?: string;
  content?: string;
  uploadBy?: string;
}

export interface DocumentFilterParams extends PaginationParams {
  docCategory?: string;
  status?: string;
  tag?: string;
}

export function getDocuments(params: DocumentFilterParams): Promise<ApiResponse<PaginatedResponse<DocumentRecord>>> {
  return get<PaginatedResponse<DocumentRecord>>('/ic-document/documents', params as Record<string, unknown>);
}

export function getDocumentById(id: string): Promise<ApiResponse<DocumentRecord>> {
  return get<DocumentRecord>(`/ic-document/documents/${id}`);
}

export function createDocument(params: DocumentCreateParams): Promise<ApiResponse<DocumentRecord>> {
  return post<DocumentRecord>('/ic-document/documents', params as unknown as Record<string, unknown>);
}

export function updateDocument(id: string, params: Partial<DocumentCreateParams>): Promise<ApiResponse<DocumentRecord>> {
  return put<DocumentRecord>(`/ic-document/documents/${id}`, params as unknown as Record<string, unknown>);
}

export function deleteDocument(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-document/documents/${id}`);
}

export function getDocumentVersions(id: string): Promise<ApiResponse<DocumentVersion[]>> {
  return get<DocumentVersion[]>(`/ic-document/documents/${id}/versions`);
}

export function createDocumentVersion(id: string, params: { uploadBy?: string; fileSize?: number }): Promise<ApiResponse<DocumentVersion>> {
  return post<DocumentVersion>(`/ic-document/documents/${id}/versions`, params as unknown as Record<string, unknown>);
}
