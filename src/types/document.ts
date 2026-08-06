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
