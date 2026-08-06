export interface ProcessNode {
  id: string;
  processCode: string;
  processName: string;
  parentId: string;
  processLevel: number;
  description: string;
  status: string;
  sortOrder: number;
  riskCount: number;
  controlCount: number;
  children?: ProcessNode[];
  createdAt: string;
  updatedAt: string;
}
