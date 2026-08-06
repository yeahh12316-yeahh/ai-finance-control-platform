import Dexie, { Table } from 'dexie';

// 定义所有表的接口
interface UserRecord {
  id: string;
  username: string;
  realName: string;
  password: string;
  role: string;
  roleName: string;
  status: string;
  orgId: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface RoleRecord {
  id: string;
  roleCode: string;
  roleName: string;
  description: string;
  permissions: string[];
  status: string;
  createdAt: string;
}

interface PermissionRecord {
  id: string;
  permCode: string;
  permName: string;
  permType: 'menu' | 'button' | 'api';
  parentId: string;
  path: string;
  icon: string;
  sortOrder: number;
}

interface ProcessRecord {
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
  createdAt: string;
  updatedAt: string;
}

interface RiskCategoryRecord {
  id: string;
  categoryCode: string;
  categoryName: string;
  parentId: string;
  description: string;
  sortOrder: number;
}

interface ControlRecord {
  id: string;
  controlCode: string;
  controlName: string;
  controlType: 'preventive' | 'detective' | 'corrective';
  controlNature: 'manual' | 'automated' | 'semi_automated';
  controlFrequency: string;
  processId: string;
  description: string;
  status: string;
  effectivenessRating: string;
  createdAt: string;
  updatedAt: string;
}

interface RiskRecord {
  id: string;
  riskCode: string;
  riskName: string;
  categoryId: string;
  processId: string;
  riskDescription: string;
  inherentImpact: number;
  inherentLikelihood: number;
  inherentRiskLevel: string;
  residualImpact: number;
  residualLikelihood: number;
  residualRiskLevel: string;
  controlId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface RiskAssessmentRecord {
  id: string;
  riskId: string;
  assessmentType: string;
  assessmentDate: string;
  impactScore: number;
  likelihoodScore: number;
  riskLevel: string;
  assessor: string;
  comments: string;
  status: string;
}

interface RCMMappingRecord {
  id: string;
  riskId: string;
  controlId: string;
  mappingType: 'direct' | 'indirect' | 'compensating';
  effectivenessRating: string;
  lastTestedDate: string;
}

interface DocumentRecord {
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
  versions: {
    version: string;
    uploadBy: string;
    uploadAt: string;
    fileSize: number;
  }[];
}

interface EvaluationPlanRecord {
  id: string;
  planCode: string;
  planName: string;
  planYear: number;
  planType: string;
  evaluationFramework: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

interface TestWorksheetRecord {
  id: string;
  programId: string;
  controlId: string;
  controlName: string;
  testStep: string;
  testMethod: string;
  sampleSize: number;
  sampleDescription: string;
  testResult: string;
  testConclusion: string;
  finding: string;
  testedBy: string;
  testDate: string;
  reviewedBy: string;
  reviewDate: string;
  status: string;
}

interface DefectRecord {
  id: string;
  defectCode: string;
  defectName: string;
  description: string;
  severity: string;
  deficiencyType: string;
  deficiencyCategory: string;
  sourceType: string;
  sourceId: string;
  processId: string;
  controlId: string;
  riskId: string;
  remediationStatus: string;
  remediationPlan: string;
  assignedTo: string;
  dueDate: string;
  closedDate: string;
  isOverdue: boolean;
  rootCause: string;
  tasks: {
    id: string;
    taskName: string;
    assignee: string;
    priority: string;
    status: string;
    dueDate: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface AuditLogRecord {
  id: string;
  userId: string;
  username: string;
  module: string;
  action: string;
  targetType: string;
  targetId: string;
  detail: string;
  ip: string;
  result: string;
  createdAt: string;
}

class FinanceControlDB extends Dexie {
  users!: Table<UserRecord, string>;
  roles!: Table<RoleRecord, string>;
  permissions!: Table<PermissionRecord, string>;
  processes!: Table<ProcessRecord, string>;
  riskCategories!: Table<RiskCategoryRecord, string>;
  controls!: Table<ControlRecord, string>;
  risks!: Table<RiskRecord, string>;
  riskAssessments!: Table<RiskAssessmentRecord, string>;
  rcmMappings!: Table<RCMMappingRecord, string>;
  documents!: Table<DocumentRecord, string>;
  evaluationPlans!: Table<EvaluationPlanRecord, string>;
  testWorksheets!: Table<TestWorksheetRecord, string>;
  defects!: Table<DefectRecord, string>;
  auditLogs!: Table<AuditLogRecord, string>;

  constructor() {
    super('FinanceControlDB');
    this.version(1).stores({
      users: 'id, username, role, status, orgId',
      roles: 'id, roleCode',
      permissions: 'id, permCode, permType, parentId',
      processes: 'id, processCode, parentId, processLevel, status',
      riskCategories: 'id, categoryCode, parentId',
      controls: 'id, controlCode, controlType, status, processId',
      risks: 'id, riskCode, categoryId, processId, status, inherentRiskLevel, residualRiskLevel',
      riskAssessments: 'id, riskId, assessmentType, assessmentDate, status',
      rcmMappings: 'id, riskId, controlId, mappingType',
      documents: 'id, docCode, docCategory, status',
      evaluationPlans: 'id, planCode, planYear, planType, status',
      testWorksheets: 'id, programId, testConclusion, status',
      defects: 'id, defectCode, severity, remediationStatus',
      auditLogs: 'id, userId, module, action, createdAt',
    });
  }
}

export const db = new FinanceControlDB();
