import { get, post } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface KnowledgeSearchResult {
  id: string;
  documentId: string;
  documentName: string;
  chunkIndex: number;
  content: string;
  embedding: number[];
  metadata: Record<string, unknown>;
  score?: number;
  highlight?: string;
  createdAt: string;
}

export interface KnowledgeChunk {
  id: string;
  documentId: string;
  documentName: string;
  chunkIndex: number;
  content: string;
  embedding: number[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface IndexResult {
  documentId: string;
  chunkCount: number;
  status: string;
}

export function searchKnowledge(params: { query: string; topK?: number }): Promise<ApiResponse<KnowledgeSearchResult[]>> {
  return post<KnowledgeSearchResult[]>('/knowledge/search', params as unknown as Record<string, unknown>);
}

export function indexDocument(params: { documentId: string; documentName?: string; content: string }): Promise<ApiResponse<IndexResult>> {
  return post<IndexResult>('/knowledge/index', params as unknown as Record<string, unknown>);
}

export function getChunks(params: PaginationParams & { documentId?: string }): Promise<ApiResponse<PaginatedResponse<KnowledgeChunk>>> {
  return get<PaginatedResponse<KnowledgeChunk>>('/knowledge/chunks', params as Record<string, unknown>);
}
